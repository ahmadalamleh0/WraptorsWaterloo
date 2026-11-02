# Wraptors Tri-City — launch checklist

Status labels follow `MIGRATION-DOCS/MIGRATION-CHECKLIST.md`. Findings behind each item: `TRICITY-DISCOVERY.md`.

## Prioritised remaining work (updated 2026-11-02)

Final local technical pass: `TRICITY-FINAL-TECHNICAL-REPORT.md` (verify 657/657, lint clean, 99 browser page loads clean, 33/33 mocked form checks).

SEO detail behind each item: `SEO-MIGRATION-AUDIT.md`. Nothing has been deployed; no item below is `VERIFIED ON HOSTING`.

### P0: launch blockers

| # | Item | Current state | Needed | Status |
|---|---|---|---|---|
| 1 | **Search Console baseline** | No access to Search Console, Analytics or backlink data; traffic decisions are unverified | Phase 3 exports (pages, queries, image search, indexing, links) for the www and domain properties, joined into `SEO-URL-MAPPING.csv`; any URL with traffic or links that isn't mapped gets a rule | NOT STARTED |
| 2 | **Netlify deploy preview** | No site. Local checks are complete; ready for isolated staging once approved | Staging per `MIGRATION-DOCS/NETLIFY-STAGING-PLAN.md`, **only when approved**; then `verify-migration.mjs --base <preview> --expect-noindex` and the checks in audit §8 (real 301s and 404s, percent-encoded FAQ URL, case variants) | NOT STARTED |
| 3 | **Web3Forms keys** | Quote, Booking and Franchise forms are disabled (phone/email shown instead) | A Tri-City key (shop inbox wrap@wraptorstricity.com) and a franchise key in Netlify; never reuse Hamilton's or Dubai's. Test delivery on the preview | NOT STARTED |
| 4 | **Map pin and Maps link** | From the live site's Google listing (43.511926, -80.5237892); about 16 m from OpenStreetMap's point for no. 745 | Confirm the pin marks #8 (the address itself is confirmed) | CLIENT APPROVAL REQUIRED |
| 5 | **Launch sign-off** | — | Written GO from the client; backups of the WordPress site; DNS records recorded; rollback owner (playbook phase 12) | NOT STARTED |

### P1: before launch if possible

| # | Item | Current state | Needed | Status |
|---|---|---|---|---|
| 6 | **New visible copy** | 3 area pages, 4 Learn guides, gallery model names and finish tags (sign-off table below); **the Waterloo Region sections on Wraps, PPF, Ceramic, Tint and Detailing and the homepage one-studio line** (`src/data/serviceLocal.js`, `SERVICE_AREAS_INTRO`; audit §10) | Client review | CLIENT APPROVAL REQUIRED |
| 7 | **Network total** | "16 Locations · 4 Countries" is shown again at the client's request (2026-10-30), but the section lists **15** locations (UAE 1, Canada 9, USA 4, South Africa 1). Per-country counts and "Countries" are derived from the listing; no location was added. The globe has markers for 12 of the 15 (none for Wraptors East, Waterloo, Kingston) | The client confirms the total (name the 16th location, or show 15) | CLIENT APPROVAL REQUIRED |
| 8 | **Hero video** | Stand-in Wraptors car-meet footage (Toronto) | Tri-City footage | CLIENT APPROVAL REQUIRED |
| 9 | **Google reviews** | Section hidden. The old homepage's 7 reviews include one for "Wraptors Toronto", so they aren't reused | The client supplies Tri-City reviews, rating and count from the Tri-City Google listing | NOT STARTED |
| 10 | **6 FAQ answers** | Held back; their old `/ufaq/` URLs land on `/faqs/` | Approve or rewrite each; then point its rule at the new anchor | CLIENT APPROVAL REQUIRED |
| 11 | **Custom Builds & Body Kits** | Page kept (old homepage listed Brabus/Mansory kits) | Still offered? | CLIENT APPROVAL REQUIRED |
| 12 | **Opening hours** | Not published (a window decal in the photos says Mon–Sat 10–6) | Confirmed hours → schema `openingHours` and Visit Us | CLIENT APPROVAL REQUIRED |

