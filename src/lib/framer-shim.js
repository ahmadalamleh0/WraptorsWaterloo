// Minimal stubs so TacticalGlobe.tsx (a Framer component) builds in plain Vite.
// addPropertyControls and ControlType are Framer-canvas-only features; no-ops here.
// RenderTarget.current() returning null causes isCanvas = false inside MilitaryMap,
// which is correct — hover detection and full interaction should run in the browser.

export const addPropertyControls = () => {};
export const ControlType = {};
export const RenderTarget = {
  current: () => null,
  canvas: '__framer_canvas__',
};
