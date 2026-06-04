/*
==================================================
Change ID: M07-000
Date: 2026-05-30
Status: Initial

Purpose:
Register Leave Management navigation

Risk:
Low

Rollback:
Delete navigation file
==================================================
*/

// const leaveManagementNavigation = [];
// export default leaveManagementNavigation;


/*
==================================================
Change ID: M07-001
Date: 2026-06-04
Status: Active

Purpose:
Leave Management navigation registry

Risk:
Low

Rollback:
Restore empty array
==================================================
*/

const leaveManagementNavigation = [

    {
      label: "Leave",
      path: "/leave"
    },
  
    {
      label: "Leave Management",
      path: "/leave-management"
    },
  
    {
      label: "Leave Allocation",
      path: "/leave-allocation"
    }
  
  ];
  
  export default leaveManagementNavigation;

