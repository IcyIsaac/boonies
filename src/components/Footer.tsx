import Image from "next/image";
import { logos } from "@/data/collections";

const policies = [
  { label: "privacy policy", href: "/policies/privacy-policy" },
  { label: "contact information", href: "/policies/contact-information" },
  { label: "refund policy", href: "/policies/refund-policy" },
  { label: "terms of service", href: "/policies/terms-of-service" },
  { label: "shipping policy", href: "/policies/shipping-policy" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    path: "M14 8h-2c-.6 0-1 .4-1 1v2h3l-.5 3H11v7H8v-7H6v-3h2V8.5C8 6.6 9.3 5 11.5 5H14v3Z",
    circle: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm4.5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm5-3.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
    path: "M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6Z",
  },
  {
    label: "X",
    href: "https://www.x.com/",
    path: "M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-[calc(90rem+80px)] px-5 pt-12 md:px-10 md:pt-[52px]">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-3">
            <Image src={logos.light} alt="Benson Boone" width={520} height={60} className="h-auto w-[260px]" />
            <a
              href="https://www.onrpt.store/collections/benson-boone"
              className="w-fit text-[12px] font-semibold tracking-[3px] underline underline-offset-4"
            >
              shop uk store
            </a>
          </div>

          <div className="w-full md:max-w-[222px] lg:max-w-[222px] xl:w-auto xl:max-w-none">
            <div className="md:w-[222px] xl:w-auto">
              <p className="mb-3 text-[11px] font-semibold tracking-[1px]">sign up for the mailing list</p>
              <form className="flex flex-col gap-2 xl:flex-row">
                <label htmlFor="footer-email" className="sr-only">
                  email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="email"
                  className="h-[42px] min-w-0 border border-cream/70 bg-transparent px-5 text-[12px] tracking-[3px] text-cream placeholder:text-cream/70 focus:border-cream focus:outline-none xl:w-[100px]"
                />
                <button
                  type="submit"
                  className="h-[42px] bg-cream px-[22px] text-[12px] font-bold uppercase tracking-[3px] text-navy transition-opacity hover:opacity-90"
                >
                  subscribe
                </button>
              </form>
              <p className="mt-6 max-w-[222px] text-[12px] font-medium leading-[1.25] tracking-[3px]">
                by signing up you agree to receive marketing emails. you can unsubscribe at any time. see our{" "}
                <a href="/policies/privacy-policy" className="underline underline-offset-2">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-cream/10 py-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2 text-[11px] font-medium tracking-[3px] text-cream/80">
            <p>© {new Date().getFullYear()} benson boone.</p>
            <ul className="flex flex-wrap gap-x-[10px] gap-y-1">
              {policies.map((policy) => (
                <li key={policy.label}>
                  <a href={policy.href} className="hover:text-cream">
                    {policy.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex items-center gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} aria-label={social.label} className="block text-cream/80 hover:text-cream">
                  {social.circle ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                      <circle cx="12" cy="12" r="10" fill="currentColor" />
                      <path d={social.path} fill="var(--color-navy)" transform="translate(1 0)" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden>
                      <path d={social.path} />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
