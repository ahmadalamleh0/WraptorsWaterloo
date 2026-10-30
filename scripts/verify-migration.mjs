// ══ SEO MIGRATION CHECK ══
//
// Pass/fail checks for replacing the old WordPress wraptorstricity.com:
// every legacy URL, every prerendered route, the sitemap, robots.txt and
// every internal link.
//
//   node scripts/verify-migration.mjs                 # against dist/ (local)
//   node scripts/verify-migration.mjs --base <url>    # against a deploy
//   node scripts/verify-migration.mjs --expect-noindex  # preview builds
//
// Local mode emulates Netlify's documented behaviour on dist/:
//  - a static file wins over _redirects rules (shadowing);
//  - <route>/index.html is served at /<route>/, and /<route> 301s to it
//    (Netlify support guide on trailing-slash behaviour);
//  - rules match with or without a trailing slash (Netlify redirect docs);
//  - "*" splats, 301 rules redirect, the "/* /404.html 404" catch-all
//    serves 404.html with a 404 status.
// Remote mode makes real HTTP requests (GET, redirects not followed), so
// run it against a deploy preview before launch and production after.

import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCATION, SITE_URL } from '../src/config/location.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const args = process.argv.slice(2);
const BASE = args.includes('--base') ? args[args.indexOf('--base') + 1].replace(/\/$/, '') : null;
const EXPECT_NOINDEX = args.includes('--expect-noindex');
const REPORT = args.includes('--report') ? args[args.indexOf('--report') + 1] : null;

