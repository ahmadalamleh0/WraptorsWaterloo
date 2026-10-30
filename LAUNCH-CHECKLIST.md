# Wraptors Tri-City — launch checklist

Status labels follow `MIGRATION-DOCS/MIGRATION-CHECKLIST.md`. Findings behind each item: `TRICITY-DISCOVERY.md`.

## Blockers

| # | Item | Current state | Needed | Status |
|---|---|---|---|---|
| 1 | **Postal code** | Omitted: the live site has N2V 2G6, Google's listing differs, OpenStreetMap N2V 2A2 | The client confirms one → `address.postalCode` (and `display`) in `src/config/location.js` | CLIENT APPROVAL REQUIRED |
| 2 | **Map pin and Maps link** | From the live site's Google listing (43.511926, -80.5237892) | Confirm it marks Unit 8 | CLIENT APPROVAL REQUIRED |
| 3 | **Redirect map** | Not started: `_redirects` has only the 404 catch-all | Map all 28 sitemap URLs and 15 `/ufaq/` URLs (phase 8) | NOT STARTED |
| 4 | **Web3Forms keys** | Quote, Booking and Franchise forms are disabled (phone/email shown instead) | A Tri-City key (shop inbox wrap@wraptorstricity.com) and a franchise key in Netlify; never reuse Hamilton's or Dubai's | NOT STARTED |
| 5 | **Hero video** | Stand-in Wraptors car-meet footage (Toronto) | Tri-City footage | CLIENT APPROVAL REQUIRED |
| 6 | **Google reviews** | Section hidden | The client supplies Tri-City reviews, rating and count from the Google listing | NOT STARTED |
| 7 | **Legal pages / online store** | Hidden (none known; the store returned "unavailable" for another location) | Policies and a working store URL | NOT STARTED |
| 8 | **Search Console** | No access | Exports listed in the playbook (phase 3) | NOT STARTED |
| 9 | **Netlify** | No site | Staging per `MIGRATION-DOCS/NETLIFY-STAGING-PLAN.md`, only when approved | NOT STARTED |

## Forms setup

| Variable | Forms | Inbox to set in the Web3Forms dashboard |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | Quote (homepage, service pages) and Booking (`/book/`) | wrap@wraptorstricity.com |
| `VITE_WEB3FORMS_FRANCHISE_KEY` | Franchise (`/franchise/`) | Wraptors franchise team (to be confirmed) |

The values go in Netlify's environment variables only, and need a rebuild to take effect (Vite bakes `VITE_*` values in at build time).

## Business details to verify

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
