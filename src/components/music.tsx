"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { PreviewTrack } from "@/lib/previews";

/** Seconds of overlap when one song hands over to the next. */
const CROSSFADE = 3;
/** Faster fade used when the visitor skips manually. */
const SKIP_FADE = 1;
/** Key of the general play queue (album queues are keyed by album title). */
const MIX = "mix";

type Deck = { audio: HTMLAudioElement; gain: GainNode };

type MusicState = {
  track: PreviewTrack | null;
  /** Which queue is playing: "mix", or an album title while an album is selected. */
  queue: string;
  playing: boolean;
  /** 0–1 progress through the current clip. */
  progress: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Start (or resume) playback; call from a click so browsers allow audio. */
  play: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  /** Play only this album's songs, starting with `uri`. */
  playAlbum: (album: string, uri: string) => void;
  /** Go back to the general mix after the current song (keeps it playing). */
  leaveAlbum: () => void;
};

const MusicContext = createContext<MusicState | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside <MusicProvider>");
  return ctx;
}

/**
 * Plays Spotify preview clips through Web Audio so songs can crossfade:
 * two "decks" alternate, and near the end of each clip the next one fades in
 * while the current one fades out. "Next" always means the next song in the
 * active queue: the general mix, or the selected album's tracklist.
 */
export function MusicProvider({
  tracks,
  albumTracks,
  children,
}: {
  tracks: PreviewTrack[];
  albumTracks: Record<string, PreviewTrack[]>;
  children: React.ReactNode;
}) {
  const ctxRef = useRef<AudioContext | null>(null);
  const decks = useRef<Deck[]>([]);
  const active = useRef(0); // which deck is the "current" one
  const fading = useRef(false);
  const queueRef = useRef(MIX);
  const currentRef = useRef<PreviewTrack | null>(tracks[0] ?? null);

  const [current, setCurrent] = useState<PreviewTrack | null>(tracks[0] ?? null);
  const [queue, setQueue] = useState(MIX);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  const listFor = useCallback((key: string) => (key === MIX ? tracks : albumTracks[key] ?? tracks), [tracks, albumTracks]);

  /** The song `step` places away from the current one in the active queue (wrapping around). */
  const neighbour = useCallback(
    (step: number) => {
      const list = listFor(queueRef.current);
      if (!list.length) return null;
      const i = list.findIndex((t) => t.uri === currentRef.current?.uri);
      if (i < 0) return list[0]; // just switched queues: start at its top
      return list[(i + step + list.length) % list.length];
    },
    [listFor],
  );

  const setTrack = (t: PreviewTrack) => {
    currentRef.current = t;
    setCurrent(t);
  };

  // Build the audio graph lazily on the first click (browsers require a gesture).
  const ensureAudio = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const ctx = new AudioContext();
    decks.current = [0, 1].map(() => {
      const audio = new Audio();
      audio.crossOrigin = "anonymous"; // Spotify's CDN allows CORS, so Web Audio can process it
      audio.preload = "auto";
      const gain = ctx.createGain();
      ctx.createMediaElementSource(audio).connect(gain).connect(ctx.destination);
      return { audio, gain };
    });
    decks.current[0].audio.src = currentRef.current?.preview ?? "";
    ctxRef.current = ctx;
    return ctx;
  }, []);

  /** Fade from the current deck to the other one, loading `to` on it. */
  const crossfadeTo = useCallback((to: PreviewTrack, seconds: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    fading.current = true;
    const from = decks.current[active.current];
    const incoming = decks.current[1 - active.current];
    const now = ctx.currentTime;

    incoming.audio.src = to.preview;
    incoming.audio.currentTime = 0;
    incoming.gain.gain.cancelScheduledValues(now);
    incoming.gain.gain.setValueAtTime(0, now);
    incoming.gain.gain.linearRampToValueAtTime(1, now + seconds);
    void incoming.audio.play();

    from.gain.gain.cancelScheduledValues(now);
    from.gain.gain.setValueAtTime(from.gain.gain.value, now);
    from.gain.gain.linearRampToValueAtTime(0, now + seconds);
    window.setTimeout(() => {
      from.audio.pause();
      fading.current = false;
    }, seconds * 1000 + 50);

    active.current = 1 - active.current;
    setTrack(to);
  }, []);

  const play = useCallback(() => {
    if (!currentRef.current) return;
    const ctx = ensureAudio();
    void ctx.resume();
    const deck = decks.current[active.current];
    deck.gain.gain.setValueAtTime(1, ctx.currentTime);
    void deck.audio.play();
    // If paused mid-crossfade, resume the incoming deck too.
    if (fading.current) void decks.current[1 - active.current].audio.play();
    setPlaying(true);
    setOpen(true);
  }, [ensureAudio]);

  /** Start a specific track: crossfade if music is on, otherwise load it and play. */
  const start = useCallback(
    (to: PreviewTrack) => {
      if (ctxRef.current && playing) {
        if (to.uri !== currentRef.current?.uri) crossfadeTo(to, SKIP_FADE);
        return;
      }
      ensureAudio();
      const deck = decks.current[active.current];
      if (deck.audio.src !== to.preview) {
        deck.audio.src = to.preview;
        deck.audio.currentTime = 0;
      }
      setTrack(to);
      play();
    },
    [playing, crossfadeTo, ensureAudio, play],
  );

  const skip = useCallback(
    (step: number) => {
      const to = neighbour(step);
      if (to) start(to);
    },
    [neighbour, start],
  );
  const next = useCallback(() => skip(1), [skip]);
  const prev = useCallback(() => skip(-1), [skip]);

  const playAlbum = useCallback(
    (album: string, uri: string) => {
      const list = albumTracks[album];
      if (!list?.length) return;
      queueRef.current = album;
      setQueue(album);
      start(list.find((t) => t.uri === uri) ?? list[0]);
    },
    [albumTracks, start],
  );

  const leaveAlbum = useCallback(() => {
    if (queueRef.current === MIX) return;
    queueRef.current = MIX;
    setQueue(MIX);
  }, []);

  const toggle = useCallback(() => {
    if (!playing) return play();
    decks.current.forEach((d) => d.audio.pause());
    setPlaying(false);
  }, [playing, play]);

  // Watch the current clip: update progress, and start the crossfade near its end.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let shown = -1;
    const tick = () => {
      const audio = decks.current[active.current]?.audio;
      if (audio && audio.duration > 0) {
        // Only publish visible changes (~0.5% steps) so the page doesn't re-render every frame.
        const p = Math.round((audio.currentTime / audio.duration) * 200) / 200;
        if (p !== shown) {
          shown = p;
          setProgress(p);
        }
        if (!fading.current && audio.currentTime >= audio.duration - CROSSFADE) {
          const to = neighbour(1);
          if (to) crossfadeTo(to, CROSSFADE);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, crossfadeTo, neighbour]);

  // Release audio when the page unmounts.
  useEffect(
    () => () => {
      decks.current.forEach((d) => d.audio.pause());
      void ctxRef.current?.close();
    },
    [],
  );

  return (
    <MusicContext.Provider
      value={{ track: current, queue, playing, progress, open, setOpen, play, toggle, next, prev, playAlbum, leaveAlbum }}
    >
      {children}
    </MusicContext.Provider>
  );
}

/** Animated equaliser bars, like the sound toggle on the reference site. */
export function SoundBars({ playing }: { playing: boolean }) {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden>
      {[0.9, 0.5, 1, 0.65].map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full bg-current ${playing ? "animate-eq" : ""}`}
          style={{ height: playing ? undefined : `${h * 40}%`, animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
