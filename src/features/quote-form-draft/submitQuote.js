// No lead-form backend exists in this project yet — Academy.jsx's email
// signup is the closest precedent, and it's also a client-only stub with no
// network call. This function is the single seam for wiring up a real
// endpoint later (Netlify Forms, a serverless function, Formspree, etc.)
// without touching any of the form's UI/state code. No API keys live here;
// there's nothing to leak.
export async function submitQuoteRequest(payload) {
  const submission = {
    ...payload,
    submittedAt: new Date().toISOString(),
    pageSource: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  // Simulated network latency so the loading state is visible end to end.
  // Replace this with a real fetch()/form POST once a backend exists.
  await new Promise((resolve) => setTimeout(resolve, 700));
  console.log('[QuoteForm] submission ready to send:', submission);

  return submission;
}
