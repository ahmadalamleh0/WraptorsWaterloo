import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ManufacturerStep } from './ManufacturerStep';
import { ModelStep } from './ModelStep';
import { EngineStep } from './EngineStep';
import { YearStep } from './YearStep';
import { VehicleSummary } from './VehicleSummary';
import { useVehicleSelector } from './hooks/useVehicleSelector';
import { useEntranceReveal } from './hooks/useEntranceReveal';
import { BRAND_LOGOS, BRAND_ORDER, VEHICLE_DATA } from './vehicleData';
import type { VehicleData, VehicleSelection } from './types';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

// Vite-native asset resolution: every file in assets/logos is bundled and
// exposed as a URL, matching how the original site referenced /assets/svg/*.svg.
const logoModules = import.meta.glob('./assets/logos/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function resolveLogoSrc(filename: string): string {
  const match = Object.entries(logoModules).find(([path]) => path.endsWith(`/${filename}`));
  return match?.[1] ?? '';
}

export interface VehicleSelectorProps {
  data?: VehicleData;
  brands?: string[];
  brandLogos?: Record<string, string>;
  /** Fired when the user confirms the review step. Wire your own "book consultation" flow here. */
  onComplete?: (selection: VehicleSelection) => void;
  /** Label for the final-step button. Defaults to the original site's copy. */
  finalStepLabel?: string;
  /** Override the default review-step note text. */
  summaryNote?: string;
}

const STEP_LABELS = ['Model', 'Engine', 'Year', 'Review'] as const;

export function VehicleSelector({
  data = VEHICLE_DATA,
  brands = BRAND_ORDER,
  brandLogos = BRAND_LOGOS,
  onComplete,
  finalStepLabel = 'Explore Build',
  summaryNote,
}: VehicleSelectorProps) {
  const {
    isOpen,
    currentBrand,
    currentStep,
    selections,
    modelNames,
    engineOptions,
    yearOptions,
    canProceed,
    isLastStep,
    openModal,
    closeModal,
    selectOption,
    goNext,
    goBack,
  } = useVehicleSelector({ data, onComplete });

  const rootRef = useEntranceReveal();

  const headerRef = useRef<HTMLElement>(null);
  const selectWordRef = useRef<HTMLSpanElement>(null);
  const yourWordRef = useRef<HTMLSpanElement>(null);
  const vehicleWordRef = useRef<HTMLSpanElement>(null);

  // Word-mask reveal for the section title, same technique as the
  // "THE WRAPTORS STANDARD" heading: each word rises out of an
  // overflow-hidden mask via yPercent, instead of the WAAPI fade/slide the
  // eyebrow and subline still use.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const words = [selectWordRef.current, yourWordRef.current, vehicleWordRef.current];

      if (prefersReducedMotion) {
        gsap.from(words, {
          opacity: 0, duration: 0.9, stagger: 0.12,
          scrollTrigger: { trigger: headerRef.current, start: 'top 78%', once: true },
        });
        return;
      }

      gsap.from(words, {
        yPercent: 110, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: headerRef.current, start: 'top 78%', once: true },
      });
    }, headerRef);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, []);

  // Escape-to-close, matching the original document keydown listener.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeModal]);

  // Lock body scroll while the modal is open, matching the original behavior.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="configurator" id="configurator" ref={rootRef}>
      <div className="configurator__inner">
        <header className="configurator__header" data-cfg-header ref={headerRef}>
          <span className="configurator__eyebrow">Performance Tuning</span>
          <h2 className="configurator__title">
            <span className="cfgWordMask">
              <span ref={selectWordRef} className="cfgWordInner">Select</span>
            </span>
            {' '}
            <span className="cfgWordMask">
              <span ref={yourWordRef} className="cfgWordInner">Your</span>
            </span>
            {' '}
            <span className="cfgWordMask">
              <span ref={vehicleWordRef} className="cfgWordInner">Vehicle</span>
            </span>
          </h2>
          <p className="configurator__sub">Choose your platform. We&apos;ll engineer the rest.</p>
        </header>

        <ManufacturerStep
          brands={brands}
          logoSrc={(brand) => resolveLogoSrc(brandLogos[brand])}
          onSelect={openModal}
        />
      </div>

      <div className={`cfg-modal${isOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!isOpen}>
        <div className="cfg-modal__backdrop" onClick={closeModal} />
        <div className="cfg-modal__panel">
          <button className="cfg-modal__close" aria-label="Close" onClick={closeModal}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="cfg-modal__brand-bar">
            <div className="cfg-modal__brand-logo">
              {currentBrand && <img src={resolveLogoSrc(brandLogos[currentBrand])} alt={currentBrand} />}
            </div>
            <div>
              <span className="cfg-modal__brand-name">{currentBrand}</span>
              <span className="cfg-modal__brand-tagline">Performance Configuration</span>
            </div>
          </div>

          <div className="cfg-steps">
            {STEP_LABELS.map((label, i) => {
              const stepNum = i + 1;
              const cls = stepNum === currentStep ? 'active' : stepNum < currentStep ? 'done' : '';
              return (
                <Fragment key={label}>
                  {i > 0 && <div className="cfg-step__connector" />}
                  <div className={`cfg-step${cls ? ` ${cls}` : ''}`} data-step={stepNum}>
                    <span className="cfg-step__num">{String(stepNum).padStart(2, '0')}</span>
                    <span className="cfg-step__label">{label}</span>
                  </div>
                </Fragment>
              );
            })}
          </div>

          <div className="cfg-content">
            {currentStep === 1 && (
              <ModelStep options={modelNames} selected={selections.model} onSelect={(v) => selectOption('model', v)} />
            )}
            {currentStep === 2 && (
              <EngineStep options={engineOptions} selected={selections.engine} onSelect={(v) => selectOption('engine', v)} />
            )}
            {currentStep === 3 && (
              <YearStep options={yearOptions} selected={selections.year} onSelect={(v) => selectOption('year', v)} />
            )}
            {currentStep === 4 && currentBrand && (
              <VehicleSummary
                brand={currentBrand}
                model={selections.model}
                engine={selections.engine}
                year={selections.year}
                note={summaryNote}
              />
            )}
          </div>

          <div className="cfg-actions">
            <button
              className="cfg-btn cfg-btn--back"
              style={{ visibility: currentStep > 1 ? 'visible' : 'hidden' }}
              onClick={goBack}
            >
              Back
            </button>
            <button
              className={`cfg-btn cfg-btn--next${canProceed ? '' : ' cfg-btn--disabled'}`}
              onClick={goNext}
            >
              {isLastStep ? finalStepLabel : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
