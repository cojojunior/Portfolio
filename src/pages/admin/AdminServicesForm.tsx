// src/pages/admin/AdminServiceForm.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useServices } from "@/context/ServiceContext";
import { Code2, Palette, Brush, ArrowLeft, Save } from "lucide-react";

// ✅ Only 3 icons
const iconOptions = [
  { value: "Code2", label: "Code (Frontend)", icon: Code2 },
  { value: "Palette", label: "Palette (UI/UX)", icon: Palette },
  { value: "Brush", label: "Brush (Graphics)", icon: Brush },
];

// ✅ Only 3 categories
const categoryOptions = [
  { value: "frontend", label: "Frontend Development" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "graphics", label: "Graphic Design" },
];

// ✅ Define the Service type locally or import from types
type ServiceCategory = "frontend" | "uiux" | "graphics";

interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  price: string;
  category: ServiceCategory; // ✅ Use the union type
}

const AdminServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, addService, updateService } = useServices();
  const isEditing = !!id;

  // ✅ Use the proper type for formData
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    description: "",
    icon: "Code2",
    image: "",
    features: [],
    price: "",
    category: "frontend",
  });

  const [featureInput, setFeatureInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load service data if editing
  useEffect(() => {
    if (isEditing && id) {
      const service = services.find((s) => s.id === parseInt(id));
      if (service) {
        setFormData({
          title: service.title,
          description: service.description,
          icon: service.icon,
          image: service.image || "",
          features: service.features || [],
          price: service.price || "",
          // ✅ Cast to the correct type
          category: service.category as ServiceCategory,
        });
      }
    }
  }, [id, services, isEditing]);

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

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && id) {
        await updateService(parseInt(id), formData);
      } else {
        await addService(formData);
      }
      navigate("/admin/services");
    } catch (error) {
      console.error("Error saving service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/services")}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/30 rounded-lg transition-all duration-300">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? "Edit Service" : "Add New Service"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {isEditing
              ? "Update your service details"
              : "Create a new service to showcase"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Service Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
              placeholder="e.g., Frontend Development"
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

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Icon *
            </label>
            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300">
              {iconOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price (Optional)
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
              placeholder="e.g., $500 - $2000"
            />
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
            placeholder="Describe your service..."
            required
          />
        </div>

        {/* Image URL (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Image URL (Optional)
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Features
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addFeature()}
              className="flex-1 px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
              placeholder="Add a feature (e.g., Responsive Design)"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-golden text-dark-navy rounded-lg hover:bg-golden-dark transition-all duration-300 font-medium">
              Add
            </button>
          </div>

          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-700/30 text-gray-300 rounded-lg text-sm">
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-gray-500 hover:text-red-400 transition-all duration-300">
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-700/50">
          <button
            type="button"
            onClick={() => navigate("/admin/services")}
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
                ? "Update Service"
                : "Add Service"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminServiceForm;
