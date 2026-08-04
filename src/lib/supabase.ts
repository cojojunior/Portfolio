import { createClient } from "@supabase/supabase-js";

// Your Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials exist
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase credentials are missing. Please check your .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    // Try to fetch a single row to test connection
    const { error } = await supabase
      .from("projects")
      .select("*")
      .limit(1);

    if (error) {
      console.error("❌ Supabase connection error:", error.message);
      return false;
    }
    console.log("✅ Supabase connected successfully!");
    return true;
  } catch (error) {
    console.error("❌ Supabase connection failed:", error);
    return false;
  }
};

// Get projects count
export const getProjectsCount = async () => {
  try {
    const { count, error } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error getting count:", error);
      return 0;
    }
    return count || 0;
  } catch (error) {
    console.error("Error in getProjectsCount:", error);
    return 0;
  }
};
