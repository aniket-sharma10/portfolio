import React from "react";
import { ABOUT_TEXT } from "../data/index";

function About() {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <h1 className="mt-12 mb-6 text-center text-3xl md:text-4xl">
        About
        <span className="text-neutral-500"> Me</span>
      </h1>
      <div className="flex flex-wrap">
        <div className="w-full lg:p-8">
          <div className="flex justify-center">
            <p className="my-2 max-w-xl py-6 text-base sm:text-lg md:text-xl">{ABOUT_TEXT}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
