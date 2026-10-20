import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SOCIAL_LINKS } from "../data";
import Container from "./ui/Container";
import ExternalLink from "./ui/ExternalLink";
import TextLink from "./ui/TextLink";

const ICON_LINK =
  "inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors duration-fast ease-out hover:bg-raised hover:text-ink focus-visible:shadow-focus focus-visible:outline-none";

function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col-reverse items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="font-mono text-label uppercase text-ink-3">© {new Date().getFullYear()} Aniket Sharma</p>
        <div className="flex items-center gap-2">
          <TextLink href="#top" className="mr-2 inline-flex min-h-11 items-center text-small">
            Back to top
          </TextLink>
          <ExternalLink href={SOCIAL_LINKS.github} aria-label="GitHub (opens in new tab)" className={ICON_LINK}>
            <FaGithub aria-hidden="true" className="h-5 w-5" />
          </ExternalLink>
          <ExternalLink href={SOCIAL_LINKS.linkedin} aria-label="LinkedIn (opens in new tab)" className={ICON_LINK}>
            <FaLinkedin aria-hidden="true" className="h-5 w-5" />
          </ExternalLink>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
