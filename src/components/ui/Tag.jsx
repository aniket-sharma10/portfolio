import PropTypes from "prop-types";

// A pill: hairline border at rest; on hover the border turns into the accent → accent-2 gradient and the pill
// lifts 2px. The gradient sits on a layer under a 1px inset, so its opacity can transition.
function Tag({ children, className = "", style }) {
  return (
    <span
      style={style}
      className={`group/pill relative inline-flex rounded-full bg-line p-px transition-transform duration-fast ease-out hover:-translate-y-0.5 motion-reduce:transform-none ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2 opacity-0 transition-opacity duration-base ease-out group-hover/pill:opacity-100"
      />
      <span className="relative rounded-full bg-surface px-3 py-1 font-mono text-label uppercase text-ink-2 transition-colors duration-base ease-out group-hover/pill:text-ink">
        {children}
      </span>
    </span>
  );
}

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Tag;
