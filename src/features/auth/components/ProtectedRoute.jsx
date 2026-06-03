/*
==================================================

Module:
M02 Identity & Security

Submodule:
M02-001 Authentication Foundation

Feature:
Protected Route

Change ID:
M02-001-002

Status:
Active

Purpose:

Protect authenticated routes.

Risk:

Low

Rollback:

Delete file

==================================================
*/

import {

    Navigate
  
  } from "react-router-dom";
  
  import {
  
    useAuth
  
  } from "../context/AuthContext";
  
  function ProtectedRoute({
  
    children
  
  }) {
  
    const {
  
      user,
  
      loading
  
    } = useAuth();
  
    if (loading) {
  
      return (
  
        <div>
  
          Loading...
  
        </div>
  
      );
  
    }
  
    if (!user) {
  
      return (
  
        <Navigate
  
          to="/login"
  
          replace
  
        />
  
      );
  
    }
  
    return children;
  
  }
  
  export default ProtectedRoute;