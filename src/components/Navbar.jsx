import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SOCIAL_LINKS } from "../data";

function Navbar() {
  return (
    <nav className="mb-20 flex flex-col min-[370px]:flex-row items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <h5
          className={`inline-block py-5 text-2xl sm:text-3xl font-[500]  md:px-4 md:py-0 xl:px-8 `}
        >
          Hello
        </h5>
      </div>
      <div className="my-8 mx-3 sm:mx-8 flex items-center justify-center gap-3 sm:gap-5 text-2xl sm:text-3xl">
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="cursor-pointer">
          <FaGithub />
        </a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="cursor-pointer">
          <FaLinkedin />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
