import PropTypes from "prop-types";
import { FiArrowUpRight } from "react-icons/fi";
import ExternalLink from "./ExternalLink";

const VARIANTS = {
  primary: "bg-ink text-canvas hover:bg-ink/85",
  secondary: "border border-line-strong text-ink hover:bg-raised",
};

// Always a link. The before: pseudo-element pads the 40px button to a 44px hit area.
function Button({ href, variant = "primary", external = false, icon = null, children, className = "", ...rest }) {
  const classes = `group/btn relative inline-flex h-10 items-center gap-2 rounded-md px-4 text-small font-medium transition-colors duration-fast ease-out before:absolute before:inset-x-0 before:-inset-y-0.5 focus-visible:shadow-focus focus-visible:outline-none ${VARIANTS[variant]} ${className}`;

  const content = (
    <>
      {icon && <span aria-hidden="true" className="text-base">{icon}</span>}
      {children}
      {external && (
        <FiArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-fast ease-out group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
        />
      )}
    </>
  );

  if (external) {
    return (
      <ExternalLink href={href} className={classes} {...rest}>
        {content}
      </ExternalLink>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}

Button.propTypes = {
  href: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  external: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
