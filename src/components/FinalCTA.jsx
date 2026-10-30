import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <section id="cta" className={styles.section}>
      {/* Animated red glow background */}
      <div className={styles.glowCore} />
      <div className={styles.glowRing} />

      {/* Decorative grid */}
      <div className={styles.grid} />

      {/* Corner accents */}
      <span className={`${styles.corner} ${styles.cornerTL}`} />
      <span className={`${styles.corner} ${styles.cornerTR}`} />
      <span className={`${styles.corner} ${styles.cornerBL}`} />
      <span className={`${styles.corner} ${styles.cornerBR}`} />

      <div className={styles.inner}>
        <div className={styles.eyebrow}>Start Your Build</div>

        <h2 className={styles.title}>
          READY TO TRANSFORM<br />
          YOUR VEHICLE?
        </h2>

        <p className={styles.sub}>
          Choose your location. Start your build. Enter the Wraptors standard.
        </p>

        <div className={styles.ctas}>
          <a href="#" className="btn-primary">Get a Quote</a>
          <a href="#locations" className="btn-ghost">Find a Location</a>
        </div>

        {/* Bottom brand mark */}
        <div className={styles.brandMark}>
          <span className={styles.brandMarkText}>WRAPTORS</span>
          <div className={styles.brandMarkLine} />
          <span className={styles.brandMarkSub}>16 LOCATIONS WORLDWIDE</span>
        </div>
      </div>

      {/* Footer strip */}
      <footer className={styles.footer}>
        <span className={styles.footerLeft}>© 2024 Wraptors. All rights reserved.</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Privacy</a>
          <a href="#" className={styles.footerLink}>Terms</a>
          <a href="#" className={styles.footerLink}>Instagram</a>
        </div>
      </footer>
    </section>
  );
}
