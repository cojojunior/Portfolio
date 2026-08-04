import { supabase } from "./supabase";

// Upload image to Supabase Storage
export const uploadProjectImage = async (
  file: File,
): Promise<string | null> => {
  try {
    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    // Log successful upload (optional)
    console.log("Upload successful:", data);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

// Delete image from Supabase Storage
export const deleteProjectImage = async (
  imageUrl: string,
): Promise<boolean> => {
  try {
    // Extract file path from URL
    const path = imageUrl.split("/project-images/")[1];
    if (!path) return false;

    const { data, error } = await supabase.storage
      .from("project-images")
      .remove([path]);

    if (error) {
      console.error("Delete error:", error);
      return false;
    }

    // Log successful delete (optional)
    console.log("Delete successful:", data);

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};
