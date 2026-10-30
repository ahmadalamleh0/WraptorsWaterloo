import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SignatureBuilds.module.css';
import masterVideoSrc from '../../MasterPieces(new).mp4';

// Import brand logos from the Brands directory
import amgLogo from '../../Brands/amg.svg';
import porscheLogo from '../../Brands/porsche.svg';
import lamborghiniLogo from '../../Brands/lamborghini.svg';
import corvetteLogo from '../../COrvette_N.svg';
import lexusLogo from '../../lexus-svgrepo-com.svg';
import subaruLogo from '../../subaru-svgrepo-com.svg';
import gtrLogo from '../../GTR_NEW.svg';
import bentleyLogo from '../../Simplified Negative_BMdotCom_1000x500_2x1.svg';
import astonLogo from '../../Aston_Martin_Logo_0.svg';
import mclarenLogo from '../../Brands/mclaren.svg';
import ferrariGesLogo from '../../ferrari-svgrepo-com.svg';
import audiLogo from '../../Brands/audi.svg';

// McLaren
import mclaren1 from '../../Signture Section/Mclaren(1).jpeg';
import mclaren2 from '../../Signture Section/Mclaren(2).jpeg';
import mclaren3 from '../../Signture Section/Mclaren(3).jpeg';
import mclaren4 from '../../Signture Section/Mclaren(4).jpeg';
import mclaren5 from '../../Signture Section/Mclaren(5).jpeg';
import mclaren6 from '../../Signture Section/Mclaren(6).jpeg';
import mclaren7 from '../../Signture Section/Mclaren(7).jpeg';
import mclaren8 from '../../Signture Section/Mclaren(8).jpeg';
import mclaren9 from '../../Signture Section/Mclaren(9).jpeg';

// Porsche
import porsch1 from '../../Signture Section/Porsch(1).jpeg';
import porsch2 from '../../Signture Section/Porsch(2).jpeg';
import porsch3 from '../../Signture Section/Porsch(3).jpeg';
import porsch4 from '../../Signture Section/Porsch(4).jpeg';
import porsch5 from '../../Signture Section/Porsch(5).jpeg';
import porsch6 from '../../Signture Section/Porsch(6).jpeg';

// AMG
import amg1 from '../../Signture Section/AMG(1).jpeg';
import amg2 from '../../Signture Section/AMG(2).jpeg';
import amg3 from '../../Signture Section/AMG(3).jpeg';
import amg4 from '../../Signture Section/AMG(4).jpeg';
import amg5 from '../../Signture Section/AMG(5).jpeg';
import amg6 from '../../Signture Section/AMG(6).jpeg';

// Ferrari
import ferrari1 from '../../Signture Section/Ferrari(1).jpeg';
import ferrari2 from '../../Signture Section/Ferrari(2).jpeg';
import ferrari3 from '../../Signture Section/Ferrari(3).jpeg';
import ferrari4 from '../../Signture Section/Ferrari(4).jpeg';
import ferrari5 from '../../Signture Section/Ferrari(5).jpeg';
import ferrari6 from '../../Signture Section/Ferrari(6).jpeg';

// Lexus
import lexus1 from '../../Signture Section/Lexaus_N(1).jpeg';
import lexus2 from '../../Signture Section/Lexaus_N(2).jpeg';
import lexus3 from '../../Signture Section/Lexaus_N(3).jpeg';
import lexus4 from '../../Signture Section/Lexaus_N(4).jpeg';
import lexus5 from '../../Signture Section/Lexaus_N(5).jpeg';

// Bentley
import bentley1 from '../../Signture Section/Bentley_N(1).jpeg';
import bentley2 from '../../Signture Section/Bentley_N(2).jpeg';
import bentley3 from '../../Signture Section/Bentley_N(3).jpeg';
import bentley4 from '../../Signture Section/Bentley_N(4).jpeg';
import bentley5 from '../../Signture Section/Bentley_N(5).jpeg';

