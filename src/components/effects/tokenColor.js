// Reads a colour token from src/index.css (stored as "R G B" channels) so effects never hard-code hex values

const channels = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim().split(/\s+/).map(Number);

// Normalised [r, g, b] in 0–1, for WebGL uniforms
export const tokenRgb = (name) => channels(name).map((c) => c / 255);
