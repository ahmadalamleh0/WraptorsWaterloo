# Wraptors Tri-City: Final Technical Report

_2026-11-02. Final local completion pass on branch `master`. Nothing was pushed or deployed, no GitHub or Netlify project was created, and WordPress and DNS were not touched._

Every result here is **local**. Each one comes from the production build in `dist/`, checked by `scripts/verify-migration.mjs` (which emulates Netlify's routing), or from a browser run against `vite preview`. Nothing has been observed on Netlify yet; §4 lists what only real hosting can prove.

## Summary

| Check | Result |
|---|---|
| Production build (`CONTEXT=production npm run build`) | 33/33 routes prerendered |
| `node scripts/verify-migration.mjs` (production) | **657/657** (`MIGRATION-CHECK.md`) |
| `node scripts/verify-migration.mjs --expect-noindex` (preview build) | **657/657**, noindex on 33/33 pages |
| `npm run lint` | Clean (0 problems; was 73 errors and 6 warnings) |
| Browser pass, 33 pages at 1440 / 834 / 390 | 99 page loads, 0 console errors, 0 failed requests, 0 broken images, 0 horizontal overflow |
| Mocked form tests (Quote, Booking, Franchise) | **33/33** |
| Static scan of `dist/` | 575 asset references, 0 missing; 0 localhost URLs in 34 HTML files or any built text file |

## 1. Issues found and fixed

| # | Issue | Fix | Commit |
|---|---|---|---|
| 1 | **Localhost URLs in the build** (same bug Hamilton had). `new URL(…, import.meta.url).href` resolved against the prerender server, so `dist/index.html` and the main JS bundle carried `http://localhost:<port>/…` for the hero videos and the edition flag. | `location.js` now uses root-relative paths through `asset()`, as on Hamilton. The prerendered hero video is now `src="/assets/hero-carmeet-desktop-….mp4"`. | `666db6d` |
| 2 | **No check stopped localhost URLs** | The verifier now fails any page containing a `localhost` or `127.0.0.1` URL. It also scans every built text file (html, js, css, xml, txt, json, webmanifest, `_redirects`, `_headers`) for one with a port or path. The router library's bare `http://localhost` fallback has neither, so it isn't flagged. Tested by planting a fake URL in a page and in a JS file: both were caught (655/657), then removed. | `666db6d` |
| 3 | **The `½ ¼` FAQ redirect would fail on Netlify.** The rule used lower-case `%c2%bd`. On Hamilton's real Netlify draft, that form never matched, and the URL fell through to `/faqs/` without its anchor. The local check had passed it. | The rule is now written with upper-case `%C2%BD`, which matched upper-case, lower-case and slash-less requests on Netlify. An ASCII-prefix rule catches requests sent as raw UTF-8. The verifier now rejects lower-case-encoded or non-ASCII rules, as Netlify does; it failed before the fix and passes after. No other rule is affected. | `666db6d` |
| 4 | **Lint failed** (73 errors, 6 warnings). All of it came from three unused root files from the Dubai baseline (`quoteform.js`, `youtube_handle.js`, `youtube_handle - Copy.js`) and a missing `process` global in `vite.config.js`. `src/` had none. | Lint skips the three files (not deleted; nothing imports them). Node globals apply to the build config and scripts. Same change as Hamilton. | `666db6d` |

Visual changes requested during the pass (Hamilton and Tri-City; the hero copy on Dubai too): Services in the mobile footer starts below the boat (`7b3ed58`), and the hero has new service-led copy (`5a1564a`; see §2). Both were re-verified in the 657/657 run and the browser pass.

## 2. SEO verification (production build)

| Area | Result |
|---|---|
| **Routes** | 33 pages, the expected 33: home, about, book, franchise, services index and 11 services, FAQs, gallery, locations, videos, articles (press), 3 areas, Learn, 4 Learn categories and 4 guides. Each returns 200 at its trailing-slash URL; each slash-less form 301s to it in one hop. |
| **Metadata** | Every page has a unique title and a unique description of 50–165 characters. Its canonical is its own final URL, `og:url` matches, and it has exactly one H1. |
| **Headings** | Page content runs H1 → H2 with no skipped levels. The only skip (H2 → H4) is the shared footer's column headings, which are the same on all three sites; left as the approved design. |
| **Homepage H1** | Now "Vehicle wraps. PPF. Auto styling.", with the label "Tri-City Studio · Waterloo, ON" above it and a line naming Waterloo Region below. No ratings, reviews or rankings. This resolves checklist item 14 (the H1 was the slogan). |
| **Indexing** | Production: no robots meta on any page. Preview build: noindex on 33/33. Netlify also adds an `X-Robots-Tag: noindex` header to deploy-preview URLs (observed on Hamilton's draft); `public/_headers` sets none. |
| **Sitemap and robots.txt** | The sitemap holds 33 canonical, indexable URLs. robots.txt allows crawling and points to `https://www.wraptorstricity.com/sitemap.xml`. |
| **Structured data** | Every page has AutomotiveBusiness data with the confirmed name, address, phone and email. There is no priceRange, AggregateRating or Review, and the verifier fails any. Learn guides have Article, FAQPage and BreadcrumbList data; service and area pages have BreadcrumbList data. |
| **Area pages** | Waterloo has 841 words, Kitchener 818 and Cambridge 815. Every section is written separately for its city. Pairs share 43–49% of five-word phrases: the shared section headings ("Why … Drivers Choose Wraptors"), the same studio address in each FAQ, and the CTA. Each page links to 4 services, the other 2 areas, a Learn guide and the quote form (`/#cta`, 4 links). |
| **Learn guides** | Each of the 4 links to its own service page, 2–3 related guides, `/areas/waterloo/` and the quote form (3 links each). Each is at least 150 words of prerendered text. |
| **Service pages** | Wraps, PPF, Ceramic, Tint and Detailing each have their Waterloo Region section (Kitchener and Cambridge named). The 6 smaller services mention Waterloo in their title and body. No page implies mobile service. |
| **Leftovers** | No Hamilton or Dubai address, phone, email or domain anywhere. The remaining "Dubai"/"Hamilton" mentions are the Global Locations list and press headlines. |
| **Claims** | No prices, % off, financing offers, ratings, "#1", years in business or warranty promises. The tint FAQ refers warranty questions to the team without making a claim. |
| **Contact (NAP)** | All 39 call links: `tel:+16479909727`. All 38 email links: `wrap@wraptorstricity.com` (two have a pre-filled subject). Visible: "647.990.WRAP (9727)" and "647-990-9727". The address is shown as **745 Bridge St W #8, Waterloo, ON N2V 2G6**; see §5. |
| **Links and assets** | All internal links resolve directly (200, no redirect, anchors exist). 575 asset references; 0 missing. |

## 3. Migration integrity (70 legacy records)

All 70 pass `verify-migration.mjs`: each lands on the expected page in **one** 301 hop, or returns a real 404 where intended. Its canonical is the destination, and anchors exist on the page.

| Group | Result |
|---|---|
| Important existing URLs | `/about-wraptors/` → `/about/`, `/contact-wraptors/` → `/book/`, `/franchises/` → `/franchise/`, `/blog/` → `/learn/`. Old service slugs go to their new service pages. `/services/`, `/gallery/`, `/locations/`, `/videos/`, `/faqs/` and `/articles/` are kept as real pages (0 hops). |
| 15 FAQ pages (`/ufaq/…`) | 9 go to their own answer on `/faqs/#…`. The 6 whose answers await approval land on `/faqs/`. `/ufaq/` and anything else under it go to `/faqs/`. The `½ ¼` URL is fixed (§1 #3). |
| 3 blog posts | Two go to `/services/wraps/#commercial-wraps`; "5 things you might not know about vehicle wraps" goes to `/services/wraps/`. |
| Trailing slashes and encoding | Slash-less and case variants resolve in one hop. No rule uses lower-case percent-encoding or raw non-ASCII. |
| Intentional 404 | `/footer/` (a WordPress template page) returns a real 404. Nothing unrelated is redirected to the homepage. |

**Exception, documented:** the raw-UTF-8 form of the `½ ¼` URL relies on the ASCII-prefix rule. This was tested on Hamilton's Netlify draft, not on Tri-City's. Re-check it on the Tri-City preview (it has no known traffic).

## 4. Functionality and forms

**Mocked form tests (33/33).** Every request to `api.web3forms.com` was intercepted, so nothing was sent. **Real email delivery was not tested.**
- **Booking:**
  - An empty submit is blocked.
  - A two-digit year, a short phone number and a malformed optional email are each rejected.
  - Nothing is sent until the form is valid.
  - A network failure shows an error with the phone fallback (647.990.WRAP). The button changes to "Try Again", and entries are kept.
  - The retry succeeds.
  - The email field is optional.
  - The honeypot blocks bots: nothing is sent, and a success message is shown.
- **Franchise:**
  - A malformed email is rejected.
  - A rate-limit (429) response shows an error with the email fallback (wrap@wraptorstricity.com).
  - The retry succeeds.
  - **Only the franchise key is ever used.**
- **Quote:**
  - On `/services/ppf/` the form starts at step 2 with PPF preselected, and the payload says "Paint Protection Film". On the homepage it starts at step 1.
  - Step validation works, and a short phone number is rejected.
  - A server error (500) shows an error with a retry. Entries are kept, and the retry succeeds.
- **Key separation and subjects:** Quote and Booking use the customer key, with subjects "New Quote Request — Wraptors Tri-City" and "New Booking Request — Wraptors Tri-City". Franchise uses the franchise key, with subject "New Franchise Inquiry — Wraptors Tri-City".
- No page errors.

**Without keys** (how the site ships today), Booking shows "Online booking coming soon" and Franchise "Inquiries coming soon". Both buttons are disabled, the phone and email are shown, and no request is made. The production build contains no keys.

**Browser pass:** all 33 pages at 1440, 834 and 390, with service workers blocked:
- **Results:** no console errors, no failed requests, no broken images and no sideways scrolling.
- **Footer:** navigation, footer and CTA links are covered by the internal-link check.
- **Hero copy:** checked at 375, 390, 834 and 1440. The H1 is two lines at every width, and the supporting line is two lines.

## 5. Remaining technical blockers

| # | Item | Blocks | Owner |
|---|---|---|---|
| 1 | **Approval to stage on Netlify.** Create the isolated Tri-City Netlify project per `MIGRATION-DOCS/NETLIFY-STAGING-PLAN.md`. Then run `verify-migration.mjs --base <preview> --expect-noindex` and the real-HTTP checks: 301s and 404s, the encoded FAQ URL, and the X-Robots-Tag header. | Staging | Your approval |
| 2 | **GitHub remote.** The repo has none (needed if Netlify builds from Git; a manual draft deploy doesn't need one). | Staging (Git builds) | Your approval |
| 3 | **Web3Forms keys:** a Tri-City shop key (wrap@wraptorstricity.com) and a franchise key, set in Netlify only. Then test real delivery on the preview. | Production | Client / Wraptors HQ |
| 4 | **Privacy policy.** None exists, and the forms send names, phone numbers, emails and vehicle details to Web3Forms. We have not drafted one. | Production (forms) | Client |
| 5 | **Search Console** access or exports for the old site. Traffic, queries and backlinks are unverified. | Production | Client |
| 6 | **WordPress backup, DNS snapshot, rollback owner, written GO** | Production | Client / host account owner |

## 6. Needs client confirmation

- **Address format.** Your brief gives "745 Bridge St W, Unit 8"; the site, schema and the live site's contact page use "745 Bridge St W #8". These are the same address, and the site keeps "#8" so it matches the live site. Switching to "Unit 8" is a one-line change in `location.js` (it should match the Google Business Profile).
- **Map pin.** It comes from the live site's Google listing (43.511926, -80.5237892); confirm it marks unit #8.
- **Hero copy.** "Auto styling" and the Waterloo Region supporting line are new visible copy.
- **Earlier open items:**
  - Area, Learn and Waterloo Region copy
  - Gallery model names and finish tags
  - The 6 held-back FAQ answers
  - "16 Locations" against the 15 listed
  - Custom Builds & Body Kits
  - Opening hours (a window decal reads Mon–Sat 10–6, unpublished)
  - Tri-City hero footage (a Toronto car-meet video is the stand-in)
  - Google reviews (hidden)

## 7. Verdict

- **Isolated Netlify staging: GO** once you approve creating the Netlify project. Nothing technical blocks it locally.
- **Production: NO-GO** until §5 items 3–6 and the client confirmations in §6 are done.
