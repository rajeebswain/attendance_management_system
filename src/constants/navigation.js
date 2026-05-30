/*
==================================================
Change ID: M06-004
Date: 2026-05-26
Status: Updated
Purpose: Separate core navigation
Risk: Medium
Rollback: Restore SIDEBAR_LINKS
==================================================
*/

export const CORE_SIDEBAR_LINKS = [

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
  },

  {
    label: "Attendance Regularization",
    path: "/attendance-regularization"
},

{
  label: "Leave Management",
  path: "/leave-management"
},

{
    label: "Correction Audit",
    path: "/attendance-correction-audit"
}


  ];
 