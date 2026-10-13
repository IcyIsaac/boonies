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
  variant?: "outline" | "solid" | "dark";
  external?: boolean;
  className?: string;
};

/** Pill button with a trailing circular arrow, as used throughout the reference site. */
export function Pill({ href, children, variant = "outline", external, className = "" }: PillProps) {
  const styles = {
    outline: "border border-current text-current hover:bg-cream hover:text-ink",
    solid: "bg-cream text-ink hover:bg-white",
    dark: "bg-ink text-cream hover:bg-black",
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

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 1.5l2.9 7.1 7.6.6-5.8 4.9 1.8 7.4L12 17.6l-6.5 3.9 1.8-7.4L1.5 9.2l7.6-.6L12 1.5z" />
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
