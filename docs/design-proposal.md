# Portfolio redesign: design proposal

**Status:** Revision 2 of Direction A ("Editorial Ink") **approved** by the owner on 2026-10-20, with the action labels below. Phases 1–4 and 6 are implemented on the light palette. **Revision 3 (dark variant) approved 2026-10-20** with: Aurora in the hero plus cursor spotlight, hover-glow + pop-in pills, and a native timeline. Phase R3-a (dark tokens) is implemented.

**What changed in revision 2**
- The hero summary was a structured "Currently" panel; it was later removed in favour of a minimal centred hero (see §6).
- Projects are screenshot-led, with a framed "address bar" mat, image links and button actions.
- The hierarchy is tuned so the page reads as a developer portfolio, not a publication.
- Scroll reveals are now optional.
- Scope rules are explicit.
- The implementation is phased, with per-phase checks.

---

## Revision 3 (approved): dark "Night" variant with richer motion

The owner's feedback after phase 6 was that the light theme feels too basic. Revision 3 makes the following changes:
- **Dark theme:** switch to a dark theme.
- **Section numbering:** remove the `01 —` labels (**done**).
- **Experience timeline:** rebuild Experience as a scroll-linked timeline in the style of Aceternity's Timeline.
- **Tech pills:** give them more visual character.
- **Background:** add an ambient background that reacts to the cursor.

Everything else carries over: the typography system (Instrument Serif / Geist / Geist Mono), the grid, the shared primitives, the content rules and the section order. Because colours are CSS variables, the theme switch is mostly a token swap.

### R3.1 Palette (dark)

| Token | HEX | Use | Contrast on bg / surface / raised |
|---|---|---|---|
| `canvas` (was `paper`) | `#0A0C10` | Page background (blue-black, not pure black) | — |
| `surface` | `#11141A` | Cards, project frames, menu panel | — |
| `raised` (was `sunk`) | `#181C24` | Frame bars, hover fills | — |
| `ink` | `#ECEEF3` | Headings, body | 16.9 / 15.9 / 14.7 |
| `ink-2` | `#A7ADBB` | Descriptions, bullets | 8.7 / 8.2 / 7.6 |
| `ink-3` | `#858C9E` | Labels, dates | 5.8 / 5.5 / 5.1 |
| `line` | `#222733` | Hairlines, card borders | decorative |
| `line-strong` | `#636B7E` | Secondary button outline | 3.7:1 (non-text) |
| `accent` | `#7C93FF` | Links, focus ring, timeline beam head, active nav | 7.0 / 6.6 / 6.1 |
| `accent-2` | `#45D6C4` | Second gradient stop (beam tail, pill hover border) | 10.9 / 10.3 / 9.5 |
| `ribbon-1` / `ribbon-2` | `#8445FF` / `#D678FF` | **Hero ribbon only** (effect colours), never on text or UI | — |

- **Gradient:** `accent → accent-2` (electric blue → aqua). It's used only for the timeline beam, the pill hover borders and the hero aurora. Text is never gradient-filled.
- **Primary button:** `ink` fill with `canvas` text. The secondary button is a `line-strong` outline.
- **Focus ring / hover lift:** `shadow-focus` offsets from `canvas`; the light theme's drop shadow `lift` is replaced by `shadow-glow` (a soft accent glow).
- **Contact:** becomes a `surface` band with a 1px `accent → accent-2` gradient top rule. There's no inverse band on a dark page.

### R3.2 Background