// Old URL -> where it must end up: a final path with a 200, or 404.
// One row per URL in SEO-URL-MAPPING.csv (Tri-City's own sitemaps, crawl
// and WordPress REST API, 2026-10-30).
const LEGACY = [
  ['/', '/'],
  ['/about-wraptors/', '/about/'],
  ['/franchises/', '/franchise/'],
  ['/contact-wraptors/', '/book/'],
  ['/articles/', '/articles/'],
  ['/blog/', '/learn/'],
  ['/services/', '/services/'],
  ['/locations/', '/locations/'],
  ['/gallery/', '/gallery/'],
  ['/videos/', '/videos/'],
  ['/faqs/', '/faqs/'],
  ['/footer/', 404],
  ['/services/vehicle-wrapping/', '/services/wraps/'],
  ['/services/paint-protection/', '/services/ppf/'],
  ['/services/window-tinting/', '/services/tint/'],
  ['/services/auto-detailing/', '/services/detailing/'],
  ['/services/custom-interior/', '/services/custom-interiors/'],
  ['/services/starlight-headliner/', '/services/starlight/'],
  ['/services/galaxy-ceilings/', '/services/starlight/'],
  ['/services/racing-stripes/', '/services/stripes-decals/'],
  ['/services/decals/', '/services/stripes-decals/'],
  ['/services/caliper-painting/', '/services/caliper-painting/'],
  ['/services/wheel-painting/', '/services/wheel-painting/'],
  ['/category/vehicle-wrap/', '/learn/category/vehicle-wraps/'],
  ['/category/custom-vinyl-wrap/', '/learn/category/vehicle-wraps/'],
  ['/category/uncategorized/', 404],
  ['/what-you-need-to-know-before-designing-a-vehicle-wrap/', '/services/wraps/#commercial-wraps'],
  ['/5-things-you-might-not-know-about-vehicle-wraps/', '/services/wraps/#commercial-wraps'],
  ['/4-surprising-ways-custom-vinyl-wraps-can-boost-brand-awareness/', '/services/wraps/#commercial-wraps'],
  // Slash-less copies the old site served with a 200
  ['/contact-wraptors', '/book/'],
  ['/services/vehicle-wrapping', '/services/wraps/'],
  ['/services/galaxy-ceilings', '/services/starlight/'],
  ['/services/caliper-painting', '/services/caliper-painting/'],
  ['/services/racing-stripes', '/services/stripes-decals/'],
  ['/blog', '/learn/'],
  ['/services/decals', '/services/stripes-decals/'],
  ['/about-wraptors', '/about/'],
  ['/services/wheel-painting', '/services/wheel-painting/'],
  ['/locations', '/locations/'],
  ['/faqs', '/faqs/'],
  ['/franchises', '/franchise/'],
  ['/what-you-need-to-know-before-designing-a-vehicle-wrap', '/services/wraps/#commercial-wraps'],
  // Individual FAQ pages (noindex on the old site)
  ['/ufaq/what-is-a-vehicle-wrap/', '/faqs/#what-is-a-vehicle-wrap'],
  ['/ufaq/whats-the-difference-between-a-%c2%bd-%c2%bc-and-full-wrap/', '/faqs/#whats-the-difference-between-a-half-quarter-and-full-wrap'],
  ['/ufaq/will-the-car-wrap-damage-my-paint/', '/faqs/#will-the-car-wrap-damage-my-paint'],
  ['/ufaq/can-a-car-wrap-be-removed/', '/faqs/#can-a-car-wrap-be-removed'],
  ['/ufaq/will-you-wrap-a-leased-vehicle/', '/faqs/#will-you-wrap-a-leased-vehicle'],
  ['/ufaq/how-do-i-care-for-my-car-wrap/', '/faqs/#how-do-i-care-for-my-car-wrap'],
  ['/ufaq/are-car-wraps-applied-to-windows/', '/faqs/#are-car-wraps-applied-to-windows'],
  ['/ufaq/if-the-company-information-on-my-vehicle-wrap-changes-can-it-be-replaced/', '/faqs/#if-the-company-information-on-my-vehicle-wrap-changes-can-it-be-replaced'],
  ['/ufaq/will-you-pay-me-to-drive-my-car-with-someone-elses-advertising/', '/faqs/#will-you-pay-me-to-drive-my-car-with-someone-elses-advertising'],
  ['/ufaq/is-there-a-guarantee-on-the-vehicle-wrap/', '/faqs/'],
  ['/ufaq/how-long-does-it-take-to-wrap-a-car/', '/faqs/'],
  ['/ufaq/do-you-wrap-anything-other-than-vehicles/', '/faqs/'],
  ['/ufaq/how-is-a-vehicle-wrap-designed/', '/faqs/'],
  ['/ufaq/how-are-car-wraps-printed/', '/faqs/'],
  ['/ufaq/how-do-you-wrap-a-vehicle/', '/faqs/'],
  ['/ufaq/what-is-a-vehicle-wrap', '/faqs/#what-is-a-vehicle-wrap'],
  ['/ufaq/', '/faqs/'],
  // WordPress defaults and slugs the old install redirected itself
  ['/author/wtconline/', '/'],
  ['/home/', '/'],
  ['/contact/', '/book/'],
  ['/faq/', '/faqs/'],
  ['/about/', '/about/'],
  ['/feed/', 404],
  ['/comments/feed/', 404],
  ['/page/2/', 404],
  ['/home/financing-bg/', 404],
  ['/services/starlight-headliner/service-gallery-pic35/', 404],
  ['/wp-content/uploads/2023/06/financing-bg.jpg', 404],
];

// ── Netlify emulation over dist/ ─────────────────────────────────────────
const strip = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

function parseRedirects() {
  return readFileSync(join(DIST, '_redirects'), 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const [from, to, status] = l.split(/\s+/);
      return { from, to, status: Number(status.replace('!', '')), force: status.endsWith('!') };
    });
}

function staticFile(path) {
  const clean = decodeURIComponent(path.split('#')[0]);
  if (clean === '/') return { kind: 'file', file: join(DIST, 'index.html') };
  const asFile = join(DIST, clean);
  if (!clean.endsWith('/') && existsSync(asFile) && statSync(asFile).isFile()) return { kind: 'file', file: asFile };
  const asDir = join(DIST, strip(clean), 'index.html');
  if (existsSync(asDir)) {
    return clean.endsWith('/') ? { kind: 'file', file: asDir } : { kind: 'slash', to: `${clean}/` };
  }
  return null;
}

function matchRule(rule, path) {
  const from = strip(rule.from).toLowerCase();
  const p = strip(path).toLowerCase();
  if (from.endsWith('/*')) return p === from.slice(0, -2) || p.startsWith(from.slice(0, -1));
  if (from === '*' || from === '/*') return true;
  return p === from;
}

