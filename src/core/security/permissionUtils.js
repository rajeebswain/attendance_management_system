/*
==================================================
Module:
M02 Identity & Security

Submodule:
M02-005 Permission Utilities

Feature:
Permission Validation Helpers

Change ID:
M02-005-001

Status:
Active

Purpose:

Reusable permission
validation functions.

Architecture:

Role
 ↓
Permissions
 ↓
Validation
 ↓
Access Control

Current Strategy:

Static permission mapping.

Future Strategy:

Database-driven permissions.

Risk:

Low

Rollback:

Delete file

==================================================
*/

export function hasPermission(

    userPermissions = [],
  
    permission
  
  ) {
  
    return userPermissions.includes(
      permission
    );
  
  }

  export function hasAnyPermission(

    userPermissions = [],
  
    requiredPermissions = []
  
  ) {
  
    return requiredPermissions.some(
  
      (permission) =>
  
        userPermissions.includes(
          permission
        )
  
    );
  
  }

  export function hasAllPermissions(

    userPermissions = [],
  
    requiredPermissions = []
  
  ) {
  
    return requiredPermissions.every(
  
      (permission) =>
  
        userPermissions.includes(
          permission
        )
  
    );
  
  }