"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { logos } from "@/data/collections";

const primaryLinks = [
  { label: "home", href: "/" },
  { label: "apparel", href: "/collections/apparel" },
  { label: "outerwear", href: "/collections/outerwear" },
];

const moreLinks = [
  { label: "accessories", href: "/collections/accessories" },
  { label: "music", href: "/collections/music" },
  { label: "tour dates", href: "/pages/tour" },
];

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="10" cy="6.5" r="3.5" />
      <path d="M3.5 17.5c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3.5 6.5h13l-.9 10.2a1 1 0 0 1-1 .8H5.4a1 1 0 0 1-1-.8L3.5 6.5Z" strokeLinejoin="round" />
      <path d="M7 8.5V5.5a3 3 0 0 1 6 0v3" strokeLinecap="round" />
    </svg>
  );
}

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UsFlag() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="rounded-full" aria-hidden>
      <clipPath id="flag-clip">
        <circle cx="8" cy="8" r="8" />
      </clipPath>
      <g clipPath="url(#flag-clip)">
        <rect width="16" height="16" fill="#fff" />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} y={(i * 2 * 16) / 13} width="16" height={16 / 13} fill="#b22234" />
        ))}
        <rect width="8" height={(16 / 13) * 7} fill="#3c3b6e" />
      </g>
    </svg>
  );
}

export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-20 bg-cream">
      <div className="mx-auto flex max-w-[calc(90rem+80px)] items-center gap-4 px-5 py-4 md:px-10 md:py-5">
        <button
          type="button"
          aria-label="Menu"
          className="-ml-1 p-1 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            {mobileOpen ? (
              <path d="M2 2l10 10M12 2L2 12" />
            ) : (
              <>
                <path d="M1 3.5h12" />
                <path d="M1 10.5h12" />
              </>
            )}
          </svg>
        </button>

        <Link href="/" className="shrink-0 max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2">
          <Image src={logos.dark} alt="Benson Boone" width={259} height={30} priority className="h-[22px] w-auto md:h-[30px]" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-2 text-[20px] tracking-[3px] transition-opacity hover:opacity-100 ${
                link.href === "/" ? "font-bold" : "font-medium opacity-75"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button
              type="button"
              className="px-2 text-[20px] font-medium tracking-[3px] opacity-75 transition-opacity hover:opacity-100"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
            >
              more
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-full pt-3">
                <ul className="min-w-[200px] border border-navy/10 bg-cream py-3 shadow-[0_10px_30px_rgba(38,54,86,0.08)]">
                  {moreLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="block px-5 py-2 text-[16px] font-medium tracking-[3px] opacity-75 hover:opacity-100"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <button type="button" className="hidden items-center gap-2 text-[17px] font-bold tracking-[2px] md:flex">
            <UsFlag />
            usd
            <Chevron />
          </button>
          <a href="/account" aria-label="Account" className="hidden md:block">
            <UserIcon />
          </a>
          <a href="/cart" aria-label="Cart">
            <BagIcon />
          </a>
        </div>
      </div>

      {mobileOpen && (
        <nav className="absolute inset-x-0 top-full border-t border-navy/10 bg-cream px-5 pb-8 pt-4 shadow-lg lg:hidden">
          <ul className="flex flex-col gap-1">
            {[...primaryLinks, ...moreLinks].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="block py-2 text-[22px] font-medium tracking-[3px]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-5 border-t border-navy/10 pt-6">
            <a href="/account" className="flex items-center gap-2 text-[15px] tracking-[2px]">
              <UserIcon /> account
            </a>
            <span className="flex items-center gap-2 text-[15px] font-bold tracking-[2px]">
              <UsFlag /> usd
            </span>
          </div>
        </nav>
      )}
    </header>
  );
}
