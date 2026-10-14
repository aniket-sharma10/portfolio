import {
  SiAmazons3,
  SiAmazonsqs,
  SiAwslambda,
  SiCplusplus,
  SiElectron,
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { SKILLS } from "../data";
import stepFunctions from "../assets/skills/step-functions.svg";
import zustand from "../assets/skills/zustand.png";

// Skills without an entry here render as a text-only tile
const ICONS = {
  JavaScript: <SiJavascript className="text-yellow-400" />,
  TypeScript: <SiTypescript className="text-blue-500" />,
  "C++": <SiCplusplus className="text-blue-500" />,
  React: <SiReact className="text-cyan-400" />,
  "Next.js": <SiNextdotjs />,
  Zustand: <img src={zustand} alt="" className="h-[1em] w-[1em]" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#38bdf8]" />,
  "Node.js": <SiNodedotjs className="text-green-600" />,
  Express: <SiExpress />,
  PostgreSQL: <SiPostgresql className="text-[#4169e1]" />,
  MongoDB: <SiMongodb className="text-green-500" />,
  MySQL: <SiMysql className="text-[#2c7fa0]" />,
  Prisma: <SiPrisma />,
  "AWS Lambda": <SiAwslambda className="text-orange-500" />,
  S3: <SiAmazons3 className="text-green-600" />,
  SQS: <SiAmazonsqs className="text-pink-500" />,
  "Step Functions": <img src={stepFunctions} alt="" className="h-[1em] w-[1em] rounded" />,
  Git: <SiGit className="text-orange-600" />,
  GitHub: <SiGithub />,
  Electron: <SiElectron className="text-[#9feaf9]" />,
};

function Technologies() {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <h2 className="mt-20 mb-12 text-center text-3xl md:text-4xl">Skills</h2>
      {SKILLS.map(({ category, items }) => (
        <div key={category}>
          <h3 className="mt-14 mb-6 text-center text-2xl md:text-3xl">{category}</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {items.map((skill) => (
              <div
                key={skill}
                className="flex min-w-[6rem] flex-col items-center gap-2 rounded-2xl border-4 border-neutral-800 p-3"
              >
                {ICONS[skill] && <span className="text-5xl">{ICONS[skill]}</span>}
                <span className="text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Technologies;
