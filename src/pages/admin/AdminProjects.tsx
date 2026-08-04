import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Link } from "react-router-dom";
import { Trash2, Edit, Eye, Plus, FolderOpen, Search } from "lucide-react";

const AdminProjects = () => {
  const { projects, deleteProject } = useAdmin();
  const [filter, setFilter] = useState<"all" | "web" | "graphics">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects
    .filter((p) => filter === "all" || p.category === filter)
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-golden text-dark-navy font-semibold rounded-lg hover:bg-golden-dark transition-all duration-300">
          <Plus className="w-4 h-4" />
          Add New Project
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#1a1f2e] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-golden text-dark-navy"
                : "bg-[#1a1f2e] text-gray-400 hover:bg-gray-700/30"
            }`}>
            All ({projects.length})
          </button>
          <button
            onClick={() => setFilter("web")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === "web"
                ? "bg-golden text-dark-navy"
                : "bg-[#1a1f2e] text-gray-400 hover:bg-gray-700/30"
            }`}>
            Web ({projects.filter((p) => p.category === "web").length})
          </button>
          <button
            onClick={() => setFilter("graphics")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === "graphics"
                ? "bg-golden text-dark-navy"
                : "bg-[#1a1f2e] text-gray-400 hover:bg-gray-700/30"
            }`}>
            Graphics ({projects.filter((p) => p.category === "graphics").length}
            )
          </button>
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#1a1f2e] rounded-xl overflow-hidden border border-gray-700/50 hover:border-golden/30 transition-all duration-300">
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      project.category === "web"
                        ? "bg-green-500/80 text-white"
                        : "bg-purple-500/80 text-white"
                    }`}>
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/projects/edit/${project.id}`}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-300">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <a
                    href={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-golden/20 text-golden rounded-lg hover:bg-golden/30 transition-all duration-300">
                    <Eye className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#1a1f2e] rounded-xl border border-gray-700/50">
          <FolderOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-400 mb-4">
            {filter === "all"
              ? "Start by adding your first project"
              : `No ${filter} projects found`}
          </p>
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-golden text-dark-navy font-semibold rounded-lg hover:bg-golden-dark transition-all duration-300">
            <Plus className="w-4 h-4" />
            Add New Project
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
