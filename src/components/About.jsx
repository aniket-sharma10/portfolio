import { ABOUT_TEXT } from "../data";
import Section from "./ui/Section";

function About() {
  return (
    <Section id="about" title="About Me">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <p className="max-w-prose text-pretty text-lead text-ink lg:col-span-8 lg:col-start-4">{ABOUT_TEXT}</p>
      </div>
    </Section>
  );
}

export default About;
