import { links, navItems, socials, streaming } from "@/data/site";
import SocialIcon from "./SocialIcon";

/** Red footer (reference image 3). */
export default function Footer() {
  return (
    <footer className="bg-oxblood-deep px-5 pb-10 pt-20 text-ink md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <a href="#top" className="font-display text-[clamp(36px,4.5vw,64px)]">
            Benson Boone
          </a>
          <a href={`mailto:${links.email}`} className="font-display break-all text-[clamp(24px,3.6vw,56px)] transition-colors hover:text-cream">
            {links.email}
          </a>
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink/25 pt-10 md:grid-cols-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-cream/70">Menu</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
              {navItems.map((n) => (
                <li key={n.label}><a href={n.href} className="hover:text-cream">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-cream/70">Listen</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
              {streaming.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="hover:text-cream">{s.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:text-right">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-cream/70">Follow</p>
            <ul className="mt-4 flex gap-4 md:justify-end">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-cream">
                    <SocialIcon name={s.label} className="h-6 w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 text-[13px] text-ink/80 md:flex-row">
          <p>© {new Date().getFullYear()} Benson Boone. Class project rebrand — not the official site.</p>
          <p className="flex gap-5">
            <a href="#" className="hover:text-cream">Terms of use</a>
            <a href="#" className="hover:text-cream">Privacy notice</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
