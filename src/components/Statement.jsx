import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Statement.module.css';

gsap.registerPlugin(ScrollTrigger);

// Editorial transition between the service tiles and the next section.
// The near-black panel wipes in from the top (clip-path) as the section enters,
// then the intro line, the red rule and "YOU SET THE TONE." rise out of
// their masks. One scrubbed timeline, no pin — so no added scroll distance
// and it reverses cleanly on scroll up. With reduced motion the CSS default
// (everything visible, panel fully shown) is left untouched.
export default function Statement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = section.querySelector('[data-panel]');
    const lines = gsap.utils.toArray('[data-line]', section);
    const ruler = section.querySelector('[data-ruler]');

    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 768px)',
      },
      (context) => {
        const { motion, mobile } = context.conditions;
        if (!motion) return;

        gsap.set(panel, { clipPath: 'inset(0% 0% 100% 0%)' });
        gsap.set(lines, { yPercent: 110 });
        gsap.set(ruler, { scaleX: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: mobile ? 'top 92%' : 'top 85%',
            end: mobile ? 'top 30%' : 'top 25%',
            scrub: 0.6,
          },
        });

        tl.to(panel,    { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 1 }, 0)
          .to(lines[0], { yPercent: 0, ease: 'power3.out', duration: 0.55 }, 0.45)
          .to(ruler,    { scaleX: 1, ease: 'power2.out', duration: 0.4 }, 0.75)
          .to(lines[1], { yPercent: 0, ease: 'power3.out', duration: 0.6 }, 0.85);
      },
      section
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      <div data-panel className={styles.panel} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.contextLine}>
          <span className={styles.mask}>
            <span data-line className={styles.lineInner}>WHEN YOU DRIVE A WRAPTORS BUILD,</span>
          </span>
        </p>
        <div data-ruler className={styles.ruler} aria-hidden="true" />
        <p className={styles.mainLine}>
          <span className={styles.mask}>
            <span data-line className={styles.lineInner}>YOU SET<br />THE TONE.</span>
          </span>
        </p>
      </div>

    </section>
  );
}
