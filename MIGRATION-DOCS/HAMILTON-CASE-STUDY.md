# Case Study: Wraptors Hamilton (WordPress → Vite/React on Netlify)

The execution record of the first theDiablo migration, reconstructed from the Git history, `SEO-MIGRATION-AUDIT.md`, `SEO-URL-MAPPING.csv`, `MIGRATION-CHECK.md`, `LAUNCH-CHECKLIST.md` and the verification scripts. Status labels follow the system in `MIGRATION-PLAYBOOK.md`:

- **COMPLETED**: done, not yet tested
- **VERIFIED LOCALLY**: tested on a production-equivalent local build
- **VERIFIED ON HOSTING**: tested on the real host over HTTP
- **CLIENT APPROVAL REQUIRED**: needs a decision or fact from the client
- **NOT STARTED**

**Current state (2026-10-27):** the site is built and verified locally only. **No deploy, Netlify check, Search Console analysis, DNS change or post-launch monitoring has happened.** The live site is still the original WordPress install, untouched.

---

## 1. Project facts

| Item | Value |
|---|---|
| Client / location | Wraptors Hamilton, 325 Hilton Dr, Stoney Creek (Hamilton), ON. Postal code **under confirmation**, see §7. |
| Domain | `https://www.wraptorshamilton.com`, the same before and after. Many paths change (WordPress slugs → new routes), so for Google this is a **site move with URL changes** on the same domain; the Change of Address tool doesn't apply. |
| Project type | **A: migration of an existing live site** |
| Repository | `OneDrive/Documents/WRAPTORS PROJECT/Wraptors Hamilton`, own Git repo, branch `main`. Remote `origin` = `github.com/ahmadalamleh0/Wraptors-Hamilton` (added 2026-10-26). |
| Pushed state | `origin/main` = `a4cc6fc`, pushed 2026-10-26 at the client's request. Commits `eb9c2fe`, `10afde5`, `dfa218d` and this documentation are **local only**. |
| Source project | Copied from the Wraptors Dubai site (folder `Wraptors Demo`, remote `Wraptors-Demo`), which was not modified |

---

## 2. The original WordPress site (Phase 1 audit, 2026-10-27, read-only)

Full detail is in `SEO-MIGRATION-AUDIT.md` §3; per-URL data is in `SEO-URL-MAPPING.csv`.

- **Stack:** WordPress on Hostinger (`platform: hostinger` header), Yoast SEO, WP Rocket 3.13. Probably a shared install with Wraptors FTL: `robots.txt` lists `Sitemap: https://www.wraptorsftl.com/sitemap.xml`, and the homepage loads assets from `wraptorsftl.com`.
- **URL structure:** trailing-slash pretty permalinks (`/services/window-tinting/`). Posts at the root (`/<post-slug>/`), categories at `/category/<slug>/`. Host variants (`http://`, bare domain, `/index.php`) all 301 to `https://www.…/`.
- **Inventory:**
  - **28** URLs in the sitemaps: 22 pages, 3 posts, 2 categories, plus `/blog/`.
  - **+15** `/ufaq/<question>/` pages from the "Ultimate FAQ" custom type. These are noindex and only discoverable through the WordPress REST API.
  - **+1** empty, indexable `/category/uncategorized/`.
  - **+9** slash-less internal links that returned **200** (duplicates, canonicalised to the slash form).
  - **197** public media attachments: theme images only, no documents. Attachment pages redirect to the file.
- **SEO state:**
  - every page `index, follow` with a self-canonical
  - meta descriptions 0–39 characters
  - two H1s on service pages
  - no LocalBusiness schema
  - Gallery and Videos pages were empty shells (a broken Instagram feed and "Now Playing" placeholders)
- **Claims on the old site:** a $699 ceramic coating promotion, financing, and conflicting warranties (3-year in the FAQ, 5-year on the services hub, lifetime on tint). See the claims register in `SEO-MIGRATION-AUDIT.md` §0.5.

## 3. New site architecture

