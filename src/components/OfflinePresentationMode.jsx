import { useCallback, useEffect, useRef } from 'react';
import { VIDEOS_CACHE_NAME } from '../lib/pwaCacheNames';

const LOG = '[OfflineMode]';

function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(resolve, ms))]);
}

// Background video pre-fetching must never compete with the live hero
// <video> for bandwidth/connections during initial page load — doing so
// was starving the hero video's own buffering and freezing it on its
// poster. So: wait for the hero video to actually reach a healthy playing
// state first (or window 'load' if there's no video on this page / it
// never gets there), then add a grace period before starting the heavy
// downloads. This never touches the video element beyond adding listeners.
function waitForCriticalContentReady() {
  return new Promise((resolve) => {
    const video = document.querySelector('video');
    if (!video) {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
      return;
    }
    if (video.readyState >= 3 /* HAVE_FUTURE_DATA */) {
      resolve();
      return;
    }
    const onReady = () => resolve();
    video.addEventListener('canplay', onReady, { once: true });
    video.addEventListener('playing', onReady, { once: true });
    // Safety net so a blocked/failed autoplay doesn't delay prep forever.
    setTimeout(onReady, 8000);
  }).then(() => new Promise((resolve) => setTimeout(resolve, 1500)));
}

// No SW support, dev server (no SW registered there), or the visitor has
// data-saver on: nothing to prepare, don't show the indicator at all.
function canPrepareOffline() {
  if (import.meta.env.DEV || !('serviceWorker' in navigator) || !('caches' in window)) return false;
  if (navigator.connection?.saveData) return false;
  return true;
}

