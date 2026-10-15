"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function Reveal({ delay = 0, y = 40, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    />
  );
}

type PillProps = {
  href: string;
  children: React.ReactNode;
  variant?: "outline" | "solid" | "dark" | "red" | "mustard";
  external?: boolean;
  className?: string;
};

/** Pill button with a trailing circular arrow, as used throughout the reference site. */
export function Pill({ href, children, variant = "outline", external, className = "" }: PillProps) {
  const styles = {
    outline: "border border-current text-current hover:bg-cream hover:text-ink",
    solid: "bg-cream text-ink hover:bg-white",
    dark: "bg-ink text-cream hover:bg-black",
    red: "bg-oxblood text-cream hover:bg-brick",
    mustard: "bg-mustard text-ink hover:bg-cream",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className={`rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors ${styles}`}>
        {children}
      </span>
      <span
        className={`flex h-[46px] w-[46px] items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45 ${styles}`}
      >
        <Arrow />
      </span>
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Hand-drawn star outline: lopsided points and softly curved edges, like a marker doodle. */
export const STAR_PATH =
  "M60 6 Q62 21 66 37 Q81 39 96 44 Q83 51 71 58 Q75 76 80 94 Q65 83 52 72 Q37 82 20 92 Q27 76 34 60 Q19 48 4 34 Q22 35 40 36 Q50 21 60 6 Z";

/**
 * Hand-drawn sticker star: a soft halo, a thick rounded outline and a fill in the
 * current text colour. `outline` sets the line colour (dark by default).
 */
export function Star({ className = "", outline = "#0a0a0a" }: { className?: string; outline?: string }) {
  return (
    <svg viewBox="-8 -8 116 116" className={className} aria-hidden>
      <g transform="rotate(-8 50 50)" strokeLinejoin="round" strokeLinecap="round">
        <path d={STAR_PATH} fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="18" />
        <path d={STAR_PATH} fill="currentColor" stroke={outline} strokeWidth="6.5" />
      </g>
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-full border border-current px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${className}`}>
      {children}
    </span>
  );
}
