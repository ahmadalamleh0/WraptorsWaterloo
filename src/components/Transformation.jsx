import { useRef, useState, useEffect } from 'react';
import styles from './Transformation.module.css';

const PHRASES = [
  { text: 'FROM FACTORY.', variant: 'dim1' },
  { text: 'TO IDENTITY.',  variant: 'dim2' },
  { text: 'TO PRESENCE.',  variant: 'hot'  },
];

const LABELS = [
  { text: 'Color Change Wraps', pos: 'tl' },
  { text: 'Printed Liveries',   pos: 'tr' },
  { text: 'Racing Stripes',     pos: 'bl' },
  { text: 'Commercial Wraps',   pos: 'br' },
];

export default function Transformation() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="transformation" className={styles.section} ref={sectionRef}>
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.inner}>

        {/* Left: staggered phrase sequence */}
        <div className={styles.copy}>
          <span className="section-label">Transformation</span>

          <div className={styles.phrases}>
            {PHRASES.map(({ text, variant }, i) => (
              <h2
                key={text}
                className={`${styles.phrase} ${styles[`phrase_${variant}`]} ${revealed ? styles.phraseIn : ''}`}
                style={{ transitionDelay: revealed ? `${i * 0.22}s` : '0s' }}
              >
                {text}
              </h2>
            ))}
          </div>

          <p
            className={`${styles.body} ${revealed ? styles.bodyIn : ''}`}
            style={{ transitionDelay: revealed ? '0.72s' : '0s' }}
          >
            A vehicle enters stock. It leaves with presence, personality, and a finish
            impossible to ignore.
          </p>
        </div>

        {/* Right: cinematic wrap frame */}
        <div className={styles.frame}>

          {/* Atmospheric studio lighting */}
          <div className={styles.fAtmo}    aria-hidden="true" />
          <div className={styles.fSpotL}   aria-hidden="true" />
          <div className={styles.fSpotR}   aria-hidden="true" />
          <div className={styles.fFloor}   aria-hidden="true" />
          <div className={styles.fCar}     aria-hidden="true" />

          {/* Vinyl sweep overlays */}
          <div className={styles.fVinyl1}  aria-hidden="true" />
          <div className={styles.fVinyl2}  aria-hidden="true" />

          {/* Scan line */}
          <div className={styles.fScan}    aria-hidden="true" />

          {/* Corner brackets */}
          <span className={`${styles.fc} ${styles.fcTL}`} aria-hidden="true" />
          <span className={`${styles.fc} ${styles.fcTR}`} aria-hidden="true" />
          <span className={`${styles.fc} ${styles.fcBL}`} aria-hidden="true" />
          <span className={`${styles.fc} ${styles.fcBR}`} aria-hidden="true" />

          {/* HUD detail labels — fade in on scroll */}
          {LABELS.map(({ text, pos }, i) => (
            <div
              key={pos}
              className={`${styles.label} ${styles[`label_${pos}`]} ${revealed ? styles.labelIn : ''}`}
              style={{ transitionDelay: revealed ? `${0.52 + i * 0.13}s` : '0s' }}
              aria-hidden="true"
            >
              <span className={styles.labelDot} />
              <span className={styles.labelText}>{text}</span>
            </div>
          ))}

          {/* Technical readout */}
          <div className={styles.fReadout} aria-hidden="true">
            <span className={styles.fReadoutDot} />
            <span>WRAP TRANSFORMATION · MEDIA PLACEHOLDER · REPLACE WITH VIDEO</span>
            <span className={styles.fReadoutDot} />
          </div>

        </div>
      </div>

      <div className={styles.fadeBottom} aria-hidden="true" />
    </section>
  );
}
