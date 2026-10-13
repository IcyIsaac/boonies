"use client";

import {
  AnimatePresence,
  animate,
  motion,
  motionValue,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { albums, spotify, type Album } from "@/data/site";
import { useMusic } from "./music";
import { Arrow, Pill, Star } from "./ui";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/*
 * Stack geometry. Every record is viewed through its own perspective (no shared
 * vanishing point), so a record's on-screen size depends only on its tilt and
 * scale, and records never warp. Positions are derived from those real
 * projected sizes, so the open record always has clear space around it.
 */
const PERSPECTIVE = 2600; // px, per record; far away so the pile reads as one flat stack
const FLAT_TILT = 80; // degrees, a record lying in the stack (nearly edge-on, like a pile of plates)
const OPEN_TILT = 10; // degrees, the open record facing the viewer
const OPEN_SCALE = 0.94;
const GAP = 0.065; // centre-to-centre spacing of stacked records, × diameter
const PAD = 0.07; // clear space either side of the open record, × diameter
const EDGE = 0.04; // room above the top record, × diameter
const SHADOW = 0.16; // room below the stack for the open record's shadow, × diameter

/** Projected distance (px) from a record's centre to its top and bottom edge. */
function extents(tiltDeg: number, scale: number, w: number) {
  const r = (w / 2) * scale;
  const a = (tiltDeg * Math.PI) / 180;
  const y = r * Math.cos(a);
  const z = r * Math.sin(a); // positive tilt: bottom edge comes toward the viewer
  return { top: (y * PERSPECTIVE) / (PERSPECTIVE + z), bottom: (y * PERSPECTIVE) / (PERSPECTIVE - z) };
}

/** Tilt and scale of a record from how open it is and how far the section has scrolled in. */
const pose = (open: number, t: number) => ({
  tilt: lerp(FLAT_TILT, lerp(FLAT_TILT, OPEN_TILT, t), open),
  scale: lerp(1, lerp(1, OPEN_SCALE, t), open),
});

/**
 * Centre (px from the stage top) of every record, plus the total height used.
 * Stacked neighbours sit GAP apart; next to an open record the spacing grows to
 * exactly its projected edge + PAD + the neighbour's edge.
 */
function stackLayout(opens: number[], t: number, w: number) {
  const ext = opens.map((o) => {
    const p = pose(o, t);
    return extents(p.tilt, p.scale, w);
  });
  const margin = w * EDGE;
  const centres: number[] = [];
  let c = margin + ext[0].top;
  centres.push(c);
  for (let j = 0; j < opens.length - 1; j++) {
    const m = Math.max(opens[j], opens[j + 1]) * t;
    const clear = ext[j].bottom + w * PAD + ext[j + 1].top;
    c += lerp(w * GAP, clear, m);
    centres.push(c);
  }
  return { centres, height: c + ext[opens.length - 1].bottom + w * SHADOW };
}

/** Tallest the stack gets (fully scrolled in, any record open): the stage height. */
const stageHeight = (count: number, w: number) =>
  Math.max(...Array.from({ length: count }, (_, k) => stackLayout(Array.from({ length: count }, (_, i) => (i === k ? 1 : 0)), 1, w).height));

/** How far the section's scroll-in animation has opened things up (0–1). */
const scrollOpen = (s: number) => clamp01((s - 0.12) / 0.33);

/**
 * Vinyl section modelled on the reference site's music block: a giant
 * letter-by-letter heading and one stack of records. The chosen record opens in
 * place: records above it stay above, records below stay below, and it stands
 * up facing the viewer in the gap. Scrolling into the section opens it up;
 * clicking another record closes the old one and opens the new one.
 * Built with CSS 3D, no WebGL.
 */
export default function Discography() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [featured, setFeatured] = useState(0);
  const album = albums[featured];
  const music = useMusic();
  // This album is "in play" while its tracklist is the active queue.
  const albumActive = music.queue === album.title;
  const playingHere = music.playing && albumActive;

  // Album-only playback applies while the visitor is on this section; scrolling
  // away hands back to the general mix after the current song.
  const inView = useInView(ref, { amount: 0.15 });
  const { leaveAlbum } = music;
  useEffect(() => {
    if (!inView) leaveAlbum();
  }, [inView, leaveAlbum]);

  // Record diameter in px, derived from the stage width (kept in a motion value for the transforms).
  const [size, setSize] = useState(300);
  const sizeMv = useMotionValue(300);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    // Stage height is ~proportional to the record size; use that ratio to fit the stack in 85% of the window height.
    const heightPerPx = stageHeight(albums.length, 440) / 440;
    const update = () => {
      const byWidth = el.clientWidth * 0.86;
      const byHeight = (window.innerHeight * 0.85) / heightPerPx;
      const w = Math.max(220, Math.min(byWidth, byHeight, 440));
      setSize(w);
      sizeMv.set(w);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [sizeMv]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const bgY = useTransform(p, [0, 1], ["-8%", "8%"]);

  // One "open" amount per record (1 = standing open in the stack, 0 = lying flat).
  const opens = useRef(albums.map((_, i) => motionValue(i === 0 ? 1 : 0))).current;
  useEffect(() => {
    const controls = opens.map((mv, i) =>
      animate(mv, i === featured ? 1 : 0, { type: "spring", stiffness: 70, damping: 17, mass: 0.9 }),
    );
    return () => controls.forEach((c) => c.stop());
  }, [featured, opens]);

  const choose = (i: number) => {
    if (i === featured && albumActive) {
      music.toggle();
      return;
    }
    setFeatured(i);
    music.playAlbum(albums[i].title, albums[i].topTrack.uri);
  };


  return (
    <section id="music" ref={ref} className="relative overflow-hidden bg-cream pb-20 pt-10 text-ink md:pb-24 md:pt-14">
      {/* Faint record-player line drawing in the background */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-x-0 top-[12%] flex justify-center" aria-hidden>
        <TurntableArt className="w-[min(1100px,140vw)] text-ink/[0.07]" />
      </motion.div>

      {/* Side rails */}
      <div className="pointer-events-none absolute inset-y-0 left-4 hidden flex-col justify-between py-24 text-ink/30 md:flex" aria-hidden>
        <Star className="h-5 w-5" />
        <span className="text-[11px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Benson Boone</span>
        <Star className="h-5 w-5" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-4 hidden flex-col justify-between py-24 text-ink/30 md:flex" aria-hidden>
        <Star className="h-5 w-5" />
        <span className="rotate-180 text-[11px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Discography</span>
        <Star className="h-5 w-5" />
      </div>

      <div className="relative flex justify-center">
        <span className="rounded-full border border-ink px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]">Music</span>
      </div>

      <h2 className="font-display relative mt-5 px-4 text-center text-[clamp(30px,8.2vw,150px)] leading-[0.88]">
        <RisingWord text="Complete" />
        <RisingWord text="Discography" delay={0.15} />
      </h2>

      {/* Mobile: stage then caption. Desktop: caption | stage | hint */}
      <div className="relative mx-auto mt-2 grid max-w-[1300px] grid-cols-1 items-center gap-8 px-5 md:mt-4 md:px-10 wide:grid-cols-[minmax(0,1fr)_minmax(0,520px)_minmax(0,1fr)] wide:gap-10">
        <div
          ref={stageRef}
          className="relative order-1 mx-auto w-full max-w-[520px] wide:order-2"
          style={{ height: stageHeight(albums.length, size) }}
        >
          {albums.map((a, i) => (
            <StackRecord
              key={a.title}
              album={a}
              index={i}
              opens={opens}
              size={sizeMv}
              progress={p}
              spinning={i === featured}
              label={
                i === featured
                  ? `${playingHere ? "Pause" : "Play"} ${a.topTrack.title} from ${a.title}`
                  : `Show ${a.title} and play ${a.topTrack.title}`
              }
              onClick={() => choose(i)}
            />
          ))}
        </div>

        {/* Caption: beside the stack on desktop, below it on mobile */}
        <div className="order-2 mx-auto w-full max-w-[520px] min-w-0 wide:order-1 wide:mx-0 wide:max-w-none wide:justify-self-stretch wide:text-right">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={album.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="flex items-end gap-4 wide:flex-col-reverse wide:items-end wide:gap-5"
            >
              <a
                href={album.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${album.title}`}
                className="mb-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-300 hover:-rotate-45 wide:mb-0"
              >
                <Arrow />
              </a>
              <div className="min-w-0">
                <h3 className="font-display break-words text-[clamp(24px,2.6vw,42px)]">{album.title}</h3>
                <p className="mt-2 text-[13px] uppercase tracking-[0.18em] text-ink/70">{album.kind} • {album.year}</p>
                <p className="mt-1 text-[13px] uppercase tracking-[0.18em] text-ink/70">
                  {albumActive && music.track ? `${playingHere ? "Now playing" : "Paused"}: ${music.track.title}` : `Top song: ${album.topTrack.title}`}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="order-3 mx-auto w-full max-w-[520px] text-[12px] uppercase tracking-[0.18em] text-ink/50 wide:mx-0 wide:max-w-[18ch] wide:justify-self-start">
          Tap a record to play that album
        </p>
      </div>

      <div className="relative mt-12 flex justify-center md:mt-16">
        <Pill href={spotify.url} external variant="dark">
          Explore all discography
        </Pill>
      </div>
    </section>
  );
}

/**
 * One record in the stack. Its vertical position is the sum of the bands of the
 * records above it plus half its own band, where each band blends from GAP
 * (lying flat) to OPEN (standing open) by that record's open amount.
 */
function StackRecord({
  album,
  index,
  opens,
  size,
  progress,
  spinning,
  label,
  onClick,
}: {
  album: Album;
  index: number;
  opens: MotionValue<number>[];
  size: MotionValue<number>;
  progress: MotionValue<number>;
  spinning: boolean;
  label: string;
  onClick: () => void;
}) {
  const own = opens[index];
  const inputs = [...opens, progress, size] as MotionValue<number>[];

  const y = useTransform(inputs, (v: number[]) => {
    const w = v[opens.length + 1];
    const t = scrollOpen(v[opens.length]);
    const { centres } = stackLayout(v.slice(0, opens.length), t, w);
    return centres[index] - w / 2; // element top = visual centre minus half the diameter
  });
  const rotateX = useTransform([own, progress] as MotionValue<number>[], ([o, s]: number[]) => pose(o, scrollOpen(s)).tilt);
  const scale = useTransform([own, progress] as MotionValue<number>[], ([o, s]: number[]) => pose(o, scrollOpen(s)).scale);
  // Open record in front; in the stack, upper records overlap the ones beneath.
  const zIndex = useTransform(own, (o) => (o > 0.5 ? 50 : 40 - index));
  const width = useTransform(size, (w) => w);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute left-1/2 top-0 block rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      style={{ width, rotateX, y, scale, x: "-50%", zIndex, transformPerspective: PERSPECTIVE }}
    >
      <Record album={album} active={spinning} />
    </motion.button>
  );
}

/**
 * A vinyl disc. The active (open) record shows its cover as the centre label and
 * spins; records resting in the stack are greyed out with a plain label.
 */
function Record({ album, active }: { album: Album; active: boolean }) {
  return (
    <div
      className={`relative aspect-square w-full rounded-full transition-shadow duration-500 ${
        active ? "shadow-[0_14px_28px_rgba(0,0,0,.28)]" : "ring-2 ring-[#7d7d7d]"
      }`}
    >
      <div className={`absolute inset-0 rounded-full ${active ? "animate-spin-slow" : ""}`}>
        {/* grooves */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
            active
              ? "bg-[repeating-radial-gradient(circle_at_center,#141414_0_1.5px,#1d1d1d_1.5px_3px)]"
              : "bg-[repeating-radial-gradient(circle_at_center,#9a9a9a_0_1.5px,#a6a6a6_1.5px_3px)]"
          }`}
        />
        {/* light sheen */}
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_30deg,transparent_0deg,rgba(255,255,255,.14)_40deg,transparent_80deg,transparent_180deg,rgba(255,255,255,.1)_220deg,transparent_260deg)]" />
        {/* label: cover art when active, plain grey otherwise */}
        <div className={`absolute inset-[31%] overflow-hidden rounded-full ring-4 ${active ? "ring-black" : "bg-[#c4c4c4] ring-[#8d8d8d]"}`}>
          <AnimatePresence initial={false}>
            {active && (
              <motion.div key="cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <Image src={album.cover} alt="" fill sizes="200px" className="object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={`absolute left-1/2 top-1/2 h-[3%] w-[3%] -translate-x-1/2 -translate-y-1/2 rounded-full ${active ? "bg-cream" : "bg-[#7a7a7a]"}`} />
      </div>
    </div>
  );
}

/** Each letter slides up into place, staggered, when the heading enters view. */
function RisingWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="block overflow-hidden" aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "105%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, delay: delay + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/** Original line drawing of a record player, used as a faint backdrop. */
function TurntableArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 640" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
      <rect x="40" y="80" width="920" height="520" rx="36" />
      <rect x="70" y="110" width="860" height="460" rx="22" />
      <circle cx="430" cy="340" r="210" />
      <circle cx="430" cy="340" r="180" />
      <circle cx="430" cy="340" r="120" strokeDasharray="4 10" />
      <circle cx="430" cy="340" r="58" />
      <circle cx="430" cy="340" r="8" />
      <circle cx="800" cy="170" r="34" />
      <circle cx="800" cy="170" r="12" />
      <path d="M800 170 L840 420 Q845 460 800 490 L640 520" strokeLinecap="round" />
      <rect x="610" y="505" width="46" height="26" rx="6" transform="rotate(-12 633 518)" />
      <circle cx="160" cy="530" r="16" />
      <circle cx="210" cy="530" r="16" />
      <rect x="760" y="520" width="130" height="22" rx="11" />
      <path d="M90 600 v24 M910 600 v24" strokeLinecap="round" />
    </svg>
  );
}
