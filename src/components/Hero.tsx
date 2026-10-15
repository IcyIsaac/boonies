"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMusic } from "./music";
import Image from "next/image";
import { Star } from "./ui";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const music = useMusic();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section id="top" ref={ref} className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden">
      <motion.div style={{ y: bgY, scale }} className="absolute inset-0">
        {/* Portrait photo; the crop is centred on the figure so he stays in frame on wide screens */}
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[52%_42%]"
        />
      </motion.div>
      {/* Bottom fades into the about section's background so the two sections blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% via-ink/60 via-80% to-ink" />

      {/* Headline + button sit off to the side so the photo stands on its own:
          top-left on phones, left and vertically centred on larger screens. */}
      <div className="relative z-10 px-5 pt-24 md:absolute md:left-10 md:top-1/2 md:max-w-[min(38vw,600px)] md:-translate-y-[60%] md:px-0 md:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display max-w-[14ch] text-[clamp(22px,3.6vw,60px)] text-cream"
        >
          Merch, tickets, Roots Out Now
        </motion.h1>
        <motion.button
          type="button"
          onClick={music.play}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full border border-cream/60 px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/80 transition-colors hover:bg-cream hover:text-ink md:mt-8 md:h-14 md:px-10 md:text-[14px]"
        >
          {music.playing ? "Now playing" : "Listen in"}
        </motion.button>
      </div>

      {/* Giant headline running off the bottom edge */}
      <div className="relative z-10 mt-auto overflow-hidden pb-2">
        <div className="animate-marquee flex w-max whitespace-nowrap [--marquee-speed:40s]">
          {[0, 1].map((k) => (
            <span key={k} className="font-display flex items-center gap-[0.25em] pr-[0.25em] text-[clamp(96px,17vw,260px)] leading-[0.85] text-cream" aria-hidden={k === 1}>
              Album <Star className="h-[0.45em] w-[0.45em]" /> Roots <Star className="h-[0.45em] w-[0.45em]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
