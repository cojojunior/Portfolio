// src/context/ServiceContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Service } from "@/types";
import { supabase } from "@/lib/supabase";

interface ServiceContextType {
  services: Service[];
  loading: boolean;
  addService: (service: Omit<Service, "id">) => Promise<void>;
  deleteService: (id: number) => Promise<void>;
  updateService: (id: number, service: Partial<Service>) => Promise<void>;
  refreshServices: () => Promise<void>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

// ✅ Default services - Only 3
const defaultServices: Service[] = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Modern, responsive, and performant web applications built with React, TypeScript, and Tailwind CSS.",
    icon: "Code2",
    features: [
      "React / Next.js",
      "TypeScript",
      "Responsive Design",
      "Performance Optimization",
      "API Integration",
      "Tailwind CSS",
    ],
    category: "frontend",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive, and user-centered designs that deliver exceptional user experiences.",
    icon: "Palette",
    features: [
      "Wireframing & Prototyping",
      "User Research",
      "User Flow Design",
      "Interactive Prototypes",
      "Usability Testing",
      "Design Systems",
    ],
    category: "uiux",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Graphic Design",
    description:
      "Eye-catching visual designs that communicate your brand message effectively.",
    icon: "Brush",
    features: [
      "Logo Design",
      "Brand Identity",
      "Social Media Graphics",
      "Marketing Materials",
      "Print Design",
      "Photo Editing",
    ],
    category: "graphics",
    created_at: new Date().toISOString(),
  },
];

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [supabaseAvailable, setSupabaseAvailable] = useState(false);

  // Check if Supabase is available
  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const { error } = await supabase
          .from("services")
          .select("count")
          .limit(1);
        setSupabaseAvailable(!error);
      } catch {
        setSupabaseAvailable(false);
      }
    };
    checkSupabase();
  }, []);

  // Load services
  const loadServices = async () => {
    setLoading(true);

    try {
      const saved = localStorage.getItem("portfolio_services");
      let localServices: Service[] = [];

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.length > 0) {
            localServices = parsed;
            setServices(localServices);
          }
        } catch (e) {
          console.error("Error parsing saved services:", e);
        }
      }

      if (supabaseAvailable) {
        try {
          const { data, error } = await supabase
            .from("services")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) {
            console.error("Supabase error:", error);
            if (localServices.length === 0) {
              setServices(defaultServices);
              localStorage.setItem(
                "portfolio_services",
                JSON.stringify(defaultServices),
              );
            }
          } else if (data && data.length > 0) {
            setServices(data);
            localStorage.setItem("portfolio_services", JSON.stringify(data));
          } else if (localServices.length === 0) {
            setServices(defaultServices);
            localStorage.setItem(
              "portfolio_services",
              JSON.stringify(defaultServices),
            );
          }
        } catch (error) {
          console.error("Error loading from Supabase:", error);
          if (localServices.length === 0) {
            setServices(defaultServices);
            localStorage.setItem(
              "portfolio_services",
              JSON.stringify(defaultServices),
            );
          }
        }
      } else if (localServices.length === 0) {
        setServices(defaultServices);
        localStorage.setItem(
          "portfolio_services",
          JSON.stringify(defaultServices),
        );
      }
    } catch (error) {
      console.error("Error in loadServices:", error);
      setServices(defaultServices);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [supabaseAvailable]);

  const refreshServices = async () => {
    await loadServices();
  };

  const addService = async (service: Omit<Service, "id">) => {
    const newService = {
      ...service,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };

    const updatedServices = [newService, ...services];
    setServices(updatedServices);
    localStorage.setItem("portfolio_services", JSON.stringify(updatedServices));

    if (supabaseAvailable) {
      try {
        const { error } = await supabase.from("services").insert([
          {
            title: service.title,
            description: service.description,
            icon: service.icon,
            image: service.image || null,
            features: service.features,
            price: service.price || null,
            category: service.category,
          },
        ]);

        if (error) {
          console.error("Supabase insert error:", error);
        } else {
          await loadServices();
        }
      } catch (error) {
        console.error("Error adding to Supabase:", error);
      }
    }
  };

  const deleteService = async (id: number) => {
    const updatedServices = services.filter((s) => s.id !== id);
    setServices(updatedServices);
    localStorage.setItem("portfolio_services", JSON.stringify(updatedServices));

    if (supabaseAvailable) {
      try {
        const { error } = await supabase.from("services").delete().eq("id", id);
        if (error) {
          console.error("Supabase delete error:", error);
        }
      } catch (error) {
        console.error("Error deleting from Supabase:", error);
      }
    }
  };

  const updateService = async (id: number, updatedData: Partial<Service>) => {
    const updatedServices = services.map((s) =>
      s.id === id ? { ...s, ...updatedData } : s,
    );
    setServices(updatedServices);
    localStorage.setItem("portfolio_services", JSON.stringify(updatedServices));

    if (supabaseAvailable) {
      try {
        const { error } = await supabase
          .from("services")
          .update({
            title: updatedData.title,
            description: updatedData.description,
            icon: updatedData.icon,
            image: updatedData.image || null,
            features: updatedData.features,
            price: updatedData.price || null,
            category: updatedData.category,
          })
          .eq("id", id);

        if (error) {
          console.error("Supabase update error:", error);
        } else {
          await loadServices();
        }
      } catch (error) {
        console.error("Error updating in Supabase:", error);
      }
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        loading,
        addService,
        deleteService,
        updateService,
        refreshServices,
      }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};
