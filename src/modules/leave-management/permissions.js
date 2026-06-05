/*
==================================================
Change ID: M07-002
Date: 2026-06-04
Status: Active

Purpose:
Leave Management permission registry

Risk:
Low

Rollback:
Restore empty array
==================================================
*/

const leaveManagementPermissions = [

    "leave.view",
  
    "leave.apply",
  
    "leave.approve",
  
    "leave.allocate"
  
  ];
  
  export default leaveManagementPermissions;