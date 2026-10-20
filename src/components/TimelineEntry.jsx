import PropTypes from "prop-types";
import useRevealOnce from "../hooks/useRevealOnce";
import Tag from "./ui/Tag";

// One job on the Experience timeline. The node on the rail lights up once the scroll beam reaches it; the current
// role's node also glows. On desktop the dates/company column stays pinned while the role's details scroll past.
function TimelineEntry({ job, reached, isCurrent }) {
  const [tagsRef, tagsRevealed] = useRevealOnce(0.5);

  return (
    <li className="relative pb-16 pl-10 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:pb-24 lg:pl-12">
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-canvas transition-[border-color,box-shadow] duration-base ease-out ${
          reached ? "border-accent" : "border-line-strong"
        } ${isCurrent && reached ? "shadow-glow" : ""}`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-base ease-out motion-reduce:transition-none ${
            reached ? "scale-100" : "scale-0"
          }`}
        />
      </span>

      <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        <p className="font-mono text-label uppercase text-ink-3">
          {isCurrent && <span className="sr-only">Current role, </span>}
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
        <ul ref={tagsRef} role="list" aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
          {job.tags.map((tag, i) => (
            <li
              key={tag}
              style={{ transitionDelay: tagsRevealed ? `${i * 40}ms` : "0ms" }}
              className={`transition duration-slow ease-out motion-reduce:transition-none ${
                tagsRevealed ? "translate-y-0 scale-100 opacity-100" : "translate-y-1 scale-95 opacity-0"
              }`}
            >
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

TimelineEntry.propTypes = {
  job: PropTypes.shape({
    role: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  reached: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
};

export default TimelineEntry;
