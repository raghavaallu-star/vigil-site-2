# Plant photography

Drop approved originals here as `originals/<slot-id>.jpg` (or .png/.webp/.tif), then run:

```bash
npm run photos
```

Slot ids, alt text, crop ratios and focal points live in `src/content/photos.ts`.
The script writes WebP variants to `public/photos/` and updates `src/content/photos.manifest.json`.
Commit both the variants and the manifest. Originals can stay out of git (see .gitignore).
