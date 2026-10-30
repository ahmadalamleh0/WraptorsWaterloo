# Wraptors Tri-City — launch checklist

Status labels follow `MIGRATION-DOCS/MIGRATION-CHECKLIST.md`. Findings behind each item: `TRICITY-DISCOVERY.md`.

## Prioritised remaining work (2026-10-30)

SEO detail behind each item: `SEO-MIGRATION-AUDIT.md`. Nothing has been deployed; no item below is `VERIFIED ON HOSTING`.

### P0: launch blockers

| # | Item | Current state | Needed | Status |
|---|---|---|---|---|
| 1 | **Search Console baseline** | No access to Search Console, Analytics or backlink data; traffic decisions are unverified | Phase 3 exports (pages, queries, image search, indexing, links) for the www and domain properties, joined into `SEO-URL-MAPPING.csv`; any URL with traffic or links that isn't mapped gets a rule | NOT STARTED |
| 2 | **Netlify deploy preview** | No site | Staging per `MIGRATION-DOCS/NETLIFY-STAGING-PLAN.md`, **only when approved**; then `verify-migration.mjs --base <preview> --expect-noindex` and the checks in audit §8 (real 301s and 404s, percent-encoded FAQ URL, case variants) | NOT STARTED |
| 3 | **Web3Forms keys** | Quote, Booking and Franchise forms are disabled (phone/email shown instead) | A Tri-City key (shop inbox wrap@wraptorstricity.com) and a franchise key in Netlify; never reuse Hamilton's or Dubai's. Test delivery on the preview | NOT STARTED |
| 4 | **Map pin and Maps link** | From the live site's Google listing (43.511926, -80.5237892); about 16 m from OpenStreetMap's point for no. 745 | Confirm the pin marks #8 (the address itself is confirmed) | CLIENT APPROVAL REQUIRED |
| 5 | **Network counter** | The inherited "Wraptors worldwide" globe (homepage, `/locations/`) shows "16 Locations · 4 Countries · Canada 9"; the old site said 13 in places and 16 in others | Confirm the numbers, or approve removing the counter | CLIENT APPROVAL REQUIRED |
| 6 | **Launch sign-off** | — | Written GO from the client; backups of the WordPress site; DNS records recorded; rollback owner (playbook phase 12) | NOT STARTED |

### P1: before launch if possible

| # | Item | Current state | Needed | Status |
|---|---|---|---|---|
| 7 | **New visible copy** | 3 area pages, 4 Learn guides, gallery model names and finish tags (sign-off table below) | Client review | CLIENT APPROVAL REQUIRED |
| 8 | **Hero video** | Stand-in Wraptors car-meet footage (Toronto) | Tri-City footage | CLIENT APPROVAL REQUIRED |
| 9 | **Google reviews** | Section hidden. The old homepage's 7 reviews include one for "Wraptors Toronto", so they aren't reused | The client supplies Tri-City reviews, rating and count from the Tri-City Google listing | NOT STARTED |
| 10 | **6 FAQ answers** | Held back; their old `/ufaq/` URLs land on `/faqs/` | Approve or rewrite each; then point its rule at the new anchor | CLIENT APPROVAL REQUIRED |
| 11 | **Custom Builds & Body Kits** | Page kept (old homepage listed Brabus/Mansory kits) | Still offered? | CLIENT APPROVAL REQUIRED |
| 12 | **Opening hours** | Not published (a window decal in the photos says Mon–Sat 10–6) | Confirmed hours → schema `openingHours` and Visit Us | CLIENT APPROVAL REQUIRED |

### P2/P3: after launch is fine

| # | Item | Status |
|---|---|---|
| 13 | A short Waterloo-specific section on the core service pages (wraps, PPF, tint, ceramic); per-location `TRUST_COPY` for more unique area pages (audit §5.3) | CLIENT APPROVAL REQUIRED (new copy) |
| 14 | Homepage H1 is the slogan, without service or city (as on Hamilton) | CLIENT APPROVAL REQUIRED (visible design) |
| 15 | Visible breadcrumbs + BreadcrumbList on service and area pages | CLIENT APPROVAL REQUIRED (visible design) |
| 16 | Legal pages / online store (hidden until they exist) | NOT STARTED |
| 17 | Map still image and Tri-City emblem (`media.mapImage`, `media.studioEmblem`) | NOT STARTED |
| 18 | "Built with the world's most iconic names" brand strip wording | CLIENT APPROVAL REQUIRED (low) |

### Done

| Item | Status |
|---|---|
| **Address and contact** (client, 2026-10-30): 745 Bridge St W #8, Waterloo, ON N2V 2G6, Canada · 647.990.WRAP (9727) · wrap@wraptorstricity.com · www.wraptorstricity.com. In the footer, Visit Us, `/book/`, `/locations/` and the LocalBusiness schema | VERIFIED LOCALLY |
| **Redirect map**: 68 rows in `SEO-URL-MAPPING.csv`; 70 legacy URLs pass in one hop or as a real 404 | VERIFIED LOCALLY |
| **Technical SEO**: titles, descriptions, H1s, canonicals, trailing slashes, internal links, sitemap, robots.txt, schema, prerendering; noindex on preview/branch/local builds only | VERIFIED LOCALLY (`MIGRATION-CHECK.md`, 576/576) |
| Unverified `priceRange: "$$$"` removed from the schema | VERIFIED LOCALLY |

## Forms setup

| Variable | Forms | Inbox to set in the Web3Forms dashboard |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | Quote (homepage, service pages) and Booking (`/book/`) | wrap@wraptorstricity.com |
| `VITE_WEB3FORMS_FRANCHISE_KEY` | Franchise (`/franchise/`) | Wraptors franchise team (to be confirmed) |

The values go in Netlify's environment variables only, and need a rebuild to take effect (Vite bakes `VITE_*` values in at build time).

## Business details to verify

- Address, phone and email: **confirmed by the client 2026-10-30** (see Done above). Only the map pin is still open.
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
