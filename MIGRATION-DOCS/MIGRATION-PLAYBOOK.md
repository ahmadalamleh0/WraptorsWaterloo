# theDiablo Website Migration Playbook

A reusable process for replacing a client's website, or launching a new location site, without losing search visibility. It was written from the Wraptors Hamilton migration (WordPress → Vite/React on Netlify, 2026-10). See `HAMILTON-CASE-STUDY.md` for what was actually done there, `MIGRATION-CHECKLIST.md` for the operational gates, and `CLAUDE-MIGRATION-INSTRUCTIONS.md` for the agent workflow.

---

## How to use this playbook

### Two kinds of project

| | **A. Migration of an existing live site** | **B. New location launch (no existing site or traffic)** |
|---|---|---|
| Example | Wraptors Hamilton: wraptorshamilton.com existed on WordPress | A new franchise city with no domain history |
| What can be lost | Rankings, indexed URLs, backlinks, Google Business Profile traffic | Nothing yet; the risk is a slow or broken start |
| Phases that apply | All 14 | Skip phases 3–4 (no baseline) and phase 8 (no old URLs). Phase 2 shrinks to "check the domain has no history". Phases 9–14 apply in full. |
| Key extra checks | Every old URL ends on an equivalent page (or a justified 404) in one hop | Domain history (Wayback Machine, `site:` search), no leftover parked pages, GBP website link set |

When a phase differs between A and B, it says so.

### Universal rules vs hosting-specific details

- **Universal rules** apply to any framework or host. They are marked **[Universal]** and come from Google Search Central guidance.
- **Netlify implementation** is marked **[Netlify]**. On another host (Vercel, Cloudflare Pages, Apache/Nginx), re-verify the equivalent behaviour on that host. Never assume trailing-slash handling, redirect precedence or preview indexing works the same way.

### Evidence status system

Every claim in project documentation and reports must carry one of these statuses:

| Status | Meaning | Evidence required |
|---|---|---|
| **NOT STARTED** | Nothing done yet | — |
| **COMPLETED** | Implemented and committed, but not yet tested | Commit hash |
| **VERIFIED LOCALLY** | Tested on a production-equivalent local build (or a local emulation of the host) | Command + output, or a report file (e.g. `MIGRATION-CHECK.md`) |
| **VERIFIED ON HOSTING** | Tested on the real host: a deploy preview or production, over real HTTP | Command against the real URL + output, date, deploy ID |
| **CLIENT APPROVAL REQUIRED** | Needs a decision or a fact only the client can supply | Named owner + the question asked |

Never write "verified" without saying which kind. A local emulation is never **VERIFIED ON HOSTING**.

### Key official references

Google Search Central:
- Site moves with URL changes: <https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes>
- Site moves without URL changes (host/platform change only): <https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes>
- Redirects and Google Search: <https://developers.google.com/search/docs/crawling-indexing/301-redirects>
- Canonical URLs and duplicates: <https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls>
- Build and submit a sitemap: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>
- Block indexing with `noindex`: <https://developers.google.com/search/docs/crawling-indexing/block-indexing>
- robots.txt introduction: <https://developers.google.com/search/docs/crawling-indexing/robots/intro>
- JavaScript SEO basics: <https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics>
- HTTP status codes, soft 404s and network errors: <https://developers.google.com/search/docs/crawling-indexing/http-network-errors>
- LocalBusiness structured data: <https://developers.google.com/search/docs/appearance/structured-data/local-business>
- Getting started with Search Console: <https://developers.google.com/search/docs/monitor-debug/search-console-start>