// Rolls-Royce — only the header video's poster frame now
import rolls1 from '../../Signture Section/Rolls-Royce(1).jpeg';

// GTR
import gtr1 from '../../Signture Section/GTR(1).jpeg';
import gtr2 from '../../Signture Section/GTR(2).jpeg';
import gtr3 from '../../Signture Section/GTR(3).jpeg';
import gtr4 from '../../Signture Section/GTR(4).jpeg';
import gtr5 from '../../Signture Section/GTR(5).jpeg';

// Subaru
import subaru1 from '../../Signture Section/Subaru(1).jpeg';
import subaru2 from '../../Signture Section/Subaru(2).jpeg';
import subaru3 from '../../Signture Section/Subaru(3).jpeg';
import subaru4 from '../../Signture Section/Subaru(4).jpeg';
import subaru5 from '../../Signture Section/Subaru(5).jpeg';

// Lambo Purple
import lamboPurple1 from '../../Signture Section/Lambo(purble_1).jpeg';
import lamboPurple2 from '../../Signture Section/Lambo(purble_2).jpeg';
import lamboPurple3 from '../../Signture Section/Lambo(purble_3).jpeg';
import lamboPurple4 from '../../Signture Section/Lambo(purble_4).jpeg';
import lamboPurple5 from '../../Signture Section/Lambo(purble_5).jpeg';

// Lambo LBWK
import lamboLBWK1 from '../../Signture Section/Lambo(LBWK_1).jpeg';
import lamboLBWK2 from '../../Signture Section/Lambo(LBWK_2).jpeg';
import lamboLBWK3 from '../../Signture Section/Lambo(LBWK_3).jpeg';
import lamboLBWK4 from '../../Signture Section/Lambo(LBWK_4).jpeg';
import lamboLBWK5 from '../../Signture Section/Lambo(LBWK_5).jpeg';

// Ferrari Red (project root)
import ferrariRed1 from '../../Ferrari(red_1).jpeg';
import ferrariRed2 from '../../Ferrari(red_2).jpeg';
import ferrariRed3 from '../../Ferrari(red_3).jpeg';
import ferrariRed4 from '../../Ferrari(red_4).jpeg';
import ferrariRed5 from '../../Ferrari(red_5).jpeg';

// Aston Martin
import aston1 from '../../Signture Section/Aston_Martin(1).jpeg';
import aston2 from '../../Signture Section/Aston_Martin(2).jpeg';
import aston3 from '../../Signture Section/Aston_Martin(3).jpeg';
import aston4 from '../../Signture Section/Aston_Martin(4).jpeg';
import aston5 from '../../Signture Section/Aston_Martin(5).jpeg';
import aston6 from '../../Signture Section/Aston_Martin(6).jpeg';

// Tri-City builds — every photo in "tricity projects/", as 1080px-wide
// mozjpeg copies in src/assets/projects. One set per vehicle; the first
// of each set (a shot outside the studio) is the card cover.
// Chevrolet Corvette C7
import corvetteC7_1 from '../assets/projects/corvette-c7-1.jpg';
import corvetteC7_2 from '../assets/projects/corvette-c7-2.jpg';
import corvetteC7_3 from '../assets/projects/corvette-c7-3.jpg';
import corvetteC7_4 from '../assets/projects/corvette-c7-4.jpg';
import corvetteC7_5 from '../assets/projects/corvette-c7-5.jpg';

// McLaren 720S
import mclaren720s_1 from '../assets/projects/mclaren-720s-1.jpg';
import mclaren720s_2 from '../assets/projects/mclaren-720s-2.jpg';
import mclaren720s_3 from '../assets/projects/mclaren-720s-3.jpg';
import mclaren720s_4 from '../assets/projects/mclaren-720s-4.jpg';
import mclaren720s_5 from '../assets/projects/mclaren-720s-5.jpg';

