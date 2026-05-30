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