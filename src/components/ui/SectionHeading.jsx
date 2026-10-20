import PropTypes from "prop-types";

const TONES = {
  paper: { rule: "border-line", label: "text-ink-3", title: "text-ink" },
  inverse: { rule: "border-inverse-2/30", label: "text-inverse-2", title: "text-inverse-fg" },
};

// The mono label repeats the title, so it is hidden from screen readers; meta (e.g. "6 projects") is not
function SectionHeading({ id, index, label, title, meta = null, tone = "paper" }) {
  const t = TONES[tone];

  return (
    <div className={`border-t pt-5 ${t.rule}`}>
      <div className={`flex items-baseline justify-between gap-4 font-mono text-label uppercase ${t.label}`}>
        <p aria-hidden="true">
          {index} — {label}
        </p>
        {meta && <p>{meta}</p>}
      </div>
      <h2 id={id} className={`mt-5 font-display text-h2 font-normal ${t.title}`}>
        {title}
      </h2>
    </div>
  );
}

SectionHeading.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  meta: PropTypes.node,
  tone: PropTypes.oneOf(["paper", "inverse"]),
};

export default SectionHeading;