// Audi RS Q8
import audiRSQ8_1 from '../assets/projects/audi-rs-q8-1.jpg';
import audiRSQ8_2 from '../assets/projects/audi-rs-q8-2.jpg';
import audiRSQ8_3 from '../assets/projects/audi-rs-q8-3.jpg';
import audiRSQ8_4 from '../assets/projects/audi-rs-q8-4.jpg';

// Tesla Model Y
import teslaY_1 from '../assets/projects/tesla-model-y-1.jpg';
import teslaY_2 from '../assets/projects/tesla-model-y-2.jpg';
import teslaY_3 from '../assets/projects/tesla-model-y-3.jpg';
import teslaY_4 from '../assets/projects/tesla-model-y-4.jpg';

// Mercedes-AMG E 63 S
import amgE63s_1 from '../assets/projects/amg-e63s-1.jpg';
import amgE63s_2 from '../assets/projects/amg-e63s-2.jpg';
import amgE63s_3 from '../assets/projects/amg-e63s-3.jpg';
import amgE63s_4 from '../assets/projects/amg-e63s-4.jpg';
import amgE63s_5 from '../assets/projects/amg-e63s-5.jpg';
import amgE63s_6 from '../assets/projects/amg-e63s-6.jpg';

// Nissan Skyline R34
import skylineR34_1 from '../assets/projects/skyline-r34-1.jpg';
import skylineR34_2 from '../assets/projects/skyline-r34-2.jpg';
import skylineR34_3 from '../assets/projects/skyline-r34-3.jpg';
import skylineR34_4 from '../assets/projects/skyline-r34-4.jpg';

// Classic Lincoln
import lincoln_1 from '../assets/projects/lincoln-1.jpg';
import lincoln_2 from '../assets/projects/lincoln-2.jpg';