| Layer | What | Where | Cost |
|---|---|---|---|
| **Aurora** (React Bits `Aurora`) | Soft blue/aqua/violet light that drifts toward the cursor | Hero only, faded out at its bottom edge with a mask | WebGL, no dependencies. Built in: it pauses off-screen and in hidden tabs, respects reduced motion, and caps pixel density at 2. About 480 lines, copied into `src/components/effects/`. Licence is MIT + Commons Clause (fine for a personal site; the notice must be kept). |
| **Cursor spotlight** | A faint radial glow (accent at about 6% opacity) that follows the pointer | Whole page, fixed behind content | CSS variables updated on `pointermove` through requestAnimationFrame. No animation loop. Mouse/trackpad only (`pointer: fine`); off for touch and reduced motion. About 30 lines. |
| *Particles* (React Bits `Particles`) | Drifting particles with constellation lines that react to the cursor | Optional alternative to Aurora in the hero | WebGL, about 880 lines. Not recommended on top of Aurora: two ambient effects compete, and a fixed full-page WebGL layer would keep the GPU busy on every scroll. |

### R3.3 Experience timeline

Behaviour follows Aceternity's Timeline:
- a vertical rail with a gradient **beam that fills as you scroll**;
- a node per job, with sticky left metadata on desktop;
- content on the right.

Implementation:
- **Option A (recommended):** a native version of the same behaviour, using the existing scroll-listener pattern (`useActiveSection`) plus a CSS `scaleY` transform. That's about 40 lines and **no added bundle weight**.
- **Option B:** Aceternity's source, adapted. It imports `motion/react`, whose API matches the already-installed `framer-motion@11`, so there's no new install. But nothing imports framer-motion today, so using it would add roughly 30–40 KB gzipped of JS.

Both options get the same treatment:
- each node lights up (accent ring) once the beam reaches it;
- the current role's node gets a static glow ring;
- with reduced motion, the rail is drawn fully and statically;
- the role stays an `h3` and the content is unchanged.

### R3.4 Tech pills

**Recommended:**
- **At rest:** dark `surface` pills with a hairline border.
- **On hover/focus:** an `accent → accent-2` gradient border and a slight lift (−2px).
- **Entrance:** a one-time staggered pop-in when each job (or skill row) scrolls into view.

**Not recommended:**
- **Constant shaking or floating:** continuous motion next to text people are reading pulls attention away from the bullets. It also fails WCAG 2.2.2 (moving content lasting over 5s needs a pause control) and can trigger motion sensitivity.
- **A different gradient per pill:** it brings back the many-colour noise removed from the old Skills tiles.

### R3.5 Guardrails kept

- Effects are on the hero, the timeline and pills only. Body text never moves.
- `prefers-reduced-motion` disables the aurora animation, the spotlight, the beam animation and the pop-ins.
- WebGL fails gracefully: if `getContext` returns null, the hero shows a static CSS gradient.
- `CLAUDE.md`'s "Design direction → Avoid" list (gradients, glows, particles) will be updated to match whatever is approved, so the project instructions don't contradict the build.

### R3.6 Phase plan (replaces the remaining phases)

