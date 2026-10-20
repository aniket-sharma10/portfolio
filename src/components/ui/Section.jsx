import PropTypes from "prop-types";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const TONES = {
  paper: "bg-paper text-ink",
  surface: "border-y border-line bg-surface text-ink",
  inverse: "bg-inverse text-inverse-fg",
};

const SIZES = {
  default: "py-section",
  lg: "py-section-lg",
};

// scroll-mt-16 keeps anchored headings clear of the 64px sticky nav
function Section({ id, index, label, title, meta = null, tone = "paper", size = "default", children }) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-16 ${TONES[tone]} ${SIZES[size]}`}>
      <Container>
        <SectionHeading
          id={headingId}
          index={index}
          label={label}
          title={title}
          meta={meta}
          tone={tone === "inverse" ? "inverse" : "paper"}
        />
        <div className="mt-12 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  meta: PropTypes.node,
  tone: PropTypes.oneOf(["paper", "surface", "inverse"]),
  size: PropTypes.oneOf(["default", "lg"]),
  children: PropTypes.node.isRequired,
};

export default Section;
