# Migration check — local dist/ (Netlify emulation)

Generated 2026-11-02T21:23:57.745Z by `node scripts/verify-migration.mjs --report MIGRATION-CHECK.md`.

**657 passed, 0 failed.**

| Group | Checks | Passed | Failed |
|---|---|---|---|
| Sitemap | 2 | 2 | 0 |
| Robots | 2 | 2 | 0 |
| Routes | 65 | 65 | 0 |
| Metadata | 165 | 165 | 0 |
| Indexing | 33 | 33 | 0 |
| Content | 101 | 101 | 0 |
| Structured data | 117 | 117 | 0 |
| NAP | 66 | 66 | 0 |
| Internal links | 36 | 36 | 0 |
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
