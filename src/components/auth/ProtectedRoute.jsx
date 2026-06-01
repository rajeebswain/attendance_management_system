
// import { Navigate }
// from "react-router-dom";

// const ProtectedRoute = ({

// children,

// allowedRoles = [],

// userRole

// }) => {

// /*
// If no roles specified,
// allow access
// */

// if (

// allowedRoles.length > 0

// &&

// !allowedRoles.includes(
// userRole
// )

// ) {

// return (

// <Navigate
// to="/attendance"
// />

// );

// }

// return children;

// };

// export default ProtectedRoute;

/*
==================================================
Module:
M02 Identity & Security

Submodule:
M02-001 Authentication Foundation

Feature:
Protected Route

Change ID:
M02-001-003

Status:
Active

Purpose:

Protect routes using
authenticated session.

Architecture:

User
 ↓
Session
 ↓
Protected Route
 ↓
Page Access

Future:

Permission checks will
run after authentication.

Risk:

Low

Rollback:

Restore previous file

==================================================
*/

import { Navigate }
from "react-router-dom";

import {
  useAuth
}
from "../../features/auth/context/AuthContext";

function ProtectedRoute({

  children

}) {

  const {

    user,

    loading

  } = useAuth();

  // Session loading
  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );

  }

  // No session
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