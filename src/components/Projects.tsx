import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import ProjectCard from "./ProjectCard";
import { ArrowRight } from "lucide-react";

const Projects = () => {
  const [filter, setFilter] = useState<"all" | "web" | "graphics">("all");
  const { projects, loading, refreshProjects } = useAdmin();

  useEffect(() => {
    refreshProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );

  // Show only first 6 projects on home page
  const displayedProjects = filteredProjects.slice(0, 6);

  if (loading) {
    return (
      <section className="min-h-[20vh] flex items-center justify-center px-2 sm:px-6 lg:px-8 py-2 sm:py-12 bg-white my-[5px]">
        <div className="text-center">
          <div className="animate-pulse text-gray-400">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="min-h-[10vh] flex items-center justify-center px-2 sm:px-6 lg:px-8 py-5 sm:py-12 bg-white my-[5px]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-row items-center justify-between gap-1.5 sm:gap-6 mb-2 sm:mb-8">
          <div className="flex items-center gap-1 sm:gap-4">
            <span className="w-0.5 sm:w-1 h-1.5 sm:h-5 bg-golden rounded-full" />
            <h2 className="text-sm sm:text-4xl lg:text-5xl font-extrabold text-dark-navy tracking-tight">
              Featured Projects
            </h2>
          </div>

          <div className="flex gap-1 sm:gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-1.5 sm:px-5 py-0.5 sm:py-2 rounded-full text-[5px] sm:text-sm font-medium transition-all duration-300 ${
                filter === "all"
                  ? "bg-golden text-white shadow-[0_0_20px_rgba(252,163,17,0.3)]"
                  : "border border-golden/30 text-dark-navy hover:text-golden hover:border-golden"
              }`}>
              All
            </button>
            <button
              onClick={() => setFilter("web")}
              className={`px-1.5 sm:px-5 py-0.5 sm:py-2 rounded-full text-[5px] sm:text-sm font-medium transition-all duration-300 ${
                filter === "web"
                  ? "bg-golden text-white shadow-[0_0_20px_rgba(252,163,17,0.3)]"
                  : "border border-golden/30 text-dark-navy hover:text-golden hover:border-golden"
              }`}>
              Web
            </button>
            <button
              onClick={() => setFilter("graphics")}
              className={`px-1.5 sm:px-5 py-0.5 sm:py-2 rounded-full text-[5px] sm:text-sm font-medium transition-all duration-300 ${
                filter === "graphics"
                  ? "bg-golden text-white shadow-[0_0_20px_rgba(252,163,17,0.3)]"
                  : "border border-golden/30 text-dark-navy hover:text-golden hover:border-golden"
              }`}>
              Graphics
            </button>
          </div>
        </div>

        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 lg:gap-6">
            {displayedProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-zoom-in"
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
          <div className="text-center py-12">
            <p className="text-gray-400">No projects found.</p>
          </div>
        )}

        <div className="text-center mt-2 sm:mt-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 sm:gap-3 px-3 sm:px-8 py-1 sm:py-4 bg-golden text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-golden-dark hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(252,163,17,0.4)] shadow-[0_4px_20px_rgba(252,163,17,0.3)] group text-[8px] sm:text-base">
            <span>View All Projects</span>
            <ArrowRight
              size={12}
              className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
