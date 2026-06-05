/*
==================================================
Change ID: M12-002
Date: 2026-06-05
Status: Active

Purpose:
Notifications permission registry

Risk:
Low

Rollback:
Restore empty array
==================================================
*/

const notificationPermissions = [

    "notifications.view",
  
    "notifications.read",
  
    "notifications.mark-read",
  
    "notifications.mark-all-read"
  
  ];
  
  export default notificationPermissions;