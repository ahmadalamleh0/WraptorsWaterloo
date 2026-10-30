import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './LearnHub.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useStructuredData } from '../lib/useStructuredData';
import { ARTICLES, CATEGORIES, SITE_URL, getCategoryBySlug } from '../data/articles';
import { ARTICLE_IMAGES } from '../data/articleImages';
import { LOCATION } from '../config/location.js';

function ArticleCard({ article }) {
  const category = getCategoryBySlug(article.category);
  return (
    <Link to={`/learn/${article.slug}/`} className={styles.card}>
      <div className={styles.cardImageWrap}>
        <img src={ARTICLE_IMAGES[article.heroImageKey]} alt={article.title} className={styles.cardImage} loading="lazy" />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{category?.label}</span>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <p className={styles.cardExcerpt}>{article.excerpt}</p>
        <span className={styles.cardLink}>Read the Guide <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}

// Renders both /learn (all) and /learn/category/:categorySlug (filtered) —
// same component, so adding a category later needs no new page/layout.
export default function LearnHub() {
  const { categorySlug } = useParams();
  const activeCategory = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const articles = activeCategory ? ARTICLES.filter((a) => a.category === activeCategory.slug) : ARTICLES;
  const canonicalUrl = activeCategory ? `${SITE_URL}/learn/category/${activeCategory.slug}/` : `${SITE_URL}/learn/`;

  useDocumentMeta(
    activeCategory ? `${activeCategory.label} Guides | Wraptors Learn` : 'Wraptors Learn — Vehicle Wrap, PPF, Ceramic & Tint Guides',
    activeCategory
      ? `Wraptors guides on ${activeCategory.label.toLowerCase()} — practical, no-nonsense answers for ${LOCATION.city} and Ontario drivers.`
      : `The Wraptors knowledge library — practical guides on vehicle wraps, paint protection film, ceramic coating and window tint for ${LOCATION.city} and Ontario drivers.`,
    canonicalUrl
  );

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: `${SITE_URL}/learn/` },
      ...(activeCategory
        ? [{ '@type': 'ListItem', position: 3, name: activeCategory.label, item: canonicalUrl }]
        : []),
    ],
  });

  return (
    <>
      <Navbar alwaysVisible />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>Wraptors Learn</span>
            <h1 className={styles.headline}>
              {activeCategory ? `${activeCategory.label} Guides` : 'The Wraptors Knowledge Library'}
            </h1>
            <p className={styles.sub}>
              {activeCategory
                ? `Practical, straight answers on ${activeCategory.label.toLowerCase()} for ${LOCATION.city} and Ontario drivers.`
                : 'Practical guides on wraps, protection film, ceramic coating and window tint — written for Ontario drivers, not search engines.'}
            </p>
          </div>
        </section>

        <nav className={styles.filterRow} aria-label="Filter by category">
          <Link to="/learn/" className={`${styles.filterPill} ${!activeCategory ? styles.filterActive : ''}`}>
            All Insights
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/learn/category/${cat.slug}/`}
              className={`${styles.filterPill} ${activeCategory?.slug === cat.slug ? styles.filterActive : ''}`}
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
