import { useEffect, useRef } from 'react';

// Same easing/durations/stagger as the original site's framer-animations.js
// initConfigurator() block, reimplemented with the native Web Animations API
// so this component has no required dependency on framer-motion.
const EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

function revealOnce(
  el: Element | null,
  threshold: number,
  play: () => void
): IntersectionObserver | null {
  if (!el) return null;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      observer.disconnect();
      play();
    }
  }, { threshold });
  observer.observe(el);
  return observer;
}

/**
 * Reveals the manufacturer grid (header text, panel, cards) exactly like the
 * original site's scroll-entrance animation. Attach the returned ref to the
 * component's root element.
 */
export function useEntranceReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observers: (IntersectionObserver | null)[] = [];

    // .configurator__title is excluded here — it now runs its own word-mask
    // GSAP reveal (see VehicleSelector.tsx) instead of this WAAPI fade/slide.
    const headerTargets = Array.from(
      root.querySelectorAll<HTMLElement>('.configurator__eyebrow, .configurator__sub')
    );
    observers.push(
      revealOnce(root.querySelector('.configurator__header'), 0.2, () => {
        headerTargets.forEach((el, i) => {
          el.animate(
            [
              { opacity: 0, transform: 'translateY(50px) scale(0.97)' },
              { opacity: 1, transform: 'translateY(0) scale(1)' },
            ],
            { duration: 1200, delay: 100 + i * 140, easing: EXPO_OUT, fill: 'forwards' }
          );
        });
      })
    );

    const panel = root.querySelector<HTMLElement>('.configurator__panel');
    observers.push(
      revealOnce(panel, 0.07, () => {
        panel!.animate(
          [
            { opacity: 0, transform: 'translateY(52px) scale(0.97)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          { duration: 1350, delay: 120, easing: EXPO_OUT, fill: 'forwards' }
        );
      })
    );

    const cards = Array.from(root.querySelectorAll<HTMLElement>('.config-card'));
    observers.push(
      revealOnce(cards[0] ?? null, 0.22, () => {
        cards.forEach((el, i) => {
          el.animate(
            [
              { opacity: 0, transform: 'translateY(32px) scale(0.95)' },
              { opacity: 1, transform: 'translateY(0) scale(1)' },
            ],
            { duration: 780, delay: 250 + i * 52, easing: EXPO_OUT, fill: 'forwards' }
          );
        });
      })
    );

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return rootRef;
}
