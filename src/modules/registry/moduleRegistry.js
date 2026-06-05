// /*
// ==================================================
// Change ID: M06-002
// Date: 2026-05-26
// Status: Initial
// Purpose: Register pluggable modules
// Risk: Low
// Rollback: Remove registry
// ==================================================
// */

// import employeeSelfServiceModule
// from "../employee-self-service/moduleConfig";

// import leaveManagementModule
// from "../leave-management/moduleConfig";

// const moduleRegistry = [

// employeeSelfServiceModule,

// leaveManagementModule

// ];

// export default moduleRegistry;



/*
==================================================
Change ID: M06-003
Date: 2026-06-05
Status: Active
Purpose: Register Notifications module
Risk: Low
Rollback: Remove module registration
==================================================
*/

import employeeSelfServiceModule
from "../employee-self-service/moduleConfig";

import leaveManagementModule
from "../leave-management/moduleConfig";

import notificationsModule
from "../notifications/moduleConfig";

const moduleRegistry = [

  employeeSelfServiceModule,

  leaveManagementModule,

  notificationsModule

];

export default moduleRegistry;