import { useEffect } from 'react';
import { LOCATION } from '../config/location.js';

const DEFAULT_TITLE = LOCATION.seo.title;
const DEFAULT_DESCRIPTION = LOCATION.seo.description;

function upsertMeta(selector, attr, value, createAttrs) {
  let el = document.querySelector(selector);
  let created = false;
  if (!el) {
    el = document.createElement('meta');
    Object.entries(createAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
    created = true;
  }
  const prev = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return { el, prev, created };
}

// Sets document.title, <meta name="description">, the canonical <link>,
// and mirrors both into the Open Graph/Twitter tags (so a prerendered GEO
// or article page carries its own OG title/description/url rather than
// the homepage's) — all restored to the site defaults on unmount. This is
// a client-side SPA with no server rendering, so on a live (non-
// prerendered) visit these tags only ever reach a crawler that executes
// JavaScript; the build-time prerender step (scripts/prerender.mjs) is
// what makes the *static* HTML carry the right values too.
export function useDocumentMeta(title, description, canonicalUrl, imageUrl) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    const metaEl = document.querySelector('meta[name="description"]');
    const prevDescription = metaEl?.getAttribute('content');
    if (description && metaEl) metaEl.setAttribute('content', description);

    let canonicalEl = null;
    let createdCanonical = false;
    let prevHref = null;
    if (canonicalUrl) {
      canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
        createdCanonical = true;
      } else {
        prevHref = canonicalEl.getAttribute('href');
      }
      canonicalEl.setAttribute('href', canonicalUrl);
    }

    const ogRestores = [];
    if (title) {
      ogRestores.push(upsertMeta('meta[property="og:title"]', 'content', title, { property: 'og:title' }));
      ogRestores.push(upsertMeta('meta[name="twitter:title"]', 'content', title, { name: 'twitter:title' }));
    }
    if (description) {
      ogRestores.push(upsertMeta('meta[property="og:description"]', 'content', description, { property: 'og:description' }));
      ogRestores.push(upsertMeta('meta[name="twitter:description"]', 'content', description, { name: 'twitter:description' }));
    }
    if (canonicalUrl) {
      ogRestores.push(upsertMeta('meta[property="og:url"]', 'content', canonicalUrl, { property: 'og:url' }));
    }
    if (imageUrl) {
      ogRestores.push(upsertMeta('meta[property="og:image"]', 'content', imageUrl, { property: 'og:image' }));
      ogRestores.push(upsertMeta('meta[name="twitter:image"]', 'content', imageUrl, { name: 'twitter:image' }));
      ogRestores.push(upsertMeta('meta[name="twitter:card"]', 'content', 'summary_large_image', { name: 'twitter:card' }));
    }

    return () => {
      document.title = prevTitle || DEFAULT_TITLE;
      if (metaEl) metaEl.setAttribute('content', prevDescription || DEFAULT_DESCRIPTION);
      if (canonicalEl) {
        if (createdCanonical) canonicalEl.remove();
        else if (prevHref) canonicalEl.setAttribute('href', prevHref);
      }
      ogRestores.forEach(({ el, prev, created }) => {
        if (created) el.remove();
        else if (prev !== null) el.setAttribute('content', prev);
      });
    };
  }, [title, description, canonicalUrl, imageUrl]);
}
