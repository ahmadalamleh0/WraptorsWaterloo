// Clean, single-color line icons for the quote form's selection cards — no
// emoji, no external icon library. Every icon shares the same 24x24 grid,
// stroke weight, and currentColor fill so they inherit the card's text
// color (dim at rest, brand red once selected) automatically.
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// Shared car-body path reused by every service icon (they're actions
// performed ON a vehicle, not different vehicle shapes) — only the overlay
// marks change per service.
const CAR_BODY = 'M3 16.5h1.2a2 2 0 0 0 3.6 0h8.4a2 2 0 0 0 3.6 0H21v-2.8l-2.2-4A2 2 0 0 0 17 8.6H7a2 2 0 0 0-1.8 1.1l-2.2 4v2.8Z';

function Wheels() {
  return (
    <>
      <circle cx="7.5" cy="16.5" r="1.7" />
      <circle cx="16.5" cy="16.5" r="1.7" />
    </>
  );
}

export function IconFullWrap(props) {
  return (
    <svg {...base} {...props}>
      <path d={CAR_BODY} />
      <Wheels />
      <path d="M6.5 9.5 9 15.5M11 8.6l2.5 7.9" />
    </svg>
  );
}

export function IconPPF(props) {
  return (
    <svg {...base} {...props}>
      <path d={CAR_BODY} opacity="0.55" />
      <Wheels />
      <path d="M12 3.5 17 5.5v3.8c0 3.4-2.1 5.9-5 6.9-2.9-1-5-3.5-5-6.9V5.5Z" />
    </svg>
  );
}

export function IconCeramic(props) {
  return (
    <svg {...base} {...props}>
      <path d={CAR_BODY} opacity="0.55" />
      <Wheels />
      <path d="M12 3.5c1.9 2.6 3.4 4.9 3.4 6.9a3.4 3.4 0 1 1-6.8 0c0-2 1.5-4.3 3.4-6.9Z" />
    </svg>
  );
}

export function IconTint(props) {
  return (
    <svg {...base} {...props}>
      <path d={CAR_BODY} opacity="0.55" />
      <Wheels />
      <rect x="7" y="9.2" width="10" height="5.4" rx="0.8" />
      <path d="M8 9.5l3.2 5M12 9.5l3.2 5" opacity="0.7" />
    </svg>
  );
}

export function IconFleet(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 16h1.2a1.9 1.9 0 0 0 3.6 0h5.4a1.9 1.9 0 0 0 3.6 0H18v-6.5H4.5A1.5 1.5 0 0 0 3 11v5Z" />
      <path d="M18 11h2.3a1 1 0 0 1 .85.47L22.5 14v2H18v-5Z" />
      <circle cx="7.5" cy="16" r="1.6" />
      <circle cx="18.5" cy="16" r="1.6" />
    </svg>
  );
}

export function IconGraphics(props) {
  return (
    <svg {...base} {...props}>
      <path d={CAR_BODY} opacity="0.4" />
      <Wheels />
      <path d="M9 12.5 15.5 6a1.4 1.4 0 0 1 2 2L11 14l-2.6.6.6-2.1Z" />
    </svg>
  );
}

export function IconStyling(props) {
  return (
    <svg {...base} {...props}>
      <path d={CAR_BODY} opacity="0.4" />
      <Wheels />
      <path d="M13.2 4.8a2.3 2.3 0 0 1 3.2 3.2l-.9.9-3.2-3.2.9-.9Z" />
      <path d="M11.5 6.5 15 10l-5.3 5.3-3.9.9.9-3.9 4.8-4.8Z" />
    </svg>
  );
}

export function IconNotSure(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.6a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2.9-1.2 1.9" />
      <circle cx="12" cy="16.7" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── Vehicle-type icons — the silhouette itself changes per type ──
export function IconCoupe(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 16.2h1a1.9 1.9 0 0 0 3.6 0h9.8a1.9 1.9 0 0 0 3.6 0h1v-2.4l-2.6-3.1c-.9-1.7-2.7-2.7-4.6-2.7H9.6c-1.7 0-3.3.9-4.2 2.4L2.5 13.8v2.4Z" />
      <path d="M7.5 10.4h9" opacity="0.6" />
      <circle cx="7" cy="16.2" r="1.6" />
      <circle cx="17" cy="16.2" r="1.6" />
    </svg>
  );
}

