import { useRef, useState, useEffect } from 'react';
import styles from './Reviews.module.css';

function CountUp({ to, suffix = '', duration = 1400 }) {
  // Starts at the real final value, not 0, so a crawler or a visit where
  // the IntersectionObserver never fires still sees the correct number —
  // the animation resets to 0 and counts up only once it's actually seen.
  const [display, setDisplay] = useState(to);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        setDisplay(0);
        const t0 = performance.now();
        const tick = now => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { to: 9000, suffix: '+', label: 'Vehicles Transformed' },
  { to: 16,   suffix: '',  label: 'Global Locations' },
  { to: 10,   suffix: '+', label: 'Years Experience' },
  { to: 573,  suffix: '+', label: 'Verified Reviews' },
];

export default function Reviews() {
  return (
    <section id="reviews" className={styles.section}>
      {/* Light streaks background */}
      <div className={styles.bg}>
        <div className={styles.streak1} />
        <div className={styles.streak2} />
        <div className={styles.streak3} />
      </div>

      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            PROOF IN EVERY <span className="chrome-text">FINISH.</span>
          </h2>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          {STATS.map(({ to, suffix, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statValue}>
                <CountUp to={to} suffix={suffix} duration={to >= 1000 ? 2000 : 1200} />
              </span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
