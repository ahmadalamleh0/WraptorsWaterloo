# Wraptors Tri-City: SEO Migration Audit

**Scope:** replacing the live WordPress site at `https://www.wraptorstricity.com/` with the new Tri-City build in this repo.
**Audit date:** 2026-10-30 (read-only: GET requests only, nothing on the live site, WordPress, hosting or DNS was changed).
**Process:** `MIGRATION-DOCS/MIGRATION-PLAYBOOK.md`, phases 1–4, 8 and 9. Phases 10–14 (Netlify, launch, Search Console) are **NOT STARTED**.

**Companion files:**
- `SEO-URL-MAPPING.csv`: one row per old URL or URL pattern (68 rows): old metadata, action, new URL, risk, local verification result.
- `MIGRATION-CHECK.md`: pass/fail output of `node scripts/verify-migration.mjs` on the production-context build (623 checks, including 70 legacy URLs and the breadcrumb checks).

**Refinement pass (2026-10-30, §10):**
- Waterloo Region sections on the core service pages, plus a one-studio line on the homepage.
- Each old blog post reviewed; one retargeted.
- The unconfirmed "16 Locations" total removed.
- Breadcrumbs on the service and area pages.
- `LAUNCH-CHECKLIST.md`: blockers and approvals. `TRICITY-DISCOVERY.md`: business details and what was copied from Hamilton.

Status labels: `NOT STARTED`, `COMPLETED`, `VERIFIED LOCALLY`, `VERIFIED ON HOSTING`, `CLIENT APPROVAL REQUIRED` (playbook definitions). **Nothing here is `VERIFIED ON HOSTING`**: there is no Netlify site yet.

---

## 1. Summary

- The old site is a 2023 WordPress theme on Hostinger. Its 28 sitemap URLs, 15 hidden FAQ entries and 9 slash-less duplicates are all mapped. **Every old URL with content ends on its equivalent page in one hop, or is a real page again at the same URL.** Nothing is sent to the homepage except the two URLs the old site already sent there.
- Old content is **90–98% word-for-word identical to the old Hamilton site**. Waterloo appears only in the address block, so there was **no local-search copy to preserve**. The new site adds original Waterloo, Kitchener and Cambridge pages and four original guides.
- The old site carries contradictory, unverified claims (3-year vs 5-year vs lifetime warranty, 13 vs 16 locations, "rated number one", 9000+ vehicles, 10+ years, financing, a 5–7 year wrap lifespan, Toronto-location reviews). **None of them is published on the new site.**
- Contact details now match the client's confirmation of 2026-10-30: **745 Bridge St W #8, Waterloo, ON N2V 2G6, Canada · 647.990.WRAP (9727) · wrap@wraptorstricity.com**. The map pin is still unconfirmed.
- Search Console, Analytics and backlink data: **no access**. Every traffic-dependent decision is marked unverified.

## 2. Phase 1: discovery (2026-10-30)

| Item | Finding | Status |
|---|---|---|
| Platform | WordPress (Yoast SEO), theme pages dated 2023, `platform: hostinger`, `server: hcdn` | COMPLETED |
| Primary host | `https://www.wraptorstricity.com/` returns 200 | COMPLETED |
| Host variants | `https://wraptorstricity.com/` → www (1 hop). `http://www.` → https (1 hop). **`http://wraptorstricity.com/` takes 2 hops** (→ https bare → www). `/index.php` → `/`. | COMPLETED. On Netlify, setting www as primary with the bare domain as an alias should make each variant a single hop: check on hosting. |
| robots.txt | `Allow: /`, but **`Sitemap: https://www.wraptorsftl.com/sitemap.xml`**: another location's site | Legacy bug. The new robots.txt names only this site's sitemap (VERIFIED LOCALLY) |
| Sitemaps | `/sitemap.xml` and `/wp-sitemap.xml` 301 to `/sitemap_index.xml` → post (4), page (22), category (2) sitemaps = **28 URLs** | COMPLETED |
| Shared install | The FAQ meta description reads "FAQs - Wraptors FTL", and robots.txt points to wraptorsftl.com: the theme was cloned from the Fort Lauderdale site. Nothing indicates another site is served from this install. | Noted |
| Contact (old site) | 745 Bridge St W #8, Waterloo, ON N2V 2G6 · 647.990.WRAP (9727) · wrap@wraptorstricity.com. Maps link goo.gl/maps/mFJGin4Qw8N3w4m97 | Confirmed by the client 2026-10-30, except the pin |
| Hours, prices | Not published anywhere on the old site | — |
| Access | No Search Console, Analytics, Google Business Profile manager, DNS or hosting access | NOT STARTED (blocker for phase 3) |

