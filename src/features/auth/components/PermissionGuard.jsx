/*
==================================================

Module:
M02 Identity & Security

Submodule:
M02-006 Permission Guard

Feature:
Permission Based Access Control

Change ID:
M02-006-002

Status:
Foundation

Purpose:

Protect UI components
using permissions.

Architecture:

User
 ↓
Profile
 ↓
Role
 ↓
Permissions
 ↓
Permission Guard

Current Strategy:

Static permission mapping.

Future Strategy:

Database-driven permissions.

Risk:

Low

Rollback:

Restore previous version

==================================================
*/

import {

  ROLE_PERMISSIONS,

  hasPermission

} from "../../../core/security";

import {

  useProfile

} from "../hooks/useProfile";

function PermissionGuard({

  children,

  permission

}) {

  const {

    profile,

    loading

  } = useProfile();

  if (loading) {

    return null;

  }

  /*
  ==================================
  Temporary Role Resolution
  ==================================

  Current MVP uses role_name
  directly from profile.

  Future:
  profiles.role_id
        ↓
  roles table
        ↓
  role_name

  ==================================
  */

  const roleName =
    profile?.role_name;

  const userPermissions =

    ROLE_PERMISSIONS[
      roleName
    ] || [];

  const allowed =

    hasPermission(

      userPermissions,

      permission

    );

  if (!allowed) {

    return null;

  }

  return children;

}

export default PermissionGuard;