Netlify:
- Redirects and rewrites: <https://docs.netlify.com/manage/routing/redirects/overview/>
- Redirect options, including trailing-slash normalisation: <https://docs.netlify.com/manage/routing/redirects/redirect-options/>
- Support guide on trailing-slash behaviour: <https://answers.netlify.com/t/support-guide-how-can-i-alter-trailing-slash-behaviour-in-my-urls-will-enabling-pretty-urls-help/31191>
- Custom headers: <https://docs.netlify.com/manage/routing/headers/>
- File-based configuration (`netlify.toml`): <https://docs.netlify.com/build/configure-builds/file-based-configuration/>
- Environment variables, including the build `CONTEXT` variable: <https://docs.netlify.com/build/configure-builds/environment-variables/>
- Deploy Previews: <https://docs.netlify.com/deploy/deploy-types/deploy-previews/>
- Managing deploys, rollback by publishing an earlier deploy: <https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/>
- Domains: <https://docs.netlify.com/manage/domains/get-started-with-domains/>

Facts verified from these sources during the Hamilton project (2026-10-27):
- **[Netlify]** Rules match a path with or without a trailing slash. A rule whose source and target differ only by a slash causes an infinite redirect.
- **[Netlify]** For a file at `about/index.html`, `/about/` is served and `/about` 301-redirects to `/about/`. For a file at `about.html`, `/about` is served and `/about/` redirects to `/about`.
- **[Netlify]** Static files take precedence over non-forced redirect rules ("shadowing"). Add `!` to force a rule.
- **[Netlify]** Deploy Previews get an `X-Robots-Tag: noindex` header automatically. The docs do not say branch deploys do, so never rely on it: inject `noindex` yourself in every non-production build.

### Standard project files

These files live in the project root; create them per project.

| File | Purpose | Created in phase |
|---|---|---|
| `SEO-MIGRATION-AUDIT.md` | Audit of the old site, risks, current status | 2–4, updated through 11 |
| `SEO-URL-MAPPING.csv` | One row per old URL or pattern: old metadata, action, target, risk, verification | 2, 8 |
| `LAUNCH-CHECKLIST.md` | Blockers, business details to verify, go-live settings | 5 onwards |
| `MIGRATION-CHECK.md` | Generated pass/fail report from the verification script | 9–11 |
| `scripts/verify-migration.mjs` | Automated checks (legacy URLs, routes, metadata, schema, NAP, sitemap, robots, links) | 9 |
| `MIGRATION-DOCS/` | This playbook, the case study, the checklist, agent instructions, `tools/legacy-crawl.py` | — |

---

## Phase 1: Discovery and existing-site assessment

**Objective.** Understand what exists before changing anything: platform, hosting, domain setup, who owns which accounts, and what the business actually offers.

**Why it matters.** Most migration losses come from things nobody knew existed: hidden content types, other sites sharing the install, a Google Business Profile pointing at a deep URL, live promotions.

**Prerequisites and access.** Client contact; read access to the live site (public is enough to start). Request early: the domain registrar/DNS, Search Console, Analytics, Google Business Profile (manager), current hosting panel (read-only is fine), and any form, booking or tracking accounts.

**Steps.**
1. Record the platform and host from response headers: `curl -sI https://www.example.com/`. Look for `server`, `x-powered-by`, `platform` and CDN headers.
2. Check every host variant and record where each one redirects:
   ```bash
   for u in http://example.com/ http://www.example.com/ https://example.com/ https://www.example.com/ https://www.example.com/index.php; do
     printf '%-45s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}' "$u")"; done
   ```
3. Read `robots.txt` and note every `Sitemap:` line, **including ones that point at other domains** (a shared install).
4. Find the Google Business Profile listing: record its name, address, postal code, phone, website URL, hours, map-pin coordinates (from the Maps URL `!3d<lat>!4d<lng>`), rating and review count, with the date checked.
5. List the business facts the site states (address, phone, email, hours, services, prices, warranties, promotions, financing), each with its source page.
6. **(B: new launch)** Check the domain's history (Wayback Machine, a `site:` search) and whether it's parked or carries old content.

**Tools.** curl, browser, Google Maps, Wayback Machine.

**Common mistakes.** Assuming the sitemap lists everything. Missing a second site on the same install. Trusting the old site's business details without checking them against GBP.

**Verification.** Every access item is either granted or listed as a blocker. GBP data has a check date.