export function IconSedan(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 16.5h1.2a1.9 1.9 0 0 0 3.6 0h9.4a1.9 1.9 0 0 0 3.6 0h1.3v-2.7l-1.8-3.4a2 2 0 0 0-1.4-1L17 9c-.7-1.7-2.3-2.8-4.1-2.8H10c-1.5 0-2.9.8-3.6 2.1l-1.2 2.3-2 .8a1.5 1.5 0 0 0-.7 1.3v3.8Z" />
      <path d="M6 9.3h11.5" opacity="0.6" />
      <circle cx="7.2" cy="16.5" r="1.6" />
      <circle cx="16.8" cy="16.5" r="1.6" />
    </svg>
  );
}

export function IconSUV(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 16.5h1.2a1.9 1.9 0 0 0 3.6 0h9.4a1.9 1.9 0 0 0 3.6 0h1.3v-4.8a1.8 1.8 0 0 0-1-1.6l-1.9-1c-.5-1.2-1.7-2-3-2H8.4c-1.2 0-2.3.6-2.9 1.7L4.3 11 3 11.6a1.6 1.6 0 0 0-.9 1.4v3.5Z" />
      <path d="M6.5 8.1h9.6M4.9 11.1h14.2" opacity="0.6" />
      <circle cx="7.2" cy="16.5" r="1.6" />
      <circle cx="16.8" cy="16.5" r="1.6" />
    </svg>
  );
}

export function IconTruck(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 16.3h1.1a1.8 1.8 0 0 0 3.5 0h5.7v-7.6H4.3a1.8 1.8 0 0 0-1.8 1.8v5.8Z" />
      <path d="M12.8 11h4.4l2.8 2.3a1.5 1.5 0 0 1 .5 1.1v1.9h-1.4a1.8 1.8 0 0 1-3.5 0H12.8V11Z" />
      <circle cx="7" cy="16.3" r="1.6" />
      <circle cx="16.8" cy="16.3" r="1.6" />
    </svg>
  );
}

export function IconExotic(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.3 15.6h1.4c.2 1 1.1 1.7 2.1 1.7s1.9-.7 2.1-1.7h8.2c.2 1 1.1 1.7 2.1 1.7s1.9-.7 2.1-1.7h1.4v-2l-2.3-2.6c-1-1.8-2.9-2.9-5-2.9h-4.8c-1.9 0-3.7 1-4.7 2.6l-1.6 1Z" />
      <path d="M2.3 13.6l3-.6M18.6 13l3 .6" opacity="0.7" />
      <circle cx="5.8" cy="15.6" r="1.5" />
      <circle cx="18.2" cy="15.6" r="1.5" />
    </svg>
  );
}

export function IconCommercial(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="7" width="14.5" height="8.5" rx="1.2" />
      <path d="M17 10h2.6a1 1 0 0 1 .85.47l1.55 2.53v2.5H17V10Z" />
      <path d="M5.5 10h8.5" opacity="0.6" />
      <circle cx="7" cy="16.3" r="1.6" />
      <circle cx="18" cy="16.3" r="1.6" />
    </svg>
  );
}

export function IconOtherVehicle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 16.5h1.2a1.9 1.9 0 0 0 3.6 0h9.4a1.9 1.9 0 0 0 3.6 0h1.3v-2.7l-1.8-3.4a2 2 0 0 0-1.4-1L17 9c-.7-1.7-2.3-2.8-4.1-2.8H10c-1.5 0-2.9.8-3.6 2.1l-1.2 2.3-2 .8a1.5 1.5 0 0 0-.7 1.3v3.8Z" opacity="0.5" />
      <circle cx="7.2" cy="16.5" r="1.6" />
      <circle cx="16.8" cy="16.5" r="1.6" />
      <circle cx="9.5" cy="4.6" r="0.15" fill="currentColor" stroke="none" />
      <circle cx="12" cy="4.6" r="0.15" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="4.6" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  );
}
