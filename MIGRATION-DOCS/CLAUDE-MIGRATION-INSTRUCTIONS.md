# Instructions for Claude Code: Website Migration or Location Launch

Give this file to Claude Code at the start of a migration or new-location project, together with the project's specifics (the template at the bottom). It works for any client, city, framework or host. The process is defined in `MIGRATION-PLAYBOOK.md` and the gates in `MIGRATION-CHECKLIST.md`. `HAMILTON-CASE-STUDY.md` shows a completed example.

---

## Your role

You are migrating a website, or launching a new location site, for a theDiablo client. Your first duty is to **protect existing search visibility, content and business accuracy**; speed comes second. Work through the playbook's phases in order, show evidence for every claim you make, and stop for approval at the decision points listed below.

## Ground rules

1. **Inspect before you change.** Before any edit, read the existing site (live and code), its sitemaps, its redirects and its config. Phases 1–2 are read-only.
2. **Phases in order.** Don't start a phase until the previous phase's gate in the playbook is met, or the user explicitly waives it. Say which phase you are in.
3. **Non-destructive by default.** Never:
   - modify the live site, its CMS or its hosting
   - change DNS
   - deploy, push, force-push, rebase or reset
   - delete branches, or delete files you didn't create

   …unless the user asks for that specific action in this session. Approval for one action doesn't extend to the next.
4. **Separate repositories.** Each client or location has its own repo. Never commit in a parent or home-directory repo. Never modify a sibling client project.
5. **Preserve SEO value.** Every old URL with value ends on its intent-equivalent page in one hop, or is kept as a real page. Don't redirect unrelated content to the homepage or generic hubs. Don't drop content that may rank without recording a justification.
6. **Don't invent facts.** Prices, warranties, promotions, durations, statistics, hours, postal codes, coordinates, review counts and certifications must come from a verifiable source (the client, the Google Business Profile, the old site with a date). If one is missing, list it as a blocker; don't fill it in. Copying a claim from the old site doesn't verify it.
7. **Verify every critical change.** Build in production context, run the automated checks, and check the UI in a browser at 1440 / 834 / 390 with the console open. Report the actual command and result.
8. **Label evidence honestly.** Use exactly: `NOT STARTED`, `COMPLETED`, `VERIFIED LOCALLY`, `VERIFIED ON HOSTING`, `CLIENT APPROVAL REQUIRED`. A local emulation or a local preview server is never `VERIFIED ON HOSTING`. Never describe a planned or simulated test as done.
9. **No secrets in Git or docs.** Form keys, API tokens and credentials go only in the host's environment variables. Never print them in output or documentation.
10. **Minimal, design-preserving changes.** Keep the approved design, animations and content unless a specific SEO correction requires a change, and say why it does.
11. **Check current documentation.** For host behaviour (redirect matching, trailing slashes, preview indexing, build context variables) and framework APIs, read the official docs rather than relying on memory. Cite what you relied on.
12. **Update the docs after each phase.** Keep `SEO-MIGRATION-AUDIT.md`, `SEO-URL-MAPPING.csv`, `LAUNCH-CHECKLIST.md`, `MIGRATION-CHECK.md` and the project's case study current, with dates and commit hashes.

## Phase-by-phase duties

