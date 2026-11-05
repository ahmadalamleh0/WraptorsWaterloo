import { useEffect, useRef, useState } from 'react';
import styles from './NeonSign.module.css';

// Branded intro above Masterpieces: a "Wraptors" neon sign with the studio
// location under it, built in CSS (script font + layered glow). It sits dim
// until scrolled into view, then powers on once and stays lit.
export default function NeonSign({ location }) {
  const ref = useRef(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section} ${lit ? styles.lit : ''}`}
      aria-label={`Wraptors ${location}`}
    >
      <div className={styles.sign} role="img" aria-label={`Wraptors ${location} neon sign`}>
        <span className={styles.wall} aria-hidden="true" />
        <span className={styles.word} aria-hidden="true">Wraptors</span>
        <svg className={styles.swash} viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M8 26 C 150 20, 300 15, 430 12 L 452 3 L 448 13 C 500 12, 560 11, 594 10" />
        </svg>
        <span className={styles.place} aria-hidden="true">{location}</span>
      </div>
    </section>
  );
}
