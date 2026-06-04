/*
==================================================
Module:
M02 Identity & Security

Submodule:
M02-004 Permission Registry

Purpose:

Central permission catalog.

Every permission used by
the application must be
registered here.

Architecture:

Role
 ↓
Permission
 ↓
Feature

Future:

Database-driven permissions.

Change ID:

M02-004-001

Risk:

Low

Rollback:

Delete file

==================================================
*/

export const PERMISSIONS = {

    // Employee
  
    EMPLOYEE_VIEW:
      "employee.view",
  
    EMPLOYEE_CREATE:
      "employee.create",
  
    EMPLOYEE_EDIT:
      "employee.edit",
  
    EMPLOYEE_DELETE:
      "employee.delete",
  
    // Attendance
  
    ATTENDANCE_VIEW:
      "attendance.view",
  
    ATTENDANCE_CREATE:
      "attendance.create",
  
    ATTENDANCE_EDIT:
      "attendance.edit",
  
    ATTENDANCE_APPROVE:
      "attendance.approve",
  
    // Leave
  
    LEAVE_VIEW:
      "leave.view",
  
    LEAVE_CREATE:
      "leave.create",
  
    LEAVE_APPROVE:
      "leave.approve",
  
    LEAVE_ALLOCATE:
      "leave.allocate",
  
    // Reports
  
    REPORT_VIEW:
      "report.view",
  
    REPORT_EXPORT:
      "report.export",
  
  };