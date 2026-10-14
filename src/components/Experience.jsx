import { EXPERIENCE } from "../data";

function Experience() {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <h2 className="mt-20 mb-12 text-center text-3xl md:text-4xl">Experience</h2>
      <div className="mx-auto max-w-3xl">
        {EXPERIENCE.map((job) => (
          <div key={job.company} className="mb-12">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-xl font-semibold text-neutral-100">
                {job.role} <span className="text-neutral-500">· {job.company}</span>
              </h3>
              <p className="text-sm text-neutral-400">
                {job.period} · {job.location}
              </p>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-300">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span key={tag} className="rounded bg-neutral-900 px-2 py-1 text-sm text-purple-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
