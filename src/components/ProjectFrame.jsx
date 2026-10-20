import PropTypes from "prop-types";
import ExternalLink from "./ui/ExternalLink";

// Shared screenshot frame: a slim bar with the project's address, then the screenshot at 16:10 so light and dark
// UIs read as one set. It reacts to hover on the parent card (group/project) with a violet border, a soft glow and
// a slight zoom. With `href` (the live demo) the whole frame is a link. It's skipped in tab order because the
// card's "Try now" button goes to the same place, but screen readers still get it, named "Open live site:" plus
// the address and the screenshot's alt text, then "(opens in new tab)".
function ProjectFrame({ address, src, srcSet = undefined, sizes, alt, href = undefined }) {
  const frameClass =
    "block overflow-hidden rounded-lg border border-line bg-raised transition-[border-color,box-shadow] duration-slow ease-out group-hover/project:border-accent/50 group-hover/project:shadow-glow";

  const content = (
    <>
      <div className="flex h-8 items-center gap-2 border-b border-line px-3">
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong" />
        <span className="truncate font-mono text-label text-ink-2">{address}</span>
      </div>
      <div className="aspect-shot overflow-hidden bg-surface">
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={alt}
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-slow ease-out group-hover/project:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
        />
      </div>
    </>
  );

  if (!href) return <div className={frameClass}>{content}</div>;

  return (
    <ExternalLink href={href} tabIndex={-1} className={frameClass}>
      <span className="sr-only">Open live site: </span>
      {content}
    </ExternalLink>
  );
}

ProjectFrame.propTypes = {
  address: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  sizes: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  href: PropTypes.string,
};

export default ProjectFrame;
