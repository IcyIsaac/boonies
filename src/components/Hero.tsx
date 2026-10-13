"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMusic } from "./music";
import NightPhoto from "./NightPhoto";
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
        <NightPhoto tone="ember" className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

      <div className="relative z-10 px-5 pt-28 md:px-10 md:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display max-w-[16ch] text-[clamp(30px,4.6vw,64px)] text-cream"
        >
          Merch, tickets, Roots Out Now
        </motion.h1>
        <motion.button
          type="button"
          onClick={music.play}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 inline-flex h-[64px] w-[240px] items-center justify-center rounded-full border border-cream/60 text-[15px] font-semibold uppercase tracking-[0.1em] text-cream/80 transition-colors hover:bg-cream hover:text-ink md:h-[80px] md:w-[300px]"
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
