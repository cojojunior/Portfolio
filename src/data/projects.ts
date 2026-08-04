import { Project } from "@/types";

// Default projects
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

// Function to get projects from localStorage or defaults
export const getProjects = (): Project[] => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return defaultProjects;
  }

  try {
    const saved = localStorage.getItem("portfolio_projects");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading projects from localStorage:", e);
  }

  // If no saved projects or error, save defaults
  try {
    localStorage.setItem("portfolio_projects", JSON.stringify(defaultProjects));
  } catch (e) {
    console.error("Error saving default projects to localStorage:", e);
  }

  return defaultProjects;
};

// Function to update projects (called from admin)
export const updateProjectsData = (newProjects: Project[]): void => {
  try {
    localStorage.setItem("portfolio_projects", JSON.stringify(newProjects));
  } catch (e) {
    console.error("Error saving projects to localStorage:", e);
  }
};

// Export default projects for reference
export { defaultProjects };

// Export a projects array that gets initialized once
export const projects: Project[] = (() => {
  if (typeof window === "undefined") {
    return defaultProjects;
  }
  return getProjects();
})();
