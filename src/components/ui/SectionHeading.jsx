import PropTypes from "prop-types";

// Optional meta (e.g. "6 projects") sits on the rule, opposite the title
function SectionHeading({ id, title, meta = null }) {
  return (
    <div className="flex items-end justify-between gap-6 border-t border-line pt-6">
      <h2 id={id} className="font-display text-h2 font-normal text-ink">
        {title}
      </h2>
      {meta && <p className="shrink-0 pb-1 font-mono text-label uppercase text-ink-3">{meta}</p>}
    </div>
  );
}

SectionHeading.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  meta: PropTypes.node,
};

export default SectionHeading;
