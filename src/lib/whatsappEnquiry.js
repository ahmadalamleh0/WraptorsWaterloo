import { LOCATION, SITE_URL } from '../config/location.js';

// Neither the Quote form nor the Booking form has a real backend to submit
// to (see submitQuoteRequest.js / submitBookingRequest.js) — so instead of
// a fake "success" screen after an async no-op, both forms hand the
// visitor's answers off to WhatsApp as a prefilled message. This is a real,
// verifiable action (a WhatsApp chat actually opens with the enquiry text
// ready to send) rather than a claim we can't back up.
export const WHATSAPP_NUMBER = LOCATION.contact.whatsapp;
const SITE_HOST = new URL(SITE_URL).host;

function line(label, value) {
  return value ? `${label}: ${value}` : null;
}

// null when this location doesn't offer WhatsApp (see location config).
export function buildWhatsAppUrl(text) {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Quote console (5-step flow) — label lookups passed in from
// QuoteSection.jsx so this file doesn't duplicate quoteFormData.js's option
// lists.
export function buildQuoteWhatsAppMessage(form, labels) {
  const vehicle = [form.year, form.make, form.model].filter(Boolean).join(' ');
  const lines = [
    `New enquiry from ${SITE_HOST}`,
    '',
    line('Service', labels.service),
    line('Vehicle', vehicle),
    line('Build', labels.projectDetail),
    line('Notes', form.notes),
    line('Timing', labels.timing),
    line('Preferred date', form.preferredDate),
    '',
    line('Name', form.name),
    line('Phone', form.phone),
    line('Email', form.email),
    line('Preferred contact', labels.preferredContact),
  ].filter((l) => l !== null); // keep the blank separator lines
  return lines.join('\n');
}

// Franchise enquiry form (/franchise).
export function buildFranchiseWhatsAppMessage(form) {
  const lines = [
    `New franchise enquiry from ${SITE_HOST}`,
    '',
    line('Name', form.name),
    line('Email', form.email),
    line('Phone', form.phone),
    line('City / Country', form.location),
    line('Business / automotive experience', form.experience),
    line('Franchise interest', form.interest),
    line('Message', form.message),
  ].filter((l) => l !== null); // keep the blank separator lines
  return lines.join('\n');
}

// Booking form (/book) — services is an array of ids, resolved to labels
// by the caller before this is called (kept consistent with the quote
// builder's "pass labels in" approach).
export function buildBookingWhatsAppMessage(form, serviceLabels) {
  const vehicle = [form.year, form.make, form.model].filter(Boolean).join(' ');
  const lines = [
    `New booking request from ${SITE_HOST}`,
    '',
    line('Vehicle', vehicle),
    line('Service(s)', serviceLabels.join(', ')),
    line('Preferred date', form.preferredDate),
    '',
    line('Name', form.name),
    line('Phone', form.phone),
    line('Email', form.email),
    line('Message', form.message),
  ].filter((l) => l !== null); // keep the blank separator lines
  return lines.join('\n');
}
