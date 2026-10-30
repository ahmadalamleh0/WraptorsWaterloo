// Shared source of truth for the hero's presentation mode (video vs the
// static "safe mode" image). Persisted to localStorage so it survives
// refreshes and browser restarts; read once per page load (a mode change
// from the admin control triggers a reload rather than trying to hot-swap
// the hero's video/GSAP setup live, which is safer for something this
// stateful).
export const PRESENTATION_MODE_KEY = 'wraptors:presentationMode';
export const MODES = { VIDEO: 'video', SAFE: 'safe' };

function readStoredMode() {
  try {
    const stored = localStorage.getItem(PRESENTATION_MODE_KEY);
    return stored === MODES.VIDEO || stored === MODES.SAFE ? stored : null;
  } catch {
    return null; // localStorage unavailable (private browsing etc.)
  }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// NetworkInformation isn't available in every browser (notably Safari) —
// treated as "no signal either way" rather than assumed fast or slow.
function isDataSaverOrSlowConnection() {
  if (typeof navigator === 'undefined') return false;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) return false;
  return !!conn.saveData || ['slow-2g', '2g'].includes(conn.effectiveType);
}

// No explicit preference yet: attempt Video Mode by default, but land on
// Safe Mode (static photo only, no autoplay/fetch at all) when the visitor
// has asked for reduced motion or is on a metered/slow connection — an
// autoplaying video is actively unwelcome in either case, not just
// expensive. This is re-evaluated per visit (not persisted), since a
// connection or OS-level motion setting can change between sessions.
// Either mode is still switchable from the admin control, which always
// wins over this auto-detection once set.
export function getPresentationMode() {
  const stored = readStoredMode();
  if (stored) return stored;
  if (prefersReducedMotion() || isDataSaverOrSlowConnection()) return MODES.SAFE;
  return MODES.VIDEO;
}

export function setPresentationMode(mode) {
  try {
    localStorage.setItem(PRESENTATION_MODE_KEY, mode);
  } catch {
    // Mode just won't persist — not fatal.
  }
}
