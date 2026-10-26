# Vigil.AI marketing site

Marketing site for **Vigil.AI**, predictive reliability, energy optimization and operational excellence for manufacturing plants in cement, pharmaceuticals, oil & gas, steel and automotive.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Radix primitives, Framer Motion, Recharts and MDX.

## Quick start1

```bash
npm install
cp .env.example .env.local   # optional: forms log to the console without it
npm run dev                  # http://localhost:3000
```

| Script              | What it does                             |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Dev server with hot reload               |
| `npm run build`     | Production build (type-checks and lints) |
| `npm run start`     | Serve the production build               |
| `npm run lint`      | ESLint                                   |
| `npm run typecheck` | `tsc --noEmit`                           |
| `npm run format`    | Prettier (with Tailwind class sorting)   |
| `npm run test:e2e`  | Playwright QA suite (see [QA](#qa))      |

## Environment variables

All optional for local development. Copy `.env.example` to `.env.local` and fill in what you need.

| Variable                       | Purpose                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Public URL with no trailing slash. Used for canonical URLs, sitemap, robots and Open Graph. **Set this in production.** |
| `RESEND_API_KEY`               | [Resend](https://resend.com) API key for lead notification emails                                                       |
| `CONTACT_TO_EMAIL`             | Inbox(es) that receive leads; comma-separate multiple addresses                                                         |
| `CONTACT_FROM_EMAIL`           | Verified sender in Resend, e.g. `Vigil.AI <leads@yourdomain.com>`                                                       |
| `LEAD_WEBHOOK_URL`             | Optional. Each lead is also POSTed here as JSON (HubSpot, Zapier, Make, n8n, etc.)                                      |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics domain. Loaded only after the visitor accepts the cookie banner                                     |
| `NEXT_PUBLIC_GA_ID`            | Google Analytics 4 measurement ID (alternative to Plausible). Same consent gating                                       |

If none of the Resend variables are set, `/api/lead` logs each lead to the server console, so forms work locally. The cookie banner and the footer's "Cookie settings" link only appear when an analytics provider is configured.

## Editing content

All marketing copy lives in typed data files, not in JSX:

```
src/config/site.ts         brand name, tagline, contact details, navigation, CTA labels, UI strings
src/content/home.ts        home page sections (hero, gap tabs, why us, outcomes, plant coverage…)
src/content/modules.ts     product modules → /product/[slug]
src/content/agents.ts      AI agents → /agents/[slug]
src/content/architecture.ts platform architecture layers (animated diagram)
src/content/equipment.ts   12 plant areas (quarry → dispatch) → /equipment/[slug], plus cross-cutting asset classes
src/content/deployment.ts  deployment steps, starting points and capability ladder (/approach)
src/content/risks.ts       risks and mitigations (/approach)
src/content/solutions.ts   roles (/solutions)
src/content/pages.ts       copy for product overview, approach, about, contact, assessment, resources, 404
src/content/forms.ts       form labels, options, validation and status messages
src/content/mocks.ts       sample data shown in the illustrative product UI mocks
src/content/legal.ts       privacy, terms and cookie banner copy (DRAFT)
src/content/customers.ts   approved customer logos (EMPTY by default; section hidden while empty)
src/content/testimonials.ts approved testimonials (EMPTY by default; section hidden while empty)
src/content/resources/     MDX articles
```

### Adding a plant area or asset class

Add an entry to `plantAreas` or `assetClasses` in `src/content/equipment.ts`. The area page, process-map node, sitemap entry and OG image are generated automatically. Also add the link to `plantAreaLinks` in `src/config/site.ts` so it appears in the menu and footer.

### Adding a resource

1. Create `src/content/resources/<slug>.mdx` and start it with an exported `metadata` object. Copy the shape from an existing article; `type` must be one of `Blog`, `Case Study`, `Whitepaper`, `Webinar`, `Video`.
2. Import it in `src/content/resources/index.ts` and add it to the `resources` array.

The article gets its page, Open Graph image, sitemap entry and Article JSON-LD automatically.

### Truthfulness rules built into the site

- **Customers and testimonials:** the components exist, but they render nothing while their data files are empty. In place of a logo bar, the home page shows a "Built for cement" equipment strip. Add entries only with written approval.
- **Savings figures** appear only as target ranges with a † footnote: _"Target range, validated in baseline phase."_ The footnote text lives in `siteConfig.ui.targetFootnote`.
- **Product UI mocks** always render inside `MockFrame`, which carries an "Illustrative" tag. Their sample data in `src/content/mocks.ts` is invented.

## Project structure

```
src/
  app/              routes, sitemap.ts, robots.ts, opengraph-image.tsx, api/lead/route.ts
  components/
    ui/             button, section/heading, icon set, reveal, motion provider
    layout/         header (mega-menu), mobile drawer, footer, logo, consent + analytics
    sections/       hero, home sections, gap explorer, page hero, resource hub, legal page
    mocks/          product UI mocks (gauge, trend + anomaly band, alerts, work order, checklist…)
    diagrams/       architecture diagram, plant process map, deployment stepper, live traces canvas
    forms/          lead form (React Hook Form + Zod)
  content/          typed content (see above)
  config/site.ts    brand + navigation
  lib/              seo/JSON-LD, OG renderer, validators, email + webhook, rate limiter, utils
tests/              Playwright QA suite
```

## Lead pipeline (`/api/lead`)

1. **Rate limit:** 5 requests per IP per 10 minutes. This uses in-memory storage, which is fine on one instance. On Vercel, each serverless instance keeps its own counter, so for strict limits use a shared store such as Upstash Redis or Vercel KV (`src/lib/rate-limit.ts`).
2. **Spam checks:** a hidden honeypot field, plus a minimum fill time of 2.5 s. Requests caught by either get a silent `200` and are dropped.
3. **Validation:** the same Zod schema runs in the browser and on the server (`src/lib/validators.ts`).
4. **Delivery:** email via Resend and/or a POST to `LEAD_WEBHOOK_URL`. The request succeeds if at least one channel works.

## Industries

`src/content/industries.ts` defines the five industries (cement, pharma, oil & gas, steel, automotive). Each becomes `/industries/[slug]` (hero photo, challenges, process map, use cases, KPIs, agents, modules) with one page per process area at `/industries/[slug]/[area]`. Cement reuses the twelve detailed plant areas in `src/content/equipment.ts`; the old `/equipment/*` URLs redirect permanently to `/industries/cement/*`. Agents carry an `industries` tag (`"all"` for cross-industry agents).

To add an industry: add an entry (with `areas`) to `industries`, add two photo slots in `src/content/photos.ts`, drop the originals in `photos/originals/`, run `npm run photos`, and add the industry to `industryOptions` in `src/content/forms.ts`. Nav, footer, sitemap, tests and OG images pick it up automatically.

### Industry photographs and licensing

The ten industry photos are openly licensed works from **Wikimedia Commons** (CC BY 2.0–4.0 and CC BY-SA 2.5–4.0). Attribution is shown in captions on industry pages, as a note on the home page and in full on **`/credits`** (title, author, license and source link). Because some licenses are CC BY-SA, the cropped WebP variants in `public/photos/` are shared under the same license. Keep the `credit` field in `photos.ts` accurate if you replace any image, and prefer your own approved plant photography for launch.

## Interactive demo, savings estimate and case studies

- **`/demo`**: a four-step click-through on invented data: kiln health trend → AI alert → engineer logs a finding → root-cause view. Script and labels live in `src/content/demo.ts`.
- **`/roi`**: cement savings estimate calculator (clinker-based). Inputs, assumptions and the 5–8% / 5–10% bands are in `src/content/roi.ts`; the maths is a pure function in `src/lib/roi.ts`, unit-tested in `tests/roi.spec.ts`. Keep `roiBands` in sync with the outcomes band in `src/content/home.ts`.
- **Case studies**: MDX blocks `<CaseFacts>`, `<Metrics>`, `<BeforeAfterChart>` and `<PullQuote>` are available in any resource. Every block shows "Pending approval" for missing values. `src/content/resources/nagarjuna-pilot.mdx` is a ready-to-fill draft (`draft: true`): it is excluded from listings, routes and the sitemap. Preview it with `NEXT_PUBLIC_SHOW_DRAFTS=true npm run dev`, then set `draft: false` once the customer approves every figure and the quote.

## Plant photography

Real-photo slots with art-directed crops (different ratios for desktop and mobile) are defined in `src/content/photos.ts`: the About hero, a home-page band and one per plant area. Put originals in `photos/originals/<slot-id>.jpg`, set each slot's focal point, and run:

```bash
npm run photos
```

The script (sharp) writes WebP variants to `public/photos/` plus a blur placeholder, and updates `src/content/photos.manifest.json`. Until a slot has a photo, the home band and area bands render nothing and the About page shows its designed placeholder.

## Security

- **Headers** (`next.config.ts`): Content-Security-Policy, HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Cross-Origin-Opener-Policy` and a restrictive `Permissions-Policy`.
- **CSP trade-off**: pages are statically generated, so per-request nonces are not available. `'unsafe-inline'` is allowed for scripts (Next.js hydration data, JSON-LD) and styles (next/font, Framer Motion); all other sources are limited to this origin plus the optional analytics hosts. If you add a third-party script, add its host to the CSP.
- **`/api/lead`**: same-origin check, JSON content type required, 16 KB body cap before parsing, honeypot and minimum fill time, Zod validation, and rate limits of 5 per IP per 10 minutes and 3 per email per hour.
- **Dependencies**: `npm audit` reports 0 vulnerabilities. Zod is on v4, and Next's bundled PostCSS is pinned to a patched release via `overrides` in `package.json` (remove the override after upgrading to a Next release that ships it).

## Deploying to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repo. The framework preset is detected as Next.js; keep the default build settings.
3. Under **Settings → Environment Variables**, add at least `NEXT_PUBLIC_SITE_URL` (your production URL), plus the Resend variables and an analytics variable if you want them.
4. Deploy, then add your custom domain under **Settings → Domains**. Update `NEXT_PUBLIC_SITE_URL` to match and redeploy, because canonical URLs and the sitemap are generated at build time.
5. In Resend, verify your sending domain so `CONTACT_FROM_EMAIL` is accepted.

The site is statically generated except `/api/lead`, so it also runs on any Node host with `npm run build && npm run start`.

## QA

```bash
npx playwright install chromium        # first time only
npm run build && npm run start &       # or set PW_BASE_URL to a running server
npm run test:e2e
```

The suite does the following:

- Renders every route at 1440, 768 and 390 px and saves full-page screenshots to `qa-screenshots/`.
- Fails on console errors and horizontal overflow.
- Runs axe (WCAG 2.1 A/AA) on every route.
- Crawls every internal link for dead ends.
- Checks the custom 404, the keyboard mega-menu, the arrow-key tabs and the mobile drawer.
- Exercises the demo form end to end and checks that the API rejects bad payloads and swallows honeypot submissions.

Lighthouse on the home page, run against a local production build (Lighthouse 12):

| Run                        | Performance | Accessibility | Best Practices | SEO |
| -------------------------- | ----------- | ------------- | -------------- | --- |
| Desktop                    | 100         | 100           | 100            | 100 |
| Mobile (simulated slow 4G) | 85–87       | 100           | 100            | 100 |

Mobile Performance falls short of 90 because of simulated LCP: about 4 s under slow-4G throttling, compared with roughly 0.1 s observed. Expect better numbers behind Vercel's CDN with Brotli and HTTP/2, so re-run Lighthouse against the deployed URL.

## Replace before launch

- [ ] **Contact email** in `src/config/site.ts` (`contact.email` is `contact@example.com`)
- [ ] **Street address** and, optionally, a **phone number** (`contact.address`, `contact.phone`; phone stays hidden while empty)
- [ ] **LinkedIn / social URLs** (`social`)
- [ ] **`NEXT_PUBLIC_SITE_URL`** set to the real domain
- [ ] **Logo:** the wordmark and lens mark are original SVGs in `src/components/layout/logo.tsx`, `src/app/icon.svg` and `public/icon.svg`. Replace them if a professionally designed mark exists.
- [ ] **Plant photography:** add approved originals to `photos/originals/` and run `npm run photos` (see "Plant photography")
- [ ] **Legal text:** privacy, terms and cookie copy in `src/content/legal.ts` are drafts and need counsel review. Remove `draftNotice` afterwards.
- [ ] **Nagarjuna case study:** fill `src/content/resources/nagarjuna-pilot.mdx` and flip `draft` only after written approval
- [ ] **Customer logos and testimonials:** add to `src/content/customers.ts` / `testimonials.ts` only with written approval
- [ ] **Resend:** verified sending domain plus `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- [ ] **CRM webhook** (optional): `LEAD_WEBHOOK_URL`
- [ ] **Analytics:** `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` or `NEXT_PUBLIC_GA_ID`
- [ ] **Rate limiting:** move to a shared store if you expect real traffic (see above)
- [ ] **Resource authorship:** articles are credited to "Vigil.AI Team"; review the content and add named authors if preferred
- [ ] **Target ranges:** confirm the 5–8% / 5–10% figures and lever splits with leadership before publishing
