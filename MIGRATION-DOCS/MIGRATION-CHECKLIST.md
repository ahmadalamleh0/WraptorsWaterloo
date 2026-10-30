# Website Migration Checklist

Copy this file into each new project and fill in the **Status** and **Evidence** columns. Phases and commands are explained in `MIGRATION-PLAYBOOK.md`.

**Statuses:** `NOT STARTED` · `COMPLETED` (committed, untested) · `VERIFIED LOCALLY` · `VERIFIED ON HOSTING` · `CLIENT APPROVAL REQUIRED` · `N/A` (with reason).

**Evidence** must be a commit hash, a command and its result, a report file, or a named approver and date. "Looks fine" is not evidence.

Items marked **(A)** apply only to migrations of an existing site; **(B)** only to new-location launches. Unmarked items apply to both.

The **Hamilton** column shows the state of the Wraptors Hamilton project on 2026-10-27, as a worked example.

---

## 1. Access and backups

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 1.1 | Registrar/DNS access confirmed (who can change records) | NOT STARTED | — |
| 1.2 | Hosting account for the new site (Netlify team/site) | NOT STARTED | — |
| 1.3 | (A) Read access to the old host; backup method known | NOT STARTED | — |
| 1.4 | (A) Full backup of the old site (files + database), stored outside the host, kept ≥ 90 days | NOT STARTED | — |
| 1.5 | Current DNS zone exported or screenshotted | NOT STARTED | — |
| 1.6 | (A) Other sites sharing the old install identified, and their owner informed | CLIENT APPROVAL REQUIRED | robots.txt references wraptorsftl.com |
| 1.7 | Search Console access (Owner or Full) | NOT STARTED | — |
| 1.8 | Google Business Profile access, or the listing data recorded with a date | COMPLETED (data recorded) | Audit §0.2: 4.7 rating, pin, postal code 2N3 |
| 1.9 | New project in its own Git repo; source project untouched | VERIFIED LOCALLY | Baseline `a21581e`; separate repo |

## 2. Inventory and baseline

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 2.1 | All sitemaps fetched, including indexes and robots.txt `Sitemap:` lines | VERIFIED LOCALLY | 28 URLs |
| 2.2 | Full crawl without following redirects | VERIFIED LOCALLY | 37 URLs + 15 `/ufaq/` |
| 2.3 | CMS API or database checked for unlisted content types | VERIFIED LOCALLY | WP REST: `ufaq`, categories, users, 197 media |
| 2.4 | Platform defaults and typed URLs probed (`/feed/`, `?p=`, `/contact/`, slash-less) | VERIFIED LOCALLY | `SEO-URL-MAPPING.csv` |
| 2.5 | (A) GSC Pages, Queries, Image search, Indexing, Links exports (16 months) | NOT STARTED | Export list in audit §0.5 |
| 2.6 | (A) Analytics organic landing pages (12 months) | NOT STARTED | — |
| 2.7 | (A) Every URL with clicks or external links is in the mapping CSV | NOT STARTED (depends on 2.5) | — |
| 2.8 | (B) Domain history checked (archive, `site:`), no leftover pages | N/A (A project) | — |

## 3. Content preservation

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 3.1 | Each old page's own content compared with its new equivalent | VERIFIED LOCALLY | Audit §0.5 table |
| 3.2 | Every service on the old site has a new page or a recorded decision | VERIFIED LOCALLY | 11 service pages; galaxy ceilings → starlight; stripes + decals merged |
| 3.3 | Claims register built (prices, promotions, warranties, financing, statistics, rankings) | VERIFIED LOCALLY | Audit §0.5 claims register |
| 3.4 | No unverified claim published on the new site | VERIFIED LOCALLY for migrated claims; existing new-site network claims CLIENT APPROVAL REQUIRED | `FAQS_PENDING_APPROVAL`; audit §0.5 |
| 3.5 | Valuable search synonyms kept (e.g. "clear bra") | VERIFIED LOCALLY | `dfa218d` |
| 3.6 | FAQ content kept at its old URL, or redirected to the matching answers | VERIFIED LOCALLY | `/faqs/` + 15 rules |
| 3.7 | Galleries show the location's own work first, with network work labelled | VERIFIED LOCALLY | `a4cc6fc`, `/gallery/` intro |
| 3.8 | Reviews come only from this location's listing, with a sourced rating and count | CLIENT APPROVAL REQUIRED (count source) | `eb9c2fe` |
| 3.9 | New visible copy approved by the client | CLIENT APPROVAL REQUIRED | Commercial section, FAQs, legacy page intros |

