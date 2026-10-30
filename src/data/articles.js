// ══ LEARN / INSIGHTS SYSTEM — single source of truth ══
//
// One reusable template (ArticlePage.jsx) renders every article from the
// data below. Add a new article by adding an entry to ARTICLES; add a new
// category by adding an entry to CATEGORIES — nothing else needs to
// change to support more categories later.
//
// Empty for Wraptors Tri-City: the source project's guides were written
// for Hamilton and were not carried over. While ARTICLES is empty the Learn
// hub is switched off (LEARN_ENABLED): no /learn/ routes are prerendered
// and the links to it are hidden. Don't publish prices, warranty terms,
// durability figures or legal percentages unless they're confirmed.
//
// Field reference — see the source project's articles.js for an entry's shape. tableOfContents
// is intentionally NOT a stored field — it's derived from `sections` in
// ArticlePage.jsx, so editing sections can never leave a stale TOC behind.

export { SITE_URL } from '../lib/siteConfig.js';

export const CATEGORIES = [
  { slug: 'vehicle-wraps',          label: 'Vehicle Wraps',         relatedService: 'wraps' },
  { slug: 'paint-protection-film',  label: 'Paint Protection Film', relatedService: 'ppf' },
  { slug: 'ceramic-coating',        label: 'Ceramic Coating',       relatedService: 'ceramic' },
  { slug: 'window-tint',            label: 'Window Tint',           relatedService: 'tint' },
];

export const ARTICLES = [];

// The Learn hub only exists once there is something in it.
export const LEARN_ENABLED = ARTICLES.length > 0;

export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug) {
  return ARTICLES.filter((a) => a.category === categorySlug);
}

export function getFeaturedArticles(limit = 3) {
  return ARTICLES.filter((a) => a.featured).slice(0, limit);
}

export function getRelatedArticleObjects(article) {
  return (article.relatedArticles || []).map(getArticleBySlug).filter(Boolean);
}

export function getCategoryBySlug(categorySlug) {
  return CATEGORIES.find((c) => c.slug === categorySlug);
}
