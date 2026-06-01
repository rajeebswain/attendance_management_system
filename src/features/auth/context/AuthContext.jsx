

// React utilities
import {

  createContext,

  useContext,

  useEffect,

  useState,

} from "react";


// Centralized Supabase client
import { supabase } from "../../../lib/supabase/client";


// Create authentication context
const AuthContext = createContext();


// Global authentication provider
export function AuthProvider({ children }) {

  // Logged-in user state
  const [user, setUser] = useState(null);

  // User profile state
  const [profile, setProfile] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);


  // Load authentication session
  useEffect(() => {

    // Get active session
    async function getSession() {

      // Fetch current session
      const {

        data: { session },

      } = await supabase.auth.getSession();

      // Store user
      setUser(session?.user ?? null);

      // Fetch profile if user exists
      if (session?.user) {

        await fetchProfile(session.user.id);
      }

      // Stop loading
      setLoading(false);
    }

    getSession();


    // Listen for authentication changes
    const {

      data: { subscription },

    } = supabase.auth.onAuthStateChange(

      async (_event, session) => {

        // Update user state
        setUser(session?.user ?? null);

        // Fetch profile when session changes
        if (session?.user) {

          await fetchProfile(session.user.id);

        } else {

          setProfile(null);
        }
      }
    );

    // Cleanup subscription
    return () => subscription.unsubscribe();

  }, []);


  // Fetch user profile from database
  async function fetchProfile(userId) {

    const { data, error } = await supabase

      .from("profiles")

      .select(`
        *,
        roles (
          role_name
        )
      `)

      .eq("id", userId)

      .single();

    // Handle profile errors
    if (error) {

      console.error(error);

      return;
    }

    // Save profile globally
    setProfile(data);
  }


  return (

    <AuthContext.Provider

      value={{

        user,

        profile,

        loading,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}


// Reusable authentication hook
export function useAuth() {

  return useContext(AuthContext);
}