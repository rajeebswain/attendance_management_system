/*
==================================================
ARCH-020 Correction
Date: 2026-05-26
Time: 20:10 IST
Status: ACTIVE

Purpose:
Keep Reports page as core navigation.

Risk:
VERY LOW

Rollback:
Restore previous navigation
==================================================
*/

// Sidebar navigation configuration

export const SIDEBAR_LINKS = [

  {
  label:"Dashboard",
  path:"/dashboard"
  },
  
  {
  label:"Employees",
  path:"/employees"
  },
  
  {
  label:"Attendance",
  path:"/attendance"
  },
  
  {
  label:"Reports & Analytics",
  path:"/reports"
  },
  
  {
  label:"Settings",
  path:"/settings"
  }
  
  ];