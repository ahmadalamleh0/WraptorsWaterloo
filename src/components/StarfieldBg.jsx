import styles from './StarfieldBg.module.css';
import starsAvif from '../../stars.avif';
import starsJpeg from '../../stars - Copy.jpeg';

export default function StarfieldBg() {
  return (
    <div className={styles.root} aria-hidden="true">
      {/* ① Base layer — the actual night-sky photo, slow scale + drift */}
      <div className={styles.layer1} style={{ '--jpeg': `url(${starsJpeg})`, '--avif': `url(${starsAvif})` }} />

      {/* ② Second layer — same image, independent opacity oscillation for twinkle */}
      <div className={styles.layer2} style={{ '--jpeg': `url(${starsJpeg})`, '--avif': `url(${starsAvif})` }} />

      {/* ③ Radial glow — soft luxury ambience pulse */}
      <div className={styles.glow} />

      {/* ④ Shooting stars — pure CSS, three staggered intervals */}
      <div className={styles.shootingStars}>
        <div className={styles.ss1} />
        <div className={styles.ss2} />
        <div className={styles.ss3} />
      </div>

      {/* ⑤ Dark gradient vignette — keeps text readable */}
      <div className={styles.vignette} />

      {/* ⑥ Noise grain — static SVG texture for depth */}
      <div className={styles.noise} />
    </div>
  );
}