## 4. Redirects

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 4.1 | (A) Every row in the mapping CSV has an action (keep / 301 / 404) and a target | VERIFIED LOCALLY | 60/60 rows |
| 4.2 | (A) Old URLs kept as real pages where practical (no redirect needed) | VERIFIED LOCALLY | 8 old URLs unchanged |
| 4.3 | (A) Redirects go to the intent-equivalent page; no unrelated homepage or hub redirects | VERIFIED LOCALLY | `dfa218d` retargets |
| 4.4 | (A) Every redirect takes one hop and lands on a 200 page whose canonical equals the final URL | VERIFIED LOCALLY (emulated) | `MIGRATION-CHECK.md` Legacy URLs 60/60 |
| 4.5 | (A) The same on the real host | NOT STARTED | `verify-migration.mjs --base` |
| 4.6 | (A) Percent-encoded and special-character URLs tested on the real host | NOT STARTED | `/ufaq/…%c2%bd…` |
| 4.7 | No rule whose source equals its target apart from the slash (loop) | VERIFIED LOCALLY | Rule review |
| 4.8 | Unknown paths return a real 404 status (no soft 404) | VERIFIED LOCALLY (emulated) | Catch-all `/* /404.html 404` |
| 4.9 | Domain variants (http, apex) → canonical host in one hop | NOT STARTED | Netlify domain settings at go-live |

## 5. Crawlability and technical SEO

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 5.1 | One URL form (trailing slash or not) used everywhere, matching how the host serves files | VERIFIED LOCALLY | `pagePath()`; 43 routes |
| 5.2 | Every indexable route has meaningful prerendered HTML without JS (H1 + body text) | VERIFIED LOCALLY | Content checks 86/86 |
| 5.3 | Unique titles and descriptions; one H1 per page with the service and city | VERIFIED LOCALLY | Metadata 215/215 |
| 5.4 | Canonical and `og:url` equal the final URL | VERIFIED LOCALLY | — |
| 5.5 | Structured data valid; LocalBusiness matches visible NAP; no AggregateRating from unverified counts | VERIFIED LOCALLY | NAP 43/43 |
| 5.6 | Internal links resolve directly (no redirects, no 404s) | VERIFIED LOCALLY | 45/45 |
| 5.7 | Every important page has at least one internal link (not sitemap-only) | VERIFIED LOCALLY for `/faqs/` (footer); `/gallery/`, `/locations/`, `/videos/`, `/services/` still sitemap-only: CLIENT APPROVAL REQUIRED (navigation change) | `dfa218d` |
| 5.8 | Duplication and cannibalisation reviewed | VERIFIED LOCALLY; decision CLIENT APPROVAL REQUIRED after GSC | Audit §0.5 |
| 5.9 | Visual and functional review at 1440 / 834 / 390, no console errors | VERIFIED LOCALLY (Phase 2 pages: 1440 and 390 only) | Case study §6 |

## 6. Local SEO

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 6.1 | Name, address and phone identical across visible content, schema and GBP | CLIENT APPROVAL REQUIRED | Postal code 2N4 (site) vs 2N3 (GBP) |
| 6.2 | Map pin matches the GBP pin | CLIENT APPROVAL REQUIRED | ~65 m difference |
| 6.3 | Business hours confirmed and published (visible + `openingHours`) | CLIENT APPROVAL REQUIRED | None published |
| 6.4 | GBP website link points at the right URL | NOT STARTED | — |
| 6.5 | Area pages are unique and claim no service coverage that isn't offered | VERIFIED LOCALLY | 52–60% unique |

