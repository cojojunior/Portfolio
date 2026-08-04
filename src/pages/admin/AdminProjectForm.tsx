// src/pages/admin/AdminProjectForm.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Project } from "@/types";
import {
  ArrowLeft,
  Save,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const categoryOptions = [
  { value: "web", label: "Web Development" },
  { value: "graphics", label: "Graphics Design" },
];

const AdminProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject, deleteProject } = useAdmin();
  const isEditing = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
          category: project.category,
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

  // ✅ Upload image to Supabase Storage
  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      setUploadProgress(0);

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("project-images") // Your bucket name
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      setUploadProgress(100);

      // Get public URL
      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    } finally {
      setUploadingImage(false);
      setUploadProgress(0);
    }
  };

  // ✅ Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, WEBP, or SVG)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    // Show local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    const publicUrl = await uploadImageToSupabase(file);

    if (publicUrl) {
      setFormData({
        ...formData,
        image: publicUrl,
      });
    } else {
      alert("Failed to upload image. Please try again.");
      // Reset preview if upload failed
      setImagePreview(formData.image || "");
    }
  };

  // ✅ Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ Remove image
  const handleRemoveImage = () => {
    setImagePreview("");
    setFormData({ ...formData, image: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Image *
          </label>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Upload Area */}
          {!imagePreview ? (
            <div
              onClick={handleUploadClick}
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-golden transition-all duration-300 group">
              <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3 group-hover:text-golden transition-all duration-300" />
              <p className="text-gray-400 text-sm">Click to upload an image</p>
              <p className="text-gray-500 text-xs mt-1">
                PNG, JPG, GIF, WEBP, SVG (Max 5MB)
              </p>
              <button
                type="button"
                onClick={handleUploadClick}
                className="mt-3 px-4 py-2 bg-golden/20 text-golden rounded-lg hover:bg-golden/30 transition-all duration-300 text-sm">
                Choose File
              </button>
            </div>
          ) : (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg border border-gray-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.jpg";
                }}
              />
              {/* Upload Progress */}
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-golden border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-white text-sm">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                </div>
              )}
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="p-1.5 bg-golden/90 text-dark-navy rounded-lg hover:bg-golden transition-all duration-300"
                  title="Change image">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-1.5 bg-red-500/90 text-white rounded-lg hover:bg-red-500 transition-all duration-300"
                  title="Remove image">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Image URL (hidden, auto-filled) */}
          <input type="hidden" name="image" value={formData.image} />
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
            disabled={loading || uploadingImage}
            className="flex items-center gap-2 px-6 py-2 bg-golden text-dark-navy rounded-lg hover:bg-golden-dark transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            <Save className="w-4 h-4" />
            {uploadingImage
              ? "Uploading Image..."
              : loading
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
