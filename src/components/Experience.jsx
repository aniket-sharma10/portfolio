import { useRef } from "react";
import { EXPERIENCE } from "../data";
import useTimelineProgress from "../hooks/useTimelineProgress";
import TimelineEntry from "./TimelineEntry";
import Section from "./ui/Section";

// A vertical rail (centred on the 16px nodes, so 7px in) running from the first node to the last. An accent →
// accent-2 beam fills it as the section scrolls up past 60% of the viewport; the beam has a thin white core, a
// white + accent glow, and a bright tip riding its end. The hook sizes the rail from the real node positions.
function Experience() {
  const listRef = useRef(null);
  const railRef = useRef(null);
  const beamRef = useRef(null);
  const tipRef = useRef(null);
  const reached = useTimelineProgress({ listRef, railRef, beamRef, tipRef });

  return (
    <Section id="experience" title="Experience">
      <div className="relative">
        <div ref={railRef} aria-hidden="true" className="absolute left-[7px] top-0 h-0 w-0.5">
          <div className="absolute inset-0 bg-line-strong/40" />
          <div
            ref={beamRef}
            className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-accent to-accent-2 shadow-[0_0_6px_rgb(255_255_255/0.45),0_0_16px_rgb(var(--accent)/0.85),0_0_32px_rgb(var(--accent-2)/0.35)]"
          >
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/70" />
          </div>
          <div
            ref={tipRef}
            className="absolute left-1/2 top-0 h-2 w-2 rounded-full bg-white opacity-0 shadow-[0_0_8px_3px_rgb(255_255_255/0.7),0_0_22px_8px_rgb(var(--accent)/0.6)] transition-opacity duration-base"
          />
        </div>

        <ol ref={listRef} role="list">
          {EXPERIENCE.map((job, i) => (
            <TimelineEntry key={job.company} job={job} reached={i < reached} isCurrent={job.period.includes("Present")} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

export default Experience;