| Layer | Implementation |
|---|---|
| Framework | Vite 8 + React 19 + React Router 7 (SPA), GSAP for animation, `vite-plugin-pwa` (service worker), `vite-plugin-image-optimizer` |
| Location config | `src/config/location.js`: brand, domain (`SITE_URL`), NAP, coordinates, socials, SEO defaults, `UNCONFIRMED` list (printed as a build warning), `localBusinessSchema()` |
| Static HTML | `vite.config.js`: `locationHtmlPlugin` fills `index.html` SEO tokens and LocalBusiness JSON-LD; `robotsMetaPlugin` injects `noindex, nofollow` unless `CONTEXT === 'production'` |
| Prerender | `scripts/prerender.mjs`, run by `npm run build` after `vite build`. It boots `vite preview`, visits each route in headless Chromium (Playwright) and writes `dist/<route>/index.html`, plus `sitemap.xml`, `robots.txt` and `404.html`. 43 routes. |
| URLs | Trailing slash everywhere through `pagePath()`/`pageUrl()` in `src/lib/siteConfig.js`. Route definitions in `App.jsx` stay slash-less (React Router matches both). |
| Redirects | `public/_redirects` (Netlify), copied to `dist/` by Vite. Ends with `/* /404.html 404`. |
| Hosting config | `netlify.toml`: `npm run build`, publish `dist`, `NODE_VERSION = "22"`. `vercel.json` removed. |
| Content data | `src/data/`: `geoLocations.js` (10 area pages), `articles.js` (8 Learn articles), `serviceFaqs.js`, `faqs.js` (`/faqs/` + `FAQS_PENDING_APPROVAL`), `serviceLinks.js` |
| Legacy pages | `src/components/LegacyPages.jsx` + `SectionPage.jsx`: `/services/`, `/gallery/`, `/locations/`, `/videos/`, `/faqs/` |
| Verification | `scripts/verify-migration.mjs`: local Netlify emulation, or `--base <url>` for real HTTP |

**Route list (43):**
- `/`, `/about/`, `/book/`, `/franchise/`
- `/services/` plus 11 service pages
- `/faqs/`, `/gallery/`, `/locations/`, `/videos/`
- 10 `/areas/*`
- `/learn/`, 4 `/learn/category/*`, 8 `/learn/*` articles

---

## 4. Execution history by phase

Dates come from commit timestamps. Each commit's message holds the full detail.

### 4.1 Baseline and location setup: 2026-10-19 (COMPLETED; browser QA by the developer at the time)

| Commit | Change |
|---|---|
| `a21581e` | Unmodified copy of the Dubai site as the baseline |
| `7f34375` | Location values centralised in `src/config/location.js`; `index.html` SEO and LocalBusiness JSON-LD filled at build time; `UNCONFIRMED` build warning |
| `ce98f32` | Hamilton NAP, socials, optional WhatsApp, forms disabled until `VITE_WEB3FORMS_KEY` is set, Dubai media removed from view |
| `8ca3373` | 18 Dubai districts replaced by 10 Hamilton-area pages; sitemap/robots generated from the route list (hand-written Dubai copies deleted) |
| `7831d3b` | Learn hub rebuilt: 8 Ontario-focused articles. Tint-law content cites only HTA ss. 73–74. |
| `1429494` | QA: navbar/logo overlap, favicon/PWA icons regenerated from the Wraptors monogram (they were made from the Dubai coin) |
| `fa7099c` | Five old-site services added (detailing, interiors, stripes/decals, calipers, wheels); galaxy ceilings merged into Starlight |
| `6d679d8` | First `public/_redirects` (28 rules from the old sitemaps), dead links hidden, `LAUNCH-CHECKLIST.md` created |

### 4.2 Hamilton media and design: 2026-10-22 to 10-26 (COMPLETED; visual checks during the sessions)

- **`3b0d5ce`:** Hamilton car-meet hero video replaces the Dubai footage with "DUBAI" burned in.
- **`81ddee2`:** Hamilton satellite map still.
- **`f2c92df`:** 7 Hamilton Google reviews supplied by the client.
- **Design refinements:**
  - `fb39e64`–`c65e035`: services section, statement, footer and cards
  - `93e608e` and `a4cc6fc`: the Masterpieces gallery shows all 58 unique Hamilton project photos first, as 1080 px mozjpeg copies (35.7 MB → 9.9 MB). The `a4cc6fc` gallery was checked in the browser at 1440/834/390.

### 4.3 Review data correction: `eb9c2fe`, 2026-10-27 (VERIFIED LOCALLY at 390 px)

- The reviews bar showed **5.0 (581 reviews)**, which belonged to another location.
- The rating, **4.7**, was read from Hamilton's Google Maps listing.
- The count, **60**, comes from BookAutoServices, because Maps' limited view hides it. **CLIENT APPROVAL REQUIRED** to confirm.

### 4.4 Phase 1 SEO audit: 2026-10-27 (read-only, COMPLETED)

Method: robots.txt → sitemap index → crawl of all internal links (no redirect following) → WordPress REST API (types, pages, posts, categories, users, media, `ufaq`) → probes of WordPress defaults and host variants. The crawler used is preserved as `MIGRATION-DOCS/tools/legacy-crawl.py`.

Deliverables: `SEO-MIGRATION-AUDIT.md` and `SEO-URL-MAPPING.csv` (60 rows: 2 High, 10 Medium, 48 Low).

Key risks found:
1. Slash-less canonicals and sitemap vs Netlify's slash URLs
2. `vercel.json` catch-all rewrite (it would bypass all redirects and leave every page noindex on Vercel)
3. The production noindex guard
4. `/faqs/` and the 15 `/ufaq/` URLs going to 404
5. Weak commercial/fleet wrap intent, even though the GBP name includes "Commercial Wrap"
6. Postal code mismatch
7. Slogan H1s

