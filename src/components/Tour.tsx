"use client";

import { motion } from "framer-motion";
import { links, tourDates } from "@/data/site";
import { Arrow, Eyebrow } from "./ui";

export default function Tour() {
  return (
    <section id="tour" className="bg-night py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Eyebrow className="text-cream/70">Tickets</Eyebrow>
        <h2 className="font-display mt-6 text-[clamp(44px,7vw,110px)] text-cream">
          Wanted Man
          <br />
          World Tour
        </h2>

        <ul className="mt-16 border-t border-cream/20">
          {tourDates.map((d, i) => (
            <motion.li
              key={d.city}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <a
                href={links.tour}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[84px_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4 border-b border-cream/20 py-6 transition-colors hover:bg-cream hover:text-ink sm:grid-cols-[120px_minmax(0,1fr)_auto] md:grid-cols-[200px_minmax(0,1fr)_1fr_auto] md:px-4"
              >
                <span className="font-display text-[14px] text-cream group-hover:text-ink sm:text-[18px] md:text-[24px]">{d.date}</span>
                <span className="font-display truncate text-[18px] text-cream group-hover:text-ink sm:text-[22px] md:text-[40px]">{d.city}</span>
                <span className="hidden text-[14px] uppercase tracking-[0.15em] text-cream/60 group-hover:text-ink/70 md:block">{d.country}</span>
                <span className="flex items-center gap-2 rounded-full border border-cream/60 p-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-cream group-hover:border-ink group-hover:text-ink sm:px-4 sm:py-2">
                  <span className="sr-only sm:not-sr-only">Tickets</span> <Arrow />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
