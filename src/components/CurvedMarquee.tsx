"use client";

import { useEffect, useRef } from "react";
import { STAR_PATH } from "./ui";

const PHRASE = " NEW ALBUM  ★  ROOTS WORLD TOUR  ★  BEAUTIFUL THINGS  ★  ";
// Enough repeats that the text always covers the visible wave plus one phrase of scroll.
const TEXT = PHRASE.repeat(6);
/** Positions of the "★" placeholders in TEXT; a hand-drawn star is drawn over each one. */
const STAR_INDEXES = [...TEXT].flatMap((ch, i) => (ch === "★" ? [i] : []));

/** The wave the text rides on; it also forms the edge between the two sections. */
const WAVE = "M-200,330 C200,80 600,80 900,240 S1500,420 1900,200 S2400,60 2800,260 S3600,400 4200,200";
/** Scroll speed in SVG units per second (the viewBox is 2000 wide). */
const SPEED = 90;

/**
 * Section divider: text scrolling along a wave, with a transparent background.
 * It takes up no space itself; it floats on top of the boundary between the
 * section above and the one below.
 *
 * The loop wraps by exactly one phrase length (measured in px), so it's seamless,
 * and speed is time-based so it stays steady even if a frame runs late.
 * Hand-drawn stars sit on the ★ placeholders; their distance along the text is
 * measured once and each frame they're placed with a cheap point lookup.
 */
export default function CurvedMarquee() {
  const textPathRef = useRef<SVGTextPathElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const waveRef = useRef<SVGPathElement>(null);
  const starRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const textPath = textPathRef.current;
    const text = textRef.current;
    const wave = waveRef.current;
    if (!textPath || !text || !wave) return;

    const pathLength = wave.getTotalLength();
    let phraseLength = 0;
    let starOffsets: number[] = []; // distance from the text's start to each star's centre
    let offset = 0; // current startOffset, in SVG units (always between -phraseLength and 0)
    let frame = 0;
    let last = 0;

    const measure = () => {
      try {
        phraseLength = text.getSubStringLength(0, PHRASE.length);
      } catch {
        phraseLength = 0;
      }
      starOffsets = STAR_INDEXES.map((i) => {
        try {
          return text.getSubStringLength(0, i) + text.getSubStringLength(i, 1) / 2;
        } catch {
          return NaN;
        }
      });
    };

    const render = () => {
      textPath.setAttribute("startOffset", String(offset));
      starOffsets.forEach((d, n) => {
        const star = starRefs.current[n];
        if (!star) return;
        const at = offset + d;
        if (!Number.isFinite(at) || at < 0 || at > pathLength - 2) {
          star.style.visibility = "hidden";
          return;
        }
        const p = wave.getPointAtLength(at);
        const q = wave.getPointAtLength(at + 1);
        const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
        star.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle}) translate(0 -52)`);
        star.style.visibility = "visible";
      });
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0; // cap so a stalled tab doesn't jump
      last = now;
      if (phraseLength > 0) {
        offset -= SPEED * dt;
        if (offset <= -phraseLength) offset += phraseLength; // wrap by exactly one phrase: seamless
      }
      render();
      frame = requestAnimationFrame(tick);
    };

    measure();
    render();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) frame = requestAnimationFrame(tick);

    // Re-measure once the display font has loaded (glyph widths change) and on resize.
    let cancelled = false;
    const remeasure = () => {
      if (cancelled) return;
      measure();
      if (phraseLength > 0) offset = offset % phraseLength;
      render();
    };
    void document.fonts.ready.then(remeasure);
    window.addEventListener("resize", remeasure);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", remeasure);
    };
  }, []);

  return (
    // Zero-height and stacked above both neighbours; the wave is centred on the
    // boundary between them. Only clipped sideways so letter tops are never cut off.
    <section
      className="pointer-events-none relative z-10 h-0 overflow-x-clip overflow-y-visible"
      aria-label="American Heart, Wanted Man World Tour, Beautiful Things"
    >
      <svg
        viewBox="0 -40 2000 500"
        className="absolute left-0 top-0 block w-[160%] max-w-none -translate-x-[18%] -translate-y-1/2 md:w-full md:translate-x-0"
        aria-hidden
      >
        <defs>
          <path id="wave" ref={waveRef} d={WAVE} />
        </defs>
        {/* xml:space + white-space: pre keep every space, so character indexes match TEXT (Safari needs xml:space) */}
        <text ref={textRef} className="font-display" fontSize="150" fill="var(--cream)" xmlSpace="preserve" style={{ whiteSpace: "pre" }}>
          <textPath ref={textPathRef} href="#wave" startOffset="0">
            {[...TEXT].map((ch, i) =>
              ch === "★" ? (
                <tspan key={i} fill="transparent">
                  {ch}
                </tspan>
              ) : (
                ch
              ),
            )}
          </textPath>
        </text>
        {STAR_INDEXES.map((_, n) => (
          <g key={n} ref={(el) => void (starRefs.current[n] = el)} style={{ visibility: "hidden" }}>
            <g transform="rotate(-8) translate(-56 -56) scale(1.12)" strokeLinejoin="round" strokeLinecap="round">
              <path d={STAR_PATH} fill="none" stroke="var(--cream)" strokeOpacity="0.35" strokeWidth="18" />
              <path d={STAR_PATH} fill="var(--cream)" stroke="#0a0a0a" strokeWidth="6.5" />
            </g>
          </g>
        ))}
      </svg>
    </section>
  );
}
