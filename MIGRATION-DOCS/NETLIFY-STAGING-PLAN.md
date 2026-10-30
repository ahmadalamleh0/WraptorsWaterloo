# Wraptors Hamilton: Isolated Netlify Test Deployment Plan

**Status: NOT STARTED.** Blocked on access (§1). Written 2026-10-28.

**Goal:** observe the real hosting behaviour (playbook phase 10) without touching the live site:
- the production-equivalent build running in Netlify's build environment
- the trailing-slash behaviour, the redirects and the 404 handling
- the indexing headers and meta tags
- the sitemap and robots.txt

Every result is recorded as **VERIFIED ON HOSTING** only when it was observed over real HTTP on Netlify.

**Hard limits for this stage:**
- no custom domain on the test site
- no DNS change and no Netlify DNS
- no change to the WordPress install or the Hostinger account
- no automatic production deployment from `main`
- no real form submissions to the shop's inbox

---

## 1. Prerequisites (missing as of 2026-10-28)

| # | Item | State | Who |
|---|---|---|---|
| 1 | GitHub repo `ahmadalamleh0/Wraptors-Hamilton` set to **Private** | Currently **PUBLIC** (anonymous API returns `"visibility": "public"`) | Repo owner: Settings → General → Danger Zone → Change visibility. Or run `gh auth login`, then `gh repo edit ahmadalamleh0/Wraptors-Hamilton --visibility private --accept-visibility-change-consequences`. |
| 2 | Repo webhooks / installed apps reviewed (none should deploy anywhere) | Not checkable without authentication. The public API shows no deployments, statuses, check runs or Pages. | Repo owner: Settings → Webhooks and Settings → GitHub Apps |
| 3 | Netlify account / team for theDiablo | No Netlify CLI login on this machine | Account owner |
| 4 | Netlify CLI (only for Stage A) | Not installed | `npm i -g netlify-cli`, then `netlify login`. The login happens in the browser; the token is stored by the CLI and never in the repo. |
| 5 | Form test key: a **separate** Web3Forms key pointing at a test inbox | Not created | Owner. Do not use the shop's real key for staging. |

---

## 2. Stage A: manual draft deploys (no Git connection, no production publish)

This is the safest first step. The site has **no production deploy at all**: its `*.netlify.app` root serves nothing.

```bash
cd "Wraptors Hamilton"
netlify sites:create --name wraptors-hamilton-staging        # once; record the site ID in the case study
netlify link --name wraptors-hamilton-staging                 # writes .netlify/state.json (gitignored)

# A1: preview-equivalent build (noindex expected)
CONTEXT=deploy-preview npm run build
netlify deploy --dir=dist --message "staging A1 preview-context"        # draft deploy: NEVER add --prod
node scripts/verify-migration.mjs --base https://<draft-id>--wraptors-hamilton-staging.netlify.app --expect-noindex --report STAGING-A1.md

# A2: production-equivalent build (index expected in HTML)
CONTEXT=production npm run build
netlify deploy --dir=dist --message "staging A2 production-context"     # still a draft, still NOT --prod
curl -sI https://<draft-id>--wraptors-hamilton-staging.netlify.app/ | grep -i x-robots-tag
node scripts/verify-migration.mjs --base https://<draft-id>--wraptors-hamilton-staging.netlify.app --report STAGING-A2.md
```

What Stage A verifies on the real host:
- trailing-slash serving (`/about` → 301 → `/about/`)
- each `_redirects` rule, including the percent-encoded `/ufaq/…%c2%bd…` URL and the `/ufaq/*` splat
- static files taking precedence over rules (shadowing)
- the `/* /404.html 404` status
- `_headers` (cache headers on `/assets/*`)
- sitemap and robots.txt served correctly
- A2 only: the HTML has no `noindex`

**Note on A2:** a production-context build has no `noindex` meta tag. Netlify documents its automatic `X-Robots-Tag: noindex` for Deploy Previews only, not for draft deploys. Before running A2:
1. Record the header for A1's draft URL.
2. If draft deploys don't get the header, keep the A2 draft URL private (it's unguessable and never linked).
3. Delete the A2 deploy (or the whole test site) right after testing.

Stage A does **not** test Netlify's build image: the build runs locally.