| # | Phase | Files |
|---|---|---|
| R3-a ✅ | Dark tokens: swap the CSS variables and rename `paper→canvas` / `sunk→raised`, drop the `inverse` tokens and tones in the config and in existing components | `src/index.css`, `tailwind.config.js`, `Navbar`, `Hero`, `About`, `Experience`, `ui/*` |
| R3-b ✅ | Background: hero **wire ribbon** (owner's pick over the aurora, 2026-10-20). It's an original WebGL effect inspired by React Bits Pro *Interference Ribbons*, in purple `ribbon-1` `#8445FF` and orchid `ribbon-2` `#D678FF`, with white pulses on hover and a burst on click. Flashes start at the pointer's point on the ribbon and travel both ways along the wire. Both trigger only when the pointer is on the ribbon itself (hit-tested against its current shape), and a click adds flashes only, with no widening. Plus the page-wide cursor spotlight. The aurora and the temporary `/ribbons` route were removed |
| R3-c | Experience timeline and pill style | `Experience.jsx`, `ui/Tag.jsx` (or a new `ui/Pill.jsx`), `src/hooks/` |
| R3-d → | Then Skills, Projects, Contact and QA as before, on the dark tokens | as in §11 |

---

## 1. Audit summary (current UI)

Inspected in the browser at 1440px and ~500px.

| Section | Keep | Redesign | Remove |
|---|---|---|---|
| Page shell | Section order | Flat token background | Fixed `w-screen` purple radial gradient and the `overflow-x-hidden` workaround |
| Navbar | GitHub/LinkedIn icon links and `aria-label`s | Wordmark, section anchors, sticky bar, mobile menu | "Hello" `h5` |
| Hero | Name as `h1`; "Full-Stack Developer" | Minimal centred typographic hero | Stock `hero.png` (520 KB, off-message); typewriter; gradient text |
| About | `ABOUT_TEXT` unchanged | Two-column layout; `h2` instead of a second `h1` | Centred layout |
| Experience | All data, bullets, tags | Metadata/content grid; shared `Tag` | Purple tags |
| Skills | All categories and names; icon map | Compact rows of uniform skill chips | About 12 brand colours, 4px tile borders |
| Projects | All six entries, order, demo/GitHub logic | Tiered, screenshot-led cards; tags rendered; real links | 3D tilt (its depth layers never worked), `<button onClick={window.open}>`, `alt="thumbnail"`, fixed card height |
| Contact | Heading "Let's Connect", email, LinkedIn, location | Dark closing band and `<footer>` | `target="_blank"` on `mailto:` |

**Bugs confirmed in the browser**
- Boardly's action row overflows its card by 29px (fixed `md:h-[32rem]`).
- `CardBody` has conflicting `w-96` / `w-auto sm:w-[26rem]` classes, and `md:[32rem]` is a no-op typo.
- The heading outline goes `h5 → h1 → h1 → h2`.

---

## 2. Directions considered

- **A. Editorial Ink** (chosen). A light warm-paper background with a cobalt accent and a serif/sans/mono type system.
- **B. Spec Sheet.** Dark graphite with an amber accent and mono-heavy, table-based projects. Rejected for three reasons: light screenshots glare on dark, thumbnails were hidden behind table rows, and it sits close to the generic dark developer template.
- **C. Studio Contrast.** Alternating light and dark bands, an oversized grotesk name and an orange accent. Rejected for three reasons: small projects get equal billing with Boardly, it suggests creative-studio seniority, and the scroll-linked motion is decorative.

---

## 3. Direction A: principles (revision 2)

1. **Screenshots lead, text supports.** The project imagery is the largest and most-repeated visual element on the page.
2. **Serif is for headlines only.** Instrument Serif is used for the `h1` and the section `h2`s, nothing else. Everything a visitor scans (titles, tags, actions, metadata) is Geist or Geist Mono. This keeps it a developer portfolio, not a magazine.
3. **Structure comes from the system, not decoration.** Hairlines, a 12-column grid, surface steps (`paper → surface → sunk`) and mono metadata create distinction. Cobalt is the only colour besides neutrals.
4. **Accent budget.** Cobalt appears only on:
   - links (hover underline and inline links),
   - focus rings,
   - the "current" markers (hero panel dot, current job dot),
   - the hero panel's top rule,
   - the active nav underline.

   It's never used for fills, large areas or primary buttons. Primary buttons are ink.
5. **Content is preserved.** No project details, metrics or claims are invented. New text is limited to UI labels and accessibility text (see §9).

---

## 4. Design tokens

Colours are CSS variables in `src/index.css`, exposed through `tailwind.config.js` as `rgb(var(--x) / <alpha-value>)`, so a dark variant stays possible later. Ratios are WCAG 2.x against the background each colour is used on.

| Token | HEX | Use | Contrast |
|---|---|---|---|
| `paper` | `#F5F3EE` | Page background | — |
| `surface` | `#FFFFFF` | Projects band, cards, hero panel, skill chips, menu panel | — |
| `sunk` | `#EAE6DD` | Screenshot frame bar/mat, panel header | — |
| `ink` | `#16150F` | Headings, body, primary button fill | 16.5:1 on paper |
| `ink-2` | `#55524A` | Descriptions, bullets, **any small text on `sunk`** | 7.0 on paper / 6.3 on sunk |
| `ink-3` | `#6E6A61` | Labels, dates on paper/surface only (**never on `sunk`**: 4.3:1) | 4.9 / 5.4 |
| `line` | `#D9D4C9` | Hairlines, tag/chip/frame borders | decorative |
| `line-strong` | `#8F8A7F` | Secondary button outline | 3.1:1 (non-text) |
| `accent` | `#2440C8` | See accent budget | 7.2 on paper / 8.0 on surface |
| `accent-strong` | `#1A3399` | Link hover/pressed | 9.6:1 |
| `inverse` / `inverse-fg` | `#16150F` / `#F5F3EE` | Contact band | 16.5:1 |
| `inverse-2` / `inverse-accent` | `#A9A59B` / `#8DA0F5` | Secondary text and links on the band | 7.4 / 7.4 |

```js
// tailwind.config.js → theme.extend (colors map to the variables above)
fontFamily: {
  display: ['"Instrument Serif"', 'Georgia', 'serif'],                  // h1, section h2 only
  sans: ['Geist', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
},
fontSize: {
  display: ['clamp(3.25rem, 1.9rem + 6vw, 7rem)',    { lineHeight: '0.92', letterSpacing: '-0.02em' }],  // hero h1 (serif)
  h2:      ['clamp(2.25rem, 1.7rem + 2.2vw, 3.5rem)', { lineHeight: '1',    letterSpacing: '-0.015em' }], // section h2 (serif)
  h3:      ['clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // project/job titles (Geist 600)
  lead:    ['clamp(1.125rem, 1rem + 0.4vw, 1.3125rem)', { lineHeight: '1.55' }],                         // hero line, About
  body:    ['1rem',     { lineHeight: '1.65' }],
  small:   ['0.875rem', { lineHeight: '1.5' }],                           // nav, buttons, chips
  label:   ['0.75rem',  { lineHeight: '1.4', letterSpacing: '0.06em' }],  // mono uppercase metadata
},
maxWidth:   { container: '75rem', prose: '65ch' },                       // 1200px
spacing: {
  gutter:       'clamp(1.25rem, 0.8rem + 2vw, 3rem)',   // 20 → 48px side padding
  section:      'clamp(5rem, 3.5rem + 5vw, 8.5rem)',    // 80 → 136px, default vertical rhythm
  'section-lg': 'clamp(6rem, 4rem + 6vw, 10rem)',       // 96 → 160px, hero and Projects
},
aspectRatio: { shot: '16 / 10' },                        // every screenshot
borderRadius: { sm: '4px', lg: '10px' },              // 6px = Tailwind's default rounded-md; `rounded` (4px) left at default, the current UI uses it
boxShadow: {
  focus: '0 0 0 2px rgb(var(--paper)), 0 0 0 4px rgb(var(--accent))',
  lift:  '0 1px 2px rgb(22 21 15 / 0.04), 0 8px 24px -12px rgb(22 21 15 / 0.18)', // project frame hover only
},
transitionTimingFunction: { out: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
transitionDuration: { fast: '150ms', base: '250ms', slow: '400ms' },
```

- **Grid:** 12 columns, `gap-x-6 lg:gap-x-8`; Tailwind default breakpoints.
- **Container:** `max-w-container mx-auto px-gutter`. This replaces the custom `.container` override.
- **Weights:**
  - Geist 400 / 500 / 600
  - Geist Mono 400 / 500
  - Instrument Serif 400 (italic not used)
- **Fonts:** self-hosted latin woff2 files in `public/fonts/` (all OFL licensed), declared with `@font-face` and `font-display: swap`. Geist and Instrument Serif are preloaded in `index.html` from phase 2 onwards, when they're first used (preloading earlier triggers unused-preload warnings). Inter's `@import` is removed in phase 2. This replaces the render-blocking Google Fonts `@import`. No npm package is needed.

---

## 5. Shared primitives (`src/components/ui/`)

One component per file, default exports.

| Component | Spec |
|---|---|
| `Container` | `max-w-container mx-auto px-gutter`. |
| `Section` | `<section id aria-labelledby>`. Props: `index`, `label`, `title`, `tone` (`paper` · `surface` · `inverse`), `size` (`default` · `lg`). |
| `SectionHeading` | Full-width `border-t border-line` (`inverse-2/30` on the inverse band). A mono label row (`04 — Projects`, `text-label uppercase text-ink-3`), then `h2` (`font-display text-h2 text-ink`, `mt-5`). Optional right-aligned meta slot (e.g. a project count, `6 projects`). |
| `Button` | Renders an `<a>`. `h-10 px-4 rounded-md text-small font-medium inline-flex items-center gap-2`. **Primary:** `bg-ink text-paper hover:bg-ink/85`. **Secondary:** `border border-line-strong text-ink hover:bg-sunk`. Optional leading icon and trailing ↗ for external links. 40px visible height, with the hit area padded to 44px. |
| `TextLink` | Inline link with a 1px underline drawn via `background-image` (`line` → `accent` on hover, `base` duration). External links get ↗ (`aria-hidden`) and sr-only "(opens in new tab)". |
| `Tag` | `font-mono text-label uppercase text-ink-2 border border-line rounded-sm px-2 py-1`. Transparent background, so it works on both paper and surface. |
| `ExternalLink` (helper) | Adds `target="_blank" rel="noopener noreferrer"` and the sr-only suffix. Used by `Button` and `TextLink`. |

Every interactive element gets `focus-visible:shadow-focus`. On the inverse band the ring colour is `inverse-accent`.

---

## 6. Sections

### Navigation
- `<header>` sticky at `top-0`, 64px tall, solid `bg-paper` (a 95% tint let scrolled content show through). A 1px `line` bottom border fades in once `scrollY > 8`.
- Left: wordmark "Aniket Sharma" (Geist 600, 15px), linking to `#top`.
- Right (≥768px):
  - `Experience · Skills · Projects · Contact` (Geist 500 14px, `ink-2`), in page order. Moving Projects earlier in the page is an open question for the owner.
  - The active section gets `ink` text and a 1px accent underline (IntersectionObserver; this is feedback, not decoration).
  - A divider, then the GitHub and LinkedIn icon links (20px icons, 44×44 hit area).
- Below 768px: wordmark plus a "Menu" button (`aria-expanded`, `aria-controls`) that opens a `surface` panel with the same links. It closes on Esc or link click, and focus returns to the button.
- A skip link is the first focusable element.

### Hero: minimal and centred (revised 2026-10-20 at the owner's request)
The "Currently" panel was removed because it repeated the Experience and Skills sections.

```
                 FULL-STACK DEVELOPER · DELHI, INDIA        (mono label, ink-3)

                          Aniket Sharma                     (serif, display)

            I like owning a feature end to end, from the data
            model and APIs to the interface people use.     (lead, ink-2, max-w-xl)

                  [ View projects ]  [ Get in touch ]
```
- Everything is centred.
- **Height:**
  - From `md` up, the hero fills the first screen below the nav (`min-h-[calc(100svh-4rem)]`), with the content vertically centred.
  - On phones it uses `py-24`, so About starts within the first screen.
- **Content:** label (`HERO.role` · `CONTACT.location`), name, and the two buttons. The lead line was removed at the owner's request (2026-10-20).
- **Legibility over the ribbon:** the label uses `ink-2` with a canvas-coloured `text-shadow` halo.
- **No image and no motion.** The LCP element is the `h1`.

### About
- Default section size on `paper`.
- ≥1024px: the section heading spans the full width. Below it, `ABOUT_TEXT` sits in cols 4–11 at `text-lead`, `ink`, max 65ch. Cols 1–3 are empty to anchor the grid.
- Copy unchanged.

### Projects: the centrepiece
- Full-bleed **`surface` band** (white), `section-lg` spacing, with hairlines top and bottom. It's the only full-width surface change on the page, so it visually lifts the work above everything else.
- **Heading:** `04 — Projects` / `h2` "Projects" (the current heading text), with the meta slot `6 projects`.
- **Section numbering** follows the page order the owner kept: 01 About · 02 Experience · 03 Skills · 04 Projects · 05 Contact.

**Screenshot frame** (used by every card, so framing is consistent):
```
┌──────────────────────────────────────────────┐  rounded-lg, 1px line border, overflow-hidden
│ boardly-xi.vercel.app                    ↗   │  32px bar, bg sunk, mono text-label ink-2
├──────────────────────────────────────────────┤  1px line
│                                              │
│            screenshot, aspect-shot (16:10)   │  object-cover object-top
│                                              │
└──────────────────────────────────────────────┘
```
- The bar text is the hostname taken from `demoLink`. If there's no demo, it's `github.com/aniket-sharma10/<repo>`, taken from `githubLink`. The bar doesn't use decorative traffic-light dots.
- The whole frame is a link to the live site, or to the source if there's no demo. It's `tabIndex={-1}` and `aria-hidden`, because the labelled buttons below are the accessible equivalents. This keeps one tab stop per action.
- Light and dark screenshots look like one set because they share the same bar, border, ratio and crop.

**Card anatomy** (content-driven height; flex column with actions pinned to the bottom so action rows line up across a row):
1. Frame
2. Meta row: mono `text-label ink-3`, e.g. `01` (with `· LATEST` on the first card only, which is true from the newest-first ordering)
3. Title (`h3`, Geist 600)
4. Description (`body`, `ink-2`, max 60ch)
5. Tags (`Tag`, wrapping, `gap-1.5`)
6. Action row (`border-t border-line pt-4 mt-auto`): **Primary button** "Try now ↗" (only if `demoLink`, as today), then **Secondary button** with a GitHub icon, "Source ↗" (replacing "GitHub"). Approved by the owner.

**Tiers** (by order in `PROJECTS`, so no data change is needed):

| Tier | Projects | ≥1024px | 768–1023px | <768px |
|---|---|---|---|---|
| Featured | Boardly | Frame cols 1–8, content cols 9–12, vertically centred; title at the top of the `h3` scale | Frame full width, content below in 2 columns (title + description / tags + actions) | Single column |
| Primary | Shoppers, Readers | 6 + 6 | 6 + 6 | Single column |
| Compact | Expense Tracker, Food Recipe, Weather App | 4 + 4 + 4, smaller title (`text-[1.25rem]` via the `h3` clamp floor), frame bar hidden below `lg` to save height | 6 + 6 (third wraps) | Single column |

- Vertical gap between tiers: 64px → 96px.
- **Hover/focus** (pointer devices; `:focus-within` mirrors it):
  - the frame gets `shadow-lift` and its border goes to `line-strong`
  - the screenshot scales to 1.02 (`slow`, clipped by the frame)
  - the title underlines
  - the button ↗ arrows move 2px

  There's no tilt or 3D. Nothing moves the text.

### Experience
- Default size on `paper`. Each job is a 12-column row separated by `line` hairlines (`py-10`).
- Cols 1–4:
  - period, in mono `text-label ink-3`; the current role gets a 6px accent dot plus sr-only "Current"
  - company, Geist 500 `ink`
  - location, `ink-3`
- Cols 5–12:
  - role as `h3`
  - bullets in `body ink-2`, max 65ch, with an en-dash marker in `ink-3`
  - tags, using the shared `Tag`
- On mobile the metadata stacks above the role.

### Skills
- Default size on `paper`. Five rows separated by hairlines: category in cols 1–3 (mono label), chips in cols 4–12.
- **Skill chip:** `surface` background, 1px `line` border, `rounded`, `h-9 px-3`, a monochrome 16px icon (`currentColor`, `ink-2`) and the name (Geist 500, `text-small`, `ink`). The local Zustand and Step Functions logos get `grayscale(1)`. Unmapped skills render without an icon.
- Chips are static (not interactive), so they have no hover state.

### Contact + footer
- A full-bleed `inverse` band with `section-lg` spacing.
- Heading: `05 — Contact` / `h2` "Let's Connect" (serif, `inverse-fg`).
- Email as a large link (Geist 500, clamp 24→40px, `inverse-accent` underline), same tab.
- Below it, two mono-labelled rows: LinkedIn `@aniket-sharmaa10` (new tab) and Location `Delhi, India`.
- `<footer>`: `© 2026 Aniket Sharma` (mono, `inverse-2`) plus the GitHub/LinkedIn icon links.

---

## 7. Motion

**Core** (part of the design; ships with each component):

| Where | What | Timing |
|---|---|---|
| Links | Underline colour → accent; ↗ moves `translate(2px,-2px)` | `fast` |
| Buttons | Background/border colour | `fast` |
| Project card | Frame `shadow-lift`, border `line-strong`, image `scale(1.02)` | `slow`, `ease-out` |
| Nav | Border fade on scroll; active-section underline | `fast` |
| Mobile menu | Opacity + 8px slide | `base` |

**Optional polish** (a separate final phase; the site is complete without it):
- A one-time fade-up (12px, 400ms) on section headings and project cards, stagger ≤ 3 × 60ms.
- Content is visible by default. The hidden state only applies after JS adds `html.js-reveal`, and never in the hero.

**Static:** body text, bullets, skills, tags, contact details and backgrounds. No parallax, cursor effects, marquees, typewriter, loops or scroll-linked colour.

**`prefers-reduced-motion: reduce`:** all transforms and reveals are removed; colour transitions stay.

`framer-motion` isn't needed. CSS transitions plus one small IntersectionObserver hook cover everything.

---

## 8. Assets and dependencies

| Item | Decision |
|---|---|
| `src/data/index.js` | Content unchanged. Additions (need approval): `HERO` (role from the previous hero, lead verbatim from `ABOUT_TEXT`) and `thumbnailAlt` per project. |
| `projectsImgs/*.png` | Convert once offline to AVIF + WebP at 800w and 1600w (`npx sharp-cli`, nothing added to `package.json`). Serve with `<picture>`, `srcset`/`sizes`, explicit `width`/`height`, `loading="lazy"`, `decoding="async"`. Keep the PNG sources. |
| `boardly-placeholder.svg` | Replace when a real screenshot is provided. Until then, restyle it with the new tokens (`sunk` / `line` / `ink-3`). |
| `hero.png` | No longer referenced. The file stays in the repo unless deletion is approved. |
| `assets/skills/*`, `Technologies.jsx` `ICONS` map | Reused, rendered monochrome. |
| `ProjectCard.jsx` | Rewritten as the new card. The old tilt helpers are deleted with it. |
| `react-simple-typewriter` | No longer imported. Stays installed. |
| `@nextui-org/react`, `framer-motion` | Untouched. |
| New dependencies | **`prop-types`** (added in phase 1). The existing ESLint config enforces `react/prop-types`; it was already in the lockfile through `eslint-plugin-react`, and is now a direct dependency. No others. |

---

## 9. Scope and content rules

**Preserved verbatim:**
- `ABOUT_TEXT`
- all `EXPERIENCE` data
- all `SKILLS`
- all six `PROJECTS` (titles, descriptions, tags, links, order)
- `SOCIAL_LINKS`, `CONTACT`
- the section headings "About", "Experience", "Skills", "Projects" and "Let's Connect"

**New text (needs approval; none of it makes claims about the work):**
- UI labels:
  - nav link names
  - "View projects", "Get in touch"
  - "Source" (replacing "GitHub"); "Try now" is kept
  - "Menu", "Skip to content"
  - "6 projects"
  - section index labels
  - footer ©
- Accessibility text: per-project `thumbnailAlt`, describing only what each screenshot shows:
  - Boardly: "Boardly placeholder graphic"
  - Shoppers: "Shoppers product page showing a smartwatch listing"
  - Readers: "Readers search results with a grid of blog post cards"
  - Expense Tracker: "Expense Tracker dashboard with income and expense totals and a pie chart"
  - Food Recipe: "Food Recipe search results showing pasta recipe cards"
  - Weather App: "Weather App card showing current conditions for Delhi"

**Not added:** blog, theme toggle, résumé download, copy-to-clipboard, X/Instagram links (no URLs in the data), extra footer copy, project dates or metrics.

---

## 10. Quality checklist

- **Performance:**
  - The hero is text only (LCP = `h1`).
  - About 2.4 MB of PNG becomes modern formats; size to be measured after conversion.
  - All project images are lazy-loaded.
  - Fonts are self-hosted with 2 preloads.
  - No new JS dependencies.
  - Add a meta description and favicon to `index.html` (copy to be approved in the head phase).
- **Accessibility:**
  - Landmarks `header`/`nav`/`main#content`/`section[aria-labelledby]`/`footer`.
  - One `h1`, then `h2` per section and `h3` per item.
  - Every action is an `<a>`, and external links are announced as opening a new tab.
  - Focus rings everywhere; targets ≥ 44px; keyboard- and Esc-operable menu.
  - AA contrast per §4.
  - Reduced-motion support.
- **Responsive:**
  - No fixed widths or heights.
  - `svh` for any minimum height.
  - No horizontal scroll at 320, 375, 768, 1024, 1440 and 1920px.
  - Tag rows and the email address wrap.

---

## 11. Implementation phases

Each phase is announced with its scope and files first. After each one: `npm run lint` (touched files must be clean, and pre-existing errors are reported separately) and `npm run build`, then a summary before moving on.

| # | Phase | Files | Visible change |
|---|---|---|---|
| 1 | Tokens, fonts, primitives | `tailwind.config.js`, `src/index.css`, `public/fonts/*.woff2`, `src/components/ui/*` (new), `package.json` (`prop-types`) | **None.** Tokens and primitives are additive. The current shell keeps its colours and Inter until phase 2. |
| 2 | Page shell + nav | `App.jsx`, `Navbar.jsx`, `index.html` (font preloads), `src/index.css` (drop Inter) | Paper background, new nav, skip link, landmarks. Remaining sections are temporarily re-coloured to `ink` so they stay readable. |
| 3 | Hero | `Hero.jsx`, `src/data/index.js` (`HERO`) | New hero (panel later removed; minimal centred hero) |
| 4 | About | `About.jsx` | — |
| 5 | Projects | `Projects.jsx`, `ProjectCard.jsx`, `src/data/index.js` (`thumbnailAlt`), optimised images | — |
| 6 | Experience | `Experience.jsx` | — |
| 7 | Skills | `Technologies.jsx` | — |
| 8 | Contact + footer | `Contact.jsx` | — |
| 9 | QA | Any | Accessibility/responsive pass at all widths, plus Lighthouse |
| 10 | Optional reveals | `src/components/ui/useReveal.js`, sections | Only if wanted after phase 9 |

---

## Approved decisions (2026-10-20)

1. Revision 2 of Direction A is approved.
2. Project actions: **"Try now"** (shown only when `demoLink` exists) and **"Source"** (replaces "GitHub"). All other labels and the alt text in §9 are approved.
3. Boardly keeps the restyled placeholder until the owner provides a real screenshot.