### P2/P3: after launch is fine

| # | Item | Status |
|---|---|---|
| 13 | Per-location `TRUST_COPY` for more unique area pages (audit §5.3); the service-page local sections are done (#6) | CLIENT APPROVAL REQUIRED (new copy) |
| 14 | Homepage hero (2026-11-02): slogan H1 "Crafted with purpose. / Built for legacy." restored at the client's request; only the label "Tri-City Studio · Waterloo, ON" above it is new | CLIENT APPROVAL REQUIRED (label only) |
| 18 | **Wider service area (2026-11-02)**: two new area pages, `/areas/guelph/` and `/areas/london/` (35 pages now); the Service Areas section names Brantford, Woodstock, Stratford, Milton, Fergus, Elmira, New Hamburg and Paris in one line, with "every appointment at the Waterloo studio, no mobile service"; site-wide JSON-LD `areaServed` lists all 13 places (`LOCATION.serviceArea`). No pages for Brantford or Milton (next to the Hamilton and GTA studios' areas), nor for Woodstock or Stratford (would repeat the London/Cambridge copy). Drive times ("about half an hour" Guelph, "a little over an hour" London) and road references need a check | CLIENT APPROVAL REQUIRED (new visible copy) |
| 15 | Legal pages / online store (hidden until they exist) | NOT STARTED |
| 16 | Map still image and Tri-City emblem (`media.mapImage`, `media.studioEmblem`) | NOT STARTED |
| 17 | "Built with the world's most iconic names" brand strip wording | CLIENT APPROVAL REQUIRED (low) |

### Done

| Item | Status |
|---|---|
| **Address and contact** (client, 2026-10-30): 745 Bridge St W #8, Waterloo, ON N2V 2G6, Canada · 647.990.WRAP (9727) · wrap@wraptorstricity.com · www.wraptorstricity.com. In the footer, Visit Us, `/book/`, `/locations/` and the LocalBusiness schema | VERIFIED LOCALLY |
| **Redirect map**: 68 rows in `SEO-URL-MAPPING.csv`; 70 legacy URLs pass in one hop or as a real 404 | VERIFIED LOCALLY |
| **Technical SEO**: titles, descriptions, H1s, canonicals, trailing slashes, internal links, breadcrumbs, sitemap, robots.txt, schema, prerendering; noindex on preview/branch/local builds only | VERIFIED LOCALLY (`MIGRATION-CHECK.md`, 657/657) |
| **Localhost URLs** removed from the build (hero videos, edition flag); the verifier fails any page or built file that contains one (2026-11-02) | VERIFIED LOCALLY |
| **`½ ¼` FAQ redirect** written with upper-case `%C2%BD` (Netlify ignores the lower-case form), plus an ASCII-prefix rule for raw UTF-8 requests (2026-11-02) | VERIFIED LOCALLY (confirm on the preview) |
| **Lint** clean (`npm run lint`) | VERIFIED LOCALLY |
| **Forms** (mocked; nothing sent): validation, error and retry states, honeypot, customer/franchise key separation, Tri-City subjects, service preselection; disabled with phone/email shown when no keys are set. Real delivery not tested | VERIFIED LOCALLY (33/33) |
| **Browser**: 33 pages at 1440/834/390, no console errors, failed requests, broken images or overflow | VERIFIED LOCALLY |
| Unverified `priceRange: "$$$"` removed from the schema | VERIFIED LOCALLY |
| Visible breadcrumbs + BreadcrumbList on all 11 service pages (in the hero text group) and the 3 area pages (replacing the back link) | VERIFIED LOCALLY (623/623; browser at 1440/834/390) |
| Old blog posts reviewed one by one; "5 things you might not know about vehicle wraps" → `/services/wraps/` (the other two stay on the commercial section) | VERIFIED LOCALLY |
| Global Locations, final treatment (all three sites, on request): deep-red globe pins and subtle red connection lines; headings, city names, bullets, HQ badge, active highlight, borders and stats in white/off-white; both stats in the two-column layout | VERIFIED LOCALLY |

## Forms setup

| Variable | Forms | Inbox to set in the Web3Forms dashboard |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | Quote (homepage, service pages) and Booking (`/book/`) | wrap@wraptorstricity.com |
| `VITE_WEB3FORMS_FRANCHISE_KEY` | Franchise (`/franchise/`) | Wraptors franchise team (to be confirmed) |

The values go in Netlify's environment variables only, and need a rebuild to take effect (Vite bakes `VITE_*` values in at build time).

## Business details to verify

- Address, phone and email: **confirmed by the client 2026-10-30** (see Done above). Only the map pin is still open.
- Address format: the 2026-11-02 brief writes "745 Bridge St W, Unit 8"; the site uses "#8" as on the live site. Same address; confirm which form matches the Google Business Profile.
- Opening hours aren't published on the live site; a window decal suggests Mon–Sat 10 am–6 pm (see below). None are shown.
- The Facebook, YouTube and TikTok links are the wider brand's accounts, as linked from the live site.

## Adaptation for Waterloo (2026-10-30): needs sign-off

| Item | What was done | Status |
|---|---|---|
| **Gallery** | All 30 photos in `tricity projects/`, grouped into 7 builds and shown first in both rows (inventory below), followed by 9 wider-brand builds. Originals untouched; 1080px web copies in `src/assets/projects/` | CLIENT APPROVAL REQUIRED (model names and finish tags) |
| **Area pages** | `/areas/waterloo/` (the studio), `/areas/kitchener/`, `/areas/cambridge/`: new copy, no township pages, no claim of a second location, pickup or mobile service | CLIENT APPROVAL REQUIRED (new visible copy) |
| **Learn** | 4 new guides that don't repeat Hamilton's: leased cars, matte/satin PPF, coating aftercare, the tint appointment. No prices, cure times, warranties or tint percentages | CLIENT APPROVAL REQUIRED (new visible copy) |
| **Opening hours** | The studio's window decal in two gallery photos reads "Monday – Saturday 10 am – 6 pm". **Not published** (a photo isn't confirmation) | CLIENT APPROVAL REQUIRED |
| **Custom Builds & Body Kits** | Page kept: the live Tri-City homepage lists "full brabus, mansory body kit installations" | CLIENT APPROVAL REQUIRED (still offered?) |
| **6 FAQ answers** | Held back (`FAQS_PENDING_APPROVAL` in `src/data/faqs.js`): warranty, wrap time, boats/buildings, in-house designers, onsite printing, apprentices | CLIENT APPROVAL REQUIRED |
| **Unpublished homepage claims** | "Rated number one", "biggest wrap shop with 16 locations", "9000+ vehicles wrapped / happy clients", "10+ years" | Not published (unverified) |

### Gallery inventory

| Build (card name) | Photos | Cover | Finish tag (as seen in the photos) |
|---|---|---|---|
| Chevrolet Corvette C7 | 5 (incl. interior) | Outside the studio | Black & red marble finish |
| Mercedes-AMG E 63 S | 6 | Outside the studio | Matte blue finish |
| Audi RS Q8 | 4 | Outside the studio | Matte grey finish |
| Classic Lincoln | 2 | Rear three-quarter | Gloss white finish (model not legible in the photos) |
| McLaren 720S | 5 (incl. interior) | Doors up outside the studio | Orange & black finish |
| Nissan Skyline R34 | 4 (incl. interior) | Outside the studio | Deep purple finish |
| Tesla Model Y | 4 | Outside the studio | Satin grey finish |

Tags describe the visible finish only, not whether it's a wrap, PPF or paint.
