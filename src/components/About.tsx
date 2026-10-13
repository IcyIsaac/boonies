"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/site";
import NightPhoto from "./NightPhoto";
import { Pill, Reveal } from "./ui";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink pb-32 pt-32 md:pt-44">
      <Reveal className="mx-auto flex max-w-[860px] flex-col items-center px-5 text-center">
        <span className="text-[12px] uppercase tracking-[0.3em] text-cream/50">Who is</span>
        <h2 className="font-display mt-3 text-[clamp(48px,9vw,140px)] text-cream">Benson Boone?</h2>
        <p className="mt-8 max-w-[52ch] text-[16px] leading-relaxed text-cream/75 md:text-[18px]">
          A singer-songwriter from Monroe, Washington with a voice that goes for the rafters and a stage show that
          includes the occasional backflip. Big, open-hearted pop songs, written to be sung back at full volume.
        </p>
        <Pill href="#music" className="mt-10 text-cream">
          Discover his story
        </Pill>
      </Reveal>

      {/* Fanned polaroid timeline */}
      <div className="mt-12 flex justify-center md:mt-24 md:px-5">
        <div className="flex max-w-full snap-x gap-0 overflow-x-auto px-8 pb-24 pt-12 [scrollbar-width:none] md:overflow-visible md:px-0">
          {timeline.map((t, i) => {
            const mid = (timeline.length - 1) / 2;
            const rotate = (i - mid) * 4;
            const lift = Math.abs(i - mid) * 18;
            return (
              <motion.figure
                key={t.title}
                initial={{ opacity: 0, y: 120, rotate: 0 }}
                whileInView={{ opacity: 1, y: lift, rotate }}
                whileHover={{ y: lift - 30, rotate: 0, scale: 1.05, zIndex: 30 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="relative -mx-2 w-[190px] shrink-0 snap-center bg-[#f6f1e7] p-2.5 pb-14 shadow-[0_25px_50px_rgba(0,0,0,.55)] md:-mx-6 md:w-[230px]"
              >
                <NightPhoto tone={t.tone} className="aspect-square w-full grayscale-[35%]" />
                <figcaption className="absolute inset-x-3 bottom-3 text-ink">
                  <span className="block font-serif text-[20px] italic leading-none">{t.word}</span>
                  <span className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.12em] text-ink/60">
                    <span>{t.title}</span>
                    <span>{t.date}</span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
