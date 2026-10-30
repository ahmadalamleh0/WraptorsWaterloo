// ══ BUILD-TIME PRERENDER ══
//
// Runs after `vite build`. Boots the actual production build behind a
// local server (vite preview — the exact same static output Netlify will
// serve), visits every real route in a headless browser, and saves each
// page's fully-rendered HTML as a static file in dist/. Netlify serves a
// matching static file for a given path before it ever consults
// _redirects, so this needs zero routing changes — the SPA still works
// exactly as before for any path that (by construction) always has a
// prerendered file now.
//
// Route list comes from the same data files the app itself renders from
// (geoLocations.js, articles.js) — nothing is duplicated or hand-typed
// here, so a new GEO page or article is prerendered automatically the
// next time this runs.
//
// Why a real browser instead of React's server-render API: this app
// leans on browser-only APIs throughout (IntersectionObserver, canvas,
// matchMedia, GSAP/ScrollTrigger) that would need defensive rewrites
// everywhere to survive a Node SSR pass. Snapshotting the real, already-
// working client render avoids touching any component at all.

import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

import { LOCATIONS, SITE_URL } from '../src/data/geoLocations.js';
import { ARTICLES, CATEGORIES, LEARN_ENABLED } from '../src/data/articles.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const PORT = 4174;
const BASE = `http://localhost:${PORT}`;

const SERVICE_PATHS = [
  '/services/wraps',
  '/services/ceramic',
  '/services/tint',
  '/services/starlight',
  '/services/ppf',
  '/services/custom-builds',
  '/services/detailing',
  '/services/custom-interiors',
  '/services/stripes-decals',
  '/services/caliper-painting',
  '/services/wheel-painting',
];

function buildRouteList() {
  // /services, /gallery, /locations, /videos, /faqs and /articles keep the
  // old WordPress site's URLs as real pages. The Learn hub is only built
  // once it has articles.
  const routes = ['/', '/about', '/book', '/franchise', '/services', ...SERVICE_PATHS,
    '/faqs', '/gallery', '/locations', '/videos', '/articles'];
  for (const loc of LOCATIONS) routes.push(`/areas/${loc.slug}`);
  if (LEARN_ENABLED) {
    routes.push('/learn');
    for (const cat of CATEGORIES) routes.push(`/learn/category/${cat.slug}`);
    for (const article of ARTICLES) routes.push(`/learn/${article.slug}`);
  }
  return routes;
}

// sitemap.xml + robots.txt are generated from the same route list, so a
// removed area or article can never linger in the sitemap. Priorities
// follow the original hand-written sitemap.
function sitemapEntry(route) {
  if (route === '/') return { changefreq: 'weekly', priority: '1.0' };
  if (route === '/learn') return { changefreq: 'weekly', priority: '0.7' };
  if (route.startsWith('/services/')) {
    const core = ['/services/wraps', '/services/ppf', '/services/ceramic', '/services/tint'];
    return { priority: core.includes(route) ? '0.9' : '0.8' };
  }
  if (route.startsWith('/areas/')) {
    const loc = LOCATIONS.find((l) => `/areas/${l.slug}` === route);
    return { priority: loc?.isPhysicalStudio ? '0.9' : '0.8' };
  }
  return { priority: '0.7' };
}

