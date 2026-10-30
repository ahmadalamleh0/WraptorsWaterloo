import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ServicesIntro.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesIntro() {
  const sectionRef   = useRef(null);
  const theRef       = useRef(null);
  const wraptorsRef  = useRef(null);
  const standardRef  = useRef(null);
  const ruleRef      = useRef(null);
  const subRef       = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const words = [theRef.current, wraptorsRef.current, standardRef.current];

      if (prefersReducedMotion) {
        // Simple opacity reveal, no vertical movement, no mask animation.
        gsap.from(words, {
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        });
        gsap.from(ruleRef.current, {
          opacity: 0,
          duration: 0.7,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        });
        gsap.from(subRef.current, {
          opacity: 0,
          duration: 0.75,
          delay: 0.45,
          scrollTrigger: { trigger: subRef.current, start: 'top 89%', once: true },
        });
        return;
      }

      // Word-mask reveal: each word rises from below its own overflow:hidden
      // mask (see .wordMask/.wordInner) rather than the heading fading or
      // clip-path-wiping in as one block. `once: true` — a simple one-time
      // reveal, not pinned/scrubbed, so it never demands a long scroll
      // distance: the whole sequence (stagger + duration) resolves in
      // about a second of real time once triggered, regardless of how far
      // the user keeps scrolling.
      gsap.from(words, {
        yPercent: 110,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.from(ruleRef.current, {
        scaleX: 0,
        duration: 0.7,
        ease: 'power2.out',
        transformOrigin: 'center center',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from(subRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.75,
        ease: 'power2.out',
        delay: 0.45,
        scrollTrigger: {
          trigger: subRef.current,
          start: 'top 89%',
          once: true,
        },
      });
    }, sectionRef);

    // Defensive: other sections' images loading in after this one mounts
    // can shift this section's absolute scroll position before layout
    // settles, so re-measure once everything's actually loaded.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.fadeTop} aria-hidden="true" />

      <div className={styles.content}>
        <h2 className={styles.heading}>
          <span className={`${styles.line} ${styles.lineSmall}`}>
            <span className={styles.wordMask}>
              <span ref={theRef} className={styles.wordInner}>THE</span>
            </span>
            {' '}
            <span className={styles.wordMask}>
              <span ref={wraptorsRef} className={styles.wordInner}>WRAPTORS</span>
            </span>
          </span>

          <span className={`${styles.line} ${styles.lineLarge}`}>
            <span className={styles.wordMask}>
              <span ref={standardRef} className={styles.wordInner}>STANDARD</span>
            </span>
          </span>
        </h2>
        <div ref={ruleRef} className={styles.rule} aria-hidden="true" />
        <p ref={subRef} className={styles.subline}>
          Luxury wraps, protection, tint, and customization built around presence.
        </p>
      </div>

      <div className={styles.fadeBottom} aria-hidden="true" />
    </section>
  );
}
