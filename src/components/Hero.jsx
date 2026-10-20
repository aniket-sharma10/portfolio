import { CONTACT, HERO } from "../data";
import WireRibbon from "./effects/WireRibbon";
import Button from "./ui/Button";
import Container from "./ui/Container";

// From md up it fills the first screen below the 64px nav; on phones it uses padding so About starts in view.
// The background layer fades out toward the bottom edge so the hero blends into the page. The label gets a
// canvas-coloured halo so ribbon threads passing behind it never break up the letters.
function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex items-center overflow-hidden py-24 md:min-h-[calc(100svh-4rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      >
        <WireRibbon />
        {/* Scrim: keeps the text block legible wherever the effect passes behind it */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_60%_at_50%_48%,rgb(var(--canvas)/0.92),transparent)] md:bg-[radial-gradient(ellipse_50%_48%_at_50%_50%,rgb(var(--canvas)/0.85),transparent)]" />
      </div>

      <Container className="flex flex-col items-center text-center">
        <p className="font-mono text-label uppercase text-ink-2 [text-shadow:0_0_4px_rgb(var(--canvas)),0_0_12px_rgb(var(--canvas))]">
          {HERO.role} · {CONTACT.location}
        </p>
        <h1 id="hero-heading" className="mt-6 text-balance font-display text-display font-normal text-ink">
          Aniket Sharma
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="#projects">View projects</Button>
          <Button href="#contact" variant="secondary">
            Get in touch
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
