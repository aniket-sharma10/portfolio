import PropTypes from "prop-types";
import { FiArrowUpRight } from "react-icons/fi";
import ExternalLink from "./ExternalLink";

function TextLink({ href, external = false, children, className = "", ...rest }) {
  const classes = `group/link rounded-sm text-ink underline decoration-line-strong decoration-1 underline-offset-4 transition-colors duration-base ease-out hover:decoration-accent focus-visible:shadow-focus focus-visible:outline-none ${className}`;

  if (external) {
    return (
      <ExternalLink href={href} className={classes} {...rest}>
        {children}
        <FiArrowUpRight
          aria-hidden="true"
          className="ml-0.5 inline-block h-[0.85em] w-[0.85em] align-[-0.05em] transition-transform duration-fast ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
        />
      </ExternalLink>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}

TextLink.propTypes = {
  href: PropTypes.string.isRequired,
  external: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default TextLink;