### 4.5 Phase 2 fixes: `10afde5`, 2026-10-27 (VERIFIED LOCALLY)

| Decision | Reasoning |
|---|---|
| **Trailing slash everywhere** | The Netlify support guide says `<route>/index.html` is served at `/<route>/` and `/<route>` 301s to it. The old WordPress URLs also used slashes, so old URLs like `/services/caliper-painting/` keep working with no redirect. The alternative (`route.html` files) was rejected because the guide doesn't cover a `learn.html` file next to a `learn/` folder. |
| **Rebuild `/services/`, `/gallery/`, `/locations/`, `/videos/`, `/faqs/` as real pages** | They were in the old main menu on every page. Redirecting them to homepage fragments counts as a homepage redirect for Google. The pages reuse existing sections under the Learn header, so no new visual design was introduced. |
| **9 FAQ answers published, 6 held** | The 6 held answers state Hamilton-specific commitments (a 3-year warranty, 2–4 days, boats and buildings, in-house designers, onsite printing, apprenticeship). They sit in `FAQS_PENDING_APPROVAL`. |
| **`/ufaq/<id>/` → `/faqs/#<id>`** | Each old question lands on its own answer, which opens and scrolls into view (`FaqAccordion` + `ScrollToTop`). |
| **H1 = visible eyebrow + cinematic headline** | `display: contents` keeps the layout identical; positions were measured in the browser. The same technique as the Dubai site. |
| **`FaqAccordion` answers always in the DOM (`hidden`)** | Before this, no FAQ answer on any page was in the prerendered HTML. |
| **Commercial & Fleet Wraps section** | It gets a visible heading, an anchor `#commercial-wraps`, and title/description wording. |
| **`netlify.toml` added, `vercel.json` removed** | Netlify is the confirmed host. |
| **Postal code and map pin not changed** | They were added to `UNCONFIRMED` with the conflicting values instead. |

### 4.6 Final SEO preservation audit: `dfa218d`, 2026-10-27 (VERIFIED LOCALLY)

- The two old blog posts (written for businesses) now go to `/services/wraps/#commercial-wraps` instead of a consumer guide listing.
- `/articles/` (a press page) now goes to `/about/` instead of `/learn/`.
- The PPF FAQ now names "clear bra, rock guard, hood film".
- The footer links to `/faqs/`, which previously had no internal links at all.
- `SEO-MIGRATION-AUDIT.md` §0.5–0.6 add:
  - the page-by-page comparison and the claims register
  - the media review and the duplication/cannibalisation findings
  - the exact Search Console exports needed and the prioritised risks

---

## 5. Problems found and how they were resolved

| Problem | How it was found | Resolution | Status |
|---|---|---|---|
| Dubai content and media inherited (hero "DUBAI", coin favicon, districts, articles, reviews) | Review of the baseline | Commits in §4.1–4.2 | COMPLETED |
| Review count 581 from another location | User report | `eb9c2fe`: 4.7 / 60 | VERIFIED LOCALLY; count CLIENT APPROVAL REQUIRED |
| Canonicals and sitemap slash-less, while Netlify serves slash URLs | Phase 1 audit + Netlify docs | Trailing slash everywhere (`10afde5`) | VERIFIED LOCALLY (emulated); **not** on hosting |
| `vercel.json` rewrite would bypass redirects | Phase 1 audit | Removed (`10afde5`) | COMPLETED |
| 15 hidden `/ufaq/` URLs missing from the 28-URL inventory | WordPress REST API | Redirected (`10afde5`) | VERIFIED LOCALLY |
| FAQ answers absent from the static HTML | Phase 2 inspection of `FaqAccordion` | `hidden` instead of conditional render | VERIFIED LOCALLY |
| A first visit to `#anchor` URLs didn't scroll (React renders after the browser's jump) | Browser test of `/services/wraps/#commercial-wraps` | `ScrollToTop` hash effect | VERIFIED LOCALLY (390 and 1440) |
| Navbar active state would break with slash URLs | Code review | `pagePath()` normalisation | COMPLETED |
| Blog posts redirected against their intent | Final audit content comparison | Retargeted (`dfa218d`) | VERIFIED LOCALLY |
| Old robots.txt pointing at wraptorsftl.com | Phase 1 audit | New robots.txt lists only its own sitemap | VERIFIED LOCALLY |

---

## 6. Verification actually performed

