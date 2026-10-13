"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems, socials } from "@/data/site";
import { SoundBars, useMusic } from "./music";
import SocialIcon from "./SocialIcon";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const music = useMusic();

  // Hide the header while scrolling down; bring it back as soon as the user scrolls up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > lastY && y > 120);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid cream bar once the page is scrolled; transparent at the very top and over the open menu.
  const solid = scrolled && !open;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-[background-color,color,box-shadow] duration-500 md:px-10 ${
          solid ? "bg-cream text-ink shadow-[0_1px_0_rgba(10,10,10,.08)]" : "bg-transparent text-cream"
        }`}
      >
        <a
          href="#top"
          className="font-display text-[14px] tracking-[0.02em] sm:text-[18px] sm:tracking-[0.04em] md:text-[22px]"
        >
          Benson Boone
        </a>
        <button
          type="button"
          onClick={music.toggle}
          aria-label={music.playing ? "Turn sound off" : "Turn sound on"}
          aria-pressed={music.playing}
          className={`absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-colors duration-300 md:h-12 md:w-12 ${
            solid ? "border-ink/40 hover:bg-ink hover:text-cream" : "border-cream/60 hover:bg-cream hover:text-ink"
          }`}
        >
          {music.playing && (
            <span className="absolute inset-0 animate-ping rounded-full border border-current opacity-50 [animation-duration:2.4s]" aria-hidden />
          )}
          <SoundBars playing={music.playing} />
        </button>
        <div className="flex items-center gap-3">
          <a
            href="https://store.bensonboone.com"
            target="_blank"
            rel="noreferrer"
            className={`hidden rounded-full border px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 sm:block ${
              solid ? "border-ink/40 hover:bg-ink hover:text-cream" : "border-cream/60 hover:bg-cream hover:text-ink"
            }`}
          >
            Shop
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`relative z-[60] flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${
              solid ? "bg-ink text-cream" : "bg-cream text-ink"
            }`}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-[2px] w-5 bg-current transition-all ${open ? "top-[5px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-[2px] w-5 bg-current transition-all ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-oxblood px-5 pb-10 pt-28 md:px-10"
          >
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display block text-[clamp(40px,8vw,104px)] text-cream transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center gap-4 text-cream">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="hover:opacity-70"
                >
                  <SocialIcon name={s.label} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
