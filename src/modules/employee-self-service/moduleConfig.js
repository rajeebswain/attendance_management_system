

/*
==================================================
Change ID: M06-019
Date: 2026-05-26
Status: Updated
Purpose: Register module routes
Risk: Medium
Rollback: Remove routes field
==================================================
*/

// import employeeSelfServiceRoutes
// from "./routes";

// import employeeSelfServiceNavigation
// from "./navigation";

// const employeeSelfServiceModule = {

// id:"M06",

// name:"Employee Self Service",

// enabled:true,

// routes:employeeSelfServiceRoutes,

// navigation: employeeSelfServiceNavigation,

// widgets:true,

// permissions:true

// };

// export default employeeSelfServiceModule;

import employeeSelfServiceNavigation from "./navigation";
import employeeSelfServiceRoutes from "./routes";
import employeeSelfServicePermissions from "./permissions";
import employeeSelfServiceWidgets from "./widgets";

const employeeSelfServiceModule = {

  id: "M06",

  name: "Employee Self Service",

  enabled: true,

  routes: employeeSelfServiceRoutes,

  navigation: employeeSelfServiceNavigation,

  permissions: employeeSelfServicePermissions,

  widgets: employeeSelfServiceWidgets

};

export default employeeSelfServiceModule;