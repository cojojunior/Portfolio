import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { ArrowLeft, Upload, Image, X, Loader2 } from "lucide-react";
import { uploadProjectImage } from "@/lib/supabaseStorage";

const AdminProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject } = useAdmin();
  const isEditing = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const existingProject = projects.find((p) => p.id === Number(id));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    link: "",
    category: "web" as "web" | "graphics" | "mobile",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (existingProject) {
      setFormData({
        title: existingProject.title,
        description: existingProject.description,
        image: existingProject.image,
        tags: existingProject.tags.join(", "),
        link: existingProject.link || "",
        category: existingProject.category,
      });
      if (existingProject.image) {
        setPreviewImage(existingProject.image);
      }
    }
  }, [existingProject]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, WEBP, or SVG)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    setUploading(true);
    setUploadProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const imageUrl = await uploadProjectImage(file);
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (imageUrl) {
        setFormData({ ...formData, image: imageUrl });
        setPreviewImage(imageUrl);
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image. Please try again.");
        setPreviewImage(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading. Please try again.");
      setPreviewImage(null);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: "" });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image for the project.");
      return;
    }

    const projectData = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      link: formData.link || undefined,
      category: formData.category,
    };

    if (isEditing && existingProject) {
      updateProject(existingProject.id, projectData);
    } else {
      addProject(projectData);
    }

    navigate("/admin/projects");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="px-2 sm:px-0">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
        <Link
          to="/admin/projects"
          className="p-1.5 sm:p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </Link>
        <h2 className="text-lg sm:text-2xl font-bold text-white">
          {isEditing ? "Edit Project" : "Add New Project"}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-golden/10 p-3 sm:p-6 space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-navy/50 border border-golden/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
              placeholder="e.g., TaskFlow Web App"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as "web" | "graphics" | "mobile",
                })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-navy/50 border border-golden/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
              required>
              <option value="web">Web</option>
              <option value="graphics">Graphics</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-navy/50 border border-golden/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300 resize-none"
            placeholder="Describe your project..."
            required
          />
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2">
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
          {!previewImage ? (
            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed border-golden/30 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-golden/60 transition-all duration-300 bg-dark-navy/30">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-golden/10 rounded-full">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-golden" />
                </div>
                <div>
                  <p className="text-white text-sm sm:text-base font-medium">
                    Click to upload an image
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    PNG, JPG, GIF, WEBP, SVG (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Preview Area
            <div className="relative rounded-xl overflow-hidden border-2 border-golden/20 bg-dark-navy/30">
              <div className="relative aspect-video">
                <img
                  src={previewImage}
                  alt="Project preview"
                  className="w-full h-full object-contain"
                />
                {uploading && (
                  <div className="absolute inset-0 bg-dark-navy/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-golden animate-spin mb-2" />
                    <p className="text-white text-sm">
                      Uploading... {uploadProgress}%
                    </p>
                    <div className="w-48 h-2 bg-dark-navy/50 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-golden transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="p-1.5 sm:p-2 bg-dark-navy/80 backdrop-blur-sm rounded-lg text-white hover:text-golden transition-all duration-300"
                  title="Change image">
                  <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-1.5 sm:p-2 bg-dark-navy/80 backdrop-blur-sm rounded-lg text-white hover:text-red-500 transition-all duration-300"
                  title="Remove image">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}

          <p className="text-gray-500 text-xs mt-1">
            Image will be stored in Supabase Storage
          </p>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-navy/50 border border-golden/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
            placeholder="e.g., React, TypeScript, Tailwind"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2">
            Project Link (optional)
          </label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-navy/50 border border-golden/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
            placeholder="https://your-project.com"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4 border-t border-golden/10">
          <button
            type="submit"
            disabled={uploading || !formData.image}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-golden text-dark-navy font-semibold rounded-lg sm:rounded-xl hover:bg-golden-dark transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed">
            {isEditing ? "Update Project" : "Add Project"}
          </button>
          <Link
            to="/admin/projects"
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 text-gray-400 font-semibold rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base text-center">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectForm;
