import { useState, useEffect, useRef } from 'react';
import styles from './Icons.module.css';

import img1 from '../../Icons(1).jpeg';
import img2 from '../../Icons(2).jpeg';
import img3 from '../../Icons(3).jpeg';
import img4 from '../../Icons(4).jpeg';

const CARDS = [
  { label: 'Bespoke Presence', images: [img1, img2] },
  { label: 'Executive Finish',  images: [img3, img4] },
];

function IconCard({ card, delay }) {
  const [active, setActive] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => el.classList.add(styles.cardVisible), delay);
        // Auto-flip to the second image on arrival instead of waiting for a
        // hover that doesn't exist on mobile — a beat after the reveal so
        // it reads as a deliberate follow-up, not a jump-cut.
        setTimeout(() => setActive(1), delay + 650);
        io.disconnect();
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseEnter={() => setActive(1)}
      onMouseLeave={() => setActive(0)}
    >
      <div className={styles.imageWrap}>
        <img
          src={card.images[active]}
          className={styles.img}
          alt={card.label}
          key={active}
          loading="lazy"
        />
      </div>
      <div className={styles.cardOverlay} aria-hidden="true" />
      <div className={styles.cardFooter}>
        <div className={styles.cardRule} aria-hidden="true" />
        <span className={styles.cardLabel}>{card.label.toUpperCase()}</span>
      </div>
    </div>
  );
}

export default function Icons() {
  const headerRef = useRef(null);
  const titleRef  = useRef(null);
  const ruleRef   = useRef(null);
  const subRef    = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        titleRef.current?.classList.add(styles.visible);
        setTimeout(() => ruleRef.current?.classList.add(styles.visible), 300);
        setTimeout(() => subRef.current?.classList.add(styles.visible),  520);
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) io.observe(headerRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.fadeTop} aria-hidden="true" />

      <header ref={headerRef} className={styles.header}>
        <span className={styles.eyebrow}>Rolls-Royce</span>
        <h2 ref={titleRef} className={`${styles.title} ${styles.animUp}`}>
          ICONS
        </h2>
        <div ref={ruleRef} className={styles.rule} aria-hidden="true" />
        <p ref={subRef} className={`${styles.sub} ${styles.animUp}`}>
          presence, prestige, and elevated craftsmanship.
        </p>
      </header>

      <div className={styles.grid}>
        {CARDS.map((card, i) => (
          <IconCard key={card.label} card={card} delay={i * 180} />
        ))}
      </div>

      <div className={styles.fadeBottom} aria-hidden="true" />
    </section>
  );
}
