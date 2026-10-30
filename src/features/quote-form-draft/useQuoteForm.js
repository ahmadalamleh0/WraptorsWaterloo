import { useCallback, useEffect, useRef, useState } from 'react';
import { TOTAL_STEPS } from './quoteFormData';
import { submitQuoteRequest } from './submitQuote';

const STORAGE_KEY = 'wraptors:quoteForm';

const EMPTY_STATE = {
  step: 1,
  services: [],
  vehicle: { type: null, year: '', make: '', model: '' },
  coverage: 'partial',
  style: null,
  timeline: null,
  contact: { name: '', phone: '', email: '', city: '', notes: '' },
};

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      ...EMPTY_STATE,
      ...parsed,
      vehicle: { ...EMPTY_STATE.vehicle, ...parsed.vehicle },
      contact: { ...EMPTY_STATE.contact, ...parsed.contact },
    };
  } catch {
    return null; // corrupt/unavailable storage — start fresh instead of crashing
  }
}

function validateStep(step, data) {
  const errors = {};

  if (step === 1 && data.services.length === 0) {
    errors.services = 'Select at least one option — or "Not Sure Yet."';
  }

  if (step === 2) {
    if (!data.vehicle.type) errors.type = 'Select a vehicle type.';
    if (!data.vehicle.year.trim()) errors.year = 'Enter the model year.';
    else if (!/^(19|20)\d{2}$/.test(data.vehicle.year.trim())) errors.year = 'Enter a valid year.';
    if (!data.vehicle.make.trim()) errors.make = 'Enter the make.';
    if (!data.vehicle.model.trim()) errors.model = 'Enter the model.';
  }

  if (step === 3 && !data.coverage) {
    errors.coverage = 'Choose a coverage level.';
  }

  if (step === 4) {
    if (!data.style) errors.style = 'Choose a style direction.';
    if (!data.timeline) errors.timeline = 'Choose a timeline.';
  }

  if (step === 5) {
    if (!data.contact.name.trim()) errors.name = 'Enter your name.';
    if (!data.contact.phone.trim()) errors.phone = 'Enter a phone number.';
    else if (!/^[\d+()\-.\s]{7,}$/.test(data.contact.phone.trim())) errors.phone = 'Enter a valid phone number.';
    if (!data.contact.email.trim()) errors.email = 'Enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.email.trim())) errors.email = 'Enter a valid email.';
    if (!data.contact.city.trim()) errors.city = 'Enter your city.';
  }

  return errors;
}

export function useQuoteForm() {
  const [data, setData] = useState(() => loadSaved() ?? EMPTY_STATE);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isOnline, setIsOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine));
  const [direction, setDirection] = useState('forward');
  const submittingRef = useRef(false);

  // Persisted on every change so an accidental refresh never loses answers;
  // skipped once submitted since submit() already clears storage itself.
  useEffect(() => {
    if (submitted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage unavailable (private browsing, quota) — not fatal.
    }
  }, [data, submitted]);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const updateVehicle = useCallback((patch) => {
    setData((prev) => ({ ...prev, vehicle: { ...prev.vehicle, ...patch } }));
  }, []);

  const updateContact = useCallback((patch) => {
    setData((prev) => ({ ...prev, contact: { ...prev.contact, ...patch } }));
  }, []);

  const setField = useCallback((key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleService = useCallback((id) => {
    setData((prev) => {
      const has = prev.services.includes(id);
      return {
        ...prev,
        services: has ? prev.services.filter((s) => s !== id) : [...prev.services, id],
      };
    });
  }, []);

  // Pure check used by the shell to decide whether a step transition should
  // even play before calling goNext() (which does the real validation).
  const canAdvance = useCallback(() => Object.keys(validateStep(data.step, data)).length === 0, [data]);

  const goNext = useCallback(() => {
    let ok = false;
    setData((prev) => {
      const stepErrors = validateStep(prev.step, prev);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return prev;
      }
      ok = true;
      setErrors({});
      setDirection('forward');
      return { ...prev, step: Math.min(prev.step + 1, TOTAL_STEPS) };
    });
    return ok;
  }, []);

  const goBack = useCallback(() => {
    setErrors({});
    setDirection('backward');
    setData((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  }, []);

  const goToStep = useCallback((step) => {
    setErrors({});
    setData((prev) => {
      setDirection(step < prev.step ? 'backward' : 'forward');
      return { ...prev, step };
    });
  }, []);

  const startOver = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up if storage was never available.
    }
    setErrors({});
    setSubmitted(false);
    setData(EMPTY_STATE);
  }, []);

  const submit = useCallback(async () => {
    if (submittingRef.current || submitted) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      await submitQuoteRequest(data);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Nothing to clean up if storage was never available.
      }
      setSubmitted(true);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }, [data, submitted]);

  return {
    data,
    errors,
    submitting,
    submitted,
    isOnline,
    direction,
    setField,
    updateVehicle,
    updateContact,
    toggleService,
    canAdvance,
    goNext,
    goBack,
    goToStep,
    startOver,
    submit,
  };
}
