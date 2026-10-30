// Single source of truth for the Cache Storage bucket name used both by the
// Workbox video runtimeCaching route (vite.config.js, Node/build context)
// and by the manual pre-fetch in OfflinePresentationMode.jsx (browser
// context). Importing the same constant in both places instead of
// duplicating the string guarantees they can never drift apart.
export const VIDEOS_CACHE_NAME = 'videos-cache';