// Japanese Icons is intentionally not rendered — homepage is curated down
// to Italian/German/British/American for now. Its BUILDS entries below
// stay in place (category: "japanese-icons") so the row can come back
// later just by re-adding it here; nothing else needs to change.
const BUILDS = [
  // Tri-City builds — tags only describe the finish visible in the photos
  // (not whether it is a wrap or paint). Cards without a logo file show none.
  { brandName: "Chevrolet Corvette C7", logo: corvetteLogo, mainImage: corvetteC7_1, media: [corvetteC7_1, corvetteC7_2, corvetteC7_3, corvetteC7_4, corvetteC7_5], serviceTags: ["BLACK & RED MARBLE FINISH"], category: "american-muscle" },
  { brandName: "McLaren 720S", logo: mclarenLogo, mainImage: mclaren720s_1, media: [mclaren720s_1, mclaren720s_2, mclaren720s_3, mclaren720s_4, mclaren720s_5], serviceTags: ["ORANGE & BLACK FINISH"], category: "british-luxury" },
  { brandName: "Audi RS Q8", logo: audiLogo, mainImage: audiRSQ8_1, media: [audiRSQ8_1, audiRSQ8_2, audiRSQ8_3, audiRSQ8_4], serviceTags: ["MATTE GREY FINISH"], category: "german-precision" },
  { brandName: "Tesla Model Y", mainImage: teslaY_1, media: [teslaY_1, teslaY_2, teslaY_3, teslaY_4], serviceTags: ["SATIN GREY FINISH"], category: "american-muscle" },
  { brandName: "Mercedes-AMG E 63 S", logo: amgLogo, mainImage: amgE63s_1, media: [amgE63s_1, amgE63s_2, amgE63s_3, amgE63s_4, amgE63s_5, amgE63s_6], serviceTags: ["MATTE BLUE FINISH"], category: "german-precision" },
  { brandName: "Nissan Skyline R34", mainImage: skylineR34_1, media: [skylineR34_1, skylineR34_2, skylineR34_3, skylineR34_4], serviceTags: ["DEEP PURPLE FINISH"], category: "japanese-icons" },
  { brandName: "Classic Lincoln", mainImage: lincoln_1, media: [lincoln_1, lincoln_2], serviceTags: ["GLOSS WHITE FINISH"], category: "american-muscle" },

  // German Precision
  { brandName: "BRABUS 800 S-Class", logo: amgLogo,       mainImage: amg2,       media: [amg2, amg1, amg3, amg4, amg5, amg6],                                 serviceTags: ["RASPBERRY BLUE", "BRABUS CONVERSION", "STARLIGHT"],            category: "german-precision" },
  { brandName: "Porsche 911 GTS",    logo: porscheLogo,   mainImage: porsch2,    media: [porsch2, porsch1, porsch3, porsch4, porsch5, porsch6],                 serviceTags: ["GLOSS MIDNIGHT GREEN", "SATIN GOLD WHEELS", "CERAMIC COATING"], category: "german-precision" },

  // Italian Exotics
  { brandName: "Lamborghini LBWK",  logo: lamborghiniLogo, mainImage: lamboLBWK1,    media: [lamboLBWK1, lamboLBWK2, lamboLBWK3, lamboLBWK4, lamboLBWK5],                                                              badge: "1 OF 1", serviceTags: ["CELESTIAL UNICORN FINISH"],                                                   category: "italian-exotics" },
  { brandName: "Ferrari F8",         logo: ferrariGesLogo,  mainImage: ferrari1,      media: [ferrari1, ferrari2, ferrari3, ferrari4, ferrari5, ferrari6],                                                                serviceTags: ["FULL-BODY PAINT PROTECTION FILM", "DEEP BLUE INTERIOR ACCENTS"],                                              category: "italian-exotics" },
  { brandName: "Lamborghini",        logo: lamborghiniLogo, mainImage: lamboPurple1,  media: [lamboPurple1, lamboPurple2, lamboPurple3, lamboPurple4, lamboPurple5],                                                     serviceTags: ["TWO-TONE FINISH", "SATIN BLACK UPPER", "MATTE ICED TITANIUM PINK LOWER"],                                     category: "italian-exotics" },
  { brandName: "Ferrari 488 Spider", logo: ferrariGesLogo,  mainImage: ferrariRed1,   media: [ferrariRed1, ferrariRed2, ferrariRed3, ferrariRed4, ferrariRed5],                                                          serviceTags: ["GLOSS CARMEN RED", "DOOR TRIMS", "GLOSS BLACK ACCENTS"],                                                      category: "italian-exotics" },

  // Japanese Icons
  { brandName: "Lexus",     logo: lexusLogo,   mainImage: lexus1,   media: [lexus1, lexus2, lexus3, lexus4, lexus5],     serviceTags: ["CHROME RED INTERIOR", "AMBIENT LIGHTING", "CERAMIC COATING"], category: "japanese-icons" },
  { brandName: "Subaru",    logo: subaruLogo,  mainImage: subaru1,  media: [subaru1, subaru2, subaru3, subaru4, subaru5], serviceTags: ["PAINT PROTECTION FILM", "CERAMIC COATING"],               category: "japanese-icons" },
  { brandName: "Nissan GTR",logo: gtrLogo,     mainImage: gtr1,     media: [gtr1, gtr2, gtr3, gtr4, gtr5],               serviceTags: ["MATTE GUNMETAL METALLIC FINISH"],                          category: "japanese-icons" },

  // British Luxury
  { brandName: "Bentley",     logo: bentleyLogo, mainImage: bentley1, media: [bentley1, bentley2, bentley3, bentley4, bentley5],                           serviceTags: ["WIDEBODY CONVERSION", "FULL NARDO GRAY WRAP"],                                    category: "british-luxury" },
  { brandName: "Aston Martin",logo: astonLogo,   mainImage: aston5,   media: [aston5, aston1, aston2, aston3, aston4, aston6],                             serviceTags: ["PAINT PROTECTION FILM", "CERAMIC COATING"],                                       category: "british-luxury" },
  { brandName: "McLaren",     logo: mclarenLogo, mainImage: mclaren1, media: [mclaren1, mclaren2, mclaren3, mclaren4, mclaren5, mclaren6, mclaren7, mclaren8, mclaren9], serviceTags: ["FULL SATIN BLACK WRAP", "CARBON FIBER ACCENTS"], category: "british-luxury" },
];

