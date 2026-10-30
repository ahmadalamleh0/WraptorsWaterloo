// Submission path for the Quote, Booking and Franchise forms. A Web3Forms
// access key is a public *form* key, not a backend secret (Web3Forms is
// built to receive submissions straight from the browser and validates /
// rate-limits server-side), but it still isn't hardcoded: each key is read
// from a build-time env var set in Netlify, so it never appears in a
// source file or a diff. See .env.example and LAUNCH-CHECKLIST.md.
//
// Two keys, because they go to different inboxes:
// - VITE_WEB3FORMS_KEY            customer enquiries (Quote + Booking) → the shop
// - VITE_WEB3FORMS_FRANCHISE_KEY  franchise enquiries → the franchise team
// The recipient inbox is configured per key in the Web3Forms dashboard,
// not in this code.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const KEYS = {
  customer: import.meta.env.VITE_WEB3FORMS_KEY,
  franchise: import.meta.env.VITE_WEB3FORMS_FRANCHISE_KEY,
};
const TIMEOUT_MS = 15000;

// A form only accepts submissions once its own key is set — until then
// its submit button stays disabled and visitors are pointed to the phone /
// email instead. The franchise form never falls back to the customer key,
// so franchise enquiries can't land in the shop's inbox by accident.
export const FORMS_ENABLED = Boolean(KEYS.customer);
export const FRANCHISE_FORMS_ENABLED = Boolean(KEYS.franchise);

// Shared validation, so all three forms accept and reject the same input.
export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
// 10 digits for a North American number, up to 15 for international
// (E.164); spaces, dashes, brackets and a leading + are ignored.
export const isValidPhone = (value) => {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
};

export class FormSubmitError extends Error {
  constructor(reason, message) {
    super(message);
    this.reason = reason; // not-configured | timeout | network | rate-limit | rejected | server
  }
}

// What a visitor sees when a submission fails. Their entries are kept, so
// every message assumes they can simply try again.
export function submissionErrorMessage(err) {
  switch (err?.reason) {
    case 'rate-limit':
      return 'Too many requests were sent from this connection in a short time. Please wait a minute and try again.';
    case 'timeout':
    case 'network':
      return 'We couldn’t reach our form service — please check your connection and try again.';
    case 'rejected':
      return 'Our form service didn’t accept the request. Please check your details and try again.';
    default:
      return 'Something went wrong on our side while sending your request. Please try again.';
  }
}

// Throws a FormSubmitError on any failure so callers can show a message
// and keep the visitor's entries. `botcheck` is the honeypot checkbox
// (see Honeypot.jsx): when a bot ticks it, nothing is sent and the bot is
// shown the normal success screen.
export async function submitToWeb3Forms(fields, { kind = 'customer', botcheck = false } = {}) {
  const accessKey = KEYS[kind];
  if (!accessKey) {
    throw new FormSubmitError('not-configured', `Web3Forms key for "${kind}" enquiries is not set`);
  }
  if (botcheck) return { success: true, skipped: true };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res;
  try {
    res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: accessKey, botcheck: false, ...fields }),
      signal: controller.signal,
    });
  } catch (err) {
    throw new FormSubmitError(err.name === 'AbortError' ? 'timeout' : 'network', err.message);
  } finally {
    clearTimeout(timer);
  }

  // A 500 isn't guaranteed to carry the usual JSON body.
  const data = await res.json().catch(() => ({}));
  if (res.status === 429) throw new FormSubmitError('rate-limit', data.message || 'Rate limited');
  if (!res.ok || !data.success) {
    throw new FormSubmitError(res.status >= 500 ? 'server' : 'rejected', data.message || data.error || `HTTP ${res.status}`);
  }
  return data;
}
