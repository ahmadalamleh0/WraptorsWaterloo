import Navbar from './Navbar';
import Footer from './Footer';
import styles from './LearnHub.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useStructuredData } from '../lib/useStructuredData';
import { SITE_URL, pageUrl } from '../lib/siteConfig';

// Standalone page for a URL the old WordPress site ranked with (/services/,
// /gallery/, /locations/, /videos/, /faqs/): the Learn hub's page header
// (H1 + intro) above existing site sections passed as children, so the URL
// keeps working without a redirect and without any new visual design.
export default function SectionPage({ path, seoTitle, seoDescription, eyebrow, title, intro, schema, children }) {
  const canonicalUrl = pageUrl(path);
  useDocumentMeta(seoTitle, seoDescription, canonicalUrl);
  useStructuredData(schema);
  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: title, item: canonicalUrl },
    ],
  });

  return (
    <>
      <Navbar alwaysVisible />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h1 className={styles.headline}>{title}</h1>
            {intro && <p className={styles.sub}>{intro}</p>}
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </>
  );
}
