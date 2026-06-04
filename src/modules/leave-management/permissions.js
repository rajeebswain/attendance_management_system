// /*
// ==================================================
// Change ID: M07-000
// Date: 2026-05-30
// Status: Initial

// Purpose:
// Leave Management permissions placeholder

// Risk:
// Low

// Rollback:
// Delete file
// ==================================================
// */

// const leaveManagementPermissions = [];

// export default leaveManagementPermissions;

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