// Reads the exact, already-resolved production URL straight off the live
// <video> elements instead of re-importing the module ourselves — this is
// the same URL the browser will use to request the file, byte for byte, so
// there is no way for the cached key and the requested key to drift apart.
function getRequiredVideoSources() {
  const seen = new Map(); // url -> label
  for (const v of document.querySelectorAll('video')) {
    const src = v.currentSrc || v.src;
    if (!src || !/\.(mp4|webm|mov)(\?|#|$)/i.test(src)) continue;
    if (!seen.has(src)) {
      const filename = decodeURIComponent(src.split('/').pop().split(/[?#]/)[0]);
      seen.set(src, filename);
    }
  }
  return Array.from(seen, ([url, label]) => ({ url, label }));
}

// Downloads a video as a single full GET. Uses the browser's normal HTTP
// cache (not 'reload') and a low fetch priority so this never competes with
// the live hero <video>'s own buffering for bandwidth/connections — an
// earlier version forced cache:'reload' at normal priority, which raced the
// hero video for the same bytes on the same connection-limited origin and
// was the actual cause of the hero freezing on its poster both online and
// off. Buffers sequentially (one reader, no tee'd streams) while reporting
// progress, then writes a fresh 200 Response into Cache Storage — then
// re-reads it back and runs the same range-slicing function the service
// worker uses, to prove the entry is actually usable offline before ever
// reporting success.
async function cacheVideoWithProgress(cache, { url, label }, onProgress, log) {
  log(`video download started: ${label}`);
  log(`exact video source URL (from rendered <video> element): ${url}`);
  const cacheKey = new Request(url).url;
  log(`canonical cache key: ${cacheKey}`);

  const existing = await cache.match(url);
  if (existing && existing.status === 200) {
    const existingBlob = await existing.clone().blob();
    if (existingBlob.size > 0) {
      log(`${label}: already in Cache Storage as a complete 200 response (${existingBlob.size} bytes) — skipping download`);
      onProgress(existingBlob.size, existingBlob.size);
      await verifyRangeSlicing(cache, url, label, log);
      return;
    }
    log(`${label}: existing cache entry looks incomplete (${existingBlob.size} bytes) — re-downloading`);
  }

  const response = await fetch(url, { priority: 'low' });
  log(`HTTP response status for ${label}: ${response.status}${response.type === 'opaque' ? ' (opaque response — cannot verify, aborting)' : ''}`);

  if (response.type === 'opaque') {
    throw new Error(`${label}: response is opaque (cross-origin, no-cors) — cannot be verified or safely cached`);
  }
  if (!response.ok || response.status !== 200) {
    throw new Error(`${label}: expected a complete 200 response, got ${response.status}`);
  }
  if (!response.body) {
    throw new Error(`${label}: response has no body`);
  }

  const expectedLength = Number(response.headers.get('content-length')) || 0;
  log(`expected content length for ${label}: ${expectedLength ? `${expectedLength} bytes` : 'unknown (no content-length header)'}`);

  const reader = response.body.getReader();
  const chunks = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.byteLength;
    onProgress(loaded, expectedLength || loaded);
  }
  log(`downloaded bytes for ${label}: ${loaded}`);

  if (loaded === 0) {
    throw new Error(`${label}: downloaded 0 bytes — refusing to cache an empty file`);
  }
  if (expectedLength > 0 && loaded !== expectedLength) {
    throw new Error(`${label}: downloaded ${loaded} bytes but expected ${expectedLength} — incomplete transfer`);
  }

  const blob = new Blob(chunks, { type: response.headers.get('content-type') || 'video/mp4' });
  const headers = new Headers(response.headers);
  headers.set('content-length', String(blob.size));
  const cacheableResponse = new Response(blob, { status: 200, statusText: 'OK', headers });

  await cache.put(url, cacheableResponse);
  log(`cache write completed for ${label}`);

  const verify = await cache.match(url);
  const verifiedBlob = verify ? await verify.clone().blob() : null;
  const postWriteOk = !!verify && verify.status === 200 && !!verifiedBlob && verifiedBlob.size === blob.size && verifiedBlob.size > 0;
  log(`post-write cache match result for ${label}: ${postWriteOk ? `OK, status ${verify.status}, ${verifiedBlob.size} bytes` : 'FAILED'}`);
  if (!postWriteOk) {
    throw new Error(
      `${label}: post-write verification failed (expected ${blob.size} bytes at status 200, got ${verifiedBlob?.size ?? 0} bytes at status ${verify?.status ?? 'n/a'})`
    );
  }

  await verifyRangeSlicing(cache, url, label, log);
}

// Replicates exactly what the service worker's RangeRequestsPlugin will do
// offline: look up the cached entry with cache.match() (a genuine offline
// cache hit/miss test using the identical URL), then slice a real byte
// range out of it with the same createPartialResponse() function Workbox
// uses. If this doesn't produce a valid 206 covering the requested bytes,
// seeking will be broken offline even though the file is fully cached.
async function verifyRangeSlicing(cache, url, label, log) {
  const cached = await cache.match(url);
  if (!cached) {
    log(`offline range cache miss for ${label} (no entry found for ${url})`);
    throw new Error(`${label}: cache miss when re-checked by URL — not actually retrievable offline`);
  }
  log(`offline range cache hit for ${label}`);

  // Lazy-loaded: this diagnostic self-test is the only thing in the app
  // that needs it, so it's kept out of the main bundle.
  const { createPartialResponse } = await import('workbox-range-requests');
  const rangeRequest = new Request(url, { headers: { Range: 'bytes=0-65535' } });
  const partial = await createPartialResponse(rangeRequest, cached.clone());
  if (partial.status !== 206) {
    throw new Error(`${label}: range-slicing self-test failed (expected 206, got ${partial.status})`);
  }
  const sliceLen = Number(partial.headers.get('content-length')) || 0;
  if (sliceLen <= 0) {
    throw new Error(`${label}: range-slicing self-test produced an empty slice`);
  }
  log(`range-slicing self-test for ${label}: OK (206, ${sliceLen} bytes for bytes=0-65535)`);
}

// No visible UI anymore (see PresentationAdminControl.jsx for the admin-
// facing replacement) — this component exists purely to run the background
// video pre-caching pipeline and log its progress to the console. Every
// check described in the module-level functions above (full-200 fetch,
// post-write verification, range-slicing self-test) still runs exactly as
// before; only the on-page status badge was removed.
export default function OfflinePresentationMode() {
  const runId = useRef(0);

  const beginCaching = useCallback(() => {
    if (!canPrepareOffline()) return;
    const thisRun = ++runId.current;
    const log = (message) => console.log(`${LOG} ${message}`);

    (async () => {
      try {
        const videos = getRequiredVideoSources();
        if (videos.length === 0) {
          log('no <video> elements found on this page — nothing to prepare');
          return;
        }

        log('waiting for the live hero video to reach a healthy playing state before starting background downloads (avoids competing for bandwidth)');
        await waitForCriticalContentReady();
        if (runId.current !== thisRun) return;

        const [cache] = await Promise.all([
          caches.open(VIDEOS_CACHE_NAME),
          withTimeout(navigator.serviceWorker.ready, 15000),
        ]);

        await Promise.all(videos.map((video) => cacheVideoWithProgress(cache, video, () => {}, log)));

        if (runId.current === thisRun) {
          log(`all ${videos.length} video(s) verified in Cache Storage as complete 200 responses — assets cached (this does not by itself prove offline playback works)`);
        }
      } catch (err) {
        log(`ERROR: ${err?.message || err}`);
      }
    })();
  }, []);

  useEffect(() => {
    beginCaching();

    // No visible Retry / Clear & Re-download buttons anymore — exposed on
    // window instead so they're still reachable from the console.
    window.__wraptorsOfflinePrep = {
      retry: beginCaching,
      clearAndRedownload: async () => {
        try {
          await caches.delete(VIDEOS_CACHE_NAME);
          console.log(`${LOG} cleared "${VIDEOS_CACHE_NAME}" cache for re-download`);
        } catch (err) {
          console.error(`${LOG} failed to clear cache:`, err);
        }
        beginCaching();
      },
    };
    return () => {
      delete window.__wraptorsOfflinePrep;
    };
  }, [beginCaching]);

  return null;
}
