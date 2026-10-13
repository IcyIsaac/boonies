"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { spotify } from "@/data/site";
import { useMusic } from "./music";

/**
 * Floating mini player for the crossfading preview queue. Clips are Spotify
 * previews, so it credits Spotify and links each song out to the full track.
 */
export default function SpotifyPlayer() {
  const { track, playing, progress, open, setOpen, toggle, next, prev } = useMusic();
  if (!track) return null;

  return (
    <aside
      aria-label="Music player"
      aria-hidden={!open}
      className={`fixed bottom-4 right-4 z-40 w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-2xl text-cream shadow-[0_20px_60px_rgba(0,0,0,.5)] transition-all duration-500 md:bottom-6 md:right-6 ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[120%] opacity-0"
      }`}
    >
      {/* Background tint crossfades with the song */}
      <AnimatePresence initial={false}>
        <motion.div
          key={track.uri}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${track.color}, #0a0a0a 85%)` }}
        />
      </AnimatePresence>

      <div className="relative p-3">
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <p className="text-[11px] uppercase tracking-[0.16em] text-cream/70">Preview · Spotify</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Hide player"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-cream/70 hover:bg-cream/10 hover:text-cream"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
              <path d="M2 2l8 8M10 2l-8 8" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black/40">
            <AnimatePresence initial={false}>
              {track.cover && (
                <motion.div
                  key={track.uri}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                  className="absolute inset-0"
                >
                  <Image src={track.cover} alt="" fill sizes="64px" className="object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={track.uri}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <a href={track.url} target="_blank" rel="noreferrer" className="block truncate text-[15px] font-semibold hover:underline">
                  {track.title}
                </a>
                <a href={spotify.url} target="_blank" rel="noreferrer" className="block truncate text-[13px] text-cream/70 hover:underline">
                  Benson Boone
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1">
            <IconButton label="Previous song" onClick={prev}>
              <path d="M6 5v14M19 5L9 12l10 7V5z" />
            </IconButton>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink transition-transform hover:scale-105"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                {playing ? <path d="M6 4h4v16H6zM14 4h4v16h-4z" /> : <path d="M7 4l13 8-13 8z" />}
              </svg>
            </button>
            <IconButton label="Next song" onClick={next}>
              <path d="M18 5v14M5 5l10 7-10 7V5z" />
            </IconButton>
          </div>
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-cream/20" aria-hidden>
          <div className="h-full rounded-full bg-cream" style={{ width: `${progress * 100}%` }} />
        </div>
        <a href={track.url} target="_blank" rel="noreferrer" className="mt-2 block text-center text-[11px] text-cream/60 hover:text-cream">
          Play the full song on Spotify
        </a>
      </div>
    </aside>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-cream/80 hover:bg-cream/10 hover:text-cream"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
    </button>
  );
}
