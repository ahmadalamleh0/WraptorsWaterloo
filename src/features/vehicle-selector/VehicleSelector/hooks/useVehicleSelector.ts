import { useCallback, useMemo, useState } from 'react';
import type { Selections, StepIndex, VehicleData, VehicleSelection } from '../types';

export type SelectionKey = keyof Selections;

const EMPTY_SELECTIONS: Selections = { model: null, engine: null, year: null };

export interface UseVehicleSelectorOptions {
  data: VehicleData;
  /** Fired when the user clicks the final-step button on the review screen. */
  onComplete?: (selection: VehicleSelection) => void;
}

export function useVehicleSelector({ data, onComplete }: UseVehicleSelectorOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<StepIndex>(1);
  const [selections, setSelections] = useState<Selections>(EMPTY_SELECTIONS);

  const brandData = currentBrand ? data[currentBrand] : undefined;

  const selectedModel = useMemo(
    () => (brandData?.models ?? []).find((m) => m.name === selections.model),
    [brandData, selections.model]
  );

  const modelNames = useMemo(() => (brandData?.models ?? []).map((m) => m.name), [brandData]);
  const engineOptions = useMemo(() => (selectedModel ? [selectedModel.engine] : []), [selectedModel]);
  const yearOptions = useMemo(() => (selectedModel ? [selectedModel.year] : []), [selectedModel]);

  const openModal = useCallback((brand: string) => {
    setCurrentBrand(brand);
    setCurrentStep(1);
    setSelections(EMPTY_SELECTIONS);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectOption = useCallback((key: SelectionKey, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  }, []);

  const currentSelectionValue = useMemo(() => {
    if (currentStep === 1) return selections.model;
    if (currentStep === 2) return selections.engine;
    if (currentStep === 3) return selections.year;
    return 'review';
  }, [currentStep, selections]);

  const canProceed = !!currentSelectionValue;
  const isLastStep = currentStep === 4;

  const goNext = useCallback(() => {
    if (!canProceed) return;

    if (!isLastStep) {
      setCurrentStep((step) => (step + 1) as StepIndex);
      return;
    }

    if (currentBrand && onComplete) {
      onComplete({
        brand: currentBrand,
        model: selections.model,
        engine: selections.engine,
        year: selections.year,
      });
    }
  }, [canProceed, isLastStep, currentBrand, selections, onComplete]);

  const goBack = useCallback(() => {
    setCurrentStep((step) => (step > 1 ? ((step - 1) as StepIndex) : step));
  }, []);

  return {
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
  };
}
