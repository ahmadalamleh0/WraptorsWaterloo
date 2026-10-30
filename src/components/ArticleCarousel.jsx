import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ArticleCarousel.module.css';
import { ARTICLE_IMAGES } from '../data/articleImages';

// Horizontal image-card carousel for article links — used by RelatedInsights
// on every service page. Native scroll-snap drives both the desktop arrow
// buttons (scrollBy) and mobile swipe (free, built into overflow-x:auto),
// so there's no autoplay/JS-timer state to manage.
function ArrowIcon({ flip }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export default function ArticleCarousel({ articles }) {
  const trackRef = useRef(null);

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-card]');
    const amount = card ? card.getBoundingClientRect().width + 16 : 300;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => scrollByCard(-1)}
        aria-label="Previous articles"
      >
        <ArrowIcon />
      </button>

      <div className={styles.track} ref={trackRef}>
        {articles.map((article) => (
          <Link key={article.slug} to={`/learn/${article.slug}/`} className={styles.card} data-card>
            <div className={styles.cardImageWrap}>
              <img
                src={ARTICLE_IMAGES[article.heroImageKey]}
                alt={article.title}
                className={styles.cardImage}
                loading="lazy"
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{article.title}</h3>
              <span className={styles.cardLink}>Read article <span aria-hidden="true">→</span></span>
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => scrollByCard(1)}
        aria-label="Next articles"
      >
        <ArrowIcon flip />
      </button>
    </div>
  );
}
