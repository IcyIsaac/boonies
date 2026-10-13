"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { links, merch } from "@/data/site";
import { Pill, Reveal } from "./ui";

/** Red merch grid (reference image 2). */
export default function Store() {
  return (
    <section id="merch" className="bg-oxblood py-24 text-ink md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-cream/70">Official store</span>
            <h2 className="font-display mt-3 text-[clamp(48px,7vw,110px)]">Merch ...</h2>
            <p className="mt-4 max-w-[46ch] text-[15px] text-cream/80">
              Tour exclusives, limited runs and the pieces you saw from the barricade.
            </p>
          </div>
          <Pill href={links.store} external className="text-ink">
            Shop all
          </Pill>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {merch.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href={item.href} target="_blank" rel="noreferrer" className="group block">
                <div className="relative aspect-[2/3] overflow-hidden bg-[#ece5d6]">
                  <Image src={item.image} alt={item.title} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-contain p-6 transition-all duration-700 group-hover:scale-105 group-hover:opacity-0" />
                  <Image src={item.hover} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="scale-105 object-contain p-6 opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream">
                    {item.category}
                  </span>
                </div>
                <h3 className="mt-5 text-[clamp(16px,1.6vw,24px)] font-medium">{item.title}</h3>
                <p className="mt-1 text-[clamp(15px,1.4vw,20px)]">{item.price}</p>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
