import { EXPERIENCE } from "../data";
import Section from "./ui/Section";
import Tag from "./ui/Tag";

function Experience() {
  return (
    <Section id="experience" index="02" label="Experience" title="Experience">
      <ol role="list" className="divide-y divide-line">
        {EXPERIENCE.map((job) => {
          const isCurrent = job.period.includes("Present");

          return (
            <li key={job.company} className="py-10 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-4">
                <p className="flex items-center gap-2 font-mono text-label uppercase text-ink-3">
                  {isCurrent && (
                    <>
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="sr-only">Current role, </span>
                    </>
                  )}
                  {job.period}
                </p>
                <p className="mt-3 font-medium text-ink">{job.company}</p>
                <p className="text-small text-ink-3">{job.location}</p>
              </div>

              <div className="mt-6 lg:col-span-8 lg:mt-0">
                <h3 className="text-h3 font-semibold text-ink">
                  {job.role}
                  <span className="sr-only">, {job.company}</span>
                </h3>
                <ul role="list" className="mt-5 max-w-prose space-y-3">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-5 text-body text-ink-2 before:absolute before:left-0 before:text-ink-3 before:content-['–']"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <ul role="list" aria-label="Technologies" className="mt-6 flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

export default Experience;
