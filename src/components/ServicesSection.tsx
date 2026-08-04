// src/components/ServicesSection.tsx
import { useServices } from "@/context/ServiceContext";
import { Code2, Palette, Brush } from "lucide-react";

// ✅ Only 3 icons
const iconMap: Record<string, any> = {
  Code2,
  Palette,
  Brush,
};

const ServicesSection = () => {
  const { services, loading } = useServices();

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Code2;
    return <Icon className="w-8 h-8 text-golden" />;
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#0d1117]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Loading Services...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#0d1117] relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-golden/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-golden text-sm font-semibold uppercase tracking-wider">
            What I Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            My <span className="text-golden">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I offer a wide range of services to help you build your online
            presence and grow your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#1a1f2e] rounded-xl p-8 border border-gray-700/50 hover:border-golden/30 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:shadow-golden/5">
              {/* Icon */}
              <div className="w-16 h-16 rounded-lg bg-golden/10 flex items-center justify-center mb-5 group-hover:bg-golden/20 transition-all duration-300">
                {getIcon(service.icon)}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-golden transition-all duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 bg-gray-700/30 text-gray-300 rounded-md text-xs">
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 4 && (
                    <span className="px-2.5 py-0.5 bg-gray-700/30 text-gray-300 rounded-md text-xs">
                      +{service.features.length - 4}
                    </span>
                  )}
                </div>
              )}

              {/* Price (if available) */}
              {service.price && (
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <span className="text-golden font-semibold">
                    {service.price}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
