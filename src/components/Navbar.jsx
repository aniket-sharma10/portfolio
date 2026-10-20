import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { NAV_LINKS, SOCIAL_LINKS } from "../data";
import useActiveSection from "../hooks/useActiveSection";
import Container from "./ui/Container";
import ExternalLink from "./ui/ExternalLink";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

const ICON_LINK =
  "inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors duration-fast ease-out hover:bg-sunk hover:text-ink focus-visible:shadow-focus focus-visible:outline-none";

function Navbar() {
  const activeId = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc closes the menu and returns focus to its button; widening past md closes it too
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  const linkClass = (id) =>
    `rounded-sm text-small font-medium underline-offset-[6px] transition-colors duration-fast ease-out focus-visible:shadow-focus focus-visible:outline-none ${
      activeId === id
        ? "text-ink underline decoration-accent decoration-1"
        : "text-ink-2 hover:text-ink"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 h-16 border-b bg-paper transition-colors duration-fast ease-out ${
        scrolled || menuOpen ? "border-line" : "border-transparent"
      }`}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <a
          href="#top"
          className="rounded-sm text-body font-semibold tracking-tight text-ink focus-visible:shadow-focus focus-visible:outline-none"
        >
          Aniket Sharma
        </a>

        <nav aria-label="Primary" className="flex items-center">
          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={linkClass(href.slice(1))}
                  aria-current={activeId === href.slice(1) ? "true" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <span aria-hidden="true" className="mx-4 hidden h-5 w-px bg-line md:block" />

          <ExternalLink href={SOCIAL_LINKS.github} aria-label="GitHub (opens in new tab)" className={ICON_LINK}>
            <FaGithub aria-hidden="true" className="h-5 w-5" />
          </ExternalLink>
          <ExternalLink href={SOCIAL_LINKS.linkedin} aria-label="LinkedIn (opens in new tab)" className={ICON_LINK}>
            <FaLinkedin aria-hidden="true" className="h-5 w-5" />
          </ExternalLink>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="ml-1 inline-flex h-11 items-center rounded-md px-3 text-small font-medium text-ink transition-colors duration-fast ease-out hover:bg-sunk focus-visible:shadow-focus focus-visible:outline-none md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </Container>

      {/* Kept mounted so it can transition; `invisible` removes it from the tab order when closed */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full border-b border-line bg-surface transition duration-base ease-out motion-reduce:transform-none motion-reduce:transition-none md:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <Container>
          <ul className="py-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} className="border-b border-line last:border-b-0">
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeId === href.slice(1) ? "true" : undefined}
                  className={`flex min-h-[3.5rem] items-center rounded-sm text-h3 font-medium focus-visible:shadow-focus focus-visible:outline-none ${
                    activeId === href.slice(1) ? "text-ink" : "text-ink-2"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </header>
  );
}

export default Navbar;
