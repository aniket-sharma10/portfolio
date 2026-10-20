import { FiArrowRight } from "react-icons/fi";
import { CONTACT, SOCIAL_LINKS } from "../data";
import Section from "./ui/Section";
import TextLink from "./ui/TextLink";

const ROW = "grid grid-cols-[5.5rem_1fr] items-center gap-x-4 border-b border-line py-2";
const LABEL = "font-mono text-label uppercase text-ink-3";

// If the address ever has to wrap, break before the "@" rather than mid-word
const [emailUser, emailDomain] = CONTACT.email.split("@");

// The page's closing section. The email is the primary action, so it's set large; LinkedIn and location sit in
// datasheet rows beside it. mailto: stays in the same tab (it hands off to the mail app).
function Contact() {
  return (
    <Section id="contact" title="Let's Connect">
      <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <div className="lg:col-span-8">
          <p className={LABEL}>Email</p>
          <p className="mt-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="group/email rounded-sm text-callout font-medium text-ink focus-visible:shadow-focus focus-visible:outline-none"
            >
              <span className="underline decoration-line-strong decoration-2 underline-offset-[6px] transition-colors duration-base ease-out [overflow-wrap:anywhere] group-hover/email:decoration-accent">
                {emailUser}
                <wbr />@{emailDomain}
              </span>
              <FiArrowRight
                aria-hidden="true"
                className="ml-2 inline-block h-[0.7em] w-[0.7em] align-[-0.05em] text-accent transition-transform duration-fast ease-out group-hover/email:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </a>
          </p>
        </div>

        <dl className="mt-12 border-t border-line lg:col-span-4 lg:col-start-9 lg:mt-0">
          <div className={ROW}>
            <dt className={LABEL}>LinkedIn</dt>
            <dd>
              <TextLink href={SOCIAL_LINKS.linkedin} external className="inline-flex min-h-11 items-center">
                @{CONTACT.linkedinHandle}
              </TextLink>
            </dd>
          </div>
          <div className={ROW}>
            <dt className={LABEL}>Location</dt>
            <dd className="flex min-h-11 items-center text-body text-ink">{CONTACT.location}</dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}

export default Contact;
