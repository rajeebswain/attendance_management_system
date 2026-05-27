// /*
// ==================================================
// Change ID: M06-005
// Date: 2026-05-26
// Status: Initial
// Purpose: Combine module routes
// Risk: Medium
// Rollback: Remove registry
// ==================================================
// */

// import moduleRegistry
// from "./moduleRegistry";

// import employeeSelfServiceRoutes
// from "../employee-self-service/routes.jsx";

// const moduleRoutes = moduleRegistry

// .filter(

// (module) => module.enabled

// )

// .flatMap(() => employeeSelfServiceRoutes);

// export default moduleRoutes;


/*
==================================================
Change ID: M06-019
Date: 2026-05-26
Status: Updated
Purpose: Dynamic route loading
Risk: Medium
Rollback: Restore previous registry
==================================================
*/

import moduleRegistry
from "./moduleRegistry";

const moduleRoutes =

moduleRegistry

.filter(

(module)=>module.enabled

)

.flatMap(

(module)=>

module.routes || []

);

export default moduleRoutes;