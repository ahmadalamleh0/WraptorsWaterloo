import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.css';

import imgWrapping1   from '../../Wrappin(1new).jpeg';
import imgWrapping2   from '../../Wraptors Media/Wrappin(2new).jpeg';
import imgWrapping3   from '../../Wrapping Last_3.jpeg';
import imgPPF1        from '../../PPF(last_1).jpeg';
import imgPPF2        from '../../PPF(2New).jpeg';
import imgPPF3        from '../../PPF(3New).jpeg';
import imgAstonPPF    from '../../Signture Section/Aston_Martin(4).jpeg';
import imgStarlight   from '../../Starlight_headliner.jpeg';
import imgStarlight2  from '../../Starlight(2).jpeg';
import imgStarlight3  from '../../Starlight(3).jpeg';
import imgCeramic1    from '../../Ceramic Coating(new1).jpeg';
import imgCeramic2    from '../../Ceramic Coating(new2).jpeg';
import imgCeramic3    from '../../Ceramic Coating(new3).jpeg';
import imgCustomBuild1 from '../../Wraptors Media/Custom Builds/621837139_18385536877146462_5187708123866638297_n - Copy.jpg';
import imgCustomBuild2 from '../../Wraptors Media/Custom Builds/531390763_18364031848146462_3978469811072555494_n.jpg';
import imgCustomBuild3 from '../../Wraptors Media/Custom Builds/600288082_18380751250146462_3960198007605295301_n.jpg';
import imgTint        from '../../tint.jpeg';

const SERVICES = [
  {
    id: 'wraps',
    slug: '/services/wraps/',
    ghost: 'VEHICLE WRAPS',
    name: 'Vehicle Wraps',
    imgs: [imgWrapping1, imgWrapping2, imgWrapping3],
  },
  {
    id: 'ppf',
    slug: '/services/ppf/',
    ghost: 'PAINT PROTECTION FILM',
    name: 'Paint Protection Film',
    imgs: [imgAstonPPF, imgPPF1, imgPPF2, imgPPF3],
  },
  {
    id: 'starlight',
    slug: '/services/starlight/',
    ghost: 'STARLIGHT HEADLINER',
    name: 'Starlight Headliner',
    imgs: [imgStarlight2, imgStarlight, imgStarlight3],
  },
  {
    id: 'custom-builds',
    slug: '/services/custom-builds/',
    ghost: 'CUSTOM BUILDS',
    name: 'Custom Builds & Body Kits',
    imgs: [imgCustomBuild1, imgCustomBuild2, imgCustomBuild3],
  },
  {
    id: 'ceramic',
    slug: '/services/ceramic/',
    ghost: 'CERAMIC COATING',
    name: 'Ceramic Coating',
    imgs: [imgCeramic1, imgCeramic2, imgCeramic3],
    // Biased up slightly so the mobile overlay's bottom-left title doesn't
    // land on the license plate/badge at the very bottom of the source photo.
    imgPositions: ['center 25%'],
  },
  {
    id: 'tint',
    slug: '/services/tint/',
    ghost: 'WINDOW TINT',
    name: 'Window Tint',
    imgs: [imgTint],
  },
];

function ServiceBlock({ svc, blockRef }) {
  // Locked to the first image only — no rotation, no timers, no carousel.
  // svc.imgs may still carry additional images (used elsewhere, e.g. the
  // service detail pages), but this card always renders imgs[0].
  const mainImg = svc.imgs[0];

  // One image-led tile: the photo is the card, the title sits on it and the
  // whole tile is the link — no separate description or CTA panel.
  return (
    <Link to={svc.slug} className={styles.block} ref={blockRef}>
      <img
        src={mainImg}
        alt=""
        className={styles.img}
        loading="lazy"
        style={svc.imgPositions?.[0] ? { objectPosition: svc.imgPositions[0] } : undefined}
      />
      <span className={styles.shade} aria-hidden="true" />
      <span className={styles.corners} aria-hidden="true" />
      <span className={styles.foot}>
        <h3 className={styles.name}>{svc.name}</h3>
        <span className={styles.arrow} aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export default function Services() {
  const blockRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.blockVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    blockRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={styles.section}>

      {SERVICES.map((svc, i) => (
        <div key={svc.id} className={styles.serviceZone}>
          <div className={styles.ghostText} aria-hidden="true">
            {svc.ghost}
          </div>
          <ServiceBlock
            svc={svc}
            blockRef={el => { blockRefs.current[i] = el; }}
          />
        </div>
      ))}
    </section>
  );
}
