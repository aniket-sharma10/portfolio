/** @type {import('tailwindcss').Config} */

// Colour values live as RGB channels in src/index.css so a dark variant can redefine them later
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: token("paper"),
        surface: token("surface"),
        sunk: token("sunk"),
        ink: {
          DEFAULT: token("ink"),
          2: token("ink-2"),
          3: token("ink-3"),
        },
        line: {
          DEFAULT: token("line"),
          strong: token("line-strong"),
        },
        accent: {
          DEFAULT: token("accent"),
          strong: token("accent-strong"),
        },
        inverse: {
          DEFAULT: token("inverse"),
          fg: token("inverse-fg"),
          2: token("inverse-2"),
          accent: token("inverse-accent"),
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ["Geist", "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        display: ["clamp(3.25rem, 1.9rem + 6vw, 7rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        h2: ["clamp(2.25rem, 1.7rem + 2.2vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.015em" }],
        h3: ["clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        lead: ["clamp(1.125rem, 1rem + 0.4vw, 1.3125rem)", { lineHeight: "1.55" }],
        body: ["1rem", { lineHeight: "1.65" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.06em" }],
      },
      maxWidth: {
        container: "75rem",
        prose: "65ch",
      },
      spacing: {
        gutter: "clamp(1.25rem, 0.8rem + 2vw, 3rem)",
        section: "clamp(5rem, 3.5rem + 5vw, 8.5rem)",
        "section-lg": "clamp(6rem, 4rem + 6vw, 10rem)",
      },
      aspectRatio: {
        shot: "16 / 10",
      },
      // sm and lg are unused by the current UI; `rounded` (4px) is left at the default
      borderRadius: {
        sm: "4px",
        lg: "10px",
      },
      boxShadow: {
        focus: "0 0 0 2px rgb(var(--paper)), 0 0 0 4px rgb(var(--accent))",
        "focus-inverse": "0 0 0 2px rgb(var(--inverse)), 0 0 0 4px rgb(var(--inverse-accent))",
        lift: "0 1px 2px rgb(22 21 15 / 0.04), 0 8px 24px -12px rgb(22 21 15 / 0.18)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
    },
  },
  plugins: [],
}
