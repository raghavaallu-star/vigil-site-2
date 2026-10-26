/**
 * Generates art-directed WebP variants for every photo slot that has an original.
 *
 *   npm run photos
 *
 * Reads photos/originals/<slot-id>.(jpg|jpeg|png|webp|tif|tiff), crops each breakpoint
 * around the slot's focal point, writes public/photos/<id>-<crop>-<width>.webp and a tiny
 * blur placeholder, then rewrites src/content/photos.manifest.json.
 * Runs with Node's built-in TypeScript support (Node 22.6+).
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { photoSlots, photoWidths } from "../src/content/photos.ts";

const root = path.resolve(import.meta.dirname, "..");
const originalsDir = path.join(root, "photos/originals");
const outDir = path.join(root, "public/photos");
const manifestPath = path.join(root, "src/content/photos.manifest.json");
const exts = [".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"];

type Variant = { src: string; width: number };
type CropOut = { width: number; height: number; variants: Variant[] };
type Entry = { desktop: CropOut; mobile: CropOut; blur: string };

/** Largest rectangle of the given aspect that fits the image, centred on the focal point. */
function cropBox(w: number, h: number, [aw, ah]: [number, number], fx: number, fy: number) {
  let cw = w;
  let ch = Math.round((w * ah) / aw);
  if (ch > h) {
    ch = h;
    cw = Math.round((h * aw) / ah);
  }
  const left = Math.min(Math.max(Math.round(fx * w - cw / 2), 0), w - cw);
  const top = Math.min(Math.max(Math.round(fy * h - ch / 2), 0), h - ch);
  return { left, top, width: cw, height: ch };
}

mkdirSync(outDir, { recursive: true });
const files = existsSync(originalsDir) ? readdirSync(originalsDir) : [];
const manifest: Record<string, Entry> = {};
let made = 0;

for (const slot of photoSlots) {
  const file = files.find((f) => path.parse(f).name === slot.id && exts.includes(path.extname(f).toLowerCase()));
  if (!file) continue;
  const input = path.join(originalsDir, file);
  const img = sharp(input).rotate(); // honour EXIF orientation
  const meta = await img.metadata();
  const srcW = meta.autoOrient?.width ?? meta.width!;
  const srcH = meta.autoOrient?.height ?? meta.height!;

  const entry = { blur: "" } as Entry;
  for (const crop of ["desktop", "mobile"] as const) {
    const box = cropBox(srcW, srcH, slot.crops[crop].aspect, slot.focus.x, slot.focus.y);
    const widths = photoWidths[crop].filter((w) => w <= box.width);
    if (widths.length === 0) widths.push(box.width);
    const variants: Variant[] = [];
    for (const w of widths) {
      const name = `${slot.id}-${crop}-${w}.webp`;
      await sharp(input).rotate().extract(box).resize({ width: w }).webp({ quality: 78, effort: 5 }).toFile(path.join(outDir, name));
      variants.push({ src: `/photos/${name}`, width: w });
      made++;
    }
    const top = variants[variants.length - 1];
    entry[crop] = { width: top.width, height: Math.round((top.width * box.height) / box.width), variants };
    if (crop === "desktop") {
      const tiny = await sharp(input).rotate().extract(box).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
      entry.blur = `data:image/webp;base64,${tiny.toString("base64")}`;
    }
  }
  manifest[slot.id] = entry;
  console.log(`✓ ${slot.id} (${srcW}×${srcH})`);
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
const missing = photoSlots.filter((s) => !manifest[s.id]).map((s) => s.id);
console.log(`\n${made} WebP variants written for ${Object.keys(manifest).length} slot(s).`);
if (missing.length) console.log(`No original yet for: ${missing.join(", ")}`);
