import PropTypes from "prop-types";
import { FaGithub } from "react-icons/fa";
import ProjectFrame from "./ProjectFrame";
import Button from "./ui/Button";
import Tag from "./ui/Tag";

// The frame's address: the live site's host, or the repo path when there's no demo
const addressOf = ({ demoLink, githubLink }) => {
  const url = new URL(demoLink || githubLink);
  return demoLink ? url.host : `${url.host}${url.pathname.replace(/\/$/, "")}`;
};

// Image `sizes` per variant, matching the grid in Projects.jsx (container max 1200px)
const SIZES = {
  featured: "(min-width: 1024px) 700px, 100vw",
  primary: "(min-width: 768px) 50vw, 100vw",
  compact: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
};

// One project. Featured puts the screenshot beside the text on large screens; primary and compact stack it above.
// No outer box: the screenshot frame is the only container. Actions sit at the bottom so rows line up.
function ProjectCard({ project, variant, latest = false }) {
  const { title, description, tags, thumbnail, thumbnailSrcSet, thumbnailAlt, githubLink, demoLink } = project;
  const featured = variant === "featured";

  return (
    <article
      aria-label={title}
      className={`group/project flex h-full flex-col ${featured ? "lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-12" : ""}`}
    >
      <div className={`min-w-0 ${featured ? "lg:col-span-7" : ""}`}>
        <ProjectFrame
          address={addressOf(project)}
          src={thumbnail}
          srcSet={thumbnailSrcSet}
          sizes={SIZES[variant]}
          alt={thumbnailAlt}
          href={demoLink || undefined}
        />
      </div>

      <div className={`mt-6 flex min-w-0 flex-1 flex-col ${featured ? "lg:col-span-5 lg:mt-0" : ""}`}>
        {latest && <p className="mb-2 font-mono text-label uppercase text-accent">Latest</p>}
        <h3 className={`font-semibold text-ink ${variant === "compact" ? "text-lead" : "text-h3"}`}>{title}</h3>
        <p className="mt-3 max-w-prose text-body text-ink-2">{description}</p>
        <ul role="list" aria-label={`${title} technologies`} className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {demoLink && (
            <Button href={demoLink} external aria-label={`Try now: ${title} (opens in new tab)`}>
              Try now
            </Button>
          )}
          <Button
            href={githubLink}
            variant="secondary"
            external
            icon={<FaGithub />}
            aria-label={`Source: ${title} on GitHub (opens in new tab)`}
          >
            Source
          </Button>
        </div>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    thumbnail: PropTypes.string.isRequired,
    thumbnailSrcSet: PropTypes.string,
    thumbnailAlt: PropTypes.string.isRequired,
    githubLink: PropTypes.string.isRequired,
    demoLink: PropTypes.string,
  }).isRequired,
  variant: PropTypes.oneOf(["featured", "primary", "compact"]).isRequired,
  latest: PropTypes.bool,
};

export default ProjectCard;
