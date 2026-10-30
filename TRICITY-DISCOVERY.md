# Wraptors Tri-City — discovery and inventory

Phases 1–2 of `MIGRATION-DOCS/MIGRATION-PLAYBOOK.md` for www.wraptorstricity.com, checked 2026-10-29. Read-only: nothing on the live site was changed.

**Project type:** A — replace an existing live WordPress site.
**Source project:** Wraptors Hamilton, commit `866d5e1` (code, components, forms and technical SEO only).

## 1. Hosting and access

| Item | Finding | Status |
|---|---|---|
| Host | WordPress (PHP 7.4.33) behind Hostinger's CDN (`server: hcdn`) | COMPLETED |
| Primary host | `https://www.wraptorstricity.com/` (200). `https://` bare domain and `http://www.` reach it in one hop; `http://` bare domain takes two (rechecked 2026-10-30) | COMPLETED |
| robots.txt | `Allow: /`, but its `Sitemap:` line points to **www.wraptorsftl.com/sitemap.xml** (another location's site) | Legacy bug, fixed on the new site (own sitemap) |
| Indexing | All 28 sitemap URLs `index, follow`, self-canonical (Yoast) | COMPLETED |
| Search Console, Analytics, GBP, DNS | No access | NOT STARTED: traffic-based decisions are unverified |

## 2. URL inventory

The sitemaps list 28 URLs; a crawl that follows internal links (no redirects followed) found 37, all 200 (the extra 9 are slash-less duplicates the old site serves). The REST API also exposes 15 `ufaq` FAQ entries and 202 media attachments.

| Group | URLs |
|---|---|
| Pages | `/`, `/about-wraptors/`, `/contact-wraptors/`, `/franchises/`, `/faqs/`, `/services/`, `/gallery/`, `/videos/`, `/articles/`, `/locations/`, `/footer/` (a theme page), `/blog/` |
| Services (11) | `/services/vehicle-wrapping/`, `/auto-detailing/`, `/window-tinting/`, `/paint-protection/`, `/custom-interior/`, `/starlight-headliner/`, `/racing-stripes/`, `/galaxy-ceilings/`, `/decals/`, `/caliper-painting/`, `/wheel-painting/` |
| Posts (3) | `/what-you-need-to-know-before-designing-a-vehicle-wrap/`, `/5-things-you-might-not-know-about-vehicle-wraps/`, `/4-surprising-ways-custom-vinyl-wraps-can-boost-brand-awareness/` |
| Categories (2) | `/category/custom-vinyl-wrap/`, `/category/vehicle-wrap/` |
| FAQ entries (15) | `/ufaq/<slug>/`: the same 15 questions as the other Wraptors WordPress sites |

Raw crawl output (`old_crawl.csv`, `old_pages.json`) was produced with `MIGRATION-DOCS/tools/legacy-crawl.py` and kept outside the repo.

**Redirect mapping: COMPLETED, VERIFIED LOCALLY (2026-10-30).** The inventory was re-crawled from Tri-City's own sitemaps, API and probes; the rules in `public/_redirects` and the 70 `LEGACY` checks in `scripts/verify-migration.mjs` come from that crawl, not from Hamilton's file. Details: `SEO-MIGRATION-AUDIT.md` and `SEO-URL-MAPPING.csv`.

## 3. Business details published on the live site

| Field | Live site (contact page) | Supplied by the client | Used |
|---|---|---|---|
| Name | Wraptors Tri City | Wraptors Tri-City | Wraptors Tri-City |
| Address | 745 Bridge St W #8, Waterloo, ON **N2V 2G6** | 2026-10-30: 745 Bridge St W #8, Waterloo, ON N2V 2G6, Canada | Confirmed form, with N2V 2G6 |
| Phone | 647.990.WRAP (9727) | +1 647-990-9727 | Both (`tel:+16479909727`) |
| Email | wrap@wraptorstricity.com | same | same |
| Maps link | goo.gl/maps/mFJGin4Qw8N3w4m97 → Google listing "Wraptors Tricity \| Tint \| Ceramic Coating \| 3m \| Wrap", pin 43.511926, -80.5237892 | — | Link and pin used, flagged |
| Instagram | instagram.com/wraptors.tricity | — | used |
| Facebook / YouTube / TikTok | wraptorstoronto / torontowraptors / @wraptors (brand accounts) | — | used |
| Hours, reviews, prices | Not published | — | none shown |

**CLIENT APPROVAL REQUIRED**
- **Postal code: resolved.** The client confirmed N2V 2G6 on 2026-10-30 (earlier: Google's listing differed and OpenStreetMap gave N2V 2A2).
- **Map pin:** the Google listing pin and OpenStreetMap's point for no. 745 are about 16 m apart. Confirm the pin marks #8.

## 4. Content notes

- **Homepage:** "Rated number one car boutique", "Biggest wrap shop with over 13 locations", promotions. These are unverified network claims and are not published.
- **FAQs:** the same 15 titles as Hamilton. The answer wording still needs comparing.
- **Press (`/articles/`):** the same 19 external links as Hamilton's old page (wider-brand coverage).
- **Service pages:** the same 11 services, and each page shows the three-step process "Contact Our Team / We Book You In / Pay When Completed".
- **Gallery and homepage feed:** an Instagram feed whose captions include `647.620.WRAP`, which is another location's number. Not carried over.
- **Legacy technical issues:**
  - 11 pages have two or more H1s.
  - 5 pages have no meta description.
  - robots.txt names another site's sitemap.
  - No LocalBusiness schema.

## 5. What the baseline copied

| Copied from Hamilton (`866d5e1`, tracked files only) | Not copied or replaced |
|---|---|
| React/Vite app, every component, animation and layout; Quote/Booking/Franchise forms with separate keys and the honeypot; prerender, sitemap/robots generator, noindex guard, `verify-migration.mjs`; `netlify.toml`, `_headers`; `MIGRATION-DOCS/`; brand media and brand-wide builds | `.git`, `node_modules`, `dist`, `.env` (none existed); Hamilton's 301 map and `LEGACY` list; area pages; Learn articles; Google reviews and rating; Hamilton builds (the gallery now uses the 30 Tri-City photos); satellite map still; audit, mapping and checklist docs; Hamilton contact details |
