// src/pages/admin/AdminProjectForm.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Project } from "@/types";
import { ArrowLeft, Save, Trash2, X } from "lucide-react";

const categoryOptions = [
  { value: "web", label: "Web Development" },
  { value: "graphics", label: "Graphics Design" },
  // ✅ REMOVED "mobile" from here since it's not in the Project type
];

const AdminProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject, deleteProject } = useAdmin();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    image: "",
    tags: [],
    link: "",
    category: "web",
  });

  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Load project data if editing
  useEffect(() => {
    if (isEditing && id) {
      const project = projects.find((p) => p.id === parseInt(id));
      if (project) {
        setFormData({
          title: project.title,
          description: project.description,
          image: project.image,
          tags: project.tags || [],
          link: project.link || "",
          category: project.category, // ✅ This will be "web" or "graphics"
        });
        setImagePreview(project.image);
      }
    }
  }, [id, projects, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({
      ...formData,
      image: url,
    });
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && id) {
        const existingProject = projects.find((p) => p.id === parseInt(id));
        if (existingProject) {
          const projectData = {
            ...formData,
            id: existingProject.id,
          };
          await updateProject(existingProject.id, projectData);
        }
      } else {
        await addProject(formData);
      }
      navigate("/admin/projects");
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      isEditing &&
      id &&
      confirm("Are you sure you want to delete this project?")
    ) {
      try {
        await deleteProject(parseInt(id));
        navigate("/admin/projects");
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/projects")}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/30 rounded-lg transition-all duration-300">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? "Edit Project" : "Add New Project"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {isEditing
                ? "Update your project details"
                : "Create a new project to showcase"}
            </p>
          </div>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all duration-300">
            <Trash2 className="w-4 h-4" />
            Delete Project
          </button>
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
              placeholder="e.g., TaskFlow Web App"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300">
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
            placeholder="Describe your project..."
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Image URL *
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleImageChange}
              className="flex-1 px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          {imagePreview && (
            <div className="mt-3 relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.jpg";
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  setFormData({ ...formData, image: "" });
                }}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTag()}
              className="flex-1 px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
              placeholder="Add a tag (e.g., React)"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-golden text-dark-navy rounded-lg hover:bg-golden-dark transition-all duration-300 font-medium">
              Add
            </button>
          </div>

          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-700/30 text-gray-300 rounded-lg text-sm">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-gray-500 hover:text-red-400 transition-all duration-300">
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Project Link */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Link (Optional)
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
            placeholder="https://your-project.com"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-700/50">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="px-4 py-2 text-gray-400 hover:text-white transition-all duration-300">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-golden text-dark-navy rounded-lg hover:bg-golden-dark transition-all duration-300 font-medium disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading
              ? "Saving..."
              : isEditing
                ? "Update Project"
                : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectForm;
