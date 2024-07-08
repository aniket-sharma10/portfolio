import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

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
        <a href="https://github.com/aniket-sharma10" target="_blank" className="cursor-pointer">
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/aniket-sharmaa10" target="_blank"
          className="cursor-pointer"
        >
          <FaLinkedin />
        </a>
        <a href="https://x.com/aniket_sharmaa_" target="_blank" className="cursor-pointer">
          <FaSquareXTwitter />
        </a>
        <a href="https://www.instagram.com/aniket.priv/" target="_blank" className="cursor-pointer">
          <FaInstagram />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
