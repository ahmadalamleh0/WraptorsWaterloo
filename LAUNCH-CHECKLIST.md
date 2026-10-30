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

- Opening hours aren't published anywhere, so none are shown.
- The Facebook, YouTube and TikTok links are the wider brand's accounts, as linked from the live site.
