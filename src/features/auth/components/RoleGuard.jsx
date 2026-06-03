/*
==================================================

Module:
M02 Identity & Security

Submodule:
M02-003 Role Protection

Feature:
Role Guard

Change ID:
M02-003-001

Status:
Active

Purpose:

Restricts route access
based on user role.

Architecture:

Auth User
    ↓
Profile
    ↓
RoleGuard
    ↓
Page Access

Future:

Database roles
Tenant roles

Risk:

Low

Rollback:

Restore previous version

==================================================
*/

import { Navigate }
from "react-router-dom";

import {
  useProfile
}
from "../hooks/useProfile";

function RoleGuard({

  children,

  allowedRoles = [],

}) {

  const {

    profile,

    loading

  } = useProfile();

  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );

  }

  /*
  ----------------------------------
  IMPORTANT
  ----------------------------------

  Your current profile table uses:

  role_id

  not role_name.

  We will replace this later
  when role resolution is added.
  */

  const userRole =
    profile?.role_name;

  const hasAccess =
    allowedRoles.includes(
      userRole
    );

  if (!hasAccess) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }

  return children;

}

export default RoleGuard;