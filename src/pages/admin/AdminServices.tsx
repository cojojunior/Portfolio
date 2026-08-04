// src/pages/admin/AdminServices.tsx
import { useState } from "react";
import { useServices } from "@/context/ServiceContext";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Code2, Palette, Brush} from "lucide-react";

// ✅ Only 3 icons for your services
const iconMap: Record<string, any> = {
  Code2,
  Palette,
  Brush,
};

const AdminServices = () => {
  const { services, deleteService } = useServices();
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Code2;
  };

  const handleDelete = async (id: number) => {
    await deleteService(id);
    setShowDeleteModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Services</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your services and offerings
          </p>
        </div>
        <Link
          to="/admin/services/new"
          className="flex items-center gap-2 px-4 py-2 bg-golden text-dark-navy rounded-lg hover:bg-golden-dark transition-all duration-300 font-medium">
          <Plus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      {/* Services Grid */}
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.id}
                className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 hover:border-golden/30 transition-all duration-300 group">
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-golden/20 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-golden" />
                </div>

                {/* Content */}
                <h3 className="text-white font-semibold text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                  {service.description}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-700/30 text-gray-300 rounded-md text-xs">
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/30 text-gray-300 rounded-md text-xs">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Category Badge & Actions */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      service.category === "frontend"
                        ? "bg-blue-500/20 text-blue-400"
                        : service.category === "uiux"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-pink-500/20 text-pink-400"
                    }`}>
                    {service.category === "frontend"
                      ? "Frontend"
                      : service.category === "uiux"
                        ? "UI/UX"
                        : "Graphics"}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Link
                      to={`/admin/services/edit/${service.id}`}
                      className="p-2 text-gray-400 hover:text-golden hover:bg-golden/10 rounded-lg transition-all duration-300">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setShowDeleteModal(service.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-12 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gray-700/30 flex items-center justify-center mb-4">
            <Plus className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">
            No Services Yet
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Start adding your services to showcase your offerings.
          </p>
          <Link
            to="/admin/services/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-golden text-dark-navy rounded-lg hover:bg-golden-dark transition-all duration-300 font-medium">
            <Plus className="w-4 h-4" />
            Add Your First Service
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 max-w-md w-full">
            <h3 className="text-white font-semibold text-lg mb-2">
              Delete Service
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to delete this service? This action cannot
              be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