**Deliverables.** A discovery section in `SEO-MIGRATION-AUDIT.md`. A list of unverified business details in `LAUNCH-CHECKLIST.md`.

**Gate to continue.** You know the platform, host, domain variants and GBP details, and missing access is listed as a blocker with an owner.

---

## Phase 2: Full crawl, sitemap and URL inventory

**Objective.** Build a complete list of every URL the old site exposes, with its status and SEO metadata.

**Why it matters.** Every URL with traffic or links that isn't mapped becomes a 404 after launch. Sitemaps are routinely incomplete: in Hamilton they listed 28 URLs, while the WordPress API exposed 15 more FAQ URLs and an extra category.

**Prerequisites.** Phase 1 done. Public access is enough.

**Steps.**
1. Fetch every sitemap from `robots.txt` and the common locations (`/sitemap.xml`, `/sitemap_index.xml`, `/wp-sitemap.xml`). Expand sitemap indexes. Save the URL list as `seeds.txt`.
2. Crawl from the seeds, following internal links, without following redirects:
   ```bash
   python -I MIGRATION-DOCS/tools/legacy-crawl.py www.example.com seeds.txt ./crawl 400
   ```
   This records status, redirect target, `X-Robots-Tag`, title, description, meta robots, canonical, H1/H2, JSON-LD types, word count and internal in-links for each URL.
3. **[WordPress]** Query the REST API (read-only) for content the sitemap may leave out:
   ```bash
   B=https://www.example.com
   curl -s "$B/wp-json/wp/v2/types" | python -m json.tool          # finds custom post types (e.g. ufaq)
   curl -s "$B/wp-json/wp/v2/taxonomies" | python -m json.tool
   for t in pages posts categories tags users media; do
     curl -s -D - "$B/wp-json/wp/v2/$t?per_page=100&_fields=id,link,slug,title,status" -o "api_$t.json" | grep -i x-wp-total; done
   # then the same for each custom type found, e.g. /wp-json/wp/v2/ufaq
   ```
   Page through results (`&page=2`) when `X-WP-TotalPages` is above 1.
4. Probe platform defaults and typed URLs: `/feed/`, `/author/<user>/`, `/?p=<id>`, `/?page_id=<id>`, `/category/uncategorized/`, `/contact/`, `/faq/`, `/home/`, and the slash-less form of each URL. Record each status and redirect.
5. Check whether media attachment pages are their own URLs or redirect to the file, and whether any media are documents (PDF price lists, brochures) rather than images.
6. Write the inventory into `SEO-URL-MAPPING.csv`, one row per URL or pattern, with the old status, indexability, sitemap membership, title, H1, canonical, description and in-links.

**Tools.** `legacy-crawl.py`, curl, the WordPress REST API, Python.

**Common mistakes.** Following redirects during the crawl, which hides them. Ignoring `noindex` URLs (they still need redirects for users and links). Missing slash-less duplicates that return 200. Forgetting custom post types.

**Verification.** Sitemap URL count, API totals and crawl count reconcile: every API item is either in the crawl or explained.

**Deliverables.** `SEO-URL-MAPPING.csv` (inventory columns) and section 3 of `SEO-MIGRATION-AUDIT.md`.

**Gate to continue.** The inventory reconciles across all three sources.

---

## Phase 3: Search Console and Analytics baseline *(A only)*

**Objective.** Measure what currently earns traffic and links, so the mapping protects what matters.

**Why it matters.** Without this baseline, redirect targets are educated guesses. It's also the only way to tell a real post-launch drop from normal fluctuation.

**Prerequisites.** Search Console access (Owner or Full user) for the old property; Analytics access if available. If neither is available, **every traffic-dependent decision is CLIENT APPROVAL REQUIRED / NOT STARTED, and the report must say so.**

