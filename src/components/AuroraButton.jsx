import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuroraButton.module.css';

export default function AuroraButton({ text = 'Experience It', emoji = '⚡', showEmoji = false, to, href }) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <>
      {/* 14 cloud / smoke decorations — matches original AuroraGlassButton */}
      <span className={styles.smoke} aria-hidden="true">
        <span className={styles.c1}  />
        <span className={styles.c2}  />
        <span className={styles.c3}  />
        <span className={styles.c4}  />
        <span className={styles.c5}  />
        <span className={styles.c6}  />
        <span className={styles.c7}  />
        <span className={styles.c8}  />
        <span className={styles.c9}  />
        <span className={styles.c10} />
        <span className={styles.c11} />
        <span className={styles.c12} />
        <span className={styles.c13} />
        <span className={styles.c14} />
      </span>

      {/* Frosted glass overlay */}
      <span className={styles.glass}>
        <span className={styles.innerGlass} />
      </span>

      {/* Text */}
      <span className={`${styles.label} ${hovered ? styles.labelHovered : ''}`}>
        {showEmoji && <span className={styles.emoji}>{emoji}</span>}
        <strong>{text}</strong>
      </span>
    </>
  );

  const shared = {
    className: `${styles.btn} ${hovered ? styles.hovered : ''}`,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (to)   return <Link to={to}     {...shared}>{inner}</Link>;
  if (href) return <a    href={href} {...shared}>{inner}</a>;
  return <button type="button" {...shared}>{inner}</button>;
}
