# Tri-City staging A1 — Netlify draft deploy (2026-11-02/03)

## Setup
| | |
|---|---|
| Project |  (id d1c3ec3c-d50d-498e-b0cb-15fe1cbccfff), team thediablo |
| Deploy | Manual **draft** 6ae921d5dd698f1e5481ba6a: https://6ae921d5dd698f1e5481ba6a--wraptors-tricity-staging.netlify.app |
| Source | Local commit b6efb45 (includes the McLaren reorder f2b422c and the Guelph/London service-area work); not on GitHub yet |
| Isolation | No Git repo connected, no custom domain or alias, nothing published (project URL returns 404). Never deployed with  |
| Build |  with no CONTEXT, so every page has  |
| Staging-only header |  appended to  before upload; not in source, never on main. Netlify also adds its own  to draft URLs |
| Forms | Disabled (no Web3Forms keys); phone and email shown instead. Not tested here |

## Results (real Netlify HTTP responses)
| Check | Result |
|---|---|
|  (detail below) | **692/692 PASS** (local run is 693: the extra check scans the local dist/ folder for localhost URLs and only runs locally; it passed) |
| Pages in sitemap | 35, all 200 |
| noindex in **both** HTML meta and X-Robots-Tag header | 35/35 pages; also on 404 responses |
| Legacy URLs | 70/70 reach their expected target. 52 redirect hops, **all 301** (no 302/307/308); 8 intended 404s |
| 404s | Unknown paths (, , ) return 404 with the site's 404 page |
| Trailing slash |  and  301 to the slash URL |
| Canonicals, titles, descriptions, H1s, structured data, NAP, internal links | PASS (groups below) |
| sitemap.xml / robots.txt | 200; robots.txt  + production sitemap URL (intended for launch; staging is held out by noindex) |
| Assets | 198/198 referenced files return 200;  served  |
| Browser, 35 pages × 1440 / 834 / 390 | **105 loads, 0 issues** (no console errors, failed requests, broken images or horizontal overflow) |

Failed checks: **none**. Unverified: real form delivery (forms disabled), production-context indexing (A2 / launch only).

## Page count 33 → 35
The two new area pages from b6efb45,  and . They come from  in , which also drives the prerender route list and the sitemap. Live sitemap has both; each has its own title, description, canonical, single H1, Service + BreadcrumbList JSON-LD, and appears in the per-route groups (Indexing 33→35, Metadata 165→175, Structured data 117→125, NAP 66→70, Internal links 36→38).

---

## Verifier output: migration check — https://6ae921d5dd698f1e5481ba6a--wraptors-tricity-staging.netlify.app

Generated 2026-11-02T23:51:23.241Z by `node scripts/verify-migration.mjs --base https://6ae921d5dd698f1e5481ba6a--wraptors-tricity-staging.netlify.app --expect-noindex --report STAGING-A1.md`.

**692 passed, 0 failed.**

| Group | Checks | Passed | Failed |
|---|---|---|---|
| Sitemap | 2 | 2 | 0 |
| Robots | 2 | 2 | 0 |
| Routes | 69 | 69 | 0 |
| Metadata | 175 | 175 | 0 |
| Indexing | 35 | 35 | 0 |
| Content | 106 | 106 | 0 |
| Structured data | 125 | 125 | 0 |
| NAP | 70 | 70 | 0 |
| Internal links | 38 | 38 | 0 |
| Legacy URLs | 70 | 70 | 0 |

## Legacy URLs