**Steps** (export to CSV, last 16 months, dated):
1. **Performance → Search results → Pages**: clicks, impressions, CTR, position.
2. **Performance → Queries** (top 1,000), plus queries per page for the homepage and the main service pages.
3. **Performance → Search type: Image → Pages**: image traffic to `/wp-content/uploads/` or similar.
4. **Indexing → Pages**: indexed list and not-indexed reasons.
5. **Links → Top linked pages (external)** and **Top linking sites**.
6. **Links → Top linked pages (internal)**.
7. **Settings → Crawl stats**: host status and response mix.
8. Analytics: organic landing pages over 12 months, plus conversion events (form submits, calls) if tracked.
9. Join everything into `SEO-URL-MAPPING.csv` by URL (normalise trailing slashes and hosts before joining).

**Tools.** Google Search Console, Google Analytics, a spreadsheet or Python.

**Common mistakes.** Exporting only 3 months. Exporting only the www property and missing the domain property. Ignoring image search. Treating "no data" as "no traffic".

**Verification.** Every URL with clicks or external links in the exports is in the mapping CSV.

**Deliverables.** Dated exports stored with the project but **not committed if they contain personal data**, plus the mapping CSV enriched with clicks, impressions and links.

**Gate to continue.** Exports are joined, or their absence is recorded as a launch risk the client has accepted.

---

## Phase 4: Existing content, SEO and backlink assessment *(A only)*

**Objective.** Decide what content is valuable, what is boilerplate, and which claims are still true.

**Steps.**
1. For each old page, extract its own body text with navigation, footer, forms and sitewide banners removed, and note its search intent.
2. Build a **claims register**: prices, promotions, warranties, financing, durations, certifications, statistics ("9000+ vehicles"), rankings ("number one"), network size, product brands. Record where each appears. Mark conflicts, such as Hamilton's 3-year vs 5-year vs lifetime warranty.
3. Note legacy technical issues: robots.txt pointing at the wrong domain, multiple H1s, empty meta descriptions, missing LocalBusiness schema, broken embeds.
4. From the phase 3 link exports, list externally linked URLs and the domains linking to them.

**Common mistakes.** Copying old claims onto the new site unverified. Treating thin, auto-generated pages (empty galleries, broken feeds) as valuable. Ignoring synonyms customers search with (e.g. "clear bra" for PPF).

**Deliverables.** The page inventory and claims register in `SEO-MIGRATION-AUDIT.md`.

**Gate to continue.** Each claim is marked publish, rewrite or CLIENT APPROVAL REQUIRED.

---

## Phase 5: Project duplication and development environment

**Objective.** Start the new location from a known-good codebase in its own repository, without touching the source project.

**Steps.**
1. Copy the source project into a new folder (never a branch of the source repo). Make the first commit an **unmodified baseline** so every later change is reviewable.
2. Create a **separate Git repository** per client or location. In theDiablo's setup, never commit from the home-directory repo.
3. Install dependencies (`npm install`) and confirm the copied site builds and runs before changing anything.
4. Record the source project, commit and date in the case study.
5. Keep secrets out of Git: form keys and API tokens belong in the host's environment variables (`VITE_*` variables are public at runtime; never put private secrets in them).

**Common mistakes.** Editing the source project by accident. Reusing the source location's form keys, analytics IDs or map assets. Committing `.env`.

**Verification.** `git log` shows the baseline commit. The baseline builds. The source project's `git status` is unchanged.

**Gate to continue.** The baseline is committed and builds.

---

## Phase 6: Location configuration and content migration

**Objective.** Replace every location-specific value from one place and remove the source location's leftovers.