function localRequest(path, rules) {
  const hit = staticFile(path);
  if (hit?.kind === 'slash') return { status: 301, location: hit.to };
  if (hit) return { status: 200, body: readFileSync(hit.file, 'utf8') };
  for (const rule of rules) {
    if (!matchRule(rule, path)) continue;
    if (rule.status === 301 || rule.status === 302) return { status: rule.status, location: rule.to };
    const target = staticFile(rule.to);
    return { status: rule.status, body: target ? readFileSync(target.file, 'utf8') : '' };
  }
  return { status: 404, body: '' };
}

async function remoteRequest(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  const location = res.headers.get('location');
  return {
    status: res.status,
    location: location ? location.replace(/^https?:\/\/[^/]+/, '') : null,
    body: res.status === 200 || res.status === 404 ? await res.text() : '',
    xRobots: res.headers.get('x-robots-tag'),
  };
}

const rules = BASE ? null : parseRedirects();
const request = (path) => (BASE ? remoteRequest(path) : Promise.resolve(localRequest(path, rules)));

async function resolve(path) {
  const hops = [];
  let current = path;
  for (let i = 0; i < 6; i++) {
    const res = await request(current.split('#')[0] === '' ? '/' : current.split('#')[0]);
    if (res.status === 301 || res.status === 302) {
      const next = res.location.includes('#') || !current.includes('#') ? res.location : `${res.location}#${current.split('#')[1]}`;
      hops.push({ from: current, status: res.status, to: next });
      current = next;
      continue;
    }
    return { final: current, status: res.status, hops, body: res.body, xRobots: res.xRobots };
  }
  return { final: current, status: 'loop', hops, body: '' };
}

