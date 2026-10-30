import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import ServiceHero from './ServiceHero';
import ServiceIntroSection from './ServiceIntroSection';
import TintCompareSection from './TintCompareSection';
import RelatedInsights from './RelatedInsights';
import AftercareSection from './AftercareSection';
import ServiceFaqSection from './ServiceFaqSection';
import QuoteSection from './QuoteSection';
import ServiceLocal from './ServiceLocal';
import styles from './TintPage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { SITE_URL } from '../lib/siteConfig';

import heroTint from '../../Wraptors Media/632236695_18389471176146462_2559334672996249216_n.jpg';

// Two-photo showcase, directly after the configurator — "Comfort Meets
// Presence." overlaid across the pair.
import showcase1 from '../../Wraptors Media/tinting/466529101_18332315149146462_3523417888664270468_n.jpg';
import showcase2 from '../../Wraptors Media/730833602_18409686271146462_9492757678333372_n.jpg';

// Matching-car pair (same Infiniti QX80, front + rear) after the quote
// section — no overlay text, side by side on every breakpoint.
import carPairFront from '../../Wraptors Media/636983396_18390307630146462_1142490732151252287_n.jpg';
import carPairRear  from '../../Wraptors Media/637197397_18390307717146462_680395002076213247_n.jpg';
import { LOCATION } from '../config/location.js';

export default function TintPage() {
  useDocumentMeta(
    `Window Tint in ${LOCATION.city} | Wraptors`,
    `Ceramic window film installed at the ${LOCATION.brandName} studio in ${LOCATION.address.locality}: heat and glare reduction, UV protection and privacy, fitted cleanly.`,
    `${SITE_URL}/services/tint/`
  );

  const showcaseRef = useRef(null);
  const [showcaseVisible, setShowcaseVisible] = useState(false);
  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShowcaseVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const carPairRef = useRef(null);
  const [carPairVisible, setCarPairVisible] = useState(false);
  useEffect(() => {
    const el = carPairRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCarPairVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Navbar alwaysVisible />

      {/* ── Hero — shared ServiceHero, same family as every service page ── */}
      <ServiceHero
        eyebrow={`${LOCATION.brandName} · Window Tint`}
        headline="Control The Cabin."
        supportingLine="Ceramic Tint · Heat Rejection · Privacy"
        media={<img src={heroTint} alt="" loading="eager" fetchPriority="high" draggable={false} />}
      />

      {/* ── Your Cabin / Controlled — reusable premium intro block ── */}
      <ServiceIntroSection
        kicker="Your Cabin"
        statement="Controlled."
        description="Window film is selected around more than darkness. At Wraptors, tint is approached around heat performance, privacy, visibility and the appearance of the vehicle, then installed cleanly across the glass for a finish that belongs with the car."
      />

      {/* ── Interactive VLT comparison ── */}
      <TintCompareSection />

      {/* ── What is ceramic tint? — educational, same centered system ── */}
      <section className={styles.introCentered}>
        <div className={styles.container}>
          <h2 className={styles.introTitle}>What Is Ceramic Tint?</h2>
          <p className={styles.introSub}>
            Ceramic tint uses advanced nano-ceramic particles to reduce solar heat and glare while maintaining clear visibility. Its metal-free construction avoids interference with GPS, mobile and radio signals, bringing greater comfort to your cabin without relying on the darkest shade.
          </p>
        </div>
      </section>

      {/* ── 2. Two-photo showcase — "Comfort Meets Presence." ── */}
      <section
        ref={showcaseRef}
        className={`${styles.showcase} ${showcaseVisible ? styles.showcaseVisible : ''}`}
      >
        <div className={styles.showcaseTile}>
          <img src={showcase1} alt="Wraptors ceramic tint install detail" className={styles.showcaseImg} loading="lazy" />
        </div>
        <div className={styles.showcaseTile}>
          <img src={showcase2} alt="Wraptors ceramic tint install detail" className={styles.showcaseImg} loading="lazy" />
        </div>
        <span className={styles.showcaseOverlayText}>Comfort Meets Presence.</span>
      </section>

      {/* ── Waterloo Region note — src/data/serviceLocal.js ── */}
      <ServiceLocal service="tint" />

      {/* ── 3. Shared quote section ── */}
      <QuoteSection
        id="cta"
        initialService="tint"
        subtitle="Ready to take the next step?"
        compact
      />

      {/* ── 4. Matching-car photo pair — no overlay, stands on its own ── */}
      <section
        ref={carPairRef}
        className={`${styles.carPair} ${carPairVisible ? styles.carPairVisible : ''}`}
      >
        <div className={styles.carPairTile}>
          <img src={carPairFront} alt="Wraptors tinted Infiniti QX80, front" className={styles.carPairImg} loading="lazy" />
        </div>
        <div className={styles.carPairTile}>
          <img src={carPairRear} alt="Wraptors tinted Infiniti QX80, rear" className={styles.carPairImg} loading="lazy" />
        </div>
      </section>

      <AftercareSection service="tint" />
      <ServiceFaqSection service="tint" />
      <RelatedInsights category="window-tint" />

      <Footer solid />
      <FloatingWhatsApp />
    </>
  );
}
