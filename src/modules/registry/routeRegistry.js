/*
==================================================
Change ID: M06-005
Date: 2026-05-26
Status: Initial
Purpose: Combine module routes
Risk: Medium
Rollback: Remove registry
==================================================
*/

import moduleRegistry
from "./moduleRegistry";

import employeeSelfServiceRoutes
from "../employee-self-service/routes";

const moduleRoutes = moduleRegistry

.filter(

(module) => module.enabled

)

.flatMap(() => employeeSelfServiceRoutes);

export default moduleRoutes;