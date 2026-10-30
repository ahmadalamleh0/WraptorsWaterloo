import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PresentationAdminControl.module.css';
import { getPresentationMode, setPresentationMode, MODES } from '../lib/presentationMode';

// Small, unobtrusive admin control (bottom-right) for switching the hero
// between Video Mode and Safe Mode. The choice is persisted to
// localStorage and applied on the next load — switching triggers a full
// reload rather than trying to hot-swap the hero's video/GSAP setup live.
export default function PresentationAdminControl() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(() => getPresentationMode());
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const choose = useCallback((next) => {
    if (next === mode) {
      setOpen(false);
      return;
    }
    setPresentationMode(next);
    setMode(next);
    setOpen(false);
    window.location.reload();
  }, [mode]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {open && (
        <div className={styles.menu} role="menu" aria-label="Presentation mode">
          <div className={styles.menuTitle}>Presentation Mode</div>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={mode === MODES.VIDEO}
            className={`${styles.menuItem} ${mode === MODES.VIDEO ? styles.active : ''}`}
            onClick={() => choose(MODES.VIDEO)}
          >
            Video Mode
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={mode === MODES.SAFE}
            className={`${styles.menuItem} ${mode === MODES.SAFE ? styles.active : ''}`}
            onClick={() => choose(MODES.SAFE)}
          >
            Safe Mode
          </button>
        </div>
      )}
      <button
        type="button"
        className={styles.adminButton}
        aria-label="Presentation admin controls"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        ⚙
      </button>
    </div>
  );
}
