import { links, navItems, socials, streaming } from "@/data/site";
import SocialIcon from "./SocialIcon";


/** Red footer (reference image 3). */
export default function Footer() {
  return (
    <footer className="relative border-t border-cream/10 bg-ink px-5 pb-10 pt-20 text-cream md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <a href="#top" className="font-display text-[clamp(36px,4.5vw,64px)]">
            Benson Boone
          </a>
          <a href={`mailto:${links.email}`} className="font-display whitespace-nowrap text-[min(4.4vw,40px)] text-brick transition-opacity hover:opacity-70 md:text-[min(2.9vw,48px)]">
            {links.email}
          </a>
        </div>

        <div className="mt-16 grid gap-10 border-t border-cream/20 pt-10 md:grid-cols-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-cream/70">Menu</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
              {navItems.map((n) => (
                <li key={n.label}><a href={n.href} className="transition-opacity hover:opacity-70">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-cream/70">Listen</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
              {streaming.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">{s.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:text-right">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-cream/70">Follow</p>
            <ul className="mt-4 flex gap-4 md:justify-end">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="transition-opacity hover:opacity-70">
                    <SocialIcon name={s.label} className="h-6 w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 text-[13px] text-cream/70 md:flex-row">
          <p>© {new Date().getFullYear()} Benson Boone. Class project rebrand — not the official site.</p>
          <p className="flex gap-5">
            <a href="#" className="transition-opacity hover:opacity-70">Terms of use</a>
            <a href="#" className="transition-opacity hover:opacity-70">Privacy notice</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
