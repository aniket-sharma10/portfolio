# Portfolio — Aniket Sharma

Single-page personal developer portfolio. React 18 + Vite 5 + Tailwind CSS 3, plain JavaScript (JSX, no TypeScript). Deployed on Vercel (`vercel.json` only holds a redirect).

## Commands

```bash
npm install      # node_modules is not committed
npm run dev      # Vite dev server
npm run lint     # ESLint, --max-warnings 0 (warnings fail)
npm run build    # production build to dist/
npm run preview  # serve the built dist/
```

There is no test suite. Validate every change with `npm run lint` and `npm run build`, then check the page in the browser at mobile (~375px), tablet and desktop widths.

## Structure

- `src/App.jsx` — page shell: fixed gradient background, then sections in order: Navbar → Hero → About → Experience → Technologies → Projects → Contact.
- `src/components/` — one component per section, plus `ProjectCard.jsx` (hand-rolled 3D tilt card: `CardContainer` / `CardBody` / `CardItem`).
- `src/data/index.js` — all content: `ABOUT_TEXT`, `EXPERIENCE`, `SKILLS` (grouped), `PROJECTS` (newest first; `title`, `description`, `tags`, `thumbnail`, `githubLink`, `demoLink` — empty `demoLink` hides "Try now"), `SOCIAL_LINKS`, `CONTACT`. Resume is the source of truth for experience and project copy; don't invent claims or metrics.
- `src/assets/` — `hero.png` and `projectsImgs/*.png`, imported as ES modules.
- `src/index.css` — Tailwind directives, `@font-face` for self-hosted fonts in `public/fonts/` (Geist, Geist Mono, Instrument Serif), colour tokens as CSS variables, wider `.container` at ≥1280px (legacy sections only).
- `tailwind.config.js` — design tokens (colours, fonts, type scale, spacing, radii, shadows, motion) mapped to the CSS variables.
- `src/components/ui/` — shared primitives (`Section`, `SectionHeading`, `Container`, `Button`, `TextLink`, `Tag`, `ExternalLink`); `src/hooks/` — `useActiveSection`.

## Conventions

- Function components with default exports; one component per file in `src/components/`.
- Styling is Tailwind utility classes inline in JSX; no CSS modules or component library in use. Dark "Night" theme from design tokens (`bg-canvas`, `text-ink`); see `docs/design-proposal.md` (Revision 3).
- Icons come from `react-icons`. `react-simple-typewriter` is installed but no longer used. Components declare `propTypes` (`prop-types`), since lint enforces `react/prop-types`.
- Content belongs in `src/data/index.js`, not hard-coded in components. `Technologies.jsx` maps skill names to `react-icons` icons, or to local logos in `src/assets/skills/` (Zustand, Step Functions) where react-icons has none; unmapped skills render as text-only tiles.
- External links open in a new tab.

## Known state (as of Oct 2026)

- `npm run lint` fails on pre-existing errors in `Projects.jsx` and `ProjectCard.jsx` (rewritten in the Projects phase). Touched files should be lint-clean; `npm run build` passes.
- Boardly uses a placeholder thumbnail (`src/assets/projectsImgs/boardly-placeholder.svg`) until a real screenshot is added. Project `tags` are in the data but not yet rendered by `ProjectCard`.
- `@nextui-org/react` and `framer-motion` are listed in `package.json` but not imported anywhere.
- `ProjectCard`'s `CardItem` never receives the hover state, so its `translateZ` depth effects do nothing; only the container tilt works. The card body also has a typo'd class `md:[32rem]`.
- Images are large unoptimized PNGs (`foodRecipe.png` ~1 MB, `hero.png` ~520 KB) with no lazy loading.
- Accessibility gaps: section headings mix `h1`/`h2`, project images use `alt="thumbnail"`, the GitHub action is a `<button>` calling `window.open` instead of a link.
- The README is still the Vite template boilerplate.

## Ground rules

- Preserve working functionality: every section, all project entries, and every external link (GitHub, LinkedIn, X, Instagram, email, project demos/repos) must keep working through any redesign. Don't remove, rename, or rewrite content unless the owner explicitly approves the change.
- Make changes incrementally and keep the app buildable and lint-clean after each step.
- Prefer the existing stack and what's already installed (Tailwind, `react-icons`, and `framer-motion` if animation needs it). Don't introduce a new library without stating a clear justification first. Remove unused dependencies only when asked.

## Design direction (upcoming redesign)

Goal: a premium, modern, interactive developer portfolio with a distinctive visual identity — closer to a polished creative-tech site than a conventional developer template, while staying professional and easy to navigate. Content clarity, visual consistency, performance, and usability take priority over novelty.

### Visual system

- **Typography**: strong and deliberate — a defined type scale with clear hierarchy, comfortable line lengths (~60–75ch for prose), and restrained use of weights. Headings carry the design.
- **Layout**: clean, balanced whitespace on a consistent grid; clear section rhythm; content-led rather than decoration-led.
- **Color**: dark blue-black base with two accents (electric blue `accent`, aqua `accent-2`). Their gradient is reserved for the timeline beam and pill hover borders. The hero ribbon has its own effect-only tokens (`ribbon-1` purple, `ribbon-2` orchid) that never go on text or UI. Never gradient-filled text.
- **Design tokens**: define colors, type scale, spacing, radii, and shadows once (in `tailwind.config.js` theme extensions) and use them everywhere; no ad-hoc hex values or one-off sizes in components.
- **Reusable components**: shared primitives (section wrapper/heading, button/link, tag, card) used across all sections so every section feels like part of one system. Don't give each section or element its own style.

### Key sections

- **Hero**: visually engaging and memorable, but it must load fast and show who the owner is and what they do at a glance.
- **Project cards**: the centerpiece. Polished and scannable — thumbnail, title, concise description, tech tags, clear demo/source actions. Interaction should feel tactile without hurting readability.

### Motion and interaction

- Subtle and purposeful: entrance reveals, hover/focus feedback, smooth transitions. Every animation should aid understanding or feedback, not exist purely for visual effect.
- 3D or other advanced effects only where they genuinely improve the experience (e.g. a refined card tilt), never as decoration for its own sake.
- Respect `prefers-reduced-motion`. No scroll-jacking, or motion that delays content. The only ambient effects are the hero wire ribbon (`src/components/effects/WireRibbon.jsx`, original WebGL; pauses off-screen and in hidden tabs, static under reduced motion) and a cursor spotlight; nothing loops next to body text.

### Content and voice

- Present the owner authentically as an early-career full-stack developer.
- Emphasize real projects, technical contributions, skills, and experience.
- Concise, natural copy. No exaggerated claims, invented metrics, generic AI-sounding marketing language, or unnecessary self-promotion.
- A blog, terminal interface, Three.js scene, or elaborate interactive experience is not required; don't add one unless asked.

### Quality bar

- **Responsive**: mobile-first; verify on small phones through wide desktops with no horizontal scroll.
- **Accessibility**: semantic landmarks and heading order, visible focus states, accessible names on icon links, meaningful alt text, WCAG AA contrast, full keyboard navigation.
- **Performance**: optimized/modern image formats with explicit sizes and lazy loading below the fold, minimal JS, fonts loaded without blocking render, no heavy libraries for small effects.

### Avoid

- Generic portfolio templates and stock "AI landing page" patterns.
- Gradients or glows beyond the approved uses above, glassmorphism, particle fields, and generic purple-gradient text or buttons.
- Animations added purely for visual effect.
- Visually noisy sections, or giving every element a different style.
- Emoji-heavy copy, and dependencies added for a single effect.
