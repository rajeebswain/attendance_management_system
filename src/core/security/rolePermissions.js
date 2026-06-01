/*
==================================================
Module:
M02 Identity & Security

Submodule:
M02-004 Permission Registry

Feature:
Role Permission Mapping

Change ID:
M02-004-002

Status:
Active

Purpose:

Maps roles to permissions.

Architecture:

Role
 ↓
Permissions
 ↓
Feature Access

Future:

Database-driven permissions.

Risk:

Low

Rollback:

Delete file

==================================================
*/
//Import Permission Catalog
import { PERMISSIONS }
from "./permissions";


//Role Permission Mapping
export const ROLE_PERMISSIONS = {

    employee: [
  
      PERMISSIONS.ATTENDANCE_VIEW,
  
      PERMISSIONS.LEAVE_VIEW,
  
      PERMISSIONS.LEAVE_CREATE,
  
    ],
  
    supervisor: [
  
      PERMISSIONS.ATTENDANCE_VIEW,
  
      PERMISSIONS.LEAVE_VIEW,
  
      PERMISSIONS.REPORT_VIEW,
  
    ],
  
    hr: [
  
      PERMISSIONS.EMPLOYEE_VIEW,
  
      PERMISSIONS.EMPLOYEE_EDIT,
  
      PERMISSIONS.LEAVE_VIEW,
  
      PERMISSIONS.LEAVE_APPROVE,
  
      PERMISSIONS.LEAVE_ALLOCATE,
  
      PERMISSIONS.REPORT_VIEW,
  
    ],
  
    admin: [
  
      ...Object.values(
        PERMISSIONS
      ),
  
    ],
  
    super_admin: [
  
      ...Object.values(
        PERMISSIONS
      ),
  
    ],
  
  };