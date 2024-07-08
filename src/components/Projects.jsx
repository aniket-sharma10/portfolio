import React from "react";
import {  PROJECTS } from "../data";
import ProjectCard from "./ProjectCard";

function Projects() {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <h2  className="mt-20 mb-12 text-center text-3xl md:text-4xl">Projects</h2>
    <div className="mt-10 w-[1300px] max-w-[90%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            thumbnail={project.thumbnail}
            githubLink={project.githubLink}
            demoLink={project.demoLink}
          />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Projects;
