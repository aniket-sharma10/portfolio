import { CONTACT, HERO } from "../data";
import Button from "./ui/Button";
import Container from "./ui/Container";

// From md up it fills the first screen below the 64px nav; on phones it uses padding so About starts in view
function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex items-center py-24 md:min-h-[calc(100svh-4rem)]"
    >
      <Container className="flex flex-col items-center text-center">
        <p className="font-mono text-label uppercase text-ink-3">
          {HERO.role} · {CONTACT.location}
        </p>
        <h1 id="hero-heading" className="mt-6 text-balance font-display text-display font-normal text-ink">
          Aniket Sharma
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-lead text-ink-2">{HERO.lead}</p>
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
