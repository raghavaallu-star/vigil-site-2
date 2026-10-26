import { cn } from "@/lib/utils";

/**
 * Generative editorial artwork used in place of photography until real plant
 * images are available. Deterministic (seeded) so server and client markup match.
 *
 * - contours: topographic heat contours around a hotspot, like a kiln thermal map
 * - streams:  parallel signal lines with one drifting trace highlighted
 * - field:    a dot matrix whose dots grow toward a hotspot, like a heat map
 * - rings:    concentric lens rings, the "always watching" aperture
 */
export type ArtVariant = "contours" | "streams" | "field" | "rings";
export type ArtTone = "sand" | "ink" | "kiln";

const W = 800;
const H = 600;

function rng(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const tones: Record<ArtTone, { bg: [string, string]; line: string; accent: string; soft: string }> = {
  sand: { bg: ["#f3ece2", "#e9dfd1"], line: "#8a5a32", accent: "#d9711a", soft: "#c9a27c" },
  ink: { bg: ["#1b2533", "#0f1a26"], line: "#c9d1db", accent: "#f28c28", soft: "#5c6b7e" },
  kiln: { bg: ["#b8500c", "#7a3108"], line: "#fde0b8", accent: "#ffffff", soft: "#f8a54b" },
};

function Contours({ seed, t }: { seed: number; t: (typeof tones)[ArtTone] }) {
  const r = rng(seed);
  const cx = 480 + r() * 160;
  const cy = 250 + r() * 120;
  const lines = [];
  for (let k = 1; k <= 26; k++) {
    const base = k * 26;
    const pts: string[] = [];
    const ph = r() * Math.PI * 2;
    for (let a = 0; a <= 360; a += 6) {
      const th = (a * Math.PI) / 180;
      const wob = 1 + 0.12 * Math.sin(th * 3 + ph) + 0.06 * Math.sin(th * 5 + k * 0.4);
      pts.push(`${(cx + Math.cos(th) * base * 1.25 * wob).toFixed(1)},${(cy + Math.sin(th) * base * wob).toFixed(1)}`);
    }
    lines.push(
      <polygon
        key={k}
        points={pts.join(" ")}
        fill="none"
        stroke={k < 4 ? t.accent : t.line}
        strokeOpacity={k < 4 ? 0.9 : Math.max(0.1, 0.5 - k * 0.015)}
        strokeWidth={k < 4 ? 1.6 : 1}
      />,
    );
  }
  return (
    <>
      {lines}
      <circle cx={cx} cy={cy} r="6" fill={t.accent} />
    </>
  );
}

function Streams({ seed, t }: { seed: number; t: (typeof tones)[ArtTone] }) {
  const r = rng(seed);
  const rows = 22;
  const hi = 13;
  const out = [];
  for (let i = 0; i < rows; i++) {
    const y0 = 40 + i * 25;
    const ph = r() * 10;
    let d = "";
    for (let x = 0; x <= W; x += 10) {
      let y = y0 + Math.sin(x / 70 + ph) * 5 + Math.sin(x / 23 + ph * 2) * 2;
      if (i === hi && x > 480) y -= Math.pow((x - 480) / 320, 2) * 70;
      d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
    }
    out.push(
      <path
        key={i}
        d={d}
        fill="none"
        stroke={i === hi ? t.accent : t.line}
        strokeOpacity={i === hi ? 1 : 0.28}
        strokeWidth={i === hi ? 2 : 1}
      />,
    );
  }
  return (
    <>
      {out}
      <line x1="600" x2="600" y1="0" y2={H} stroke={t.accent} strokeOpacity="0.5" strokeDasharray="3 6" />
    </>
  );
}

function Field({ seed, t }: { seed: number; t: (typeof tones)[ArtTone] }) {
  const r = rng(seed);
  const hx = 520 + r() * 120;
  const hy = 260 + r() * 100;
  const dots = [];
  for (let x = 20; x < W; x += 28) {
    for (let y = 20; y < H; y += 28) {
      const d = Math.hypot(x - hx, y - hy);
      const s = Math.max(0.8, 7 - d / 55);
      const hot = d < 90;
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={s.toFixed(2)}
          fill={hot ? t.accent : t.line}
          fillOpacity={hot ? 0.9 : Math.max(0.15, 0.6 - d / 900)}
        />,
      );
    }
  }
  return <>{dots}</>;
}

function Rings({ seed, t }: { seed: number; t: (typeof tones)[ArtTone] }) {
  const r = rng(seed);
  const cx = 520 + r() * 60;
  const cy = 300;
  const out = [];
  for (let k = 0; k < 18; k++) {
    out.push(
      <circle
        key={k}
        cx={cx - k * 6}
        cy={cy}
        r={30 + k * 22}
        fill="none"
        stroke={k === 2 ? t.accent : t.line}
        strokeOpacity={k === 2 ? 1 : Math.max(0.12, 0.55 - k * 0.025)}
        strokeWidth={k === 2 ? 2 : 1}
        strokeDasharray={k % 3 === 1 ? "2 6" : undefined}
      />,
    );
  }
  return (
    <>
      {out}
      <circle cx={cx} cy={cy} r="12" fill={t.accent} />
    </>
  );
}

export function EditorialArt({
  variant = "contours",
  tone = "sand",
  seed = 7,
  className,
  label,
}: {
  variant?: ArtVariant;
  tone?: ArtTone;
  seed?: number;
  className?: string;
  /** Optional accessible description; artwork is decorative by default. */
  label?: string;
}) {
  const s = seed * 9301 + 49297;
  const t = tones[tone];
  const gid = `art-${variant}-${tone}-${seed}`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("block h-full w-full", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.bg[0]} />
          <stop offset="1" stopColor={t.bg[1]} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gid})`} />
      {variant === "contours" && <Contours seed={s} t={t} />}
      {variant === "streams" && <Streams seed={s} t={t} />}
      {variant === "field" && <Field seed={s} t={t} />}
      {variant === "rings" && <Rings seed={s} t={t} />}
    </svg>
  );
}