// Two mixed rows, no category labels. Tri-City's own builds lead both rows
// (every one of them is shown); a few of the strongest builds from the wider
// Wraptors brand follow at the end of each row. Rows look builds up by
// brandName in BUILDS above.
const MASTERPIECE_ROW_1 = [
  'Chevrolet Corvette C7', 'Mercedes-AMG E 63 S', 'Audi RS Q8', 'Classic Lincoln',
  'Lamborghini LBWK', 'Ferrari F8', 'Porsche 911 GTS', 'Aston Martin',
];
const MASTERPIECE_ROW_2 = [
  'McLaren 720S', 'Nissan Skyline R34', 'Tesla Model Y',
  'Bentley', 'McLaren', 'BRABUS 800 S-Class', 'Lamborghini', 'Ferrari 488 Spider',
];
const MASTERPIECE_ROWS = [MASTERPIECE_ROW_1, MASTERPIECE_ROW_2].map(
  (names) => names.map((name) => BUILDS.find((b) => b.brandName === name))
);

// ── Card Component ──────────────────────────────────────────────────────────
function BuildCard({ build }) {
  const cardRef  = useRef(null);
  const autoRef  = useRef(null);   // setInterval id
  const delayRef = useRef(null);   // setTimeout id
  const [imgIndex, setImgIndex] = useState(0);

  const images = build.media?.length ? build.media : [build.mainImage];
  const count  = images.length;

  const stopAll = useCallback(() => {
    clearInterval(autoRef.current);
    clearTimeout(delayRef.current);
    autoRef.current  = null;
    delayRef.current = null;
  }, []);

  const startCycle = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setImgIndex(i => (i + 1) % count);
    }, 2200);
  }, [count]);

  // Tap / click: advance immediately, resume auto after 4 s pause
  const handleTap = useCallback(() => {
    if (count <= 1) return;
    stopAll();
    setImgIndex(i => (i + 1) % count);
    delayRef.current = setTimeout(startCycle, 4000);
  }, [count, stopAll, startCycle]);

  // IO: start auto-cycle when card enters viewport, stop when it leaves
  useEffect(() => {
    if (count <= 1) return;
    const el = cardRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        delayRef.current = setTimeout(startCycle, 2500);
      } else {
        stopAll();
        setImgIndex(0);
      }
    }, { threshold: 0.3 });

    io.observe(el);
    return () => { io.disconnect(); stopAll(); };
  }, [count, startCycle, stopAll]);

  return (
    <article
      className={styles.card}
      ref={cardRef}
      onClick={handleTap}
      style={count > 1 ? { cursor: 'pointer' } : undefined}
    >
      <div className={styles.imageContainer}>
        {/* All images stacked — opacity toggle only, no DOM mutations.
            Lazy: the section is far below the fold and most cards start
            off-screen in their scroll track. */}
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            loading="lazy"
            decoding="async"
            className={`${styles.image} ${i === imgIndex ? styles.imageActive : ''}`}
            alt={i === 0 ? `${build.brandName} Signature Build` : ''}
            aria-hidden={i !== imgIndex ? true : undefined}
          />
        ))}

        <div className={styles.overlay} />

        {build.logo && (
          <div className={styles.logoContainer}>
            <img src={build.logo} className={styles.logo} alt="" aria-hidden="true" style={build.logoStyle} />
          </div>
        )}

        {build.badge && (
          <div className={styles.cardBadge}>{build.badge}</div>
        )}

        <div className={styles.cardContent}>
          <div className={styles.tags}>
            {build.serviceTags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          {count > 1 && (
            <div className={styles.dotsContainer}>
              {images.map((_, i) => (
                <span key={i} className={`${styles.dot} ${i === imgIndex ? styles.activeDot : ''}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function SignatureBuilds() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const videoRef    = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // Older iOS Safari needs this set imperatively
    video?.setAttribute('webkit-playsinline', '');

    // Retry on user gesture — covers iOS autoplay gate. Gated on the
    // section's current visibility: with preload="none" (see the video
    // element below), calling .play() is what triggers the actual network
    // fetch, not just playback — an ungated retry here would eagerly load
    // this off-screen video on literally the first scroll/touch anywhere
    // on the page, regardless of position, undoing the deferred load.
    // Not `{ once: true }` — it needs to still work if autoplay is blocked
    // the first time the section becomes visible, then the user scrolls
    // away and back.
    let isVisible = false;
    const retryPlay = () => { if (isVisible && video?.paused) video.play().catch(() => {}); };
    document.addEventListener('touchstart', retryPlay, { passive: true });
    document.addEventListener('scroll',     retryPlay, { passive: true });

    // Text reveal observer
    const textObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            textObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );
    const sel = [
      `.${styles.animLeft}`,
      `.${styles.animScript}`,
      `.${styles.animCategory}`,
    ].join(', ');
    sectionRef.current?.querySelectorAll(sel).forEach(el => textObserver.observe(el));

    // Video autoplay observer
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (entry.isIntersecting) video?.play().catch(() => {});
        else video?.pause();
      },
      { threshold: 0.15 }
    );
    if (headerRef.current) videoObserver.observe(headerRef.current);

    return () => {
      textObserver.disconnect();
      videoObserver.disconnect();
      document.removeEventListener('touchstart', retryPlay);
      document.removeEventListener('scroll',     retryPlay);
    };
  }, []);

  return (
    <section id="signature-builds" ref={sectionRef} className={styles.section}>

      {/* Section header — video background + centered title */}
      <div className={styles.header} ref={headerRef}>

        {/* Background video */}
        {/* No autoPlay/eager preload — this section sits several screens
            below the fold, and eagerly fetching+decoding this ~5MB video
            on mount (regardless of scroll position) was measured causing a
            ~800ms main-thread stall shortly after page load, while the
            visitor is still scrolling through Hero/Services. The
            IntersectionObserver below already calls video.play() once this
            section is actually visible, which triggers loading on its own
            right when it's needed — poster covers the gap until then. */}
        <video
          ref={videoRef}
          className={styles.headerVideo}
          src={masterVideoSrc}
          muted
          playsInline
          loop
          preload="none"
          poster={rolls1}
        />

        {/* Dark overlay for text readability */}
        <div className={styles.headerOverlay} aria-hidden="true" />

        {/* Top fade from Statement section */}
        <div className={styles.headerFadeTop}    aria-hidden="true" />
        {/* Bottom fade into card grid */}
        <div className={styles.headerFadeBottom} aria-hidden="true" />

        {/* Text content */}
        <h2 className={`${styles.title} ${styles.animScript}`}>Masterpieces</h2>
        <p className={`${styles.subtitle} ${styles.animLeft} ${styles.delay2}`}>
          A selection of vehicles completed in-house.
        </p>

      </div>

      {/* Two mixed rows — no category labels; the video/heading above already
          introduces the whole collection. */}
      {MASTERPIECE_ROWS.map((builds, rowIndex) => (
        <div key={rowIndex} className={styles.categoryRow}>
          <div className={styles.cardTrack}>
            {builds.map((build, i) => (
              <BuildCard key={`row${rowIndex}-${build.brandName}-${i}`} build={build} />
            ))}
          </div>
        </div>
      ))}

    </section>
  );
}
