import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Project } from "@/types";
import { supabase } from "@/lib/supabase";
import { deleteProjectImage } from "@/lib/supabaseStorage";
import {
  signIn,
  signOut,
  getCurrentUser,
  getSession,
} from "@/lib/supabaseAuth";

interface AdminContextType {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  updateProject: (id: number, project: Partial<Project>) => Promise<void>;
  refreshProjects: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Fallback default projects
const defaultProjects: Project[] = [
  {
    id: 1,
    title: "TaskFlow Web App",
    description: "A real-time organizing aid to help organize your task.",
    image: "/img/TASKFLOW.png",
    tags: ["HTML", "CSS", "JavaScript", "localStorage API", "Notification API"],
    link: "https://task-flow-001.netlify.app",
    category: "web",
  },
  {
    id: 2,
    title: "Design With Cojo",
    description: "A Brand anticipating Greatness !!!",
    image: "/img/meeeee.jpg",
    tags: ["Photoshop", "Lightroom", "CoralDraw"],
    link: "/img/meeeee.jpg",
    category: "graphics",
  },
  {
    id: 3,
    title: "Forinuel Business Enterprise",
    description: "A Reliable solution in getting Legal Document with ease.",
    image: "/img/forinuel.jpg",
    tags: ["Affinity", "CoralDraw", "Photoshop"],
    link: "/img/forinuel.jpg",
    category: "graphics",
  },
  {
    id: 4,
    title: "SAFARI REPLICA",
    description: "Redesigned Safari search with Figma.",
    image: "/img/safari-replica.png",
    tags: ["Figma", "Photoshop", "CoralDraw"],
    link: "/img/safari-replica.png",
    category: "graphics",
  },
  {
    id: 5,
    title: "Naana's Eatery & Bakery",
    description: "Stimulating your Appetite with this Design",
    image: "/img/food.jpg",
    tags: ["Photoshop", "CoralDraw"],
    link: "/img/food.jpg",
    category: "graphics",
  },
  {
    id: 6,
    title: "Big Mama Special Kitchen",
    description: "Stimulating your Appetite with this Design",
    image: "/img/bigmama.jpg",
    tags: ["Photoshop", "CoralDraw"],
    link: "/img/bigmama.jpg",
    category: "graphics",
  },
  {
    id: 7,
    title: "Joy's Glamsy Parlour",
    description: "Beauty to Perfection",
    image: "/img/joy's.jpg",
    tags: ["Photoshop", "CoralDraw"],
    link: "/img/joy's.jpg",
    category: "graphics",
  },
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [supabaseAvailable, setSupabaseAvailable] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession();
        setIsAuthenticated(!!session);
        if (session) {
          const { user } = await getCurrentUser();
          setUser(user);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };
    checkAuth();

    // Listen for auth changes - fixed: removed unused 'event' parameter
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setIsAuthenticated(!!session);
        if (session) {
          const { user } = await getCurrentUser();
          setUser(user);
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Check if Supabase is available
  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const { error } = await supabase
          .from("projects")
          .select("count")
          .limit(1);
        setSupabaseAvailable(!error);
      } catch {
        setSupabaseAvailable(false);
      }
    };
    checkSupabase();
  }, []);

  // Load projects
  const loadProjects = async () => {
    setLoading(true);

    try {
      const saved = localStorage.getItem("portfolio_projects");
      let localProjects: Project[] = [];

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.length > 0) {
            localProjects = parsed;
            setProjects(localProjects);
          }
        } catch (e) {
          console.error("Error parsing saved projects:", e);
        }
      }

      if (supabaseAvailable) {
        try {
          const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) {
            console.error("Supabase error:", error);
            if (localProjects.length === 0) {
              setProjects(defaultProjects);
              localStorage.setItem(
                "portfolio_projects",
                JSON.stringify(defaultProjects),
              );
            }
          } else if (data && data.length > 0) {
            setProjects(data);
            localStorage.setItem("portfolio_projects", JSON.stringify(data));
          } else if (localProjects.length === 0) {
            setProjects(defaultProjects);
            localStorage.setItem(
              "portfolio_projects",
              JSON.stringify(defaultProjects),
            );
          }
        } catch (error) {
          console.error("Error loading from Supabase:", error);
          if (localProjects.length === 0) {
            setProjects(defaultProjects);
            localStorage.setItem(
              "portfolio_projects",
              JSON.stringify(defaultProjects),
            );
          }
        }
      } else if (localProjects.length === 0) {
        setProjects(defaultProjects);
        localStorage.setItem(
          "portfolio_projects",
          JSON.stringify(defaultProjects),
        );
      }
    } catch (error) {
      console.error("Error in loadProjects:", error);
      setProjects(defaultProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [supabaseAvailable]);

  const refreshProjects = async () => {
    await loadProjects();
  };

  const login = async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (result.success) {
      setIsAuthenticated(true);
      const { user } = await getCurrentUser();
      setUser(user);
    }
    return result;
  };

  const logout = async () => {
    await signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  const addProject = async (project: Omit<Project, "id">) => {
    const newProject = {
      ...project,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem("portfolio_projects", JSON.stringify(updatedProjects));

    if (supabaseAvailable) {
      try {
        const { error } = await supabase.from("projects").insert([
          {
            title: project.title,
            description: project.description,
            image: project.image,
            tags: project.tags,
            link: project.link || null,
            category: project.category,
          },
        ]);

        if (error) {
          console.error("Supabase insert error:", error);
        } else {
          await loadProjects();
        }
      } catch (error) {
        console.error("Error adding to Supabase:", error);
      }
    }
  };

  const deleteProject = async (id: number) => {
    const projectToDelete = projects.find((p) => p.id === id);

    if (
      projectToDelete?.image &&
      projectToDelete.image.includes("supabase.co")
    ) {
      await deleteProjectImage(projectToDelete.image);
    }

    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("portfolio_projects", JSON.stringify(updatedProjects));

    if (supabaseAvailable) {
      try {
        const { error } = await supabase.from("projects").delete().eq("id", id);

        if (error) {
          console.error("Supabase delete error:", error);
        }
      } catch (error) {
        console.error("Error deleting from Supabase:", error);
      }
    }
  };

  const updateProject = async (id: number, updatedData: Partial<Project>) => {
    const updatedProjects = projects.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p,
    );
    setProjects(updatedProjects);
    localStorage.setItem("portfolio_projects", JSON.stringify(updatedProjects));

    if (supabaseAvailable) {
      try {
        const { error } = await supabase
          .from("projects")
          .update({
            title: updatedData.title,
            description: updatedData.description,
            image: updatedData.image,
            tags: updatedData.tags,
            link: updatedData.link || null,
            category: updatedData.category,
          })
          .eq("id", id);

        if (error) {
          console.error("Supabase update error:", error);
        } else {
          await loadProjects();
        }
      } catch (error) {
        console.error("Error updating in Supabase:", error);
      }
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        projects,
        addProject,
        deleteProject,
        updateProject,
        refreshProjects,
      }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
