import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import ServiceHero from './ServiceHero';
import ServiceIntroSection from './ServiceIntroSection';
import ServiceProcess from './ServiceProcess';
import AftercareSection from './AftercareSection';
import RelatedInsights from './RelatedInsights';
import QuoteSection from './QuoteSection';
import ServiceLocal from './ServiceLocal';
import ServiceFaqSection from './ServiceFaqSection';
import styles from './WrapsPage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { SITE_URL } from '../lib/siteConfig';

// ── Hero media ──────────────────────────────────────────────────────────
import heroVideoSrc from '../../Wraptors Media/AQMO8KUY36WzJZuIMrrq-tMy8Xp0txB138Wh_HiArRceWtYAEVphuhXgnSVU7qGiEPtzYaEXtv1H6lKthvFzjA-GjN-vpr06TXXbT34.mp4';
import heroPoster from '../assets/wraps-hero-poster.jpg';


// ── Section photography — real Wraptors builds throughout, no stock.
// Selected Wraps gallery is placeholder-only for now (see below) until
// real wrap-specific builds are supplied. ────────────────────────────
import fullWrapImg from '../../Wraptors Media/Wrappin(2new).jpeg';

// McLaren (LBWK widebody, chrome-orange wrap) — one designed spread, not
// a random four-up. mcLaren1 is the dominant hero shot.
import mcLaren1 from '../../Wraptors Media/754224310_18413486968146462_6476508524846184428_n.jpg';
import mcLaren2 from '../../Wraptors Media/753231508_18413487001146462_554714453099635718_n.jpg';
import mcLaren3 from '../../753255071_18413487040146462_4588834704147054082_n.jpg';
import mcLaren4 from '../../Wraptors Media/753734160_18413487004146462_3239241587169613004_n.jpg';

// Mercedes-AMG G-Wagon, matte bronze wrap — simple two-image pair.
import gWagon1 from '../../Wraptors Media/805936464_18421616794146462_1594286468195409667_n (1).jpg';
import gWagon2 from '../../Wraptors Media/806035800_18421616770146462_851032074252558861_n.jpg';

// Commercial Wraps spread — real fleet/brand-vehicle installs, folded into
// the Wraps page instead of living on a separate Commercial Wraps page.
import cw1 from '../../Wraptors Media/commercial/WhatsApp Image 2026-09-20 at 12.56.19 PM.jpeg';
import cw2 from '../../Wraptors Media/commercial/commercial_wrapping(2).jpeg';
import cw3 from '../../Wraptors Media/commercial/Comercial_wrapping(new3).jpeg';
import cw4 from '../../Wraptors Media/commercial/WhatsApp Image 2026-09-20 at 12.56.20 PM.jpeg';
import cw5 from '../../Wraptors Media/commercial/695705239_18403186552146462_7052859159874241461_n.jpg';
import { LOCATION } from '../config/location.js';

// Reusable process system (see ServiceProcess.jsx) — this data shape is
// what later gets swapped per service (PPF, Ceramic, Tint, Starlight,
// Commercial Wraps): eyebrow/heading live on the WrapsPage call below,
// steps just carry their own number/title/desc.
const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Direction',
    desc: 'We plan the colour, finish and coverage around your car and the result you want.',
  },
  {
    n: '02',
    title: 'Preparation',
    desc: 'Each panel is cleaned and prepared, with trim removed where needed for a precise fit.',
  },
  {
    n: '03',
    title: 'Installation',
    desc: 'Film is carefully fitted around curves, edges and recesses, with close attention to every detail.',
  },
  {
    n: '04',
    title: 'Final Finish',
    desc: 'Edges and seams are checked, trim is refitted, and the vehicle is inspected before handover.',
  },
];

