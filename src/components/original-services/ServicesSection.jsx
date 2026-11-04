import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import styles from './ServicesSection.module.css';

// Six core services in the source project's homepage order, using brand
// Wraptors photography. Sizes reuse the
// original grid's own classes so the three original row heights are kept:
// wide + standard + standard / wide + wide / featured (full width).
// Descriptions are the landing page's original copy for each service.
// Client-supplied 2026-11-04: gloss-pink Aventador, carbon bonnet, bronze wheels.
import imgWraps from '../../../Wraptors Media/Wraps/wraps-aventador-pink-carbon.jpg';
import imgPPF from '../../../Signture Section/Aston_Martin(4).jpeg';
import imgCeramic from '../../../Ceramic Coating(new1).jpeg';
// Client-supplied 2026-11-04: matte-black G-Wagon with dark tinted windows.
import imgTint from '../../../Wraptors Media/Tint/tint-gwagon-black.jpg';
// Last photo in the Starlight page's "A Closer Look" gallery.
import imgStarlight from '../../../Starlight(7).jpeg';
// Client-supplied 2026-11-04: Lamborghini Urus, carbon vented bonnet.
import imgCustomBuilds from '../../../Wraptors Media/Custom Builds/custom-builds-urus-carbon.jpg';

const SERVICES = [
  {
    name: 'Vehicle Wraps',
    to: '/services/wraps/',
    description: 'Premium color changes and custom finishes designed for a standout presence.',
    image: imgWraps,
    imgPos: 'center 64%',
    size: 'wide',
  },
  {
    name: 'Paint Protection Film',
    to: '/services/ppf/',
    description: 'Invisible protection built to preserve paint against road wear, chips, and daily driving.',
    image: imgPPF,
    size: 'standard',
  },
  {
    name: 'Ceramic Coating',
    to: '/services/ceramic/',
    description: 'Long-lasting gloss and hydrophobic protection for easier maintenance.',
    image: imgCeramic,
    size: 'standard',
    imgPos: 'center 25%',
  },
  {
    name: 'Window Tint',
    to: '/services/tint/',
    description: 'Refined privacy, heat rejection, and a sharper exterior profile.',
    image: imgTint,
    imgPos: 'center 45%',
    size: 'wide',
  },
  {
    name: 'Starlight Headliner',
    to: '/services/starlight/',
    description: 'A luxury interior upgrade with a custom illuminated ceiling finish.',
    image: imgStarlight,
    size: 'wide',
  },
  {
    name: 'Custom Builds & Body Kits',
    to: '/services/custom-builds/',
    description: 'Aggressive styling upgrades built for a stronger road presence.',
    image: imgCustomBuilds,
    imgPos: 'center 60%',
    size: 'featured',
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <Reveal as="h2" className={styles.kicker}>Our Services</Reveal>

      <div className={styles.grid}>
        {SERVICES.map(({ name, to, image, size, description, imgPos }, i) => (
          <Reveal
            key={name}
            as={Link}
            to={to}
            className={`${styles.card} ${styles[size]}`}
            delay={Math.min(i * 70, 280)}
          >
            <img src={image} alt={name} className={styles.cardImage} loading="lazy" style={imgPos ? { objectPosition: imgPos } : undefined} />
            <div className={styles.cardOverlay} aria-hidden="true" />
            <div className={styles.cardContent}>
              <p className={styles.cardDesc}>{description}</p>
              <span className={styles.cardName}>
                {name}
                <span className={styles.cardArrow} aria-hidden="true">→</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
