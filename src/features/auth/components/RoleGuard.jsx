// Unauthorized redirect
import { Navigate } from "react-router-dom";


// Global auth hook
import { useAuth } from "../context/AuthContext";


function RoleGuard({

  children,

  allowedRoles = [],

}) {

  // Current profile
  const { profile } = useAuth();


  // Current user role
  const userRole = profile?.roles?.role_name;


  // Check permission
  const hasAccess = allowedRoles.includes(userRole);


  // Redirect unauthorized users
  if (!hasAccess) {

    return <Navigate to="/dashboard" />;
  }


  return children;
}

export default RoleGuard;