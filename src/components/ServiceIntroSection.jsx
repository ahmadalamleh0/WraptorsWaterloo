import { useEffect, useRef, useState } from 'react';
import styles from './ServiceIntroSection.module.css';

// ── Reusable post-hero intro section ────────────────────────────────────
// Black/white premium statement block meant to sit directly under a
// service page's hero. No red eyebrow by design — the heading carries the
// section, split into a small/tight kicker line and a much bigger,
// dominant statement line (editorial two-line lockup). `options` (e.g.
// finish types) are optional animated markers; `gallery` is an optional
// set of images that respond subtly when an option is hovered/focused,
// so the two feel connected without a strict 1:1 mapping between them.
export default function ServiceIntroSection({ id, kicker, statement, description, options = [], gallery = [] }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeOption, setActiveOption] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          <span className={styles.kicker}>{kicker}</span>
          <span className={styles.statement}>{statement}</span>
        </h2>
        {description && <p className={styles.description}>{description}</p>}

        {options.length > 0 && (
          <ul className={styles.options}>
            {options.map((label, i) => (
              <li
                key={label}
                className={`${styles.option} ${activeOption === i ? styles.optionActive : ''}`}
                style={{ transitionDelay: visible ? `${0.4 + i * 0.06}s` : '0s' }}
                tabIndex={0}
                onMouseEnter={() => setActiveOption(i)}
                onMouseLeave={() => setActiveOption(null)}
                onFocus={() => setActiveOption(i)}
                onBlur={() => setActiveOption(null)}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {gallery.length > 0 && (
        <div className={styles.gallery}>
          {gallery.map((src, i) => {
            const isLinked = activeOption !== null && activeOption % gallery.length === i;
            return (
              <div
                key={i}
                className={`${styles.galleryImgWrap} ${isLinked ? styles.galleryImgActive : ''}`}
                style={{ transitionDelay: visible ? `${0.45 + i * 0.08}s` : '0s' }}
              >
                <img src={src} alt="" className={styles.galleryImg} loading="lazy" />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
