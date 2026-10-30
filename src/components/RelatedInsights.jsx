import { Link } from 'react-router-dom';
import styles from './RelatedInsights.module.css';
import { getArticlesByCategory } from '../data/articles';
import ArticleCarousel from './ArticleCarousel';

// "Learn More" strip for service pages — a horizontal image-card carousel
// of the matching Learn category's articles, plus a link to the full
// library. Deliberately compact; the full editorial experience lives on
// /learn itself.
export default function RelatedInsights({ category }) {
  const articles = getArticlesByCategory(category);
  if (articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Learn More</span>
          <h2 className={styles.title}>Explore the Details Before You Build</h2>
        </div>
        <ArticleCarousel articles={articles} />
        <Link to="/learn/" className={styles.viewAll}>View All Insights <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