function writeSitemapAndRobots(routes) {
  const urls = routes.map((route) => {
    const { changefreq, priority } = sitemapEntry(route);
    // Trailing slash: each route is written to <route>/index.html, which
    // Netlify serves at /<route>/ (see pagePath in src/lib/siteConfig.js).
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}/`;
    const freq = changefreq ? `<changefreq>${changefreq}</changefreq>` : '';
    return `  <url><loc>${loc}</loc>${freq}<priority>${priority}</priority></url>`;
  });
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  );
  writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log(`[prerender] wrote sitemap.xml (${routes.length} URLs) and robots.txt`);
}

// Clean-URL convention static hosts expect: /learn/foo -> dist/learn/foo/index.html
function outputPathFor(route) {
  if (route === '/') return join(DIST, 'index.html');
  return join(DIST, route.replace(/^\//, ''), 'index.html');
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res) return true;
    } catch {
      // preview server not accepting connections yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`vite preview never became reachable at ${url}`);
}

async function main() {
  const routes = buildRouteList();
  writeSitemapAndRobots(routes);
  console.log(`[prerender] ${routes.length} routes to render\n`);

  // Invoke the local vite binary directly with Node — no shell wrapper
  // (no npx, no `shell: true`). A shell in between means kill() only ever
  // terminates the shell, not the actual vite server it spawned, which is
  // exactly what left a vite preview process orphaned on port 4174 during
  // testing. Spawning vite.js as a direct child means kill() reaches the
  // real process on both Windows and Linux (Netlify's CI).
  const viteBin = join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
  const previewProcess = spawn(
    process.execPath,
    [viteBin, 'preview', '--port', String(PORT), '--strictPort'],
    { cwd: ROOT, stdio: 'pipe' }
  );

  let previewStderr = '';
  previewProcess.stderr.on('data', (chunk) => { previewStderr += chunk.toString(); });
  previewProcess.on('error', (err) => { previewStderr += `\n${err.message}`; });

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    // Belt and suspenders: kill the tracked PID *and*, separately,
    // whatever process is actually bound to PORT right now. In testing,
    // killing the tracked PID alone sometimes left the port still held —
    // going by the port itself sidesteps any process-tree mismatch.
    if (process.platform === 'win32') {
      try {
        execFileSync('taskkill', ['/pid', String(previewProcess.pid), '/T', '/F'], { stdio: 'ignore' });
      } catch {
        // Already gone — fine.
      }
      try {
        const out = execFileSync('cmd', ['/c', `netstat -ano | findstr :${PORT}`], { encoding: 'utf8' });
        const pids = new Set();
        out.split('\n').forEach((line) => {
          const match = line.match(/LISTENING\s+(\d+)/);
          if (match) pids.add(match[1]);
        });
        for (const pid of pids) {
          try {
            execFileSync('taskkill', ['/pid', pid, '/F'], { stdio: 'ignore' });
          } catch {
            // Already gone — fine.
          }
        }
      } catch {
        // Nothing listening — fine, that's the goal.
      }
    } else {
      try {
        previewProcess.kill('SIGKILL');
      } catch {
        // Already gone — fine.
      }
      try {
        const out = execFileSync('sh', ['-c', `lsof -ti tcp:${PORT} || true`], { encoding: 'utf8' });
        out.split('\n').filter(Boolean).forEach((pid) => {
          try {
            execFileSync('kill', ['-9', pid.trim()]);
          } catch {
            // Already gone — fine.
          }
        });
      } catch {
        // lsof unavailable or nothing listening — fine.
      }
    }
  };
  process.on('exit', cleanup);

  try {
    await waitForServer(BASE);

    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Freezes the homepage curtain intro (Hero.jsx) at its very first,
    // fully-covering frame for every snapshot below — otherwise whatever
    // animation frame happens to be on screen when the networkidle wait
    // resolves gets baked into the static HTML a real visitor's browser
    // paints before React ever boots, which can be well past the intro
    // already having finished and exited. See the matching check in
    // Hero.jsx.
    await page.addInitScript(() => { window.__WRAPTORS_PRERENDER__ = true; });

    let successCount = 0;
    const failures = [];

    for (const route of routes) {
      try {
        const response = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
        if (!response || !response.ok()) {
          throw new Error(`HTTP ${response ? response.status() : 'no response'}`);
        }
        // useEffect-driven title/meta/canonical/OG/schema hooks run just
        // after mount — networkidle already implies mount has happened,
        // this is just a small safety margin.
        await page.waitForTimeout(150);

        const html = await page.content();
        const outPath = outputPathFor(route);
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, html);
        successCount++;
      } catch (err) {
        failures.push({ route, error: err.message });
      }
    }

    // Custom 404 — snapshot a deliberately invalid path so App.jsx's
    // catch-all <Route path="*"> (NotFoundPage) is what gets captured.
    // public/_redirects points every unmatched request at this file with
    // a real 404 status.
    try {
      await page.goto(`${BASE}/__prerender-404-sentinel__`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(150);
      const html404 = await page.content();
      writeFileSync(join(DIST, '404.html'), html404);
      console.log('[prerender] generated 404.html');
    } catch (err) {
      console.error(`[prerender] FAILED to generate 404.html: ${err.message}`);
      failures.push({ route: '404.html', error: err.message });
    }

    await browser.close();

    console.log(`\n[prerender] ${successCount}/${routes.length} routes rendered successfully.`);
    if (failures.length > 0) {
      console.error(`\n[prerender] ${failures.length} route(s) failed:`);
      failures.forEach(({ route, error }) => console.error(`  ${route} — ${error}`));
      process.exitCode = 1;
    }
  } catch (err) {
    console.error(`[prerender] Fatal error: ${err.message}`);
    if (previewStderr) console.error(`[prerender] vite preview stderr:\n${previewStderr}`);
    process.exitCode = 1;
  } finally {
    cleanup();
  }
}

main();
