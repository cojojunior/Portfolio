import { supabase } from "./supabase";
import { Project } from "@/types";

// Get all projects
export const getProjectsFromSupabase = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return (
      data?.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        tags: item.tags,
        link: item.link || undefined,
        category: item.category,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []
    );
  } catch (error) {
    console.error("Error in getProjectsFromSupabase:", error);
    return [];
  }
};

// Get project by ID
export const getProjectByIdFromSupabase = async (
  id: number,
): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching project:", error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      tags: data.tags,
      link: data.link || undefined,
      category: data.category,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch (error) {
    console.error("Error in getProjectByIdFromSupabase:", error);
    return null;
  }
};

// Add a new project
export const addProjectToSupabase = async (
  project: Omit<Project, "id">,
): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title: project.title,
          description: project.description,
          image: project.image,
          tags: project.tags,
          link: project.link || null,
          category: project.category,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding project:", error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      tags: data.tags,
      link: data.link || undefined,
      category: data.category,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch (error) {
    console.error("Error in addProjectToSupabase:", error);
    return null;
  }
};

// Update a project
export const updateProjectInSupabase = async (
  id: number,
  project: Partial<Project>,
): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .update({
        title: project.title,
        description: project.description,
        image: project.image,
        tags: project.tags,
        link: project.link || null,
        category: project.category,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating project:", error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      tags: data.tags,
      link: data.link || undefined,
      category: data.category,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch (error) {
    console.error("Error in updateProjectInSupabase:", error);
    return null;
  }
};

// Delete a project
export const deleteProjectFromSupabase = async (
  id: number,
): Promise<boolean> => {
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      console.error("Error deleting project:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteProjectFromSupabase:", error);
    return false;
  }
};

// Get projects by category
export const getProjectsByCategory = async (
  category: string,
): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects by category:", error);
      return [];
    }

    return (
      data?.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        tags: item.tags,
        link: item.link || undefined,
        category: item.category,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []
    );
  } catch (error) {
    console.error("Error in getProjectsByCategory:", error);
    return [];
  }
};
