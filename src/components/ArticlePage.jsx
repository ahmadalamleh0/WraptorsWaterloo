import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FaqAccordion from './FaqAccordion';
import styles from './ArticlePage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useStructuredData } from '../lib/useStructuredData';
import { SITE_URL, getArticleBySlug, getCategoryBySlug, getRelatedArticleObjects } from '../data/articles';
import { ARTICLE_IMAGES } from '../data/articleImages';
import { SERVICE_CATALOG, getLocationBySlug } from '../data/geoLocations';
import { LOCATION } from '../config/location.js';

function slugifyHeading(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  // Build the date in local time — new Date('YYYY-MM-DD') parses as UTC
  // midnight, which shows as the previous day in North American time zones.
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// One reusable template rendered entirely from an article object in
// src/data/articles.js — add/edit an article there, not here. The table of
// contents is derived from `sections` (not its own stored field) so it can
// never drift out of sync with the actual article body.
export default function ArticlePage() {
  const { articleSlug } = useParams();
  const article = getArticleBySlug(articleSlug);
  const category = article ? getCategoryBySlug(article.category) : null;
  const relatedArticles = article ? getRelatedArticleObjects(article) : [];
  const relatedService = article ? SERVICE_CATALOG[article.relatedService] : null;
  const relatedGeo = article?.relatedGeo ? getLocationBySlug(article.relatedGeo) : null;
  const canonicalUrl = article ? `${SITE_URL}/learn/${article.slug}/` : undefined;
  const ogImageUrl = article?.heroImageKey ? `${SITE_URL}${ARTICLE_IMAGES[article.heroImageKey]}` : undefined;

  useDocumentMeta(article?.seoTitle, article?.metaDescription, canonicalUrl, ogImageUrl);

  useStructuredData(
    article && {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.metaDescription,
      image: article.heroImageKey ? `${SITE_URL}${ARTICLE_IMAGES[article.heroImageKey]}` : undefined,
      datePublished: article.publishDate,
      dateModified: article.updatedDate || article.publishDate,
      author: { '@type': 'Organization', name: LOCATION.brandName },
      publisher: { '@type': 'Organization', name: LOCATION.brandName },
      mainEntityOfPage: canonicalUrl,
    }
  );

  useStructuredData(
    article && {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Learn', item: `${SITE_URL}/learn/` },
        { '@type': 'ListItem', position: 3, name: category?.label, item: `${SITE_URL}/learn/category/${article.category}/` },
        { '@type': 'ListItem', position: 4, name: article.title, item: canonicalUrl },
      ],
    }
  );

  useStructuredData(
    article?.faqs?.length && {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    }
  );

  if (!article) {
    return (
      <>
        <Navbar alwaysVisible />
        <main className={styles.notFound}>
          <p>This guide couldn&rsquo;t be found.</p>
          <Link to="/learn/">Back to Learn</Link>
        </main>
        <Footer />
      </>
    );
  }

  const sectionsWithIds = article.sections.map((s) => ({ ...s, id: slugifyHeading(s.heading) }));

  return (
    <>
      <Navbar alwaysVisible />
      <main>

        {/* ── Breadcrumbs ── */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/learn/">Learn</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/learn/category/${article.category}/`}>{category?.label}</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>{article.title}</span>
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>Wraptors Insights</span>
            <h1 className={styles.headline}>{article.title}</h1>
            <p className={styles.excerpt}>{article.intro}</p>
            <div className={styles.metaRow}>
              {article.publishDate && <span>Published {formatDate(article.publishDate)}</span>}
              {article.updatedDate && article.updatedDate !== article.publishDate && (
                <span>· Updated {formatDate(article.updatedDate)}</span>
              )}
            </div>
          </div>
          {article.heroImageKey && (
            <div className={styles.heroImageWrap}>
              <img src={ARTICLE_IMAGES[article.heroImageKey]} alt={article.title} className={styles.heroImage} loading="eager" />
            </div>
          )}
        </section>

        <div className={styles.body}>
          {/* ── Table of contents ── */}
          <nav className={styles.toc} aria-label="Table of contents">
            <span className={styles.tocLabel}>In This Guide</span>
            <ol className={styles.tocList}>
              {sectionsWithIds.map((s) => (
                <li key={s.id}><a href={`#${s.id}`}>{s.heading}</a></li>
              ))}
              <li><a href="#faqs">Common Questions</a></li>
            </ol>
          </nav>

          {/* ── Sections ── */}
          <article className={styles.articleBody}>
            {sectionsWithIds.map((section) => (
              <section key={section.id} id={section.id} className={styles.section}>
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className={styles.paragraph}>{paragraph}</p>
                ))}
                {section.image && (
                  <figure className={styles.sectionImageWrap}>
                    <img
                      src={ARTICLE_IMAGES[section.image]}
                      alt=""
                      className={styles.sectionImage}
                      loading="lazy"
                    />
                  </figure>
                )}
              </section>
            ))}

            {relatedGeo && (
              <p className={styles.geoMention}>
                Based in or around {relatedGeo.locationName}? See how Wraptors serves{' '}
                <Link to={`/areas/${relatedGeo.slug}/`}>{relatedGeo.locationName}</Link> directly.
              </p>
            )}

            {/* ── FAQs ── */}
            <section id="faqs" className={styles.section}>
              <h2 className={styles.sectionHeading}>Common Questions</h2>
              <FaqAccordion faqs={article.faqs} />
            </section>
          </article>
        </div>

        {/* ── Related articles ── */}
        {relatedArticles.length > 0 && (
          <section className={styles.relatedSection}>
            <span className={styles.relatedLabel}>Keep Reading</span>
            <div className={styles.relatedGrid}>
              {relatedArticles.map((rel) => (
                <Link key={rel.slug} to={`/learn/${rel.slug}/`} className={styles.relatedCard}>
                  <span className={styles.relatedCardTitle}>{rel.title}</span>
                  <span className={styles.relatedCardLink}>Read the Guide <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
            <Link to="/learn/" className={styles.viewAllLink}>View All Insights <span aria-hidden="true">→</span></Link>
          </section>
        )}

        {/* ── CTA ── */}
        <section className={styles.ctaSection}>
          <span className={styles.eyebrowSmall}>
            {article.category === 'vehicle-wraps' ? 'Ready to Transform Your Vehicle?' : 'Ready to Protect Your Vehicle?'}
          </span>
          <h2 className={styles.ctaTitle}>Let&rsquo;s Talk About Your Car</h2>
          <div className={styles.ctaActions}>
            {relatedService && (
              <Link to={relatedService.path} className={styles.ctaPrimary}>
                Explore {relatedService.label} <span aria-hidden="true">→</span>
              </Link>
            )}
            <a href="/#cta" className={styles.ctaSecondary}>Request a Quote</a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
