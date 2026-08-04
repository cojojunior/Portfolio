import { supabase } from "./supabase";

// Sign up with email and password
export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Sign up error:", error);
      return { success: false, error: error.message };
    }

    console.log("Sign up successful:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Sign up error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      return { success: false, error: error.message };
    }

    console.log("Sign in successful:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Sign in error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Get user error:", error);
      return { success: false, error: error.message };
    }
    return { success: true, user: data.user };
  } catch (error) {
    console.error("Get user error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  } catch (error) {
    console.error("Check auth error:", error);
    return false;
  }
};

// Get session
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Get session error:", error);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
};
