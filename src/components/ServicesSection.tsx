// src/components/ServicesSection.tsx
import { useServices } from "@/context/ServiceContext";
import { Code2, Palette, Brush } from "lucide-react";

// Only 3 icons
const iconMap: Record<string, any> = {
  Code2,
  Palette,
  Brush,
};

const ServicesSection = () => {
  const { services, loading } = useServices();

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Code2;
    return <Icon className="w-6 h-6 md:w-8 md:h-8 text-golden" />;
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-[#0d1117]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Loading Services...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-1 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-dark-navy mt-2 md:mt-3 mb-2 md:mb-4">
            My <span className="text-golden">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs md:text-base px-2">
            I offer a wide range of services to help you build your online
            presence and grow your business.
          </p>
        </div>

        {/* Services Grid - 3 columns on ALL screen sizes */}
        <div className="grid grid-cols-3 gap-2 md:gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white/10 rounded-lg md:rounded-xl p-3 md:p-8 border border-gray-700/50 hover:border-golden/30 transition-all duration-300 group hover:shadow-lg hover:shadow-golden/5">
              {/* Icon - Smaller on mobile */}
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg bg-golden/20 flex items-center justify-center mb-2 md:mb-5 group-hover:bg-golden/30 transition-all duration-300">
                {getIcon(service.icon)}
              </div>

              {/* Title - Smaller on mobile */}
              <h3 className="text-xs md:text-xl font-semibold text-dark-navy mb-1 md:mb-3 group-hover:text-golden transition-all duration-300 line-clamp-2">
                {service.title}
              </h3>

              {/* Description - Hidden on mobile, show on tablet+ */}
              <p className="hidden sm:block text-gray-200 text-sm leading-relaxed mb-4 line-clamp-3">
                {service.description}
              </p>

              {/* Description - Short version for mobile */}
              <p className="sm:hidden text-gray-400 text-[10px] leading-relaxed mb-2 line-clamp-2">
                {service.description}
              </p>

              {/* Features - Smaller on mobile */}
              {service.features && service.features.length > 0 && (
                <div className="flex flex-wrap gap-1 md:gap-1.5">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 md:px-2.5 py-0.5 bg-gray-700/30 text-gray-300 rounded text-[8px] md:text-xs">
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 2 && (
                    <span className="px-1.5 md:px-2.5 py-0.5 bg-gray-700/30 text-gray-300 rounded text-[8px] md:text-xs">
                      +{service.features.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* Price - Smaller on mobile */}
              {service.price && (
                <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t border-gray-700/50">
                  <span className="text-golden font-semibold text-xs md:text-base">
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