| Phase (playbook) | What you do | What you produce | Stop for approval? |
|---|---|---|---|
| 1 Discovery | Headers, host variants, robots.txt, GBP data (dated); list missing access | Discovery notes; blockers in `LAUNCH-CHECKLIST.md` | Yes, if access is missing |
| 2 Inventory | Sitemaps; crawl with `MIGRATION-DOCS/tools/legacy-crawl.py` (no redirect following); CMS API for hidden types; default and slash-less probes; media review | `SEO-URL-MAPPING.csv` (inventory columns) | No |
| 3 GSC baseline (A) | Ask for the exports in the playbook. If unavailable, mark every traffic decision `NOT STARTED` and say so in every report. | Joined CSV, or a recorded risk | **Yes**: the client accepts or supplies data |
| 4 Content assessment (A) | Body-text comparison; claims register; legacy technical issues | Audit sections | **Yes**: each claim publish / rewrite / hold |
| 5 Project setup | Copy the source → new folder and repo; unmodified baseline commit; builds | Baseline commit | No |
| 6 Location config | One config source; `UNCONFIRMED` list; purge source-location leftovers (text, media, icons, IDs, reviews) | Commits | **Yes**, for any unconfirmed business fact |
| 7 Pages and local SEO | Service/area/article/gallery pages; H1 with service + city; FAQ content in the static HTML | Commits | **Yes**, for new visible copy |
| 8 Redirects (A) | Fill the CSV actions; keep legacy hubs as pages where they had links; one-hop rules to final URLs | `_redirects` (or host equivalent), CSV | **Yes**, for High/Medium rows without GSC data |
| 9 Technical SEO | URL form matching the host; canonicals, sitemap, robots, schema, noindex guard, 404; run `verify-migration.mjs` (production and preview builds) | `MIGRATION-CHECK.md` | No (a failure blocks) |
| 10 Staging | Only when asked to deploy a preview: run `verify-migration.mjs --base <preview> --expect-noindex`; test forms | `PREVIEW-CHECK.md` | **Yes**: deployment needs explicit approval |
| 11 Prelaunch | Full browser review, tracking, approvals collected | Checklist updated | **Yes**: GO/NO-GO decision is the client's |
| 12 Cutover | Only on explicit instruction. Confirm backups, DNS records and the rollback owner first. | `LAUNCH-CHECK.md` | **Yes** |
| 13–14 GSC and monitoring | Sitemap submission and inspection guidance; scheduled checks; record results only when they actually happen | Monitoring log | Report only |

## Mandatory stop-and-ask points

Stop and ask the user before:
- deploying anywhere, pushing, or changing DNS or hosting settings
- publishing any price, warranty, promotion, financing, statistic, hours, review count or contested NAP value
- removing or `noindex`-ing a page that existed on the old site, or redirecting it somewhere that isn't clearly equivalent
- changing navigation or other visible design beyond a minimal SEO correction
- choosing between equally valid strategies that affect URLs (e.g. trailing-slash convention when the host could support either)
- treating missing Search Console data as "no traffic"

When you stop, state the decision, the options, your recommendation and the risk of each option.

## Verification commands (adapt to the project)

```bash
npx eslint src scripts
CONTEXT=production npm run build                       # production-context build (local only; never publish it)
node scripts/verify-migration.mjs --report MIGRATION-CHECK.md
CONTEXT=deploy-preview npm run build && node scripts/verify-migration.mjs --expect-noindex
node scripts/verify-migration.mjs --base https://<preview-or-live-url> [--expect-noindex]
```

If the project has no `verify-migration.mjs`, copy Hamilton's and replace its `LEGACY` list with the new project's mapping. If the host isn't Netlify, update the emulation rules in the script to match that host's **documented** behaviour, and say that you did.

## Reporting format (end of every phase)

1. **Phase and status.** What was done, with commit hashes.
2. **Verified.** Each check with its command, result and status label.
3. **Not verified.** What couldn't be tested, and why.
4. **Needs approval.** Each decision or fact, the owner, and your recommendation.
5. **Next phase gate.** Met or not met.

Keep it concise. Put findings in the project docs, not only in chat.

---

## Project brief template (fill in and give with this file)

```
Client / location:            e.g. Wraptors Tri-City (Waterloo, ON)
Project type:                 A = migrate existing live site | B = new location launch
Existing site URL (A):        https://...
Target domain:                https://www....
Source project to copy:       e.g. "Wraptors Hamilton" folder, commit <hash>
Project folder / repo:        path + remote (own repo; never the home-directory repo)
Hosting:                      e.g. Netlify (team / site name if it exists)
Access available:             registrar/DNS | host | Search Console | Analytics | GBP | old CMS
Confirmed business details:   name, address, postal code, phone, email, hours, services, source + date
Known unverified details:     ...
Do-not-touch list:            other client projects, the live site, DNS, etc.
Approval contact:             who approves copy, claims and launch
```
