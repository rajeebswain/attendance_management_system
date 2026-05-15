// import { Navigate } from "react-router-dom";

// import { useAuth } from "../context/AuthContext";

// function ProtectedRoute({ children }) {

//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default ProtectedRoute;

// Redirect navigation
import { Navigate } from "react-router-dom";


// Authentication hook
import { useAuth } from "../context/AuthContext";


function ProtectedRoute({ children }) {

  // Global auth state
  const {

    user,

    loading,

  } = useAuth();


  // Prevent flashing while loading
  if (loading) {

    return <div>Loading...</div>;
  }


  // Redirect if user not logged in
  if (!user) {

    return <Navigate to="/login" />;
  }


  // Allow protected page
  return children;
}

export default ProtectedRoute;