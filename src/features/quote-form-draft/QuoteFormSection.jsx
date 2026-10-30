import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './QuoteForm.module.css';
import { useQuoteForm } from './useQuoteForm';
import StepIndicator from './StepIndicator';
import ServiceStep from './steps/ServiceStep';
import VehicleStep from './steps/VehicleStep';
import CoverageStep from './steps/CoverageStep';
import StyleTimingStep from './steps/StyleTimingStep';
import ContactStep from './steps/ContactStep';
import ReviewStep from './steps/ReviewStep';

gsap.registerPlugin(ScrollTrigger);

const STEP_COMPONENTS = {
  1: ServiceStep,
  2: VehicleStep,
  3: CoverageStep,
  4: StyleTimingStep,
  5: ContactStep,
  6: ReviewStep,
};

const HEADING_WORDS = ["LET'S", 'BUILD', 'YOUR', 'TRANSFORMATION'];

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function QuoteFormSection() {
  const form = useQuoteForm();
  const { data, direction, goNext, goBack, goToStep, canAdvance, submitted } = form;

  const sectionRef = useRef(null);
  const wordRefs = useRef([]);
  const cardRef = useRef(null);
  const bodyRef = useRef(null);
  const prevStepRef = useRef(data.step);
  const [isAnimating, setIsAnimating] = useState(false);

  // Intro word-mask reveal — same technique as ServicesIntro's
  // "THE WRAPTORS STANDARD": each word rises out of an overflow-hidden mask.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordRefs.current.filter(Boolean);

      if (prefersReducedMotion()) {
        gsap.from(words, {
          opacity: 0, duration: 0.9, stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        });
        return;
      }

      gsap.from(words, {
        yPercent: 110, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      });
    }, sectionRef);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, []);

  // Enter animation for whichever step is now showing — the matching exit
  // animation runs imperatively in animateNav() below, before the step
  // number (and therefore the rendered step) actually changes.
  useEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = data.step;
    if (prevStep === data.step) return; // initial mount, nothing to animate in
    const el = bodyRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.25 });
        return;
      }
      const enterFrom = direction === 'forward' ? 24 : -24;
      gsap.fromTo(
        el,
        { opacity: 0, x: enterFrom },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, [data.step, direction]);

  // If the card has scrolled above the viewport top by the time a step
  // changes, bring it back into view instead of leaving the user looking
  // at a stale scroll position.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < 0) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }
  }, [data.step]);

  function animateNav(navAction, exitDir) {
    if (isAnimating) return;
    const el = bodyRef.current;
    if (!el || prefersReducedMotion()) {
      navAction();
      return;
    }
    setIsAnimating(true);
    const exitX = exitDir === 'forward' ? -24 : 24;
    gsap.to(el, {
      opacity: 0,
      x: exitX,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        navAction();
        setIsAnimating(false);
      },
    });
  }

  function handleContinue() {
    if (isAnimating) return;
    if (!canAdvance()) {
      goNext(); // no valid transition to animate — just surface the inline errors
      return;
    }
    animateNav(() => goNext(), 'forward');
  }

  function handleBack() {
    animateNav(() => goBack(), 'backward');
  }

  function handleEditStep(step) {
    animateNav(() => goToStep(step), 'backward');
  }

  const StepComponent = STEP_COMPONENTS[data.step];
  const isFirstStep = data.step === 1;
  const isReviewStep = data.step === 6;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>Start Your Build</span>
        <h2 className={styles.heading}>
          {HEADING_WORDS.map((word, i) => (
            <span className={styles.wordMask} key={word}>
              <span
                ref={(el) => { wordRefs.current[i] = el; }}
                className={styles.wordInner}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>
        <p className={styles.subline}>A few quick questions. One tailored recommendation.</p>
      </div>

      <div ref={cardRef} className={styles.card}>
        {!submitted && <StepIndicator step={data.step} />}

        <div ref={bodyRef} className={styles.stepBody}>
          <StepComponent form={form} onEdit={handleEditStep} />
        </div>

        {!submitted && (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.backButton}
              onClick={handleBack}
              style={{ visibility: isFirstStep ? 'hidden' : 'visible' }}
            >
              ← Back
            </button>
            {!isReviewStep && (
              <button type="button" className={styles.continueButton} onClick={handleContinue}>
                Continue →
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
