import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './HeroVideo.module.css';
import { getPresentationMode, MODES } from '../lib/presentationMode';
// The one fallback image, used underneath the video in Video Mode and as
// the whole background in Safe Mode. Previously Video Mode used a separate
// frame-matched poster (an extreme, dark close-up extracted from the video
// itself) that read as "the wrong image" whenever it was visible for any
// length of time — this Lamborghini shot is what should show instead,
// instantly on mount, for as long as the video hasn't started playing (or
// forever, if it never does).
// Tri-City: client-supplied studio still (Aventador and Huracan in the bays)
// (2026-11-04).
import heroFallbackImage from '../assets/hero-tricity-fallback.jpg';
import { LOCATION } from '../config/location.js';
// Mobile: natively portrait footage. Desktop: separate, natively landscape
// footage. Neither is stored pre-rotated, so both use the same plain
// full-bleed cover CSS treatment (see .video in HeroVideo.module.css) —
// only which file loads differs by viewport.

// TEMPORARY DEBUG — remove once the Safe Mode black-flash fix is confirmed
// on real devices. Logs image-readiness at the exact moment the intro
// clears, which is the only thing that actually proves there's no gap.
const DEBUG_HERO = true;

export default function HeroVideo() {
  // Read once per mount, synchronously, before first paint — the admin
  // control (PresentationAdminControl.jsx) changes this via a full page
  // reload rather than live-swapping the video/GSAP setup mid-session, so
  // there is never a render where the mode is unknown or defaults to the
  // wrong thing and then flips.
  const [mode] = useState(() => getPresentationMode());
  const isVideoMode = mode === MODES.VIDEO;
  // Same viewport check used to decide the mobile-vs-desktop video source
  // below — read once, synchronously, same as `mode`.
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches);

  const sectionRef    = useRef(null);
  const imageRef      = useRef(null); // permanent background image — always mounted, both modes, opacity 1 from first paint
  const videoRef      = useRef(null); // Video Mode only
  const labelRef       = useRef(null);
  const line1Ref       = useRef(null);
  const line2Ref       = useRef(null);
  const subLineRef     = useRef(null);
  const ctaRef         = useRef(null);
  const scrollCueRef   = useRef(null);

  useEffect(() => {
    if (!DEBUG_HERO) return;
    const img = imageRef.current;
    console.log('[HeroDebug] permanent image mounted at', performance.now().toFixed(1), {
      mode,
      complete: img?.complete,
      naturalWidth: img?.naturalWidth,
    });
  }, [mode]);

  useEffect(() => {
    const section = sectionRef.current;

    // ── Text-only entrance — plays once, triggered by Hero.jsx's 'hero:exit'
    // (fired the instant its logo intro finishes sliding away), not by
    // scroll position or a fade tied to background readiness. The permanent
    // <img> below is already fully visible from the very first paint, so
    // there is nothing left for this timeline to reveal but the text —
    // the previous version's separate "entryOverlay" black plane (which
    // only started fading *after* this event fired) was itself the black
    // gap: Hero.jsx's own slide-away just uncovered *another* opaque black
    // layer, which then had its own fade still left to run.
    gsap.set([line1Ref.current, line2Ref.current], { opacity: 0, y: 36 });
    gsap.set(labelRef.current, { opacity: 0, y: 14 });
    gsap.set(subLineRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });
    gsap.set(scrollCueRef.current, { opacity: 0, y: 8 });

    const entranceTl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    entranceTl
      .to(labelRef.current,   { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(line1Ref.current,   { opacity: 1, y: 0, duration: 0.9 }, 0.08)
      .to(line2Ref.current,   { opacity: 1, y: 0, duration: 0.9 }, 0.25)
      .to(subLineRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.57)
      .to(ctaRef.current,     { opacity: 1, y: 0, duration: 0.8 }, 0.70)
      .to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.80);

    let entrancePlayed = false;
    const playEntrance = () => {
      if (entrancePlayed) return;
      entrancePlayed = true;
      if (DEBUG_HERO) {
        const img = imageRef.current;
        const computed = img ? getComputedStyle(img).opacity : null;
        console.log('[HeroDebug] intro clears (HeroVideo side) at', performance.now().toFixed(1), {
          mode,
          complete: img?.complete,
          naturalWidth: img?.naturalWidth,
          computedOpacity: computed,
        });
      }
      entranceTl.play();
    };
    window.addEventListener('hero:exit', playEntrance, { once: true });
    // Safety net in case 'hero:exit' never fires for some reason.
    const entranceFallback = setTimeout(playEntrance, 6000);

    // Fade the scroll cue out once the user actually starts scrolling; back
    // in if they return to the very top. Only engages after the entrance
    // has run, so it can't fight the entrance timeline's own opacity tween.
    let cueHidden = false;
    const onScroll = () => {
      if (!entrancePlayed) return;
      const shouldHide = window.scrollY > 12;
      if (shouldHide !== cueHidden) {
        cueHidden = shouldHide;
        gsap.to(scrollCueRef.current, { opacity: shouldHide ? 0 : 1, duration: 0.35, ease: 'power2.out' });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Video-only setup — Safe Mode has no <video> element at all, just
    // the permanent <img> above. In Video Mode, the video starts invisible
    // (opacity 0) and only reveals itself once real playback begins (the
    // native 'playing' event, not just play() resolving) — so if autoplay
    // is blocked, slow, or fails outright, the permanent image underneath
    // is what the user sees instead of black. ──
    let cleanupVideo = () => {};
    if (isVideoMode) {
      const video = videoRef.current;
      gsap.set(video, { opacity: 0 });

      // Force muted as a JS property — iOS Safari ignores the HTML attribute alone
      // and will block autoplay if it detects any audio intent.
      video.muted = true;
      // Both forms of playsInline — React's `playsInline` prop covers the standard
      // attribute; this covers older WebKit (iPhone 6-era Safari).
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      // Tri-City: the client's montage plays from 0:00 on every loop (the
      // old car-meet footage skipped its first 3 seconds; removed
      // 2026-11-04 at the client's request).

      // Reveal the video over the permanent image only once real frames are
      // actually being rendered — not merely when play() resolves.
      let videoRevealed = false;
      const onPlaying = () => {
        if (videoRevealed) return;
        videoRevealed = true;
        gsap.to(video, { opacity: 1, duration: 0.5, ease: 'power1.out' });
      };
      video.addEventListener('playing', onPlaying);

      // ── Autoplay strategy ─────────────────────────────────────────────
      // Guard: only call play() when the video is actually paused to avoid
      // AbortError from overlapping play() calls.
      const tryPlay = () => {
        if (!video.paused) return;
        video.play().catch(() => {
          // Blocked — permanent image stays visible; retries below cover later interaction
        });
      };

      // ── Deferred source assignment ─────────────────────────────────────
      // No `src` in the initial markup (see JSX below) — assigning it is
      // what actually starts the network fetch, and doing that immediately
      // on mount competes with the curtain intro and first paint for
      // bandwidth/CPU right when they matter most. requestIdleCallback lets
      // the browser finish its current work first; the timeout is a cap so
      // this still starts promptly on a busy main thread rather than
      // waiting indefinitely. First attempt fires the instant the source is
      // assigned, so "start the fetch" and "first play() attempt" happen
      // together.
      const startVideo = () => {
        video.src = isMobile ? LOCATION.media.heroVideoMobile : LOCATION.media.heroVideoDesktop;
        video.load();
        tryPlay();
      };
      let idleHandle = null;
      let idleTimer = null;
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(startVideo, { timeout: 1200 });
      } else {
        idleTimer = setTimeout(startVideo, 50);
      }

      // iOS sometimes requires the first user gesture to unlock muted autoplay.
      // Attach to all common first-interaction events; {once} auto-removes them.
      const retryOnInteraction = () => tryPlay();
      document.addEventListener('touchstart',  retryOnInteraction, { once: true, passive: true });
      document.addEventListener('click',       retryOnInteraction, { once: true, passive: true });
      document.addEventListener('scroll',      retryOnInteraction, { once: true, passive: true });

      // Retry when the user returns to the tab (background → foreground on mobile)
      const onVisibilityChange = () => { if (!document.hidden) tryPlay(); };
      document.addEventListener('visibilitychange', onVisibilityChange);

      // Play when section enters viewport, pause when it leaves (battery / data)
      const playIo = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) tryPlay();
          else video.pause();
        },
        { threshold: 0.1 }
      );
      playIo.observe(section);

      cleanupVideo = () => {
        if (idleHandle !== null && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleHandle);
        if (idleTimer !== null) clearTimeout(idleTimer);
        playIo.disconnect();
        video.removeEventListener('playing',        onPlaying);
        document.removeEventListener('touchstart',       retryOnInteraction);
        document.removeEventListener('click',            retryOnInteraction);
        document.removeEventListener('scroll',           retryOnInteraction);
        document.removeEventListener('visibilitychange', onVisibilityChange);
      };
    }

    return () => {
      cleanupVideo();
      window.removeEventListener('hero:exit', playEntrance);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(entranceFallback);
      entranceTl.kill();
    };
  }, [isVideoMode, mode, isMobile]);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* Permanent background image — mounted unconditionally on the very
          first render, opacity:1 from the start, never faded, never gated
          on load/onLoad/isLoaded. This is the one layer that must never be
          black: in Video Mode it's the frame-matched poster shown until
          real playback begins (or if it never does); in Safe Mode it's the
          whole background. */}
      <img
        ref={imageRef}
        src={heroFallbackImage}
        alt=""
        className={`${styles.heroImage} ${!isVideoMode ? styles.heroImageSafe : ''}`}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
      />
      {!isVideoMode && <div className={styles.heroImageGradient} aria-hidden="true" />}

      {isVideoMode && (
        // No `src`/`autoPlay`/`preload` here on purpose — both are assigned
        // imperatively once the browser is idle after first paint (see the
        // effect above), so this element does nothing and costs nothing
        // until then. `autoPlay` is deliberately omitted too: playback is
        // fully driven by tryPlay() below instead, so there's exactly one
        // thing deciding when it starts, not two.
        <video
          ref={videoRef}
          className={styles.video}
          muted
          playsInline
          loop
          preload="none"
          fetchPriority="high"
        />
      )}

      <div className={styles.fadeTop}    aria-hidden="true" />
      <div className={styles.fadeBottom} aria-hidden="true" />

      {/* Cinematic text block — anchored near the top in both Video and Safe
          Mode (see .textOverlay), rather than vertically centered, so the
          same position works whether the video or the fallback image is
          showing. Only the headline lives here now — the ruler/subline/CTA
          moved into .heroLowerGroup below so the vertical middle of the
          hero stays clear for the footage itself. */}
      <div className={styles.textOverlay} aria-hidden="false">
        {/* The homepage's only H1 — previously two <p> lines, which left the
            page (and its most important heading) with no H1 at all. */}
        <p ref={labelRef} className={styles.heroLabel}>{LOCATION.hero.label}</p>
        <h1 className={styles.mainHeadline}>
          <span ref={line1Ref} className={styles.mainLine}>Crafted with purpose.</span>
          <span ref={line2Ref} className={styles.mainLine}>Built for legacy.</span>
        </h1>
      </div>

      {/* Lower group — ruler, subline and CTA, positioned above the scroll
          cue rather than immediately under the headline. */}
      <div className={styles.heroLowerGroup}>
        <p ref={subLineRef} className={styles.subLine}>
          Car&nbsp;wraps&nbsp;&nbsp;·&nbsp;&nbsp;PPF<span className={styles.subLineSep}>&nbsp;&nbsp;·&nbsp;&nbsp;</span><br className={styles.subLineBreak} />Ceramic&nbsp;coating&nbsp;&nbsp;·&nbsp;&nbsp;Window&nbsp;tint
        </p>
        <a ref={ctaRef} href="/#cta" className={styles.heroCta}>
          <span className={styles.heroCtaLabel}>
            Start Your Project
            {/* Real SVG, not a Unicode arrow glyph — the latter renders as a
                coloured emoji on iOS Safari instead of following the thin
                white text styling. */}
            <svg
              className={styles.heroCtaArrow}
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </span>
        </a>
      </div>

      {/* Scroll indicator — present in both modes, fades out once the user
          actually starts scrolling (see the scroll listener above) */}
      <div ref={scrollCueRef} className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollCueText}>Scroll</span>
        <span className={styles.scrollCueLine} />
        <svg className={styles.scrollCueChevron} width="14" height="8" viewBox="0 0 14 8" fill="none">
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </section>
  );
}