## 3. Phase 2: URL inventory

Sources, reconciled:

| Source | Count | Notes |
|---|---|---|
| Sitemaps | 28 | 22 pages incl. `/footer/`, 4 post-sitemap entries (`/blog/` + 3 posts), 2 categories |
| REST API: pages | 23 | The 22 sitemap pages + homepage. All in the crawl. |
| REST API: posts | 3 | All in the crawl |
| REST API: categories | 3 | Adds **`/category/uncategorized/`** (0 posts, 200, indexable, not in the sitemap) |
| REST API: `ufaq` (custom type) | 15 | **Not in the sitemap**; each page is `noindex, follow` with no canonical. `ufaq-category` / `ufaq-tag`: 0 |
| REST API: users | 1 | `/author/wtconline/` → 301 to `/` on the old site |
| REST API: tags, menus | 0 / 401 | No tags; menus need authentication (not attempted) |
| REST API: media | 202 reported, 196 returned | 191 JPEG + 5 PNG theme images (2021-11 to 2023-06): service galleries, page headers, press thumbnails, app badges. **No PDFs or documents.** Attachment pages 301 to the image file. |
| Crawl (`legacy-crawl.py`, no redirects followed) | 54 | 45 seeds (sitemap + ufaq + uncategorized + author) + 9 slash-less duplicates found through internal links, which the old site served with a **200** (canonical to the slash URL) |
| Probes | 22 | `/feed/` and `/comments/feed/` 200 · `/page/2/` 200 · `/ufaq/` 200 · `/?s=` 200 · `/home/`, `/contact/`, `/faq/`, `/about/`, `?p=`, `?page_id=` 301 · `/wp-login.php` 404 · `/xmlrpc.php` 405 · `/ABOUT-WRAPTORS/` 200 |

Reconciliation: every API item is in the crawl or explained above.

**Legacy technical issues on the old site:**
- 12 indexable pages have 2+ H1s (homepage 4; each of the 11 service pages 2).
- 6 indexable URLs have no meta description (3 posts, 3 categories). The rest use the page title as the description.
- `/faqs/` has another location's description ("FAQs - Wraptors FTL").
- robots.txt points to another domain's sitemap.
- `/footer/` (a theme template) and `/category/uncategorized/` (empty) are indexable.
- No LocalBusiness schema.

## 4. Phase 3: Search Console baseline: NOT STARTED

No access. **Not treated as "no traffic"**: every risk below assumes a URL may have traffic or links. Needed before launch (playbook phase 3): Performance → Pages and Queries (16 months), Image search → Pages, Indexing → Pages, Links → Top linked pages / Top linking sites, for the `www` and domain properties. Join them into `SEO-URL-MAPPING.csv` by URL. The CSV's `gsc_*` and `backlinks` columns read "unverified (no Search Console access)" on every row.

## 5. Phase 4: content assessment

### 5.1 What the old content is

Each old page's text compared with the same URL on the old Hamilton site (crawled 2026-10-27), with brand names masked:

| Pages | Similarity |
|---|---|
| Services (11), service hub, FAQs, About, Franchises, Articles, Blog, 3 posts | 94–98% |
| Homepage | 90% (different review widget) |
| Contact, Gallery, Videos, Locations | 90–95% (NAP and feeds differ) |