| Check | Command | Result | Status |
|---|---|---|---|
| Production-context build | `CONTEXT=production npm run build` | 43/43 routes prerendered; build warns about 5 unconfirmed values | VERIFIED LOCALLY |
| Migration checks, production build | `node scripts/verify-migration.mjs --report MIGRATION-CHECK.md` | **633/633 pass**: 60/60 legacy URLs, 45 internal links, 43 routes (200 at the slash URL, one-hop 301 from slash-less), canonical/`og:url`, unique titles and descriptions, single H1, static text, JSON-LD, NAP, sitemap, robots | VERIFIED LOCALLY (emulation of Netlify's documented routing on `dist/`) |
| Preview indexing guard | `CONTEXT=deploy-preview npm run build` then `verify-migration.mjs --expect-noindex` | `noindex` on all 43 pages + 404 | VERIFIED LOCALLY |
| Lint | `npx eslint src scripts` | Clean | VERIFIED LOCALLY |
| Browser review (Playwright MCP against `vite preview`) | — | Tint hero layout measured (1440), commercial section and anchor (390), `/faqs/#…` deep link (1440), `/services/` (1440), `/locations/`, `/gallery/`, `/videos/`, `/faqs/` and `/services/` (390, no overflow, correct H1/title/canonical), footer FAQs link (1440). No console errors. **Phase 2 pages were not separately reviewed at 834.** | VERIFIED LOCALLY |
| Deploy preview / real Netlify HTTP | `verify-migration.mjs --base <preview> --expect-noindex` | — | **NOT STARTED** |
| Forms end to end | — | Web3Forms key not set; forms disabled | **NOT STARTED** |
| Search Console / Analytics baseline | — | No access during the project | **NOT STARTED** |
| DNS cutover, GSC submission, monitoring | — | — | **NOT STARTED** |

Note: `vite preview` doesn't apply `_redirects`, so legacy redirects were only checked by the emulation in `verify-migration.mjs`, never by a real server.

---

## 7. Remaining blockers and open work

**CLIENT APPROVAL REQUIRED**
1. Postal code: L8E 2N4 (the client, and the old site's own contact and locations pages) vs L8E 2N3 (Google listing, Yelp).
2. Map pin: Google's listing pin is 43.2299199, -79.7258246; the site uses 43.2300268, -79.7249631.
3. Review count (60, third-party source) and the assumed 5-star ratings on six review cards.
4. Business hours (not published anywhere).
5. The 6 held FAQ answers; the tint carbon film and lifetime warranty; the conflicting warranties; financing; the $699 promotion.
6. Network claims on the new site ("16 Locations · 4 Countries", "world's most iconic").
7. New visible copy: the Commercial & Fleet section, FAQ wording, legacy page intros.
8. Custom Builds page (the old homepage did list Brabus/Mansory body kits), the "Touch of Luxury" sub-brand, the franchise page copy.
9. Legal pages, store URL, a Hamilton emblem (from `LAUNCH-CHECKLIST.md`).

**NOT STARTED**
- Search Console exports (list in `SEO-MIGRATION-AUDIT.md` §0.5) and the cannibalisation decision (`/` vs `/areas/hamilton/` vs `/areas/stoney-creek/`).
- Netlify site creation, deploy preview verification, `VITE_WEB3FORMS_KEY`, form tests.
- Backups of the WordPress site and DNS records; coordination with whoever manages the shared install.
- DNS cutover, GSC sitemap submission, monitoring (24 h / 7 d / 30 d).
- Pushing commits `eb9c2fe`, `10afde5`, `dfa218d` and this documentation (awaiting instruction).

---

## 8. Reproducing the verification

```bash
cd "Wraptors Hamilton"
npm install                                # postinstall downloads Playwright Chromium for the prerender
npx eslint src scripts
CONTEXT=production npm run build           # never deploy this folder by hand
node scripts/verify-migration.mjs --report MIGRATION-CHECK.md
CONTEXT=deploy-preview npm run build
node scripts/verify-migration.mjs --expect-noindex
# after a Netlify deploy preview exists:
node scripts/verify-migration.mjs --base https://deploy-preview-<n>--<site>.netlify.app --expect-noindex
```

To add or change a legacy URL, edit `public/_redirects` **and** the `LEGACY` list in `scripts/verify-migration.mjs`, then update `SEO-URL-MAPPING.csv`.

## 9. History that could not be reconstructed

- **Pre-baseline history:** the Dubai project's history isn't in this repo (the baseline is a plain copy).
- **Phase 1 working files:** raw crawl CSV/JSON and API dumps were in a temporary scratch folder and aren't preserved. Their results are in the audit and the CSV, and the crawler is reproduced in `tools/legacy-crawl.py`. The 2023 blog posts' full text isn't stored in the repo.
- **How `6d679d8`'s claim was checked:** its message says redirect targets were verified, but the method isn't recorded.
- **2026-10-19 to 10-26 sessions:** the browser checks and client conversations from these dates aren't recorded beyond commit messages.
- **Account state:** whether a Netlify site or a Search Console property already exists for this project is unknown.
