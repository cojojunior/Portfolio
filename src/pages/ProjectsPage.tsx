import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

const ProjectsPage = () => {
  const [filter, setFilter] = useState<"web" | "graphics">("web");

  const filteredProjects = projects.filter(
    (project) => project.category === filter,
  );

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 pt-28 pb-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-1 h-8 bg-golden rounded-full" />
            <span className="text-golden text-sm font-bold tracking-wider uppercase">
              Portfolio
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-navy tracking-tight mb-4">
            All Projects
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A showcase of my work in web development and graphic design.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter("web")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "web"
                ? "bg-golden text-white shadow-[0_0_20px_rgba(252,163,17,0.3)]"
                : "border border-golden/30 text-dark-navy hover:text-golden hover:border-golden"
            }`}>
            Web Design
          </button>
          <button
            onClick={() => setFilter("graphics")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "graphics"
                ? "bg-golden text-white shadow-[0_0_20px_rgba(252,163,17,0.3)]"
                : "border border-golden/30 text-dark-navy hover:text-golden hover:border-golden"
            }`}>
            Graphic Design
          </button>
        </div>

        {/* Projects Grid with equal height cards */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-zoom-in h-full"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards",
                }}>
                <div className="transition-transform duration-300 ease-in-out hover:scale-[1.02] h-full">
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-dark-navy mb-2">
              No projects found
            </h3>
            <p className="text-gray-600">
              Check back later for new projects in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
