import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStructuredData } from '../lib/useStructuredData';
import { pagePath, pageUrl } from '../lib/siteConfig';
import styles from './Breadcrumbs.module.css';

// Visible breadcrumb trail + the matching BreadcrumbList JSON-LD, built
// from the same items so the two can't drift apart. `items` is
// [{ name, path }], root first; the last item is the current page.
// Styling is deliberately quiet (small UI type, low-contrast white) so it
// sits inside existing hero text groups rather than adding a new band.
export default function Breadcrumbs({ items, className = '' }) {
  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  }), [items]);
  useStructuredData(schema);

  return (
    <nav className={`${styles.trail} ${className}`} aria-label="Breadcrumb">
      {items.map((item, i) => (
        i < items.length - 1 ? (
          <span key={item.path} className={styles.step}>
            <Link to={pagePath(item.path)}>{item.name}</Link>
            <span className={styles.sep} aria-hidden="true">/</span>
          </span>
        ) : (
          <span key={item.path} className={styles.current} aria-current="page">{item.name}</span>
        )
      ))}
    </nav>
  );
}
