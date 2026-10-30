import MediaPlaceholder from './MediaPlaceholder';
import styles from './Founder.module.css';

export default function Founder() {
  return (
    <section id="founder" className={styles.section}>
      <div className={styles.inner}>
        {/* Left: cinematic portrait / lifestyle */}
        <div className={styles.mediaCol}>
          {/* REPLACE: swap with cinematic founder portrait or lifestyle photo */}
          <MediaPlaceholder
            label="Founder Portrait / Lifestyle — Cinematic Photo Placeholder"
            style={{ minHeight: 560 }}
          />
          {/* Decorative chrome frame */}
          <div className={styles.frameT} />
          <div className={styles.frameB} />
          {/* Floating stat badge */}
          <div className={styles.badge}>
            <span className={styles.badgeVal}>9000<sup>+</sup></span>
            <span className={styles.badgeLabel}>Vehicles</span>
          </div>
        </div>

        {/* Right: copy */}
        <div className={styles.copyCol}>
          <span className="section-label">The Culture</span>

          <h2 className={styles.title}>
            MORE THAN WRAPS.<br />
            <span className="chrome-text">A LIFESTYLE BUILT</span><br />
            AROUND CARS.
            <span className={styles.titleUnderline} />
          </h2>

          <p className={styles.body}>
            Wraptors is built around customization, culture, exotic vehicles,
            and a global community of car owners who want their vehicles to feel
            impossible to ignore.
          </p>

          <p className={styles.body}>
            From the streets of Dubai to Cape Town, we don't just wrap
            cars — we shape how they're perceived. Every vehicle is a canvas.
            Every client is a collaborator.
          </p>

          {/* Quote callout */}
          <div className={styles.quote}>
            <span className={styles.quoteBar} />
            <p className={styles.quoteText}>
              "We built something different. Not a shop. An empire."
            </p>
          </div>

          <a href="#cta" className={`btn-primary ${styles.cta}`}>
            See The Culture
          </a>
        </div>
      </div>
    </section>
  );
}
