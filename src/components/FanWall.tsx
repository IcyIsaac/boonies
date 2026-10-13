"use client";

import { motion } from "framer-motion";
import { fanWall } from "@/data/site";
import NightPhoto from "./NightPhoto";
import { Pill, Reveal } from "./ui";

// On phones the photos sit in the top/bottom bands so the headline stays readable.
const positions = [
  "left-[-6%] top-[2%] md:left-[2%] md:top-[8%]",
  "right-[-6%] top-[4%] md:right-[4%]",
  "left-[-4%] bottom-[2%] md:left-[10%] md:bottom-[6%]",
  "right-[-4%] bottom-[3%] md:right-[12%] md:bottom-[10%]",
  "left-[30%] top-[-4%] hidden lg:block",
  "right-[30%] bottom-[-6%] hidden lg:block",
];

/** "Were you there?" — scattered tour polaroids around a centered call to action. */
export default function FanWall() {
  return (
    <section className="relative overflow-hidden bg-ink py-[300px] md:py-56">
      {fanWall.map((p, i) => (
        <motion.figure
          key={p.city}
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
          whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute w-[130px] bg-[#f6f1e7] p-2 pb-8 shadow-[0_20px_40px_rgba(0,0,0,.5)] md:w-[220px] ${positions[i]}`}
        >
          <NightPhoto tone={p.tone} className="aspect-[4/5] w-full" />
          <figcaption className="absolute inset-x-2 bottom-1.5 flex justify-between text-[11px] font-medium lowercase text-ink/80">
            <span className="italic">{p.city}</span>
            <span>{p.date}</span>
          </figcaption>
        </motion.figure>
      ))}

      <Reveal className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-5 text-center">
        <h2 className="font-display text-[clamp(34px,5.5vw,80px)] text-cream">Were you at the Wanted Man Tour?</h2>
        <p className="mt-6 max-w-[42ch] text-[15px] text-cream/70">
          Every night on the road gets captured. Find yourself in the crowd and grab your photos from the show.
        </p>
        <Pill href="#tour" variant="solid" className="mt-10">
          Find your photos
        </Pill>
      </Reveal>
    </section>
  );
}