## 3. Stage B: Git-connected Deploy Preview (Netlify builds it)

This proves the prerender (Playwright Chromium, from `postinstall`) and `netlify.toml` work in Netlify's build environment. Only start Stage B after the repo is private.

1. Netlify → Add new project → Import from GitHub. Install the Netlify GitHub app with **"Only select repositories" → Wraptors-Hamilton**.
2. Build settings come from `netlify.toml` (`npm run build`, publish `dist`, `NODE_VERSION = 22`). **Don't** add a custom domain.
3. To prevent an indexable production deploy at `wraptors-hamilton-staging.netlify.app`:
   - Set **Production branch** to a branch that is never used for real code, e.g. `staging-hold`.
   - Create it from `main` with one extra commit that adds a site-wide header to `public/_headers`:
     ```
     /*
       X-Robots-Tag: noindex, nofollow
     ```
     This branch is **never merged** into `main`.
   - The Netlify docs don't offer a way to stop the first production build, so this branch is what Netlify builds and publishes as "production" for the test site. It's indexable by its HTML but blocked by the header.
   - Deploy Previews: on, for pull requests. Branch deploys: off.
4. Open a draft pull request from a short-lived branch (e.g. `staging-check`) to `main`, and **don't merge it**. Netlify builds a Deploy Preview at `deploy-preview-<n>--wraptors-hamilton-staging.netlify.app` with `CONTEXT=deploy-preview`.
5. Run the checks:
   ```bash
   node scripts/verify-migration.mjs --base https://deploy-preview-<n>--wraptors-hamilton-staging.netlify.app --expect-noindex --report STAGING-B-PREVIEW.md
   ```
6. Check the Netlify build log for `[prerender] 43/43 routes rendered successfully` and the `UNCONFIRMED` warning list.
7. Check the "production" deploy of the test site (the `staging-hold` branch): the HTML must have no `noindex` meta tag, and the `X-Robots-Tag: noindex` header must be present.
   ```bash
   curl -s  https://wraptors-hamilton-staging.netlify.app/ | grep -io '<meta name="robots"[^>]*>'   # expect: nothing
   curl -sI https://wraptors-hamilton-staging.netlify.app/ | grep -i x-robots-tag                      # expect: noindex, nofollow
   ```
   `verify-migration.mjs` treats a header `noindex` as a failure in production mode. On this site, expect only the **Indexing** group to fail, each detail showing the header. A `--allow-noindex-header` option is a possible small script change; **needs approval**.

## 4. Pass criteria for this stage

| Check | Expected | Source |
|---|---|---|
| All `verify-migration.mjs` groups on the Deploy Preview | Pass with `--expect-noindex` | STAGING-B-PREVIEW.md |
| 60 legacy URLs | Each ends on its target in one hop, or a 404 | same |
| `/about` | 301 → `/about/`; `/about/` 200, canonical `https://www.wraptorshamilton.com/about/` | curl + report |
| Deploy Preview | `X-Robots-Tag: noindex` header and the `noindex, nofollow` meta tag | curl |
| Production-context HTML | No `noindex` meta tag | A2 / step 7 |
| `/sitemap.xml` | 43 URLs, all `https://www.wraptorshamilton.com/…/` | report |
| `/robots.txt` | `Allow: /` and only its own sitemap | report |
| Unknown path | HTTP 404 with the 404 page | report |
| Netlify build | Prerender 43/43, no failed routes | build log |
| Forms (only with a test key in a test inbox) | Submissions arrive | manual |

Record the deploy IDs, dates and report files in `HAMILTON-CASE-STUDY.md` §6 and `MIGRATION-CHECKLIST.md` §4, §8 and §9.

## 5. Cleanup and what comes after

- Delete the A2 draft deploy after use. Keep or delete the test site; it never has a custom domain.
- Close the `staging-check` pull request without merging. The `staging-hold` branch stays unmerged, or is deleted with approval.
- **Go-live is a separate, approved step** (playbook phases 11–12):
  - production branch `main`
  - remove the staging header (it never lives on `main`)
  - add `www.wraptorshamilton.com` with the apex as an alias
  - DNS change only after the GO/NO-GO checklist passes, with backups taken and a rollback owner named
