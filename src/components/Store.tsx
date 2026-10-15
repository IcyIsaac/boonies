"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { links, merch } from "@/data/site";
import { Pill, Reveal } from "./ui";

/**
 * Official merch, presented as one large rounded card (like the reference
 * site's store block). Product cards are transparent with a retro treatment:
 * a bone outline, a dashed inner "ticket" border and a hard offset red shadow.
 */
export default function Store() {
  return (
    <section id="merch" className="relative bg-ink px-4 py-20 text-cream md:px-8 md:py-28">
      <div className="mx-auto max-w-[1500px] rounded-[28px] border border-cream/10 bg-graphite px-5 py-10 md:rounded-[44px] md:px-12 md:py-16">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-[clamp(48px,8vw,124px)] leading-[0.86]">
              Official
              <br />
              <span className="text-brick">Merch</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:max-w-[360px] lg:items-end lg:text-right">
            <p className="text-[15px] leading-relaxed text-cream/75">
              Tour exclusives, limited runs and the pieces you saw from the barricade.
            </p>
            <Pill href={links.store} external variant="red">
              Shop all
            </Pill>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-16 md:gap-x-7 lg:grid-cols-4">
          {merch.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-[20px] border-2 border-cream/80 p-2 shadow-[6px_6px_0_0_var(--oxblood)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_var(--oxblood)] md:p-3"
              >
                {/* Dashed inner border, like a vintage ticket stub */}
                <div className="rounded-[14px] border border-dashed border-cream/30 p-3 md:p-4">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width:1024px) 25vw, 50vw"
                      className="object-contain transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                    />
                    <Image
                      src={item.hover}
                      alt=""
                      fill
                      sizes="(min-width:1024px) 25vw, 50vw"
                      className="scale-105 object-contain opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
                    />
                    <span className="absolute left-0 top-0 rounded-full bg-mustard px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink">
                      {item.category}
                    </span>
                  </div>
                  <div className="mt-4 border-t border-dashed border-cream/25 pt-3">
                    <h3 className="text-[clamp(14px,1.3vw,19px)] font-medium leading-snug">{item.title}</h3>
                    <p className="font-display mt-1 text-[clamp(15px,1.4vw,22px)] text-mustard">{item.price}</p>
                  </div>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
