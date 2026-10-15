import { siApplemusic, siSpotify, siYoutube, siYoutubemusic, type SimpleIcon } from "simple-icons";
import { streaming } from "@/data/site";

// Amazon Music's mark is itself a wordmark, so it's drawn as text + smile below instead.
const icons: Partial<Record<(typeof streaming)[number]["icon"], SimpleIcon>> = {
  spotify: siSpotify,
  applemusic: siApplemusic,
  youtube: siYoutube,
  youtubemusic: siYoutubemusic,
};

/** Row of grey streaming-service marks (icon + name), centred. */
export default function StreamingLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12 ${className}`} aria-label="Listen on">
      {streaming.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Listen on ${s.label}`}
            className="flex items-center gap-2 text-[#9a9a9a] transition-colors duration-300 hover:text-cream"
          >
            {icons[s.icon] ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 md:h-7 md:w-7" aria-hidden>
                  <path d={icons[s.icon]!.path} />
                </svg>
                <span className="text-[16px] font-bold leading-none tracking-[-0.02em] md:text-[20px]">{s.wordmark}</span>
              </>
            ) : (
              <span className="relative pb-1.5 text-[15px] font-bold lowercase leading-none tracking-tight md:text-[18px]">
                {s.wordmark}
                <svg viewBox="0 0 100 12" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="absolute bottom-0 left-0 w-[52%]" aria-hidden>
                  <path d="M4 3 Q50 14 92 3 M84 1 L93 3 L88 10" />
                </svg>
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
