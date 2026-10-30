import { useEffect, useState } from 'react';
import styles from './TintCompareSection.module.css';
// Five real photos of the same car, same pose, same background — swapping
// between them directly (no window masks, no synthetic dark overlays) is
// what "use the supplied images directly" means here.
import noTintImg from '../../Wraptors Media/tinting/gclass-0-tint.png';
import tint5Img  from '../../ChatGPT Image Sep 20, 2026, 12_28_24 PM.png';
import tint15Img from '../../6c1c6a1b-fecb-4ef6-95d9-cc2ab01577fc.png';
import tint20Img from '../../4eaf2211-83c2-43aa-bfcd-4b3bda47d03f.png';
import tint35Img from '../../Wraptors Media/37c21e96-3f71-42dd-91ba-d316afae8978.png';

const TINT_OPTIONS = [
  { id: 'none', label: 'No Tint', img: noTintImg, alt: 'Mercedes-Benz G-Class with clear, untinted glass' },
  { id: '5',    label: '5%',      img: tint5Img,  alt: 'Mercedes-Benz G-Class with 5% VLT window tint' },
  { id: '15',   label: '15%',     img: tint15Img, alt: 'Mercedes-Benz G-Class with 15% VLT window tint' },
  { id: '20',   label: '20%',     img: tint20Img, alt: 'Mercedes-Benz G-Class with 20% VLT window tint' },
  { id: '35',   label: '35%',     img: tint35Img, alt: 'Mercedes-Benz G-Class with 35% VLT window tint' },
];

export default function TintCompareSection() {
  const [selected, setSelected] = useState('none');
  const active = TINT_OPTIONS.find((o) => o.id === selected) ?? TINT_OPTIONS[0];

  // Preload every option as soon as this section mounts, so picking a new
  // one is an instant swap onto an already-decoded image — no network
  // wait, no blank frame, no visible jump between photos.
  useEffect(() => {
    TINT_OPTIONS.forEach((opt) => {
      const img = new Image();
      img.src = opt.img;
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Compare Tint Options</span>
        <h2 className={styles.heading}>See The Difference.</h2>
        <p className={styles.sub}>
          Explore different tint shades and find your preferred look.
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <img src={active.img} alt={active.alt} className={styles.img} />
        </div>

        <div className={styles.optionRow} role="radiogroup" aria-label="Tint shade">
          {TINT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={selected === opt.id}
              className={`${styles.optionBtn} ${selected === opt.id ? styles.optionBtnActive : ''}`}
              onClick={() => setSelected(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <p className={styles.note}>Visual preview only. Actual appearance varies.</p>
      </div>
    </section>
  );
}
