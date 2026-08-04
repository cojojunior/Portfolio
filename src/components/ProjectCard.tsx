import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group rounded-lg sm:rounded-2xl overflow-hidden bg-white transition-all duration-150 hover:border-black/10 hover:shadow-[0_8px_30px_rgba(252,163,17,0.12)] h-full flex flex-col">
      {/* Image - Smaller aspect ratio */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-golden/10 to-golden/5 flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/10 to-golden/10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
      </div>

      {/* Content - Compact */}
      <div className="p-1.5 sm:p-4 md:p-6 flex flex-col flex-1">
        {/* Title - Smaller */}
        <h3 className="text-[8px] sm:text-base md:text-lg font-bold text-dark-navy mb-0.5 sm:mb-2 tracking-tight leading-snug line-clamp-2 min-h-[1.rem] sm:min-h-[2.5rem]">
          {project.title}
        </h3>

        {/* Description - Smaller */}
        <p className="text-gray-600 text-[6px] sm:text-xs md:text-sm leading-relaxed mb-1 sm:mb-3 flex-1 line-clamp-2 sm:line-clamp-3">
          {project.description}
        </p>

        {/* Tags - Compact */}
        <div className="flex flex-wrap gap-0.5 sm:gap-1.5 mb-1 sm:mb-23 min-h-[0.5rem] sm:min-h-[1.5rem]">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 border border-golden/10 rounded-md bg-dark-navy/5 text-dark-navy text-[5px] sm:text-[10px] md:text-xs font-medium transition-all duration-100 group-hover:border-golden/10 group-hover:text-black group-hover:bg-golden/2 whitespace-nowrap">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1 sm:px-2.5 py-0.5 sm:py-1 text-[5px] sm:text-[10px] text-gray-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Button - Compact */}
        {project.link && project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center px-1.5 sm:px-4 py-1 sm:py-2.5 bg-golden text-white font-semibold rounded-lg text-[6px] sm:text-xs md:text-sm transition-all duration-300 hover:bg-golden-dark hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(252,163,17,0.25)] shadow-[0_2px_10px_rgba(252,163,17,0.15)] mt-auto">
            View Project
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
