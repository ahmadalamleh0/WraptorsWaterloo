import { useEffect } from 'react';

// Injects a page-scoped JSON-LD <script> (e.g. an areaServed-tagged Service
// entity for a GEO page) and removes it on unmount. Same client-side-only
// caveat as useDocumentMeta — a non-JS crawler won't see this; it's the
// seam for a real prerendering step later.
export function useStructuredData(data) {
  useEffect(() => {
    if (!data) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
}
