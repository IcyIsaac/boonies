"use client";

import { useState } from "react";
import { countries } from "@/data/site";
import {Reveal} from "./ui";

/** Demo signup form — validates locally and shows a confirmation; nothing is sent anywhere. */
export default function Newsletter() {
  const [done, setDone] = useState(false);

  const field =
    "h-14 w-full rounded-full border border-cream/40 bg-transparent px-6 text-[15px] text-cream placeholder:text-cream/50 focus:border-cream focus:outline-none";

  return (
    <section id="newsletter" className="relative overflow-hidden bg-ink py-28 md:py-36">
      <Reveal className="mx-auto grid max-w-[1300px] gap-12 px-5 md:grid-cols-2 md:px-10">
        <div>
          <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-cream/70">Subscribe to the newsletter</span>
          <h2 className="font-display mt-4 text-[clamp(44px,6.5vw,100px)] text-cream">
            Be the first
            <br />
            <span className="text-mustard">to know</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-[16px] text-cream/75">
            Presale codes, surprise drops and news from the road, straight to your inbox before anywhere else.
          </p>
        </div>

        {done ? (
          <div className="flex flex-col justify-center rounded-3xl bg-cream p-10 text-ink">
            <p className="font-display text-[34px]">You&apos;re in.</p>
            <p className="mt-3 text-[15px] text-ink/70">Watch your inbox for the next drop.</p>
          </div>
        ) : (
          <form
            className="flex flex-col justify-center gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label className="sr-only" htmlFor="nl-name">Name</label>
            <input id="nl-name" required placeholder="Name" className={field} />
            <label className="sr-only" htmlFor="nl-email">Email</label>
            <input id="nl-email" type="email" required placeholder="Email" className={field} />
            <label className="sr-only" htmlFor="nl-country">Country</label>
            <select id="nl-country" required defaultValue="" className={`${field} appearance-none`}>
              <option value="" disabled className="text-ink">Country</option>
              {countries.map((c) => (
                <option key={c} value={c} className="text-ink">{c}</option>
              ))}
            </select>
            <label className="mt-2 flex items-start gap-3 text-[13px] text-cream/70">
              <input type="checkbox" required className="mt-1 accent-[var(--cream)]" />
              I agree to receive emails about music, tours and merch. Unsubscribe any time.
            </label>
            <button type="submit" className="mt-2 h-14 rounded-full bg-oxblood text-[14px] font-semibold uppercase tracking-[0.15em] text-cream transition-colors hover:bg-brick">
              Subscribe
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
