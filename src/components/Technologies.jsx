import {
  SiAmazons3,
  SiAmazonsqs,
  SiAwslambda,
  SiCplusplus,
  SiDocker,
  SiElectron,
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { TbDatabaseSearch } from "react-icons/tb";
import { SKILLS } from "../data";
import useInView from "../hooks/useInView";
import useRevealOnce from "../hooks/useRevealOnce";
import stepFunctions from "../assets/skills/step-functions.svg";
import zustand from "../assets/skills/zustand.png";
import Section from "./ui/Section";

// Each skill's icon and brand colour. Brand colours are part of each logo's identity, so they're the one place
// hex values live outside the tokens. Every colour is at least 3:1 against the tile; C++ uses its logo's lighter
// blue, and logos that are black (Next.js, Express, Prisma, GitHub, OpenAI) or have no single colour (Zustand) fall back to
// ink, the way their own dark-mode marks look. Unmapped skills show text only.
const LOGO_IMG = "h-[1em] w-[1em] rounded-sm";
const SKILL_META = {
  JavaScript: { Icon: SiJavascript, brand: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, brand: "#3178C6" },
  "C++": { Icon: SiCplusplus, brand: "#659AD2" },
  React: { Icon: SiReact, brand: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs },
  Zustand: { Icon: () => <img src={zustand} alt="" className={LOGO_IMG} /> },
  "Node.js": { Icon: SiNodedotjs, brand: "#5FA04E" },
  Express: { Icon: SiExpress },
  PostgreSQL: { Icon: SiPostgresql, brand: "#4169E1" },
  MongoDB: { Icon: SiMongodb, brand: "#47A248" },
  MySQL: { Icon: SiMysql, brand: "#4479A1" },
  Prisma: { Icon: SiPrisma },
  "AWS Lambda": { Icon: SiAwslambda, brand: "#FF9900" },
  S3: { Icon: SiAmazons3, brand: "#569A31" },
  SQS: { Icon: SiAmazonsqs, brand: "#FF4F8B" },
  "Step Functions": { Icon: () => <img src={stepFunctions} alt="" className={LOGO_IMG} />, brand: "#E7157B" },
  Docker: { Icon: SiDocker, brand: "#2496ED" },
  Git: { Icon: SiGit, brand: "#F05032" },
  GitHub: { Icon: SiGithub },
  Electron: { Icon: SiElectron, brand: "#47848F" },
  OpenAI: { Icon: SiOpenai },
  // RAG has no logo: a retrieval (database search) icon in the theme accent
  RAG: { Icon: TbDatabaseSearch, brand: "rgb(var(--accent))" },
};
const INK = "rgb(var(--ink))";

// Deterministic per-pill timing (golden-ratio steps), so pills drift independently but render the same every time
const floatTiming = (n) => ({
  animationDuration: `${5 + ((n * 0.618) % 1) * 2}s`,
  animationDelay: `${-((n * 0.382) % 1) * 6}s`,
});

// Open category groups (no card boxes): a semibold heading over a static underline that fades from violet
// through orchid to transparent, then the skills as floating pills. Layering keeps transforms from fighting: the group fades
// in, each <li> floats (CSS animation, only while the section is on screen, paused on hover, off for reduced
// motion), and the inner pill does the hover lift and brand-coloured glow.
function Technologies() {
  const [revealRef, revealed] = useRevealOnce(0.15);
  const [viewRef, inView] = useInView();
  let pillIndex = 0;

  return (
    <Section id="skills" title="Skills">
      <div ref={viewRef}>
        <div ref={revealRef} className="grid gap-x-12 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {SKILLS.map(({ category, items }, i) => (
            <div
              key={category}
              style={{ transitionDelay: revealed ? `${i * 80}ms` : "0ms" }}
              className={`transition duration-slow ease-out motion-reduce:transition-none ${
                revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <h3 className="text-h3 font-semibold text-ink">{category}</h3>
              <div aria-hidden="true" className="mt-3 h-px bg-gradient-to-r from-accent/80 via-accent-2/30 to-transparent" />
              <ul role="list" className="mt-6 flex flex-wrap gap-2.5">
                {items.map((skill) => {
                  const { Icon, brand } = SKILL_META[skill] ?? {};
                  const n = pillIndex++;
                  return (
                    <li
                      key={skill}
                      style={floatTiming(n)}
                      className={`animate-float hover:[animation-play-state:paused] motion-reduce:animate-none ${
                        inView ? "" : "[animation-play-state:paused]"
                      }`}
                    >
                      {/* --brand drives the icon colour, its tinted circle and the hover glow (via color-mix) */}
                      <span
                        style={{ "--brand": brand ?? INK }}
                        className="group/pill flex items-center gap-2 rounded-full border border-line bg-raised/70 py-1 pl-1 pr-3.5 transition-[border-color,box-shadow,transform] duration-base ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand)_55%,transparent)] hover:shadow-[0_10px_28px_-12px_color-mix(in_srgb,var(--brand)_80%,transparent)] motion-reduce:transform-none"
                      >
                        {Icon && (
                          <span
                            aria-hidden="true"
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] text-base text-[var(--brand)] transition-colors duration-base group-hover/pill:bg-[color-mix(in_srgb,var(--brand)_26%,transparent)]"
                          >
                            <Icon />
                          </span>
                        )}
                        <span className="whitespace-nowrap text-small font-medium text-ink">{skill}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Technologies;