export default function WrapsPage() {
  useDocumentMeta(
    `Vehicle Wraps & Commercial Fleet Wraps in ${LOCATION.city} | Wraptors`,
    `Colour changes, custom finishes, partial wraps and commercial fleet wraps, installed at the ${LOCATION.brandName} studio in ${LOCATION.address.locality}.`,
    `${SITE_URL}/services/wraps/`
  );

  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  const galleryRef = useRef(null);
  const [galleryVisible, setGalleryVisible] = useState(false);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const wagonRef = useRef(null);
  const [wagonVisible, setWagonVisible] = useState(false);

  useEffect(() => {
    const el = wagonRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWagonVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const commercialRef = useRef(null);
  const [commercialVisible, setCommercialVisible] = useState(false);

  useEffect(() => {
    const el = commercialRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCommercialVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const brandRef = useRef(null);
  const [brandVisible, setBrandVisible] = useState(false);

  useEffect(() => {
    const el = brandRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBrandVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const onPlaying = () => setVideoReady(true);
    video.addEventListener('playing', onPlaying);

    const tryPlay = () => {
      if (!video.paused) return;
      video.play().catch(() => {
        // Autoplay blocked — the poster underneath stays visible until a
        // first interaction unlocks it.
      });
    };
    tryPlay();

    const retryOnInteraction = () => tryPlay();
    document.addEventListener('touchstart', retryOnInteraction, { once: true, passive: true });
    document.addEventListener('click', retryOnInteraction, { once: true, passive: true });

    return () => {
      video.removeEventListener('playing', onPlaying);
      document.removeEventListener('touchstart', retryOnInteraction);
      document.removeEventListener('click', retryOnInteraction);
    };
  }, []);

  return (
    <>
      <Navbar alwaysVisible />
      <main>

        {/* ── Hero — shared ServiceHero, full-bleed video + glass CTA ── */}
        <ServiceHero
          eyebrow={`${LOCATION.brandName} · Vehicle Wraps`}
          headline="Bespoke Styling"
          supportingLine="Full Wraps · Colour Changes · Custom Finishes"
          media={
            <>
              <img src={heroPoster} alt="" loading="eager" fetchPriority="high" />
              <video
                ref={videoRef}
                src={heroVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={heroPoster}
                style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.6s ease' }}
              />
            </>
          }
        />

        {/* ── 02 · Choose The Finish — reusable premium intro block ── */}
        <ServiceIntroSection
          kicker="Your Car"
          statement="Reintroduced."
          description="At Wraptors, we handle complete colour changes, partial wraps and bespoke styling around the vehicle itself. Material, coverage and finish are planned together, then installed with attention to body lines, edges, trim and final presentation. The result is a transformation that looks considered from the first panel to the last."
        />

        {/* ── Full photo break — statement sits in the dark space above
             the roofline, inside the image ── */}
        <section className={styles.photoBreak}>
          <img src={fullWrapImg} alt="Wraptors full colour change wrap" className={styles.photoBreakImg} loading="lazy" />
          <div className={styles.photoBreakOverlay} aria-hidden="true" />
          <div className={styles.photoBreakTop}>
            <span className={styles.photoBreakTitle}>Built To<br />Shift Presence.</span>
          </div>
        </section>

        {/* ── Brand statement — quiet credibility moment, logo as a
             supporting mark beside the copy rather than a centred hero. ── */}
        <section
          ref={brandRef}
          className={`${styles.brandStatement} ${brandVisible ? styles.brandStatementVisible : ''}`}
        >
          <div className={styles.brandInner}>
            <div className={styles.brandContent}>
              <p className={styles.brandHeadline}>
                Crafting some of the world&rsquo;s most iconic<br className={styles.brandBreak} />{' '}wrapped vehicles.
              </p>
              <p className={styles.brandDesc}>
                Wraptors brings together bespoke styling, experienced installation and a global automotive identity built around standout vehicles. From complete colour transformations to one-off visual directions, every build is approached with the same focus on execution, detail and presence.
              </p>
            </div>
          </div>
        </section>

        {/* ── McLaren spread — one designed editorial sequence, not four
             random cards. Dominant hero + three supporting shots. ── */}
        <section
          ref={galleryRef}
          className={`${styles.mcGallery} ${galleryVisible ? styles.mcGalleryVisible : ''}`}
        >
          <div className={`${styles.mcTile} ${styles.mcTile1}`}>
            <img src={mcLaren1} alt="Wraptors McLaren build, LBWK widebody, chrome orange wrap" className={styles.mcImg} loading="lazy" />
            <div className={styles.mcOverlay} aria-hidden="true" />
            <div className={styles.mcFooter}>
              <span className={styles.mcFooterEyebrow}>Wraptors Build</span>
              <span className={styles.mcFooterTitle}>McLaren</span>
              <span className={styles.mcFooterDetail}>LBWK Widebody &middot; Chrome Orange</span>
            </div>
          </div>
          <div className={`${styles.mcTile} ${styles.mcTile2}`}>
            <img src={mcLaren2} alt="Wraptors McLaren build detail" className={styles.mcImg} loading="lazy" />
          </div>
          <div className={`${styles.mcTile} ${styles.mcTile3}`}>
            <img src={mcLaren3} alt="Wraptors McLaren build detail" className={styles.mcImg} loading="lazy" />
          </div>
          <div className={`${styles.mcTile} ${styles.mcTile4}`}>
            <img src={mcLaren4} alt="Wraptors McLaren build, rear" className={styles.mcImg} loading="lazy" />
          </div>
        </section>

        {/* ── Commercial Wraps — folded into the Wraps page as a section
             rather than its own page. Same intro system as the rest of
             this page, then a compact, gapless photo grid. ── */}
        <ServiceIntroSection
          id="commercial-wraps"
          kicker="Commercial & Fleet Wraps"
          statement="On The Road."
          description={`Commercial wraps for ${LOCATION.city} businesses, from a single company vehicle to a coordinated fleet. We turn your vehicles into a clear expression of your business. Purposeful design, considered placement and precise installation bring your branding together across every panel.`}
        />

        <section
          ref={commercialRef}
          className={`${styles.cwGallery} ${commercialVisible ? styles.cwGalleryVisible : ''}`}
        >
          <div className={`${styles.cwTile} ${styles.cwTile1}`}>
            <img src={cw1} alt="Wraptors commercial wrap, KARI branded van" className={styles.cwImg} loading="lazy" />
          </div>
          <div className={`${styles.cwTile} ${styles.cwTile2}`}>
            <img src={cw2} alt="Wraptors commercial wrap, Heaps Estrin real estate van outside a Wraptors studio" className={styles.cwImg} loading="lazy" />
          </div>
          <div className={`${styles.cwTile} ${styles.cwTile3}`}>
            <img src={cw3} alt="Wraptors commercial wrap, Anton's Towing & Roadside branded truck" className={styles.cwImg} loading="lazy" />
          </div>
          <div className={`${styles.cwTile} ${styles.cwTile4}`}>
            <img src={cw4} alt="Wraptors commercial wrap installation in progress" className={styles.cwImg} loading="lazy" />
          </div>
          <div className={`${styles.cwTile} ${styles.cwTile5}`}>
            <img src={cw5} alt="Wraptors commercial wrap, branded fleet vehicles" className={styles.cwImg} loading="lazy" />
          </div>
        </section>

        {/* ── 04 · The Process — reusable premium vertical timeline ── */}
        <ServiceProcess
          eyebrow="The Wraptors Process"
          heading="From Vision To Finish."
          steps={PROCESS_STEPS}
        />

        {/* ── G-Wagon pair — matte bronze AMG build ── */}
        <section
          ref={wagonRef}
          className={`${styles.wagonSpread} ${wagonVisible ? styles.wagonSpreadVisible : ''}`}
        >
          <div className={styles.wagonTile}>
            <img src={gWagon1} alt="Wraptors Mercedes-AMG G-Wagon build, matte bronze wrap" className={styles.wagonImg} loading="lazy" />
          </div>
          <div className={styles.wagonTile}>
            <img src={gWagon2} alt="Wraptors Mercedes-AMG G-Wagon build, side profile" className={styles.wagonImg} loading="lazy" />
          </div>
          <span className={styles.wagonOverlayText}>Built Different.</span>
        </section>

        {/* ── Waterloo Region note — src/data/serviceLocal.js ── */}
        <ServiceLocal service="wraps" />
        <QuoteSection
          id="cta"
          initialService="wraps"
          subtitle="Ready to take the next step?"
          compact
        />
        <AftercareSection service="wraps" />
        <ServiceFaqSection service="wraps" />
        <RelatedInsights category="vehicle-wraps" />

      </main>
      <Footer solid />
      <FloatingWhatsApp />
    </>
  );
}