"Waterloo" appears only in the address block (contact page, service-page footers, the network list on `/locations/`). Kitchener, Cambridge, Guelph and "Region" never appear. **There is no Tri-City-specific commercial or local copy to carry over.** The local value of the old site is its NAP, its URLs and any links and rankings they hold (unverified, section 4).

Search terms the old site used, all kept in the new titles and H1s: vehicle wraps/wrapping, auto detailing, window tint(ing), paint protection film (PPF), custom interior(s), starlight headliner, galaxy ceilings, racing stripes, decals, caliper painting, wheel painting, franchise, FAQs.

### 5.2 Claims register

| Claim | Where on the old site | New site |
|---|---|---|
| "Rated number one car boutique", "best car wrap company" | Home (H1s), About | Not published |
| "Biggest wrap shop with **16** locations" (home) vs "over **13** locations" (About, Services) | Home, About, Services | Not published. The inherited "Wraptors worldwide" section showed a "16 Locations" counter while listing 15 studios. **Removed on 2026-10-30**: no network total is shown until the client confirms one. The stats row now shows only "4 Countries", and the per-country counts are computed from the listing (1 / 9 / 4 / 1). The listing itself is unchanged |
| "World's largest and most experienced vehicle wrap shop" | Home, About | Not published. The inherited homepage brand strip says "Built with the world's most iconic names" (car brands, not a claim about Wraptors): CLIENT APPROVAL REQUIRED, low |
| Warranty: "full warranty of **3 years**" (FAQ) vs "our **5 year** warranty" (Services) vs "Wraptors **Lifetime** Guarantee Warranty, including fading" (Tint) | FAQs, Services, Tint | **Not published.** The FAQ answer is held in `FAQS_PENDING_APPROVAL` |
| "9000+ vehicles wrapped / 9000+ happy clients / 10+ years" | Home | Not published |
| "5+ years" (franchise), "over 10 years" (home) | Franchises, Home | Not published |
| "We do financing on all your car wraps" | Home | Not published |
| "Vinyl wrap can last 5–7 years", "after four years the shine may dull", "2–4 days" | Home, FAQ | Not published (durations unverified) |
| "Biggest range of colors in the business" | Wheel painting | Not published |
| "Celebrities, athletes and superstars" | Services | Not published |
| Brabus / Mansory body-kit installations | Home | `/services/custom-builds/` kept, CLIENT APPROVAL REQUIRED (still offered?) |
| Seven Google-style reviews (Nov 2025 – Feb 2026), one reading "Chose **Wraptors Toronto**" | Home | **Not published**: the source listing can't be confirmed as Tri-City's. The review section stays hidden until the client supplies Tri-City reviews. |
| Film brands: 3M, Avery, Hexis, SunTek, STEK, Teckwrap, Arlon, "Wraptors Premium Film" | About, footer strip | The new About names 3M, Avery Dennison, Hexis, SunTek and STEK (the partner logos), as on Hamilton |
| Franchise contact: 1081 Meyerside Dr, Mississauga, wrap@torontowraptors.com | Franchises | Not shown; the franchise form uses its own key (pending) |
| Instagram captions with 647.620.WRAP (another location's number) | Gallery feed | Not carried over |

New site, checked across all 33 prerendered pages: **no prices, warranties, durations, financing, review counts, ratings or statistics** in the visible text. The structured data has no `AggregateRating`, `Review` or `priceRange`. An inherited `priceRange: "$$$"` was removed on 2026-10-30, and a check now guards against it (VERIFIED LOCALLY).

### 5.3 Duplication with Hamilton and between area pages

Shared 8-word sequences in the visible main text of the new builds (city names masked):

| Pages | Shared with Hamilton's new site | Assessment |
|---|---|---|
| 4 Learn guides | 4–6% | Original |
| Area pages: Waterloo / Kitchener / Cambridge | 54% / 41% / 42% | Shared parts are the approved template (headings, `TRUST_COPY`, 3 shared "why" cards, 3 common FAQs). Local sections are original. |
| 11 service pages, About, FAQs, Press, Services hub | 96–100% | Brand copy; titles, descriptions and H1s are localised. **No regression**: the old Tri-City and Hamilton pages were already 94–98% identical. |

Between the three Tri-City area pages, 40–51% of 8-word sequences are shared, which is about half of each page's text. That's lower uniqueness than Hamilton's area pages (52–60% unique). There is no keyword overlap with Hamilton: Tri-City targets Waterloo, Kitchener and Cambridge, while Hamilton targets Hamilton and its own areas.

**Done 2026-10-30 (§10):** a Waterloo Region section on Wraps, PPF, Ceramic Coating, Window Tint and Detailing, and a one-studio line on the homepage. **Still optional:** making `TRUST_COPY` per-location if more area-page uniqueness is wanted. Not a launch blocker.

## 6. Phase 8: redirect map (COMPLETED, VERIFIED LOCALLY)

`public/_redirects` (Netlify), one hop to the final trailing-slash URL:

| Old | New | Why |
|---|---|---|
| `/`, `/services/`, `/services/caliper-painting/`, `/services/wheel-painting/`, `/faqs/`, `/gallery/`, `/locations/`, `/videos/`, `/articles/` | same URL (real pages) | Valuable URLs preserved; static files need no rule. `/articles/` stays the press page. |
| `/about-wraptors/` | `/about/` | Equivalent page; the H1 keeps "About Wraptors" |
| `/franchises/` | `/franchise/` | Equivalent page |
| `/contact-wraptors/`, `/contact/` | `/book/` | Contact intent: the page shows the full NAP and the booking form |
| `/blog/` | `/learn/` | Article hub |
| 9 renamed service URLs | `/services/wraps/`, `/ppf/`, `/tint/`, `/detailing/`, `/custom-interiors/`, `/starlight/` (×2: headliner, galaxy ceilings), `/stripes-decals/` (×2: racing stripes, decals) | Equivalent services |
| `/category/vehicle-wrap/`, `/category/custom-vinyl-wrap/` | `/learn/category/vehicle-wraps/` | Category → matching category |
| "What you need to know before designing a vehicle wrap", "4 surprising ways custom vinyl wraps can boost brand awareness" | `/services/wraps/#commercial-wraps` | Reviewed individually: both are written for business owners (logo placement, advertising, brand identity), so they go to the commercial & fleet section |
| "5 things you might not know about vehicle wraps" | `/services/wraps/` | Reviewed individually: a general post covering partial wraps, leased cars and fleet changes, so it goes to the Wraps page itself rather than its commercial section (changed 2026-10-30). Its useful points already exist on the new site: partial wraps on the Wraps page, the leased-car guide, and the wrap-removal FAQ. None of the three posts is republished; they're generic and shared word for word with Hamilton. |
| 9 `/ufaq/<slug>/` with approved answers | `/faqs/#<slug>` | Same answer, scroll target |
| 6 `/ufaq/<slug>/` awaiting approval, `/ufaq/`, `/ufaq/*` | `/faqs/` | Lands on the FAQ page; point each at its anchor once the answer is approved |
| `/author/wtconline/`, `/home/` | `/` | The old site already redirected these there |
| `/faq/` | `/faqs/` | The old site already redirected it |
| `/footer/`, `/category/uncategorized/`, `/feed/`, `/comments/feed/`, `/page/2/`, attachment pages, `/wp-content/uploads/*` | real 404 | No equivalent; redirecting them would create soft 404s. Google Images traffic unverified. |

Not redirected (Netlify ignores query strings unless a rule names them): `/?p=`, `/?page_id=`, `/?s=` serve the homepage, as on the old site. Low value.

Netlify behaviour relied on, checked in the Netlify docs on 2026-10-30 via Context7 ("Redirect options"):
- Trailing slashes are normalised before matching, so a rule and its slash-less form are the same rule.
- The first matching rule wins, so specific rules go before splats.
- Query parameters only match rules that name them.
- The docs don't say whether `/ufaq/*` also matches `/ufaq/`, so `/ufaq/` has its own rule.
- Static files shadow rules (playbook, 2026-10-27).

## 7. Phase 9: technical SEO (VERIFIED LOCALLY)

Build: `CONTEXT=production npm run build` → 33 prerendered routes, sitemap (33 URLs), robots.txt, 404.html. Check: `node scripts/verify-migration.mjs --report MIGRATION-CHECK.md` → **623/623 passed** after the refinement pass (576/576 before it), with Netlify's documented routing emulated on `dist/`.

| Requirement | Result |
|---|---|
| Unique titles and descriptions | 33/33 unique. Titles 33–68 characters; descriptions 97–163 characters (Learn categories shortest) |
| Visible H1 | Exactly one on every page. Services: "Wraptors Tri-City · <Service> <headline>". Areas: service + city. **Homepage H1 is the slogan "Crafted with purpose. Built for legacy."**, as on Hamilton (the title carries the keywords): CLIENT APPROVAL REQUIRED to change it, as it's visible design |
| Canonicals and `og:url` | Self-referencing absolute `https://www.wraptorstricity.com/<route>/` on all 33 |
| Trailing slashes | Every route is 200 at its slash URL; each slash-less form takes one 301 to it (65 checks). All 35 distinct internal links resolve directly with a 200 |
| Breadcrumbs | BreadcrumbList on every page except the homepage. **Service and area pages now have them (2026-10-30, §10).** The verifier checks every trail ends on its page's canonical and uses absolute trailing-slash URLs that resolve |
| LocalBusiness | `AutomotiveBusiness` on every page: name, phone `+16479909727`, street `745 Bridge St W #8`, Waterloo, ON, **N2V 2G6**, CA, geo, `hasMap`, areaServed. It matches the visible footer, Visit Us and `/book/`. No hours, rating or price range |
| Other schema | Article + FAQPage + BreadcrumbList on the 4 guides; FAQPage on `/faqs/` (answers in the static HTML); ItemList on `/services/`; Service on area pages |
| Sitemap | Generated from the route list at build time: 33 URLs, production domain, trailing slash, no redirects, no noindex pages |
| robots.txt | `Allow: /` + `Sitemap: https://www.wraptorstricity.com/sitemap.xml` only |
| Prerendered HTML | Every route has real text without JavaScript (≥150 words; ≥50 on form, listing and media pages) |
| Indexing guard | Production context: no `noindex` on any page. `CONTEXT=deploy-preview` and `branch-deploy` builds, and a build with no context: `noindex, nofollow` on every page (576/576 with `--expect-noindex` each) |
| 404 | Unknown paths fall to `/* /404.html 404` (emulated). **`vite preview` returns 200 for unknown paths** (SPA fallback); a real 404 needs a Netlify preview check |
| Other locations' details | No Hamilton, Dubai, Toronto or Fort Lauderdale contact details anywhere in `dist/` (searched) |

Browser check (`vite preview`, Playwright at 1440 / 834 / 390, 2026-10-30): home, `/book/`, `/locations/`, `/areas/kitchener/`, `/faqs/`, `/services/wraps/` and `/learn/category/vehicle-wraps/` showed no console errors and no horizontal overflow. The new address fits the footer and Visit Us at every width.

## 8. Not verifiable locally (check on a Netlify deploy preview)

Run `node scripts/verify-migration.mjs --base https://deploy-preview-<n>--<site>.netlify.app --expect-noindex --report PREVIEW-CHECK.md`, then check:
1. Each legacy rule's real 301 and one-hop behaviour, including the percent-encoded `/ufaq/whats-the-difference-between-a-%c2%bd-%c2%bc-and-full-wrap/`.
2. `/ufaq/` and `/ufaq/anything/` → `/faqs/`.
3. A real 404 status for unknown paths, `/footer/` and `/feed/`.
4. Case variants (`/ABOUT-WRAPTORS/`): the old site served them with a 200.
5. `X-Robots-Tag: noindex` on the preview, and the prerender step in the build log.
6. Forms with the real Tri-City and franchise keys (`LAUNCH-CHECKLIST.md`).
7. After cutover, the host variants: bare domain and http each reach `https://www.wraptorstricity.com/` in one hop.

## 9. Prioritised remaining work

See `LAUNCH-CHECKLIST.md` for owners and status.

## 10. Refinement pass (2026-10-30): COMPLETED, VERIFIED LOCALLY

**Tri-City vs Hamilton.** Measured as the share of 8-word sequences in the page text (navigation and footer excluded, city names masked) that don't appear on the same Hamilton page. "Before" is the same build with the new blocks removed:

| Page | Before | After | What was added |
|---|---|---|---|
| Homepage | 15% unique | 20% | Under "Service Areas": Tri-City works from one studio at 745 Bridge St W #8 and serves drivers from Waterloo, Kitchener, Cambridge and the townships |
| Vehicle Wraps | 3% | 20% | "Wrapped In Waterloo.": the one studio; commercial layouts for vehicles that work the 401, Conestoga Parkway and Highway 8 |
| PPF | 2% | 18% | "Built For Highway Kilometres.": where chips come from on local highways and winter roads; front-end coverage for commuters, lower panels for gravel township roads |
| Ceramic Coating | 2% | 16% | "Easier Through Salt Season.": what a coating does and doesn't do against road salt, sap and pollen; decontamination for cars arriving straight from winter |
| Window Tint | 4% | 24% | "Summer Sun, Winter Glare.": heat in open lots, glare off snow, and Ontario's Highway Traffic Act rules reviewed per window (no percentages stated) |
| Detailing | 3% | 21% | "After The Snow, Before The Next.": spring and fall detailing around salt season |

- **Copy:** in `src/data/serviceLocal.js` (rendered by `ServiceLocal`, just before the quote form, with links to the three area pages). The homepage line is `SERVICE_AREAS_INTRO` in `src/data/geoLocations.js`.
- **Kept as it was:** the technical explanations.
- **Not claimed:** no prices, durations, warranties, statistics, second studio, pickup or mobile service.
- **Status:** CLIENT APPROVAL REQUIRED (new visible copy).

**Blog redirects.** Each post was re-read; see §6. "5 things you might not know about vehicle wraps" now goes to `/services/wraps/`; the other two stay on `#commercial-wraps`.

**Location statistics.** The "16 Locations" counter is removed, per-country counts are derived from the listing, and the listing is unchanged (§5.2).

**Breadcrumbs.** A new `Breadcrumbs` component renders the visible trail and its BreadcrumbList from the same items.
- **Service pages:** "Home / Services / <service>" is the first line of the existing hero text group, above the "Wraptors Tri-City · <service>" eyebrow. It's small, low-contrast type with a soft shadow for light photos, so the hero layout is otherwise unchanged.
- **Area pages:** "Home / Locations / <area>" replaces the "All Service Areas" back link, in the same place and type style.
- **Checks:** the verifier requires a BreadcrumbList on every service and area page, and checks every trail ends on the page's canonical with final-form URLs.

**Also changed (all three sites, on request):** the Global Locations section's red accents became white or off-white. The commits are local in each repo.

**Verification:**
- `CONTEXT=production npm run build` and `node scripts/verify-migration.mjs` passed 623/623.
- ESLint is clean.
- Browser at 1440 / 834 / 390 (`vite preview` + Playwright): 5 local sections, service heroes with trails including a light-photo hero, an area hero, the homepage Service Areas line and the single-stat row all rendered with no console errors and no horizontal overflow.
