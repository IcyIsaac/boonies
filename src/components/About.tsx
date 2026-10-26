"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { timeline } from "@/data/site";
import Image from "next/image";
import StreamingLinks from "./StreamingLinks";
import { Reveal } from "./ui";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  // Stacking order: the polaroid picked up most recently stays on top.
  const [order, setOrder] = useState<string[]>([]);
  const bringToFront = (title: string) => setOrder((o) => [...o.filter((t) => t !== title), title]);

  // "Drag me" bubble that follows the cursor over a polaroid (mouse/trackpad only).
  const [canHover, setCanHover] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bubbleX = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.4 });
  const bubbleY = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.4 });
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const trackPointer = (e: React.PointerEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-ink pb-32 pt-14 md:pt-20">
      {/* Where to listen, centred at the top of the section */}
      <Reveal className="mx-auto max-w-[1200px] px-5">
        <StreamingLinks />
      </Reveal>

      <Reveal className="mx-auto mt-24 flex max-w-[860px] flex-col items-center px-5 text-center md:mt-32">
        {/* Stacked block wordmark: both lines set to the same width. At equal size BOONE is
            ~18% narrower than BENSON, so it gets a touch more letter-spacing plus a slight
            horizontal stretch (the -mr cancels the trailing letter-space so it stays centred). */}
        <h2 aria-label="Benson Boone" className="font-display text-[clamp(52px,12vw,200px)] leading-[0.84] tracking-[-0.01em] text-cream">
          <span aria-hidden className="block">
            Benson
          </span>
          <span aria-hidden className="-mr-[0.06em] inline-block origin-center scale-x-[1.112] tracking-[0.05em]">
            Boone
          </span>
        </h2>
        <p className="mt-8 max-w-[44ch] text-[14px] leading-relaxed text-cream/70 md:text-[15px]">
          Singer-songwriter from Monroe, Washington. Big, open-hearted pop, made to be sung back at full volume.
        </p>
      </Reveal>

      {/* Fanned polaroid timeline: each one can be dragged anywhere within the section */}
      <div className="mt-14 flex justify-center px-4 md:mt-24 md:px-5">
        <div className="flex max-w-full flex-wrap justify-center gap-y-6 pb-16 pt-10 md:flex-nowrap md:gap-y-0 md:pb-24 md:pt-12">
          {timeline.map((t, i) => {
            const mid = (timeline.length - 1) / 2;
            const rotate = (i - mid) * 4;
            const lift = Math.abs(i - mid) * 18;
            const z = order.indexOf(t.title);
            return (
              <motion.figure
                key={t.title}
                drag
                dragConstraints={sectionRef}
                dragElastic={0.12}
                dragTransition={{ power: 0.25, timeConstant: 220 }}
                onDragStart={() => {
                  bringToFront(t.title);
                  setDragging(true);
                }}
                onDragEnd={() => setDragging(false)}
                onPointerEnter={(e) => {
                  trackPointer(e);
                  setHovering(true);
                }}
                onPointerMove={trackPointer}
                onPointerLeave={() => setHovering(false)}
                onPointerDown={() => bringToFront(t.title)}
                initial={{ opacity: 0, y: 120, rotate: 0 }}
                whileInView={{ opacity: 1, y: lift, rotate }}
                whileHover={{ scale: 1.04 }}
                whileDrag={{ scale: 1.08, rotate: 0, boxShadow: "0 40px 70px rgba(0,0,0,.6)" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex: z >= 0 ? 20 + z : undefined }}
                className="relative -mx-2 w-[132px] shrink-0 cursor-grab touch-none select-none bg-[#f6f1e7] p-2 pb-11 shadow-[0_25px_50px_rgba(0,0,0,.55)] active:cursor-grabbing sm:w-[160px] md:-mx-6 md:w-[230px] md:p-2.5 md:pb-14"
              >
                <div className="pointer-events-none relative aspect-square w-full overflow-hidden bg-ink">
                  <Image
                    src={t.image}
                    alt={`${t.word}: ${t.title}`}
                    fill
                    draggable={false}
                    sizes="(min-width: 768px) 230px, 160px"
                    className="object-cover"
                    style={{ objectPosition: t.focus ?? "50% 50%" }}
                  />
                </div>
                <figcaption className="pointer-events-none absolute inset-x-2.5 bottom-2.5 text-ink md:inset-x-3 md:bottom-3">
                  <span className="block font-serif text-[16px] italic leading-none md:text-[20px]">{t.word}</span>
                  <span className="mt-1 flex justify-between gap-2 text-[8px] uppercase tracking-[0.12em] text-ink/60 md:text-[10px]">
                    <span className="truncate">{t.title}</span>
                    <span>{t.date}</span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>

      {/* Cursor bubble (desktop only); hidden while a photo is being dragged */}
      <AnimatePresence>
        {canHover && hovering && !dragging && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            style={{ x: bubbleX, y: bubbleY }}
            className="pointer-events-none fixed left-0 top-0 z-[60]"
          >
            <span className="block -translate-x-1/2 translate-y-[18px] whitespace-nowrap rounded-full bg-oxblood px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream shadow-[0_10px_24px_rgba(0,0,0,.45)]">
              Drag me
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
