import PropTypes from "prop-types";

function Tag({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-line px-2 py-1 font-mono text-label uppercase text-ink-2 ${className}`}
    >
      {children}
    </span>
  );
}

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Tag;
