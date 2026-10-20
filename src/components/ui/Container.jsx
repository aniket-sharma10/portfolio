import PropTypes from "prop-types";

function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-container px-gutter ${className}`}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
