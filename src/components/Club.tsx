"use client";

import { motion } from "framer-motion";
import { clubPerks } from "@/data/site";
import NightPhoto from "./NightPhoto";
import { Pill, Reveal, Star } from "./ui";

export default function Club() {
  return (
    <section id="club" className="relative overflow-hidden bg-cream py-28 text-ink md:py-40">
      <Reveal className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-5 text-center">
        <div className="flex gap-2 text-oxblood">
          <Star className="h-5 w-5" />
          <Star className="h-5 w-5" />
          <Star className="h-5 w-5" />
        </div>
        <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.3em]">Unlock real fan benefits</p>
        <h2 className="font-display mt-6 text-[clamp(60px,13vw,200px)] text-oxblood">
          Boonies
          <br />
          Club
        </h2>
        <Pill href="#newsletter" variant="dark" className="mt-10">
          Join the club
        </Pill>
      </Reveal>

      <ul className="relative z-10 mx-auto mt-20 grid max-w-[1300px] gap-5 px-5 md:grid-cols-3 md:px-10">
        {clubPerks.map((perk, i) => (
          <motion.li
            key={perk.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="overflow-hidden rounded-3xl bg-ink text-cream"
          >
            <NightPhoto tone={(["ember", "teal", "rose"] as const)[i]} figure={i !== 1} className="aspect-[16/10] w-full" />
            <div className="p-7">
              <span className="text-[12px] tracking-[0.2em] text-cream/50">0{i + 1}</span>
              <h3 className="font-display mt-3 text-[26px]">{perk.title}</h3>
              <p className="mt-3 text-[15px] text-cream/70">{perk.body}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
