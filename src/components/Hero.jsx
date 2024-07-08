import React from "react";
import hero from "../assets/hero.png";
import { Typewriter } from "react-simple-typewriter";

function Hero() {
  return (
    <div className="border-b border-neutral-900 pb-4 px-4 lg:px-16 lg:mb-16">
      <div className="flex flex-wrap ">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="pb-8 md:pb-12 font-thin tracking-tight lg:mt-16 text-4xl sm:text-6xl lg:text-7xl">
              Aniket Sharma
            </h1>
            <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-2xl sm:text-4xl lg:text-5xl tracking-tight text-transparent">
              <Typewriter
                words={["I am a Software Developer."]}
                cursor={true}
                cursorStyle={<span className="text-purple-400">|</span>}
                typeSpeed={40}
                />
            </span>
          </div>
        </div>
        <div className="w-full mt-6 lg:mt-0 lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <img src={hero} className="md:w-[32rem] md:h-[32rem]" alt="Aniket Sharma" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
