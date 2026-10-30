import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import ServiceHero from './ServiceHero';
import ServiceIntroSection from './ServiceIntroSection';
import ServiceProcess from './ServiceProcess';
import TintCompareSection from './TintCompareSection';
import RelatedInsights from './RelatedInsights';
import AftercareSection from './AftercareSection';
import ServiceFaqSection from './ServiceFaqSection';
import QuoteSection from './QuoteSection';
import ServiceLocal from './ServiceLocal';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { pageUrl } from '../lib/siteConfig';
import { LOCATION } from '../config/location.js';
import styles from './ServicePage.module.css';


export default function ServicePage({
  title,
  heroEyebrow,
  heroHeadline,
  heroHeadlineCompact,
  heroLowerContent,
  heroSupportingLine,
  heroImg,
  introKicker,
  introStatement,
  introDescription,
  introImage,
  introImageText = 'Protection in Motion',
  benefits,
  benefitsHeading = 'Why Ceramic Coating',
  galleryImages,
  galleryCaption,
  midSectionTitle,
  midSectionDescription,
  featuredProject,
  secondaryGalleryImages,
  secondaryGalleryCaption,
  processEyebrow,
  processHeading,
  processSteps,
  splitBanner,
  showTintCompare,
  tagline,
  learnCategory,
  path,
}) {
  // Paths are '/services/<id>' and that id matches the service keys used
  // in src/data/aftercareProducts.js and src/data/serviceFaqs.js, so
  // there's nothing new to wire up per page here — a service with no
  // approved aftercare/FAQ copy yet just renders nothing for that section.
  const serviceId = path?.split('/').pop();  // Lambo / editorial gallery scroll-in reveal
  const galleryRef = useRef(null);
  const [galleryVisible, setGalleryVisible] = useState(false);
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setGalleryVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Optional second 3-image gallery (e.g. a dedicated collection for one
  // specific build) — same reveal pattern as the main gallery above.
  const secondaryGalleryRef = useRef(null);
  const [secondaryGalleryVisible, setSecondaryGalleryVisible] = useState(false);
  useEffect(() => {
    const el = secondaryGalleryRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSecondaryGalleryVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Featured-project reveal (single-car showcase — main image + detail grid)
  const featuredRef = useRef(null);
  const [featuredVisible, setFeaturedVisible] = useState(false);
  useEffect(() => {
    const el = featuredRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFeaturedVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Split banner scroll-in reveal (Built Different pattern)
  const splitBannerRef = useRef(null);
  const [splitBannerVisible, setSplitBannerVisible] = useState(false);
  useEffect(() => {
    const el = splitBannerRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSplitBannerVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useDocumentMeta(
    `${title} in ${LOCATION.city} | Wraptors`,
    tagline || `${title} from ${LOCATION.brandName} — premium automotive customization at our ${LOCATION.address.locality} studio.`,
    path ? pageUrl(path) : undefined
  );

  return (
    <>
      <Navbar alwaysVisible />
      <main>

        {/* ── Hero — shared ServiceHero, same family as every service page ── */}
        <ServiceHero
          eyebrow={heroEyebrow}
          headline={heroHeadline}
          compactHeadline={heroHeadlineCompact}
          lowerContent={heroLowerContent}
          supportingLine={heroSupportingLine}
          media={heroImg ? <img src={heroImg} alt="" loading="eager" fetchPriority="high" /> : null}
        />

        {/* ── Reusable premium intro block — same system as every service ── */}
        <ServiceIntroSection
          kicker={introKicker}
          statement={introStatement}
          description={introDescription}
        />

        {/* ── Optional interactive tint VLT comparison — Window Tint only ── */}
        {showTintCompare && <TintCompareSection />}

        {/* ── Optional full-bleed image between intro and process ── */}
        {introImage && (
          <div className={styles.introImageBlock}>
            <img src={introImage} alt="" className={styles.introImage} loading="lazy" />
            <div className={styles.introImageOverlay}>
              <span className={styles.introImageText}>{introImageText}</span>
            </div>
          </div>
        )}

        {/* ── Optional benefits grid — compact 2×2 grid ── */}
        {benefits && benefits.length > 0 && (
          <section className={styles.benefits}>
            <p className={styles.benefitsHeading}>{benefitsHeading}</p>
            <div className={styles.benefitsGrid}>
              {benefits.map((b) => (
                <div key={b.num} className={styles.benefitItem}>
                  <div className={styles.benefitHeader}>
                    <span className={styles.benefitNum}>{b.num}</span>
                    <span className={styles.benefitTitle}>{b.title}</span>
                  </div>
                  <p className={styles.benefitDesc}>{b.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Optional 3-image editorial gallery — hero + two-up pair ── */}
        {galleryImages && galleryImages.length === 3 && (
          <section
            ref={galleryRef}
            className={`${styles.svcGallery} ${galleryVisible ? styles.svcGalleryVisible : ''}`}
          >
            {/* Photo 1 — full-width dominant */}
            <div className={`${styles.svcTile} ${styles.svcTile1}`}>
              <img src={galleryImages[0]} alt="" className={styles.svcImg} loading="lazy" />
              <div className={styles.svcOverlay} aria-hidden="true" />
              <div className={styles.svcFooter}>
                <span className={styles.svcFooterEyebrow}>Wraptors Build</span>
                <span className={styles.svcFooterTitle}>{galleryCaption || title}</span>
              </div>
            </div>
            {/* Photos 2 + 3 — side by side */}
            <div className={`${styles.svcTile} ${styles.svcTile2}`}>
              <img src={galleryImages[1]} alt="" className={styles.svcImg} loading="lazy" />
            </div>
            <div className={`${styles.svcTile} ${styles.svcTile3}`}>
              <img src={galleryImages[2]} alt="" className={styles.svcImg} loading="lazy" />
            </div>
          </section>
        )}

        {/* ── Optional centered text break — separates a mixed-car gallery
             above from a single-car featured project below ── */}
        {midSectionTitle && (
          <section className={styles.midSection}>
            <h2 className={styles.midSectionTitle}>{midSectionTitle}</h2>
            {midSectionDescription && (
              <p className={styles.midSectionDesc}>{midSectionDescription}</p>
            )}
          </section>
        )}

        {/* ── Optional featured single-car project — one main image with a
             caption overlay, then a grid of detail shots (paired, side by
             side on every breakpoint). ── */}
        {featuredProject && featuredProject.mainImage && featuredProject.detailImages?.length > 0 && (
          <section
            ref={featuredRef}
            className={`${styles.featuredProject} ${featuredVisible ? styles.featuredProjectVisible : ''}`}
          >
            <div className={styles.featuredMain}>
              <img src={featuredProject.mainImage} alt="" className={styles.featuredMainImg} loading="lazy" />
              <div className={styles.featuredOverlay} aria-hidden="true" />
              <div className={styles.featuredFooter}>
                <span className={styles.featuredEyebrow}>{featuredProject.label || 'Featured Project'}</span>
                <span className={styles.featuredTitle}>{featuredProject.title}</span>
              </div>
            </div>
            <div className={styles.featuredGrid}>
              {featuredProject.detailImages.map((img, i) => (
                <div key={i} className={styles.featuredGridTile}>
                  <img src={img} alt="" className={styles.featuredGridImg} loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Optional second 3-image gallery — a dedicated collection for
             one specific build, additional to (not replacing) the gallery
             above ── */}
        {secondaryGalleryImages && secondaryGalleryImages.length === 3 && (
          <section
            ref={secondaryGalleryRef}
            className={`${styles.svcGallery} ${secondaryGalleryVisible ? styles.svcGalleryVisible : ''}`}
          >
            <div className={`${styles.svcTile} ${styles.svcTile1}`}>
              <img src={secondaryGalleryImages[0]} alt="" className={styles.svcImg} loading="lazy" />
              <div className={styles.svcOverlay} aria-hidden="true" />
              <div className={styles.svcFooter}>
                <span className={styles.svcFooterEyebrow}>Wraptors Build</span>
                <span className={styles.svcFooterTitle}>{secondaryGalleryCaption || title}</span>
              </div>
            </div>
            <div className={`${styles.svcTile} ${styles.svcTile2}`}>
              <img src={secondaryGalleryImages[1]} alt="" className={styles.svcImg} loading="lazy" />
            </div>
            <div className={`${styles.svcTile} ${styles.svcTile3}`}>
              <img src={secondaryGalleryImages[2]} alt="" className={styles.svcImg} loading="lazy" />
            </div>
          </section>
        )}

        {/* ── Reusable premium process timeline ── */}
        {processSteps && processSteps.length > 0 && (
          <ServiceProcess
            eyebrow={processEyebrow}
            heading={processHeading}
            steps={processSteps}
          />
        )}

        {/* ── Optional two-image spread — same system as Built Different section in WrapsPage ── */}
        {splitBanner && (
          <section
            ref={splitBannerRef}
            className={`${styles.splitBanner} ${splitBannerVisible ? styles.splitBannerVisible : ''}`}
          >
            <div className={styles.splitBannerTile}>
              <img src={splitBanner.img1} alt="" className={styles.splitBannerImg} loading="lazy" />
            </div>
            <div className={styles.splitBannerTile}>
              <img src={splitBanner.img2} alt="" className={styles.splitBannerImg} loading="lazy" />
            </div>
            <span className={styles.splitBannerOverlayText}>{splitBanner.text || 'GLOSS THAT LASTS.'}</span>
          </section>
        )}

        {/* ── Waterloo Region note — src/data/serviceLocal.js ── */}
        <ServiceLocal service={serviceId} />
        <QuoteSection
          id="cta"
          initialService={serviceId}
          subtitle="Ready to take the next step?"
          compact
        />
        <AftercareSection service={serviceId} />
        <ServiceFaqSection service={serviceId} />
        {learnCategory && <RelatedInsights category={learnCategory} />}

      </main>
      <Footer solid />
      <FloatingWhatsApp />
    </>
  );
}