## 7. Tracking and forms

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 7.1 | Analytics / Tag Manager IDs belong to this location (not copied) | NOT STARTED | — |
| 7.2 | Conversion events (form submit, call, WhatsApp) fire | NOT STARTED | — |
| 7.3 | Form keys set as host environment variables (never committed) | NOT STARTED | `VITE_WEB3FORMS_KEY` unset; forms disabled |
| 7.4 | Every form delivers to the location's inbox from the preview | NOT STARTED | — |

## 8. Indexing and sitemap

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 8.1 | Production build has no `noindex` (meta or header) | VERIFIED LOCALLY | Indexing 43/43 |
| 8.2 | Non-production builds are `noindex` on every page | VERIFIED LOCALLY | `--expect-noindex` 43/43 |
| 8.3 | Preview deploy actually `noindex` on the host | NOT STARTED | — |
| 8.4 | Sitemap generated from the route list, own domain, final URLs, all 200 | VERIFIED LOCALLY | 43 URLs |
| 8.5 | robots.txt allows crawling and lists only this site's sitemap | VERIFIED LOCALLY | Old site pointed at wraptorsftl.com |

## 9. Hosting

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 9.1 | Host config committed (build command, publish directory, runtime version) | COMPLETED | `netlify.toml` |
| 9.2 | Config for other hosts removed (e.g. `vercel.json`) | COMPLETED | `10afde5` |
| 9.3 | Production builds only from the production branch; local builds never published | COMPLETED (documented) | `netlify.toml` comment |
| 9.4 | Build runs on the host, including the prerender's headless browser | NOT STARTED | — |
| 9.5 | Full `verify-migration.mjs --base <preview> --expect-noindex` passes | NOT STARTED | — |
| 9.6 | HTTPS certificate issued for both hosts | NOT STARTED | — |

## 10. Launch

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 10.1 | Written client approval to launch, with the list of accepted open items | NOT STARTED | — |
| 10.2 | DNS TTL lowered ≥ 24 h before | NOT STARTED | — |
| 10.3 | DNS switched; `verify-migration.mjs --base https://<live>` passes (no `--expect-noindex`) | NOT STARTED | — |
| 10.4 | GSC: Domain property verified, sitemap submitted, key URLs inspected live | NOT STARTED | — |
| 10.5 | Monitoring log started (24 h / 7 d / 30 d / 90 d) | NOT STARTED | — |

## 11. Rollback

| # | Check | Hamilton | Evidence |
|---|---|---|---|
| 11.1 | Previous good deploy identified on the host (instant rollback) | NOT STARTED | — |
| 11.2 | (A) Old hosting kept live and untouched until sign-off | In place (the site is unchanged) | — |
| 11.3 | Old DNS records recorded, so DNS can be reverted | NOT STARTED | — |
| 11.4 | Rollback trigger and owner agreed (e.g. forms down, 404s on top pages, noindex in production) | NOT STARTED | — |

---

## GO / NO-GO criteria

A site may launch only when **every** GO condition holds. Any single NO-GO condition blocks the launch. Unresolved CLIENT APPROVAL REQUIRED items block launch unless the client has accepted them **in writing** (record who and when in 10.1).

| GO only if… | NO-GO if… |
|---|---|
| `verify-migration.mjs --base <deploy preview> --expect-noindex` passes in full (**VERIFIED ON HOSTING**) | Any check fails on the real host, or checks were only run locally |
| (A) Every URL with GSC clicks, impressions or external links has a kept page or a one-hop 301 to an equivalent | (A) No GSC baseline and the client hasn't accepted that risk in writing |
| NAP matches GBP exactly (postal code, phone, pin) | NAP conflict unresolved |
| No unverified price, warranty, promotion or statistic is published | Any claim from the claims register published without approval |
| Production build: no `noindex`; previews: `noindex` | A production build contains `noindex`, or a preview is indexable |
| Forms deliver to the location's inbox; tracking IDs belong to this location | A form fails, or IDs are copied from another site |
| Backups of the old site and the DNS records exist; a rollback owner is named | No backup, or the old hosting is scheduled for shutdown on launch day |
| Written launch approval from the client | Verbal-only approval |

**Hamilton on 2026-10-27: NO-GO.** No hosting verification, no GSC baseline, postal code unresolved, forms disabled, no backups taken yet.
