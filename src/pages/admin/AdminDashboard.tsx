import { useAdmin } from "@/context/AdminContext";
import { Link } from "react-router-dom";
import { FolderOpen, Plus, TrendingUp, Users } from "lucide-react";

const AdminDashboard = () => {
  const { projects } = useAdmin();

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: FolderOpen,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Web Projects",
      value: projects.filter((p) => p.category === "web").length,
      icon: TrendingUp,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Graphics Projects",
      value: projects.filter((p) => p.category === "graphics").length,
      icon: Users,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Add New",
      value: "+",
      icon: Plus,
      color: "bg-golden/20 text-golden",
      link: "/admin/projects/new",
    },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back, Admin! Here's what's happening with your projects.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
            Live
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link || "#"}
            className={`bg-[#1a1f2e] backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-golden/30 transition-all duration-300 ${
              stat.link
                ? "cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-golden/5"
                : "cursor-default"
            }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* All Projects - FIXED: Removed .slice(0, 5) to show ALL projects */}
      <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">All Projects</h3>
          <Link
            to="/admin/projects"
            className="text-golden hover:text-golden-dark text-sm transition-all duration-300">
            View All →
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left text-gray-400 text-sm font-medium py-3">
                    Project
                  </th>
                  <th className="text-left text-gray-400 text-sm font-medium py-3">
                    Category
                  </th>
                  <th className="text-left text-gray-400 text-sm font-medium py-3">
                    Date
                  </th>
                  <th className="text-left text-gray-400 text-sm font-medium py-3">
                    Status
                  </th>
                  <th className="text-right text-gray-400 text-sm font-medium py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* 🔥 FIXED: Removed .slice(0, 5) to show ALL projects */}
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-all duration-300">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-700/50 flex-shrink-0">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder.jpg";
                            }}
                          />
                        </div>
                        <span className="text-white font-medium text-sm line-clamp-1">
                          {project.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          project.category === "web"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-purple-500/20 text-purple-400"
                        }`}>
                        {project.category}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400 text-sm">
                      {formatDate(project.created_at)}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                        Active
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        to={`/admin/projects/edit/${project.id}`}
                        className="text-golden hover:text-golden-dark text-sm transition-all duration-300">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              No projects yet.{" "}
              <Link
                to="/admin/projects/new"
                className="text-golden hover:underline">
                Add your first project
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
