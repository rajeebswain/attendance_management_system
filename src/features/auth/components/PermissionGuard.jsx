/*
==================================================
Module:
M02 Identity & Security

Submodule:
M02-006 Permission Guard

Feature:
Permission Based Access Control

Change ID:
M02-006-001

Status:
Active

Purpose:

Protect UI components
using permissions instead
of direct role checks.

Architecture:

User
 ↓
Role
 ↓
Permissions
 ↓
Permission Guard

Current Strategy:

Static role permission mapping.

Future Strategy:

Database-driven permissions.

Risk:

Low

Rollback:

Delete file

==================================================
*/

import { Navigate }
from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

import {
  ROLE_PERMISSIONS,
  hasPermission
}
from "../../../core/security";

function PermissionGuard({

    children,
  
    permission,
  
    redirectTo = "/dashboard",
  
  }) {
  
    const {
  
      profile,
  
      loading,
  
    } = useAuth();
  
    if (loading) {
  
      return null;
    }
  
    const roleName =
      profile?.roles?.role_name;
  
    const userPermissions =
      ROLE_PERMISSIONS[
        roleName
      ] || [];
  
    const hasAccess =
      hasPermission(
  
        userPermissions,
  
        permission
  
      );
  
    if (!hasAccess) {
  
      return (
        <Navigate
          to={redirectTo}
        />
      );
    }
  
    return children;
  }
  
  export default PermissionGuard;