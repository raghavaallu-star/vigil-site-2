import type { PhotoSlot } from "./types";

/**
 * Real-photo slots with art-directed crops.
 *
 * 1. Put the original (JPG/PNG/WebP/TIFF, ideally 3000px+ wide) at photos/originals/<id>.<ext>
 * 2. Set `focus` to the point that must stay in frame (0–1 from left/top), and check the alt text.
 * 3. Run `npm run photos`. It writes WebP variants to public/photos/ and updates photos.manifest.json.
 *
 * Slots with no photo render nothing (or the designed placeholder on the About page).
 */

const wide = { desktop: { aspect: [21, 9] as [number, number] }, mobile: { aspect: [4, 3] as [number, number] } };
/** Industry hero: tall crop for the split page header, 4:3 for cards and mobile. */
const industryHero = { desktop: { aspect: [4, 5] as [number, number] }, mobile: { aspect: [4, 3] as [number, number] } };

export const photoSlots: PhotoSlot[] = [
  // Industry photography from Wikimedia Commons (CC BY / CC BY-SA). Credits render in captions and on /credits.
  {
    id: "industry-cement",
    where: "Cement industry page",
    alt: "Cement plant buildings and conveyors in a mountain valley",
    focus: { x: 0.5, y: 0.5 },
    crops: industryHero,
    credit: {
      title: "Exshaw Cement Plant (19068232255).jpg",
      author: "Jason Woodhead",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      source: "https://commons.wikimedia.org/wiki/File:Exshaw_Cement_Plant_(19068232255).jpg",
    },
  },
  {
    id: "industry-cement-2",
    where: "Cement Secondary industry page",
    alt: "Cement plant with preheater tower and silos below snow-covered mountains",
    focus: { x: 0.5, y: 0.3 },
    crops: wide,
    credit: {
      title: "Exshaw Cement Plant.jpg",
      author: "The Cosmonaut",
      license: "CC BY-SA 2.5 ca",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5/ca/deed.en",
      source: "https://commons.wikimedia.org/wiki/File:Exshaw_Cement_Plant.jpg",
    },
  },
  {
    id: "industry-pharma",
    where: "Pharma industry page",
    alt: "Stainless-steel bioreactor in operation in a pharmaceutical production suite",
    focus: { x: 0.5, y: 0.5 },
    crops: industryHero,
    credit: {
      title: "Bioreactor in operation.jpg",
      author: "Habin Zhang",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Bioreactor_in_operation.jpg",
    },
  },
  {
    id: "industry-pharma-2",
    where: "Pharma Secondary industry page",
    alt: "Pharmacy technician in cleanroom clothing preparing products",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
    credit: {
      title: "Assistant Pharmacist.jpg",
      author: "M Joko Apriyo Putro",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Assistant_Pharmacist.jpg",
    },
  },
  {
    id: "industry-oil-gas",
    where: "Oil Gas industry page",
    alt: "Oil refinery with distillation columns and steam plumes in front of mountains",
    focus: { x: 0.5, y: 0.5 },
    crops: industryHero,
    credit: {
      title: "Anacortes Refinery 31911.JPG",
      author: "Walter Siegmund (talk)",
      license: "CC BY 2.5",
      licenseUrl: "https://creativecommons.org/licenses/by/2.5",
      source: "https://commons.wikimedia.org/wiki/File:Anacortes_Refinery_31911.JPG",
    },
  },
  {
    id: "industry-oil-gas-2",
    where: "Oil Gas Secondary industry page",
    alt: "Aerial view of an oil refinery with storage tanks by the coast",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
    credit: {
      title: "Irving Oil Refinery - Saint John, NB.jpg",
      author: "Quintin Soloviev",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Irving_Oil_Refinery_-_Saint_John,_NB.jpg",
    },
  },
  {
    id: "industry-steel",
    where: "Steel industry page",
    alt: "Glowing hot steel slab moving through a rolling mill",
    focus: { x: 0.4, y: 0.55 },
    crops: industryHero,
    credit: {
      title: "Huta Pokój walcownia 2019 (2).jpg",
      author: "Adrian Tync",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Huta_Pok%C3%B3j_walcownia_2019_(2).jpg",
    },
  },
  {
    id: "industry-steel-2",
    where: "Steel Secondary industry page",
    alt: "Red-hot steel bar on the roller table of a rolling mill",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
    credit: {
      title: "Huta Pokój walcownia 2019 (4).jpg",
      author: "Adrian Tync",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Huta_Pok%C3%B3j_walcownia_2019_(4).jpg",
    },
  },
  {
    id: "industry-automotive",
    where: "Automotive industry page",
    alt: "Cars moving along a modern automotive assembly line",
    focus: { x: 0.5, y: 0.5 },
    crops: industryHero,
    credit: {
      title: "001 Car factory assembly line - Opel factory in Gliwice, Poland.jpg",
      author: "Marek Ślusarczyk (Tupungato) Photo portfolio",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      source: "https://commons.wikimedia.org/wiki/File:001_Car_factory_assembly_line_-_Opel_factory_in_Gliwice,_Poland.jpg",
    },
  },
  {
    id: "industry-automotive-2",
    where: "Automotive Secondary industry page",
    alt: "Car bodies on an assembly line with overhead equipment",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
    credit: {
      title: "Geely assembly line in Beilun, Ningbo.JPG",
      author: "Siyuwj",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      source: "https://commons.wikimedia.org/wiki/File:Geely_assembly_line_in_Beilun,_Ningbo.JPG",
    },
  },
  {
    id: "about-plant",
    where: "About page, hero",
    alt: "Cement plant kiln line with preheater tower",
    focus: { x: 0.5, y: 0.5 },
    crops: { desktop: { aspect: [4, 3] }, mobile: { aspect: [4, 5] } },
  },
  {
    id: "home-band",
    where: "Home page, full-width band after the platform section",
    alt: "Engineers inspecting equipment on a cement plant floor",
    focus: { x: 0.5, y: 0.5 },
    crops: { desktop: { aspect: [21, 8] }, mobile: { aspect: [4, 5] } },
  },
  {
    id: "area-quarry-crushing",
    where: "Quarry & Crushing page",
    alt: "Primary crusher and conveyor at a limestone quarry",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
  },
  {
    id: "area-raw-material-handling",
    where: "Storage & Handling page",
    alt: "Stacker-reclaimer on a raw material pre-blending bed",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
  },
  {
    id: "area-raw-grinding",
    where: "Raw Grinding page",
    alt: "Vertical roller mill in a cement plant raw grinding section",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
  },
  {
    id: "area-blending-kiln-feed",
    where: "Blending & Kiln Feed page",
    alt: "Raw meal blending silos",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
  },
  {
    id: "area-preheater-calciner",
    where: "Preheater & Calciner page",
    alt: "Preheater tower with cyclone stages",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
  },
  {
    id: "area-rotary-kiln",
    where: "Rotary Kiln page",
    alt: "Rotary kiln shell and support rollers",
    focus: { x: 0.69, y: 0.45 },
    crops: wide,
  },
  {
    id: "area-clinker-cooler",
    where: "Clinker Cooler page",
    alt: "Clinker cooler and cooling fans",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
  },
  { id: "area-coal-firing", where: "Coal Mill & Firing page", alt: "Coal mill and fine coal bins", focus: { x: 0.5, y: 0.5 }, crops: wide },
  {
    id: "area-cement-grinding",
    where: "Cement Grinding page",
    alt: "Cement ball mill in a grinding hall",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
  },
  {
    id: "area-packing-dispatch",
    where: "Packing & Dispatch page",
    alt: "Rotary packer filling cement bags",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
  },
  {
    id: "area-process-fans-dedusting",
    where: "Process Fans & Dedusting page",
    alt: "Kiln ID fan and bag filter house",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
  },
  {
    id: "area-utilities-power",
    where: "Utilities & Power page",
    alt: "Compressor house and waste heat recovery boiler",
    focus: { x: 0.5, y: 0.5 },
    crops: wide,
  },
];

/** Output widths per crop. Variants larger than the source are skipped. */
export const photoWidths = { desktop: [960, 1440, 1920, 2560], mobile: [480, 768, 1080] };

export function getPhotoSlot(id: string) {
  return photoSlots.find((p) => p.id === id);
}
