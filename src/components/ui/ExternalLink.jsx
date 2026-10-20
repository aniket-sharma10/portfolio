import PropTypes from "prop-types";

// Opens in a new tab and tells screen readers so. If you pass aria-label, include the new-tab note in it.
function ExternalLink({ href, children, className = "", ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ExternalLink;