**Steps.**
1. Centralise location values (brand, domain, NAP, coordinates, socials, SEO defaults, media) in one config file (Hamilton: `src/config/location.js`). Fill `index.html` SEO tokens and LocalBusiness JSON-LD from it at build time.
2. Keep an `UNCONFIRMED` list in the config that the build prints as a warning, so unverified values can't be forgotten.
3. Search the whole codebase for the source location's name, phone, emails, domains, coordinates, currency and legal references. Also check media for burned-in text (Hamilton's hero video said "DUBAI").
4. Hide anything with no real value (dead social links, store links, legal pages that don't exist) behind config flags rather than inventing placeholders.
5. Migrate reviews only from the location's own listing; never reuse another location's ratings or counts.

**Common mistakes.** Leftover phone numbers in WhatsApp links, schema or `tel:` links. The favicon or PWA icons still showing the old location's badge. Review counts copied from another location (Hamilton showed 581 reviews that belonged elsewhere).

**Verification.** A codebase search for source-location terms returns nothing unexpected. The build warning lists only genuinely unconfirmed values.

**Gate to continue.** NAP comes from one source, and every unconfirmed value is listed.

---

## Phase 7: Service pages, galleries, articles and local SEO

**Objective.** Give every commercially important intent a strong, truthful page.

**Steps.**
1. One page per service the location actually offers. Carry over the old pages' useful substance (from phase 4), not their unverified claims.
2. The visible H1 must contain the service and city. A cinematic headline can stay alongside it (Hamilton put the "Brand · Service" eyebrow inside the H1 with `display: contents`, so the layout didn't change).
3. Keep valuable search synonyms the old site used.
4. Galleries should show only the location's own work first, and label work from the wider network as such.
5. Area pages: real local substance (routes, conditions, neighbourhood specifics), unique titles and descriptions, no claims of coverage or mobile service unless true. Check overlap between area pages (Hamilton: 52–60% unique text, the most similar pair sharing 29%).
6. Articles: unique metadata, links to the relevant service and area pages, FAQ schema only where the FAQ is visible.
7. LocalBusiness schema must match the visible NAP and GBP exactly. Add hours only when confirmed.

**Common mistakes.** Slogan-only H1s. Inventing durations, prices or warranties. Area pages that are near-duplicates. FAQ answers that only render after a click (Hamilton's accordion kept answers out of the static HTML until Phase 2).

**Verification.** Manual review on desktop (1440), tablet (834) and mobile (390), plus the automated checks in phase 9.

**Gate to continue.** Every service from the phase 4 inventory has an equivalent page or a recorded decision.

---

## Phase 8: Old-to-new URL mapping and permanent redirects *(A only)*

**Objective.** Every old URL with value ends, in **one hop**, on its genuinely equivalent page, or returns a real 404/410 when nothing equivalent exists.

**Rules [Universal].**
- Keep the old URL as a real page where practical (no redirect at all).
- Otherwise use a 301 to the closest equivalent **by intent**, not just by topic.
- Don't redirect unrelated content to the homepage or a generic hub: Google treats that as a soft 404.
- One hop: the target must be the final canonical URL.
- `noindex` pages still get redirects if they had users or links.
- Fragments (`/page/#section`) are fine for users but are ignored by Google, so the destination page itself must be relevant.

**Steps.**
1. Fill the `proposed_action`, `proposed_target` and `risk` columns of the mapping CSV for every row.
2. Decide on legacy hubs (`/services/`, `/gallery/`, `/locations/`, `/faqs/`): rebuild them as real pages when they had menu links or traffic.
3. **[Netlify]** Write `public/_redirects` (Vite copies it to `dist/`):
   ```
   /old-service/        /services/new-service/        301
   /old-faq-item/       /faqs/#answer-id              301
   /legacy-type/*       /faqs/                        301
   /*                   /404.html                     404
   ```
   - Targets must use the site's final URL form, including the trailing slash.
   - Don't write rules whose source equals the target apart from the slash (infinite loop).
   - Static files win over rules unless the rule is forced with `!`.
   - Put specific rules before splats.
4. Verify locally (phase 9) and on a deploy preview (phase 10).

**Common mistakes.** Mapping to a category listing when the old post's intent was commercial. Leaving a redirect to the homepage for a page that had a clear equivalent. Chains (old → slash-less → slash).

**Deliverables.** `public/_redirects` (or the host's equivalent) and the completed mapping CSV.

**Gate to continue.** Every row has an action. Every High/Medium row is reviewed, with GSC data where available.

---

## Phase 9: Technical SEO

**Objective.** Every indexable page is crawlable in static HTML, correctly canonicalised, uniquely described and indexable only in production.

**Steps.**
1. **URL form.** Pick one trailing-slash convention that matches how the host serves the build output, and use it in canonicals, `og:url`, breadcrumbs, sitemap, internal links and redirect targets. **[Netlify]** `route/index.html` → `/route/`. Hamilton uses `pagePath()`/`pageUrl()` in `src/lib/siteConfig.js`.
2. **Prerendering.** Client-side apps must produce real HTML per route (Hamilton: `scripts/prerender.mjs` snapshots each route with Playwright after `vite build`). Each route needs a meaningful H1 and body text without JavaScript.
3. **Metadata.** Unique `<title>` (about 50–65 characters) and meta description (about 50–160 characters), and exactly one H1 per page.
4. **Structured data.** LocalBusiness or a subtype site-wide, matching NAP. Breadcrumbs, Article and FAQPage (only for visible FAQs) where relevant. Never add AggregateRating from unverified counts.
5. **Sitemap.** Generated from the real route list at build time. Production domain only, final URL form, no redirects, no noindex pages.
6. **robots.txt.** Allow crawling and reference only this site's sitemap.
7. **Indexing guard.** Add `noindex, nofollow` to every non-production build. **[Netlify]** Hamilton's `vite.config.js` removes it only when `CONTEXT === 'production'`, so a local build is always noindex. Never publish a local build to production.
8. **404.** Unknown paths return a real 404 status, not the homepage (no soft 404s).
9. Run the automated checks:
   ```bash
   CONTEXT=production npm run build
   node scripts/verify-migration.mjs --report MIGRATION-CHECK.md      # production build: no noindex anywhere
   CONTEXT=deploy-preview npm run build
   node scripts/verify-migration.mjs --expect-noindex                  # preview build: noindex everywhere
   ```
   The script reads the sitemap and checks:
   - every route: 200 directly, and its slash-less form 301s in one hop
   - canonical and `og:url` match the final URL
   - the indexing state is correct for the build
   - unique titles and descriptions
   - a single H1, and a minimum word count in the static HTML
   - valid JSON-LD with LocalBusiness
   - NAP consistent between schema and footer
   - every internal link resolves with no redirect
   - every legacy URL ends on the expected page in one hop (or is a 404)

   Locally it emulates Netlify's documented routing on `dist/`; with `--base <url>` it uses real HTTP.

**Common mistakes.** Slash-less canonicals on a host that serves slash URLs. Answers or content that render only after interaction. A noindex guard that defaults to indexable. Sitemaps that include redirecting URLs.

**Deliverables.** A passing `MIGRATION-CHECK.md` (status **VERIFIED LOCALLY**).

**Gate to continue.** All checks pass on a production-context build, and a preview build is noindex everywhere.

---

## Phase 10: Staging deployment and real hosting verification

**Objective.** Prove the real host behaves the way the local emulation assumed.

**Prerequisites.** Host account access. Environment variables set on the host (form keys etc.), never committed.

**Steps [Netlify].**
1. Connect the repository. The build command and publish directory come from `netlify.toml` (`npm run build`, `dist`, `NODE_VERSION`).
2. Open a pull request to get a **Deploy Preview**, or push a branch for a branch deploy.
3. Run the checks against it:
   ```bash
   node scripts/verify-migration.mjs --base https://deploy-preview-<n>--<site>.netlify.app --expect-noindex --report PREVIEW-CHECK.md
   ```
4. Spot-check by hand:
   - `curl -sI <preview>/about` should return a 301 to `/about/`
   - `curl -sI <preview>/old-url/` should return a 301 to its target
   - check percent-encoded legacy URLs
   - check that the prerender step ran in the build log
5. Test forms end to end, using the location's own keys and inbox.

**Common mistakes.** Treating a deploy preview as production (it is noindex by design). Building on a host whose environment doesn't support the prerender's headless browser.

**Deliverables.** `PREVIEW-CHECK.md` and a note of the deploy ID (status **VERIFIED ON HOSTING**).

**Gate to continue.** All checks pass on the preview. Forms deliver.

---

## Phase 11: Prelaunch SEO and functionality testing

**Objective.** Final human review before DNS changes.

**Steps.**
1. Visual and functional check at 1440, 834 and 390 px: navigation, forms, maps, videos, galleries, 404 page. No console errors.
2. Accessibility basics: one H1 per page, alt text, keyboard focus on menus and accordions.
3. Performance: no oversized media, lazy-loaded below-the-fold images, a sane LCP on mobile.
4. Tracking: Analytics/Tag Manager IDs belong to this location, and conversion events fire.
5. Every **CLIENT APPROVAL REQUIRED** item is resolved, or the client has explicitly accepted launching without it.
6. Re-run phase 9 and phase 10 checks after any change.

**Gate to continue.** The GO/NO-GO checklist in `MIGRATION-CHECKLIST.md` is all GO.

---

## Phase 12: DNS cutover, approvals and rollback preparation

**Objective.** Switch traffic to the new site with a tested way back.

**Prerequisites.** Written client approval to launch. Registrar/DNS access. The old host stays live and untouched until the new site is stable.

**Steps.**
1. **Backups:** export the old site (WordPress: files and database, through the host's backup tool) and keep it for at least 90 days. Record the current DNS records (screenshot or zone export).
2. Lower the DNS TTL (e.g. to 300 s) at least 24 hours before cutover.
3. **[Netlify]** Add the custom domain. Set **www** as primary (or whichever the old site used), with the apex as an alias. Netlify issues the HTTPS certificate.
4. Point DNS as Netlify instructs. Do not delete the old hosting yet.
5. Immediately run `node scripts/verify-migration.mjs --base https://www.example.com --report LAUNCH-CHECK.md` (**without** `--expect-noindex`).
6. **Rollback options:**
   - **[Netlify]** Publish an earlier deploy from the Deploys page if the new build is bad.
   - Point DNS back at the old host if the platform itself must be reverted. This only works while the old hosting is intact.

**Common mistakes.** Shutting down the old host on launch day. Forgetting that other sites share the old install (Hamilton's robots.txt referenced wraptorsftl.com). Launching a build that still has noindex.

**Gate to continue.** `LAUNCH-CHECK.md` passes on the live domain.

---

## Phase 13: Search Console verification and sitemap submission

**Steps.**
1. Verify a **Domain property** (DNS TXT record) if one doesn't already exist. An existing property and its history carry over when the domain stays the same.
2. Submit `https://www.example.com/sitemap.xml`.
3. Run URL Inspection → **Test live URL** on the homepage, top service pages and a sample of redirected old URLs. Request indexing for the key pages.
4. **Change of Address tool:** only for domain changes. Not used when the domain stays the same (Hamilton).
5. Update the GBP website link if the URL changed.

**Gate to continue.** The sitemap is processed without errors, and the inspected URLs show the expected canonical.

---

## Phase 14: Monitoring

| When | Check |
|---|---|
| **First 24 hours** | Re-run `verify-migration.mjs --base` on the live site. Run a 404 check on the top 50 old URLs from the GSC export. Confirm forms deliver, check uptime and confirm no `noindex` on production. |
| **Day 7** | Search Console Indexing → Pages: watch "Not found (404)", "Page with redirect", "Duplicate, Google chose different canonical". Check the sitemap status and crawl stats. Compare clicks and impressions with the baseline, page by page. |
| **Day 30** | Compare queries against the baseline for the top 20 queries. Investigate any old URL that keeps getting impressions. Re-check the GBP listing (NAP, website link). |
| **Day 90+** | Keep redirects permanently (at least a year; never remove them for URLs with backlinks). Plan content gaps (e.g. restore blog posts that GSC showed had value). Release the old hosting only after sign-off. |

Write each check's results, with dates, into the case study or a `POST-LAUNCH-LOG.md`. Never pre-fill monitoring results.
