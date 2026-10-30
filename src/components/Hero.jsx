import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';
import WraptorsMafiaLogo from './WraptorsMafiaLogo';
import { LOCATION } from '../config/location.js';

const INTRO_SEEN_KEY = 'wraptorsHeroIntroSeen';

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return false; // storage blocked (private mode, etc.) — just replay it
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // ignore — nothing to persist to, no harm done
  }
}

export default function Hero() {
  // Once per browser tab session, not once per mount — so navigating to a
  // service page and back doesn't replay the reveal/wipe every time.
  const skipIntro = hasSeenIntro();

  const sectionRef    = useRef(null);
  const lockupRef     = useRef(null);
  const logoWrapRef   = useRef(null);
  const logoClipRef   = useRef(null);  // clips the SVG; blade is sibling, not clipped
  const logoImgRef    = useRef(null);
  const bladeRef      = useRef(null);
  const dubaiEditionRef = useRef(null);
  const topTextRef    = useRef(null);
  const brandRuleRef  = useRef(null);
  const bottomTextRef = useRef(null);
  const estRef        = useRef(null);
  const yearRef       = useRef(null);
  const scrollRef     = useRef(null);

  useEffect(() => {
    if (skipIntro) {
      // Already played this session — jump straight to "exited" so the
      // navbar reveals immediately. Nothing to render (see below), so
      // there's nothing to animate out either.
      //
      // Deferred to a microtask rather than dispatched synchronously: this
      // effect runs before HeroVideo's sibling effect (mount order), which
      // is where the 'hero:exit' listener that reveals the headline gets
      // attached — dispatching immediately here fired before that listener
      // existed, silently dropping the event and leaving the headline
      // invisible until HeroVideo's 6s fallback timer caught it. A
      // microtask runs after all of this commit's effects have finished,
      // so the listener is already attached by the time this fires.
      queueMicrotask(() => window.dispatchEvent(new CustomEvent('hero:exit')));
      return undefined;
    }

    const lockup    = lockupRef.current;
    const logoClip  = logoClipRef.current;
    const img       = logoImgRef.current;
    const blade     = bladeRef.current;
    const dubaiEdition = dubaiEditionRef.current;
    const topTxt    = topTextRef.current;
    const brandRule = brandRuleRef.current;
    const botTxt    = bottomTextRef.current;
    const est       = estRef.current;
    const year      = yearRef.current;
    const section   = sectionRef.current;

    // TEMPORARY DEBUG — remove once the Safe Mode black-flash fix is
    // confirmed on real devices.
    console.log('[HeroDebug] Intro starts at', performance.now().toFixed(1));

    // ── 1. Initial states ─────────────────────────────────────────────
    gsap.set(lockup,   { opacity: 0 });
    gsap.set(logoClip, { clipPath: 'inset(0 0 100% 0)' }); // hidden; reveals top-to-bottom
    gsap.set(img,      { filter: 'brightness(1.0)' });
    gsap.set(blade,    { top: '0%', opacity: 0 });
    gsap.set(dubaiEdition, { clipPath: 'inset(0 0 100% 0)', opacity: 0 });
    gsap.set(topTxt,   { clipPath: 'inset(0 0 100% 0)', opacity: 0 });
    gsap.set(botTxt,   { clipPath: 'inset(0 0 100% 0)', opacity: 0 });
    gsap.set(brandRule,    { scaleX: 0, opacity: 0 });
    gsap.set([est, year],  { opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });

    // Build-time prerendering (scripts/prerender.mjs) sets this flag before
    // navigating so the static snapshot it captures is frozen right here —
    // fully black, nothing revealed yet — instead of whatever frame the
    // reveal/exit timeline happened to be on when its networkidle wait
    // fired. Without this, a real visitor's browser paints that prerendered
    // HTML first (already showing the finished, revealed hero), then React
    // boots and replays the whole intro from scratch — the flash this
    // fixes. A real visit never sets this flag, so nothing changes for
    // anyone who isn't the prerender script itself.
    if (typeof window !== 'undefined' && window.__WRAPTORS_PRERENDER__) {
      return undefined;
    }

    // ── 2. Reveal timeline ────────────────────────────────────────────
    const tl = gsap.timeline();

    // Lockup becomes active against pure black
    tl.to(lockup, { opacity: 1, duration: 0.04, ease: 'none' }, 0.06);

    // Blade appears at top edge of logo
    tl.to(blade, { opacity: 1, duration: 0.05, ease: 'none' }, 0.10);

    // Blade cuts downward; logo clips in exactly in sync — engraved into screen
    tl.to(blade,    { top: '100%',                duration: 0.54, ease: 'power1.inOut' }, 0.14);
    tl.to(logoClip, { clipPath: 'inset(0 0 0% 0)', duration: 0.54, ease: 'power1.inOut' }, 0.14);

    // Blade exits — brief gleam as the cut completes, then settles pure white
    tl.to(blade, { opacity: 0, duration: 0.05, ease: 'none' }, 0.67);
    tl.to(img,   { filter: 'brightness(1.14)', duration: 0.08, ease: 'none' }, 0.66);
    tl.to(img,   { filter: 'brightness(1.0)',  duration: 0.32, ease: 'power2.out' }, 0.74);

    // "DUBAI [flag] EDITION" — same engraved-cut reveal as the logo/wordmark
    // below it, timed just after the logo settles so it reads as the next
    // beat in the same carve, not a separate fade tacked on afterward.
    tl.to(dubaiEdition, {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.22,
      ease: 'power2.inOut',
    }, 0.80);

    // "WRAPTORS DUBAI" — etched downward, same cut technique
    tl.to(topTxt, {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.26,
      ease: 'power2.inOut',
    }, 0.90);

    // Hairline rule — drawn from center out
    tl.to(brandRule, {
      opacity: 1,
      scaleX: 1,
      duration: 0.18,
      ease: 'power2.inOut',
      transformOrigin: 'center',
    }, 1.18);

    // "LOYALTY OVER ROYALTY"
    tl.to(botTxt, {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.22,
      ease: 'power2.out',
    }, 1.34);

    // EST. / 2016 — quiet, last to appear
    tl.to(est,  { opacity: 1, duration: 0.20, ease: 'power1.out' }, 1.56);
    tl.to(year, { opacity: 1, duration: 0.20, ease: 'power1.out' }, 1.64);

    // Scroll cue
    tl.to(scrollRef.current, { opacity: 1, duration: 0.38, ease: 'power1.out' }, 1.74);

    // ── 3. Exit: slide overlay upward ─────────────────────────────────
    let exitFired = false;
    let exitTween = null;

    function runExit() {
      if (exitFired || !section) return;
      exitFired = true;
      markIntroSeen();
      window.removeEventListener('scroll',     onUserInput);
      window.removeEventListener('touchstart', onUserInput);
      exitTween = gsap.to(section, {
        y: '-100%',
        duration: 1.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (sectionRef.current) sectionRef.current.style.display = 'none';
          // TEMPORARY DEBUG — remove alongside the one above.
          console.log('[HeroDebug] Intro clears at', performance.now().toFixed(1));
          window.dispatchEvent(new CustomEvent('hero:exit'));
        },
      });
    }

    const onUserInput = () => runExit();
    window.addEventListener('scroll',     onUserInput, { once: true, passive: true });
    window.addEventListener('touchstart', onUserInput, { once: true, passive: true });
    tl.call(runExit, null, '>');

    return () => {
      tl.kill();
      if (exitTween) exitTween.kill();
      window.removeEventListener('scroll',     onUserInput);
      window.removeEventListener('touchstart', onUserInput);
    };
  }, [skipIntro]);

  // Nothing to show or animate on a repeat visit this session — the page
  // just opens straight into the next section instead.
  if (skipIntro) return null;

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>

      <div ref={lockupRef} className={styles.lockup}>

        <div className={styles.logoRow}>
          <span ref={estRef} className={styles.sideText}>EST.</span>

          <div className={styles.logoCol}>
            {/* Centered precisely over the logo mark below it — equal-width
                word columns either side of the flag, same trick the
                service-page navbar uses, so the location name and "Edition" being
                different lengths doesn't pull the flag off-center. */}
            <span ref={dubaiEditionRef} className={styles.dubaiEdition}>
              <span className={`${styles.dubaiEditionWord} ${styles.dubaiEditionWordLeft}`}>{LOCATION.edition.label}</span>
              <img src={LOCATION.edition.flag} alt="" className={styles.dubaiFlag} />
              <span className={`${styles.dubaiEditionWord} ${styles.dubaiEditionWordRight}`}>Edition</span>
            </span>

            <div ref={logoWrapRef} className={styles.logoWrap}>
              {/* logoClip is clipped; blade is a sibling so it stays visible */}
              <div ref={logoClipRef} className={styles.logoClip}>
                <WraptorsMafiaLogo ref={logoImgRef} className={styles.badgeImg} />
              </div>
              <div ref={bladeRef} className={styles.engraveBlade} aria-hidden="true" />
            </div>
          </div>

          <span ref={yearRef} className={styles.sideText}>2016</span>
        </div>

        <p ref={topTextRef} className={styles.topText}>{LOCATION.brandName.toUpperCase()}</p>
        <div ref={brandRuleRef} className={styles.brandRule} aria-hidden="true" />
        <p ref={bottomTextRef} className={styles.bottomText}>LOYALTY&nbsp;OVER&nbsp;ROYALTY</p>

        <div ref={scrollRef} className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollText}>SCROLL</span>
          <span className={styles.scrollBar} />
          <span className={styles.scrollDot} />
        </div>

      </div>

    </section>
  );
}
