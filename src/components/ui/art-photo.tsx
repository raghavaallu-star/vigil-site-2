import manifest from "@/content/photos.manifest.json";
import { getPhotoSlot } from "@/content/photos";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Variant = { src: string; width: number };
type CropOut = { width: number; height: number; variants: Variant[] };
type Entry = { desktop: CropOut; mobile: CropOut; blur: string };

const photos = manifest as Record<string, Entry>;

export function hasPhoto(id: string) {
  return Boolean(photos[id]);
}

const srcSet = (vs: Variant[]) => vs.map((v) => `${v.src} ${v.width}w`).join(", ");

/**
 * Art-directed photo using pre-generated WebP variants from `npm run photos`.
 * By default it switches to the mobile crop below 768px; `crop` forces one crop
 * (e.g. "mobile" for 4:3 cards). Renders `fallback` until the slot has a photo.
 */
export function ArtPhoto({
  id,
  sizes = "100vw",
  className,
  priority = false,
  fallback = null,
  crop = "auto",
}: {
  id: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
  crop?: "auto" | "desktop" | "mobile";
}) {
  const slot = getPhotoSlot(id);
  const p = photos[id];
  if (!slot || !p) return <>{fallback}</>;
  const main = crop === "mobile" ? p.mobile : p.desktop;
  const largest = main.variants[main.variants.length - 1];
  return (
    <picture className={cn("block overflow-hidden", className)}>
      {crop === "auto" && <source media="(max-width: 767px)" type="image/webp" srcSet={srcSet(p.mobile.variants)} sizes={sizes} />}
      <source type="image/webp" srcSet={srcSet(main.variants)} sizes={sizes} />
      <img
        src={largest.src}
        width={main.width}
        height={main.height}
        alt={slot.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="h-full w-full object-cover"
        style={{ backgroundImage: `url(${p.blur})`, backgroundSize: "cover" }}
      />
    </picture>
  );
}

/** Attribution line for openly licensed photos: title, author, license. */
export function PhotoCredit({ id, className }: { id: string; className?: string }) {
  const c = getPhotoSlot(id)?.credit;
  if (!c) return null;
  return (
    <p className={cn("text-[0.7rem] leading-snug text-ink-600", className)}>
      {siteConfig.ui.photo}:{" "}
      <a href={c.source} className="underline underline-offset-2 hover:text-ink-950" rel="noopener noreferrer" target="_blank">
        {c.title.replace(/\.(jpe?g|png)$/i, "")}
      </a>{" "}
      {siteConfig.ui.photoBy} {c.author},{" "}
      <a href={c.licenseUrl} className="underline underline-offset-2 hover:text-ink-950" rel="noopener noreferrer license" target="_blank">
        {c.license}
      </a>
      , {siteConfig.ui.photoCropped}
    </p>
  );
}
