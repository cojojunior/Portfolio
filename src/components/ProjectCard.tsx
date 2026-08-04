import { Project } from "@/types";
import { Calendar, Eye } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const createdDate = formatDate(project.created_at);

  // Determine the link to use
  const getProjectLink = () => {
    if (project.link && project.link !== "#") {
      return project.link;
    }
    return project.image;
  };

  const handleViewProject = () => {
    const link = getProjectLink();
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <div className="group rounded-lg sm:rounded-2xl overflow-hidden bg-white border border-golden/20 shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-golden/50 hover:shadow-[0_8px_30px_rgba(252,163,17,0.12)] h-full flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-golden/10 to-golden/5 flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/img/placeholder.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/10 to-golden/10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
      </div>

      {/* Content */}
      <div className="p-1.5 sm:p-4 md:p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-[8px] sm:text-base md:text-lg font-bold text-dark-navy mb-0.5 sm:mb-2 tracking-tight leading-snug line-clamp-2 min-h-[1.5rem] sm:min-h-[2.5rem]">
          {project.title}
        </h3>

        {/* Created Date */}
        {createdDate && (
          <div className="flex items-center gap-1 text-gray-400 text-[5px] sm:text-xs mb-1 sm:mb-2">
            <Calendar size={10} className="sm:w-3 sm:h-3" />
            <span>Added: {createdDate}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 text-[6px] sm:text-xs md:text-sm leading-relaxed mb-1 sm:mb-3 flex-1 line-clamp-2 sm:line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-0.5 sm:gap-1.5 mb-1 sm:mb-3 min-h-[1.2rem] sm:min-h-[2rem]">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1 sm:px-2.5 py-0.5 sm:py-1 border border-golden/20 rounded-md bg-golden/5 text-dark-navy text-[5px] sm:text-[10px] md:text-xs font-medium transition-all duration-300 group-hover:border-golden group-hover:text-golden group-hover:bg-golden/10 whitespace-nowrap">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1 sm:px-2.5 py-0.5 sm:py-1 text-[5px] sm:text-[10px] text-gray-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* View Project Button - Always visible */}
        <button
          onClick={handleViewProject}
          className="inline-block w-full text-center px-1.5 sm:px-4 py-1 sm:py-2.5 bg-golden text-white font-semibold rounded-lg text-[6px] sm:text-xs md:text-sm transition-all duration-300 hover:bg-golden-dark hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(252,163,17,0.25)] shadow-[0_2px_10px_rgba(252,163,17,0.15)] mt-auto flex items-center justify-center gap-1.5">
          <Eye size={14} className="w-3 h-3 sm:w-4 sm:h-4" />
          View Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