// ── HTML helpers (prerendered output is generated by us, so regex is fine) ─
const attr = (html, re) => (html.match(re) || [])[1] ?? null;
const canonicalOf = (html) => attr(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) ?? attr(html, /<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
const robotsOf = (html) => attr(html, /<meta[^>]+name="robots"[^>]+content="([^"]+)"/i);
const titleOf = (html) => attr(html, /<title>([^<]*)<\/title>/i);
const descOf = (html) => attr(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
const ogUrlOf = (html) => attr(html, /<meta[^>]+property="og:url"[^>]+content="([^"]+)"/i);
const h1s = (html) => [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
const jsonLd = (html) => [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => {
  try { return JSON.parse(m[1]); } catch { return { invalid: true }; }
});
const types = (blocks) => {
  const out = new Set();
  const walk = (o) => {
    if (Array.isArray(o)) o.forEach(walk);
    else if (o && typeof o === 'object') {
      if (o['@type']) [].concat(o['@type']).forEach((t) => out.add(t));
      Object.values(o).forEach(walk);
    }
  };
  walk(blocks);
  return out;
};
const visibleWords = (html) => {
  const main = (html.match(/<main[\s\S]*<\/main>/i) || [html])[0];
  return main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
};
const internalLinks = (html) => [...html.matchAll(/<a[^>]+href="(\/[^"]*)"/gi)].map((m) => m[1].replace(/&amp;/g, '&'));
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

// ── Checks ───────────────────────────────────────────────────────────────
const results = [];
const check = (group, name, pass, detail = '') => results.push({ group, name, pass: Boolean(pass), detail });

const sitemapRes = await request('/sitemap.xml');
const sitemapUrls = [...(sitemapRes.body || '').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const routes = sitemapUrls.map((u) => u.replace(SITE_URL, ''));
check('Sitemap', 'sitemap.xml returns 200 with URLs', sitemapRes.status === 200 && routes.length > 0, `${routes.length} URLs`);
check('Sitemap', 'every sitemap URL is on the production domain with a trailing slash',
  sitemapUrls.every((u) => u.startsWith(`${SITE_URL}/`) && u.endsWith('/')),
  sitemapUrls.filter((u) => !u.endsWith('/')).join(' '));

const robotsRes = await request('/robots.txt');
check('Robots', 'robots.txt allows crawling', robotsRes.status === 200 && /Allow: \//.test(robotsRes.body) && !/Disallow: \/\s*$/m.test(robotsRes.body));
check('Robots', `robots.txt points at ${SITE_URL}/sitemap.xml (not another domain)`,
  (robotsRes.body.match(/^Sitemap:\s*(\S+)/gim) || []).every((l) => l.endsWith(`${SITE_URL}/sitemap.xml`)) && /Sitemap:/i.test(robotsRes.body));

const titles = new Map();
const descriptions = new Map();
const pageIds = new Map();
const pageLinks = new Map();
for (const route of routes) {
  const res = await request(route);
  const html = res.body || '';
  const url = `${SITE_URL}${route}`;
  pageIds.set(route, ids(html));
  pageLinks.set(route, internalLinks(html));
  check('Routes', `${route} returns 200 directly`, res.status === 200, `got ${res.status}${res.location ? ` -> ${res.location}` : ''}`);
  if (route !== '/') {
    const slashless = await request(strip(route));
    check('Routes', `${strip(route)} 301s to ${route} in one hop`, slashless.status === 301 && slashless.location === route, `got ${slashless.status} ${slashless.location ?? ''}`);
  }
  check('Metadata', `${route} canonical is ${url}`, canonicalOf(html) === url, `got ${canonicalOf(html)}`);
  check('Metadata', `${route} og:url matches canonical`, ogUrlOf(html) === url, `got ${ogUrlOf(html)}`);
  const robots = robotsOf(html) || '';
  if (EXPECT_NOINDEX) check('Indexing', `${route} is noindex (preview build)`, /noindex/i.test(robots) || /noindex/i.test(res.xRobots || ''), robots);
  else check('Indexing', `${route} has no noindex`, !/noindex/i.test(robots) && !/noindex/i.test(res.xRobots || ''), robots || res.xRobots || '');
  const title = titleOf(html);
  const desc = descOf(html);
  check('Metadata', `${route} has a title and a 50–165 character description`, title && desc && desc.length >= 50 && desc.length <= 165, `${desc?.length ?? 0} chars`);
  titles.set(title, [...(titles.get(title) || []), route]);
  descriptions.set(desc, [...(descriptions.get(desc) || []), route]);
  const headings = h1s(html);
  check('Content', `${route} has exactly one non-empty H1`, headings.length === 1 && headings[0].length > 0, headings.join(' | '));
  // Forms, listings and media pages (booking, franchise, Learn categories,
  // gallery/locations/videos) are short by nature; 50 words still proves
  // the static HTML is a real page rather than an empty JS shell.
  const words = visibleWords(html);
  const minWords = /^\/(book|franchise|gallery|locations|videos|services)\/$|^\/learn\/category\//.test(route) ? 50 : 150;
  check('Content', `${route} prerendered HTML has meaningful text without JS (≥${minWords} words)`, words >= minWords, `${words} words`);
  const blocks = jsonLd(html);
  const t = types(blocks);
  check('Structured data', `${route} JSON-LD parses and includes AutomotiveBusiness`, !blocks.some((b) => b.invalid) && t.has('AutomotiveBusiness'), [...t].join(', '));
  const biz = JSON.stringify(blocks);
  // No rating or price signal until Tri-City confirms one (LAUNCH-CHECKLIST.md).
  check('Structured data', `${route} has no unverified AggregateRating, Review or priceRange`,
    !t.has('AggregateRating') && !t.has('Review') && !biz.includes('"priceRange"'), [...t].join(', '));
  check('NAP', `${route} schema and visible footer carry the same name, address and phone`,
    biz.includes(LOCATION.contact.phone) && (!LOCATION.address.postalCode || biz.includes(LOCATION.address.postalCode)) && biz.includes(LOCATION.brandName)
      && html.includes(LOCATION.contact.phoneDisplay) && html.includes(LOCATION.address.street));
  check('NAP', `${route} footer links the dialable phone, email and the client Maps link`,
    html.includes(`href="tel:${LOCATION.contact.phone}"`) && html.includes(`href="mailto:${LOCATION.contact.email}"`)
      && (!LOCATION.contact.phoneIntl || html.includes(LOCATION.contact.phoneIntl))
      && (!LOCATION.address.mapsUrl || (html.includes(`href="${LOCATION.address.mapsUrl}"`) && biz.includes(LOCATION.address.mapsUrl))));
  if (route === '/about/') check('Content', '/about/ H1 keeps the old page heading "About Wraptors"', /^About Wraptors/i.test(headings[0] || ''), headings.join(' | '));
  if (route.startsWith('/learn/') && !route.startsWith('/learn/category/') && route !== '/learn/') {
    check('Structured data', `${route} has Article + FAQPage + BreadcrumbList`, ['Article', 'FAQPage', 'BreadcrumbList'].every((x) => t.has(x)), [...t].join(', '));
  }
  if (route === '/faqs/') check('Structured data', '/faqs/ has FAQPage with every answer in the HTML', t.has('FAQPage') && (html.match(/class="[^"]*faqAnswer/g) || []).length >= 9);
}
for (const [title, list] of titles) check('Metadata', `title used once: "${title}"`, list.length === 1, list.join(' '));
for (const [desc, list] of descriptions) if (desc) check('Metadata', `description used once (${list[0]})`, list.length === 1, list.join(' '));

// Internal links: every same-site link must reach a 200 page with no redirect.
const linkTargets = new Map();
for (const [route, links] of pageLinks) for (const l of links) linkTargets.set(l, [...(linkTargets.get(l) || []), route]);
for (const [link, from] of linkTargets) {
  const [path, hash] = link.split('#');
  if (/\.(xml|txt|webmanifest|ico|png|jpe?g|svg|webp|mp4)$/i.test(path)) continue;
  const res = await request(path || '/');
  const ok = res.status === 200 && (!hash || !pageIds.has(path || '/') || pageIds.get(path || '/').has(hash));
  check('Internal links', `${link} resolves directly (200, no redirect)`, ok, `got ${res.status}${res.location ? ` -> ${res.location}` : ''}; linked from ${from.length} page(s)`);
}

// Legacy URLs: one hop to the right destination, or a real 404.
for (const [oldPath, expected] of LEGACY) {
  const r = await resolve(oldPath);
  if (expected === 404) {
    check('Legacy URLs', `${oldPath} -> 404`, r.status === 404 && r.hops.length === 0, `got ${r.status} after ${r.hops.length} hop(s)`);
    continue;
  }
  const [expPath, expHash] = expected.split('#');
  const [finPath, finHash] = r.final.split('#');
  const hopsOk = oldPath === expected ? r.hops.length === 0 : r.hops.length === 1;
  const anchorOk = !expHash || (pageIds.get(expPath)?.has(expHash) ?? false);
  check('Legacy URLs', `${oldPath} -> ${expected}`,
    r.status === 200 && finPath === expPath && (finHash || '') === (expHash || '') && hopsOk && anchorOk && canonicalOf(r.body) === `${SITE_URL}${expPath}`,
    `got ${r.status} ${r.final} in ${r.hops.length} hop(s)${anchorOk ? '' : '; anchor missing on page'}`);
}

// ── Report ───────────────────────────────────────────────────────────────
const failed = results.filter((r) => !r.pass);
const groups = [...new Set(results.map((r) => r.group))];
const lines = [];
lines.push(`# Migration check — ${BASE ?? 'local dist/ (Netlify emulation)'}`, '');
lines.push(`Generated ${new Date().toISOString()} by \`node scripts/verify-migration.mjs${args.length ? ` ${args.join(' ')}` : ''}\`.`, '');
lines.push(`**${results.length - failed.length} passed, ${failed.length} failed.**`, '');
lines.push('| Group | Checks | Passed | Failed |', '|---|---|---|---|');
for (const g of groups) {
  const rs = results.filter((r) => r.group === g);
  lines.push(`| ${g} | ${rs.length} | ${rs.filter((r) => r.pass).length} | ${rs.filter((r) => !r.pass).length} |`);
}
if (failed.length) {
  lines.push('', '## Failures', '', '| Group | Check | Detail |', '|---|---|---|');
  for (const f of failed) lines.push(`| ${f.group} | ${f.name.replace(/\|/g, '\\|')} | ${f.detail.replace(/\|/g, '\\|')} |`);
}
lines.push('', '## Legacy URLs', '', '| Result | Old URL → expected | Detail |', '|---|---|---|');
for (const r of results.filter((x) => x.group === 'Legacy URLs')) lines.push(`| ${r.pass ? 'PASS' : 'FAIL'} | \`${r.name}\` | ${r.detail} |`);
const report = lines.join('\n') + '\n';
if (REPORT) writeFileSync(REPORT, report);
console.log(report.split('\n## Legacy URLs')[0]);
console.log(`${results.length - failed.length}/${results.length} checks passed`);
process.exitCode = failed.length ? 1 : 0;
