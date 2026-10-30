import { useEffect, useRef, useState } from 'react';
import styles from './ServiceProcess.module.css';

// ── Reusable premium process timeline ───────────────────────────────────
// A centred, glowing vertical line with steps alternating left/right
// around it — luxury-editorial, not feature cards. Same mechanics on
// every service page; only `eyebrow`, `heading` and `steps` change.
export default function ServiceProcess({ eyebrow, heading, steps }) {
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(() => steps.map(() => false));
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Each step reveals once as it scrolls into the centre band of the
  // viewport — permanent once lit, so the walkthrough only ever moves
  // forward as the user scrolls down.
  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed((r) => (r[i] ? r : r.map((v, j) => (j === i ? true : v))));
          }
        },
        { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, [steps.length]);

  // The line fills as the timeline scrolls through the viewport — a
  // simple, rAF-throttled scroll progress, not a heavy scroll library.
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return undefined;
    let raf = null;

    const update = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const scrolled = vh * 0.5 - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));
      setLineProgress(progress);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.process} ${visible ? styles.visible : ''}`}
    >
      <div className={styles.head}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>{heading}</h2>
      </div>

      <div className={styles.timeline} ref={timelineRef}>
        <div className={styles.line} aria-hidden="true">
          <div className={styles.lineFill} style={{ height: `${lineProgress * 100}%` }} />
        </div>

        {steps.map((step, i) => (
          <div
            key={step.n}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={`${styles.item} ${i % 2 === 0 ? styles.itemLeft : styles.itemRight} ${revealed[i] ? styles.itemRevealed : ''}`}
          >
            <span className={styles.dot} aria-hidden="true" />
            <div className={styles.card}>
              <span className={styles.num}>{step.n}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.desc}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
