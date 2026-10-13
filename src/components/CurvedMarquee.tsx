"use client";

import { useEffect, useRef } from "react";
import { socials } from "@/data/site";
import SocialIcon from "./SocialIcon";

const PHRASE = " HEART  ★  WANTED MAN WORLD TOUR  ★  BEAUTIFUL THINGS  ★  ";

/** Text riding a wave path, scrolling continuously (reference image 3). */
export default function CurvedMarquee() {
  const textRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let offset = 0;
    let frame = 0;
    const tick = () => {
      offset = (offset - 0.035) % 50;
      el.setAttribute("startOffset", `${offset}%`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate pb-16 pt-10">
      <svg viewBox="0 0 2000 460" className="block w-[140%] max-w-none -translate-x-[14%] md:w-full md:translate-x-0" aria-label="American Heart, Wanted Man World Tour, Beautiful Things">
        <defs>
          <path id="wave" d="M-200,330 C200,80 600,80 900,240 S1500,420 1900,200 S2400,60 2800,260 S3600,400 4200,200" />
        </defs>
        <text className="font-display" fontSize="150" fill="var(--cream)">
          <textPath ref={textRef} href="#wave" startOffset="0%">
            {PHRASE.repeat(4)}
          </textPath>
        </text>
      </svg>
      <div className="mt-4 flex justify-center gap-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-slate transition-transform hover:-translate-y-1"
          >
            <SocialIcon name={s.label} className="h-6 w-6" />
          </a>
        ))}
      </div>
    </section>
  );
}
