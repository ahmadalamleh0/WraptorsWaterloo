// Single source of truth for the production domain, so every canonical/OG
// URL and the sitemap always agree — never hardcode this string elsewhere.
// The value itself lives in the location config.
import { SITE_URL } from '../config/location.js';

export { SITE_URL };

// Every page is published at a trailing-slash URL. scripts/prerender.mjs
// writes each route to <route>/index.html, which Netlify serves at
// /<route>/ and 301-redirects /<route> to (Netlify support guide on
// trailing-slash behaviour) — the same convention the old WordPress site
// used. Canonicals, the sitemap, redirect targets and internal links all
// use this form so none of them point at a redirect. Route definitions in
// App.jsx stay slash-less; React Router matches either form.
export function pagePath(path) {
  return path.endsWith('/') ? path : `${path}/`;
}

export function pageUrl(path) {
  return `${SITE_URL}${pagePath(path)}`;
}