| Result | Old URL → expected | Detail |
|---|---|---|
| PASS | `/ -> /` | got 200 / in 0 hop(s) |
| PASS | `/about-wraptors/ -> /about/` | got 200 /about/ in 1 hop(s) |
| PASS | `/franchises/ -> /franchise/` | got 200 /franchise/ in 1 hop(s) |
| PASS | `/contact-wraptors/ -> /book/` | got 200 /book/ in 1 hop(s) |
| PASS | `/articles/ -> /articles/` | got 200 /articles/ in 0 hop(s) |
| PASS | `/blog/ -> /learn/` | got 200 /learn/ in 1 hop(s) |
| PASS | `/services/ -> /services/` | got 200 /services/ in 0 hop(s) |
| PASS | `/locations/ -> /locations/` | got 200 /locations/ in 0 hop(s) |
| PASS | `/gallery/ -> /gallery/` | got 200 /gallery/ in 0 hop(s) |
| PASS | `/videos/ -> /videos/` | got 200 /videos/ in 0 hop(s) |
| PASS | `/faqs/ -> /faqs/` | got 200 /faqs/ in 0 hop(s) |
| PASS | `/footer/ -> 404` | got 404 after 0 hop(s) |
| PASS | `/services/vehicle-wrapping/ -> /services/wraps/` | got 200 /services/wraps/ in 1 hop(s) |
| PASS | `/services/paint-protection/ -> /services/ppf/` | got 200 /services/ppf/ in 1 hop(s) |
| PASS | `/services/window-tinting/ -> /services/tint/` | got 200 /services/tint/ in 1 hop(s) |
| PASS | `/services/auto-detailing/ -> /services/detailing/` | got 200 /services/detailing/ in 1 hop(s) |
| PASS | `/services/custom-interior/ -> /services/custom-interiors/` | got 200 /services/custom-interiors/ in 1 hop(s) |
| PASS | `/services/starlight-headliner/ -> /services/starlight/` | got 200 /services/starlight/ in 1 hop(s) |
| PASS | `/services/galaxy-ceilings/ -> /services/starlight/` | got 200 /services/starlight/ in 1 hop(s) |
| PASS | `/services/racing-stripes/ -> /services/stripes-decals/` | got 200 /services/stripes-decals/ in 1 hop(s) |
| PASS | `/services/decals/ -> /services/stripes-decals/` | got 200 /services/stripes-decals/ in 1 hop(s) |
| PASS | `/services/caliper-painting/ -> /services/caliper-painting/` | got 200 /services/caliper-painting/ in 0 hop(s) |
| PASS | `/services/wheel-painting/ -> /services/wheel-painting/` | got 200 /services/wheel-painting/ in 0 hop(s) |
| PASS | `/category/vehicle-wrap/ -> /learn/category/vehicle-wraps/` | got 200 /learn/category/vehicle-wraps/ in 1 hop(s) |
| PASS | `/category/custom-vinyl-wrap/ -> /learn/category/vehicle-wraps/` | got 200 /learn/category/vehicle-wraps/ in 1 hop(s) |
| PASS | `/category/uncategorized/ -> 404` | got 404 after 0 hop(s) |
| PASS | `/what-you-need-to-know-before-designing-a-vehicle-wrap/ -> /services/wraps/#commercial-wraps` | got 200 /services/wraps/#commercial-wraps in 1 hop(s) |
| PASS | `/5-things-you-might-not-know-about-vehicle-wraps/ -> /services/wraps/` | got 200 /services/wraps/ in 1 hop(s) |
| PASS | `/4-surprising-ways-custom-vinyl-wraps-can-boost-brand-awareness/ -> /services/wraps/#commercial-wraps` | got 200 /services/wraps/#commercial-wraps in 1 hop(s) |
| PASS | `/contact-wraptors -> /book/` | got 200 /book/ in 1 hop(s) |
| PASS | `/services/vehicle-wrapping -> /services/wraps/` | got 200 /services/wraps/ in 1 hop(s) |
| PASS | `/services/galaxy-ceilings -> /services/starlight/` | got 200 /services/starlight/ in 1 hop(s) |
| PASS | `/services/caliper-painting -> /services/caliper-painting/` | got 200 /services/caliper-painting/ in 1 hop(s) |
| PASS | `/services/racing-stripes -> /services/stripes-decals/` | got 200 /services/stripes-decals/ in 1 hop(s) |
| PASS | `/blog -> /learn/` | got 200 /learn/ in 1 hop(s) |
| PASS | `/services/decals -> /services/stripes-decals/` | got 200 /services/stripes-decals/ in 1 hop(s) |
| PASS | `/about-wraptors -> /about/` | got 200 /about/ in 1 hop(s) |
| PASS | `/services/wheel-painting -> /services/wheel-painting/` | got 200 /services/wheel-painting/ in 1 hop(s) |
| PASS | `/locations -> /locations/` | got 200 /locations/ in 1 hop(s) |
| PASS | `/faqs -> /faqs/` | got 200 /faqs/ in 1 hop(s) |
| PASS | `/franchises -> /franchise/` | got 200 /franchise/ in 1 hop(s) |
| PASS | `/what-you-need-to-know-before-designing-a-vehicle-wrap -> /services/wraps/#commercial-wraps` | got 200 /services/wraps/#commercial-wraps in 1 hop(s) |
| PASS | `/ufaq/what-is-a-vehicle-wrap/ -> /faqs/#what-is-a-vehicle-wrap` | got 200 /faqs/#what-is-a-vehicle-wrap in 1 hop(s) |
| PASS | `/ufaq/whats-the-difference-between-a-%c2%bd-%c2%bc-and-full-wrap/ -> /faqs/#whats-the-difference-between-a-half-quarter-and-full-wrap` | got 200 /faqs/#whats-the-difference-between-a-half-quarter-and-full-wrap in 1 hop(s) |
| PASS | `/ufaq/will-the-car-wrap-damage-my-paint/ -> /faqs/#will-the-car-wrap-damage-my-paint` | got 200 /faqs/#will-the-car-wrap-damage-my-paint in 1 hop(s) |
| PASS | `/ufaq/can-a-car-wrap-be-removed/ -> /faqs/#can-a-car-wrap-be-removed` | got 200 /faqs/#can-a-car-wrap-be-removed in 1 hop(s) |
| PASS | `/ufaq/will-you-wrap-a-leased-vehicle/ -> /faqs/#will-you-wrap-a-leased-vehicle` | got 200 /faqs/#will-you-wrap-a-leased-vehicle in 1 hop(s) |
| PASS | `/ufaq/how-do-i-care-for-my-car-wrap/ -> /faqs/#how-do-i-care-for-my-car-wrap` | got 200 /faqs/#how-do-i-care-for-my-car-wrap in 1 hop(s) |
| PASS | `/ufaq/are-car-wraps-applied-to-windows/ -> /faqs/#are-car-wraps-applied-to-windows` | got 200 /faqs/#are-car-wraps-applied-to-windows in 1 hop(s) |
| PASS | `/ufaq/if-the-company-information-on-my-vehicle-wrap-changes-can-it-be-replaced/ -> /faqs/#if-the-company-information-on-my-vehicle-wrap-changes-can-it-be-replaced` | got 200 /faqs/#if-the-company-information-on-my-vehicle-wrap-changes-can-it-be-replaced in 1 hop(s) |
| PASS | `/ufaq/will-you-pay-me-to-drive-my-car-with-someone-elses-advertising/ -> /faqs/#will-you-pay-me-to-drive-my-car-with-someone-elses-advertising` | got 200 /faqs/#will-you-pay-me-to-drive-my-car-with-someone-elses-advertising in 1 hop(s) |
| PASS | `/ufaq/is-there-a-guarantee-on-the-vehicle-wrap/ -> /faqs/` | got 200 /faqs/ in 1 hop(s) |
| PASS | `/ufaq/how-long-does-it-take-to-wrap-a-car/ -> /faqs/` | got 200 /faqs/ in 1 hop(s) |
| PASS | `/ufaq/do-you-wrap-anything-other-than-vehicles/ -> /faqs/` | got 200 /faqs/ in 1 hop(s) |
| PASS | `/ufaq/how-is-a-vehicle-wrap-designed/ -> /faqs/` | got 200 /faqs/ in 1 hop(s) |
| PASS | `/ufaq/how-are-car-wraps-printed/ -> /faqs/` | got 200 /faqs/ in 1 hop(s) |
| PASS | `/ufaq/how-do-you-wrap-a-vehicle/ -> /faqs/` | got 200 /faqs/ in 1 hop(s) |
| PASS | `/ufaq/what-is-a-vehicle-wrap -> /faqs/#what-is-a-vehicle-wrap` | got 200 /faqs/#what-is-a-vehicle-wrap in 1 hop(s) |
| PASS | `/ufaq/ -> /faqs/` | got 200 /faqs/ in 1 hop(s) |
| PASS | `/author/wtconline/ -> /` | got 200 / in 1 hop(s) |
| PASS | `/home/ -> /` | got 200 / in 1 hop(s) |
| PASS | `/contact/ -> /book/` | got 200 /book/ in 1 hop(s) |
| PASS | `/faq/ -> /faqs/` | got 200 /faqs/ in 1 hop(s) |
| PASS | `/about/ -> /about/` | got 200 /about/ in 0 hop(s) |
| PASS | `/feed/ -> 404` | got 404 after 0 hop(s) |
| PASS | `/comments/feed/ -> 404` | got 404 after 0 hop(s) |
| PASS | `/page/2/ -> 404` | got 404 after 0 hop(s) |
| PASS | `/home/financing-bg/ -> 404` | got 404 after 0 hop(s) |
| PASS | `/services/starlight-headliner/service-gallery-pic35/ -> 404` | got 404 after 0 hop(s) |
| PASS | `/wp-content/uploads/2023/06/financing-bg.jpg -> 404` | got 404 after 0 hop(s) |
