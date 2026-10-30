import { useEffect, useRef, useState } from 'react';
import styles from './Academy.module.css';
import academyImg from '../../Mr.wraptors.jpeg';

export default function Academy() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const contentRef = useRef(null);
  const [email, setEmail]       = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const targets = [imgRef.current, contentRef.current].filter(Boolean);
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.fadeTop} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── Image panel ── */}
        <div ref={imgRef} className={`${styles.imagePanel} ${styles.animSlide}`}>
          <div className={styles.imageWrap}>
            <img
              src={academyImg}
              alt="Wraptors Academy"
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageOverlay} aria-hidden="true" />
          </div>
          <div className={styles.imageBadge} aria-hidden="true">
            <span>EST. 2015</span>
          </div>
        </div>

        {/* ── Content panel ── */}
        <div ref={contentRef} className={`${styles.content} ${styles.animSlide} ${styles.delayContent}`}>

          <span className={styles.eyebrow}>Wraptors Academy</span>

          <h2 className={styles.headline}>
            Learn the craft behind<br />the transformation.
          </h2>

          <div className={styles.rule} aria-hidden="true" />

          <p className={styles.sub}>
            Join the academy list for upcoming wrap classes, training dates,
            and exclusive updates from the Wraptors team.
          </p>

          {submitted ? (
            <div className={styles.confirmation}>
              <span className={styles.confirmIcon}>✓</span>
              <p className={styles.confirmText}>You're on the list. We'll be in touch.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <button className={styles.button} type="submit">
                  Join the Academy List
                </button>
              </div>
              <p className={styles.formNote}>
                Be the first to know when new training sessions open.
              </p>
            </form>
          )}

        </div>
      </div>

      <div className={styles.fadeBottom} aria-hidden="true" />
    </section>
  );
}
