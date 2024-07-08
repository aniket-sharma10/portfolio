import React from "react";
import { BiLogoTailwindCss } from "react-icons/bi";
import { DiJavascript } from "react-icons/di";
import { FaGitAlt, FaNodeJs } from "react-icons/fa";
import { RiReactjsLine, RiTailwindCssFill } from "react-icons/ri";
import { SiCodio, SiCplusplus, SiExpress, SiFirebase, SiMongodb, SiMui, SiMysql, SiRedux, SiTailwindcss } from "react-icons/si";

function Technologies() {
  return (
    <div className="border-b border-neutral-800 pb-24">
        <h1 className="mt-20 mb-12 text-center text-3xl md:text-4xl">Skills</h1>
      <div>
        <h2 className="mt-14 mb-6 text-center text-2xl md:text-3xl">Programming Languages</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <SiCplusplus className="text-5xl text-blue-500" />
          </div>
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <DiJavascript className="text-5xl text-yellow-400" />
          </div>
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <SiCodio className="text-5xl text-blue-500" />
          </div>
        </div>
      </div>
      <div>
        <h2 className="mt-14 mb-6 text-center text-2xl md:text-3xl">Frameworks & Tools</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <RiReactjsLine className="text-5xl text-cyan-400" />
          </div>
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <FaNodeJs className="text-5xl text-green-600" />
          </div>
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <SiExpress className="text-5xl" />
          </div>
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <SiRedux className="text-5xl text-purple-600"/>
          </div>
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <FaGitAlt className="text-5xl text-orange-600"/>
          </div>
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <SiFirebase className="text-5xl text-yellow-500"/>
          </div>
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <SiTailwindcss className="text-5xl text-[#38bdf8]"/>
          </div>
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <SiMui className="text-5xl text-blue-500"/>
          </div>
        </div>
      </div>
      <div>
        <h2 className="mt-14 mb-6 text-center text-2xl md:text-3xl">Database</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <SiMongodb className="text-5xl text-green-500" />
          </div>
          <div className="rounded-2xl border-4 border-neutral-800 p-3">
            <SiMysql className="text-5xl text-[#2c7fa0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Technologies;
