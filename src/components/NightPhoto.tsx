import type { Tone } from "@/data/site";

/**
 * Stand-in for photography: a grainy, out-of-focus night scene with a blurred
 * figure, matching the hero reference. Swap for real photos when available.
 */
const tones: Record<Tone, string> = {
  ember:
    "radial-gradient(60% 45% at 35% 45%, rgba(232,120,60,.85), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(40,90,120,.8), transparent 70%), linear-gradient(160deg, #1a1430, #0b1020)",
  teal:
    "radial-gradient(55% 45% at 70% 40%, rgba(60,140,150,.85), transparent 70%), radial-gradient(45% 35% at 25% 75%, rgba(200,90,60,.6), transparent 70%), linear-gradient(160deg, #0d1a2a, #081018)",
  rose:
    "radial-gradient(55% 45% at 40% 35%, rgba(220,90,110,.8), transparent 70%), radial-gradient(50% 40% at 75% 75%, rgba(80,70,140,.7), transparent 70%), linear-gradient(160deg, #24101c, #0d0a16)",
  gold:
    "radial-gradient(60% 45% at 50% 40%, rgba(240,180,90,.85), transparent 70%), radial-gradient(45% 35% at 20% 80%, rgba(120,40,30,.7), transparent 70%), linear-gradient(160deg, #2a1a10, #120a08)",
  night:
    "radial-gradient(50% 40% at 30% 30%, rgba(60,80,150,.8), transparent 70%), radial-gradient(45% 35% at 75% 65%, rgba(190,80,60,.55), transparent 70%), linear-gradient(160deg, #0c1226, #05070f)",
};

export default function NightPhoto({ tone = "ember", figure = true, className = "" }: { tone?: Tone; figure?: boolean; className?: string }) {
  return (
    <div className={`grain relative overflow-hidden ${className}`} style={{ background: tones[tone] }} aria-hidden>
      {figure && (
        <div className="absolute bottom-[-10%] left-1/2 h-[85%] w-[38%] -translate-x-1/2 blur-[18px]">
          <div className="mx-auto h-[24%] w-[46%] rounded-full bg-black/85" />
          <div className="mx-auto -mt-[4%] h-[80%] w-full rounded-t-[45%] bg-black/85" />
        </div>
      )}
    </div>
  );
}
