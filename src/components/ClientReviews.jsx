import { useEffect, useRef, useState } from 'react';
import styles from './ClientReviews.module.css';
import { LOCATION } from '../config/location.js';

// The studio's own Google rating and reviews. Empty for Wraptors Tri-City
// until the client supplies them: reviews from another location were not
// carried over. Each review needs the reviewer's name, rating and exact
// wording from the Tri-City Google listing; the rating and count must be
// checked on that listing. With no reviews the section is hidden.
const GOOGLE_RATING = null;
const GOOGLE_REVIEW_COUNT = null;
const REVIEWS = [];

function GoogleG(props) {
  return (
    <svg viewBox="0 0 48 48" width="16" height="16" aria-hidden="true" {...props}>
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.14-3.15-.4-4.64H24v9.02h11.84c-.51 2.76-2.07 5.1-4.4 6.67v5.53h7.12C42.62 37.06 45.1 31.28 45.1 24.5z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.32l-7.12-5.53c-1.97 1.33-4.5 2.11-7.44 2.11-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.19c-.44-1.33-.69-2.75-.69-4.19s.25-2.86.69-4.19v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.89l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.11l7.35 5.7c1.73-5.2 6.58-9.06 12.31-9.06z" />
    </svg>
  );
}

function Stars({ rating }) {
  return (
    <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          width="13"
          height="13"
          className={i < rating ? styles.starFilled : styles.starEmpty}
          aria-hidden="true"
        >
          <path d="M10 1.6l2.55 5.53 6.03.66-4.5 4.15 1.24 5.96L10 14.9l-5.32 3-1.24-5.96-4.5-4.15 6.03-.66L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.avatar} aria-hidden="true">{review.name.charAt(0)}</span>
        <span className={styles.reviewerName}>{review.name}</span>
        <GoogleG className={styles.cardGoogleG} />
      </div>
      <Stars rating={review.rating} />
      <p className={`${styles.reviewText} ${expanded ? styles.reviewTextExpanded : ''}`}>
        {review.text}
      </p>
      <button
        type="button"
        className={styles.readMore}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>
      <div className={styles.cardFooter}>
        <span className={styles.reviewTag}>{review.tag.toUpperCase()}</span>
      </div>
    </article>
  );
}

export default function ClientReviews() {
  const headerRef = useRef(null);
  const summaryRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const targets = [headerRef.current, summaryRef.current, trackRef.current].filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (REVIEWS.length === 0 || GOOGLE_RATING == null) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div ref={headerRef} className={`${styles.header} ${styles.animUp}`}>
          <h2 className={styles.title}>CLIENT EXPERIENCES.</h2>
        </div>

        <div ref={summaryRef} className={`${styles.summaryBar} ${styles.animUp}`}>
          <div className={styles.summaryLeft}>
            <GoogleG className={styles.summaryGoogleG} />
            <div className={styles.summaryText}>
              <span className={styles.summarySource}>Google Reviews</span>
              <span className={styles.summaryRatingRow}>
                <span className={styles.summaryScore}>{GOOGLE_RATING.toFixed(1)}</span>
                <Stars rating={Math.round(GOOGLE_RATING)} />
                <span className={styles.summaryCount}>({GOOGLE_REVIEW_COUNT} reviews)</span>
              </span>
            </div>
          </div>
          <a
            className={styles.writeReviewButton}
            href={`https://www.google.com/search?q=${encodeURIComponent(`${LOCATION.brandName} ${LOCATION.city}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Write a Review
          </a>
        </div>

        <div ref={trackRef} className={`${styles.track} ${styles.animUp}`}>
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
