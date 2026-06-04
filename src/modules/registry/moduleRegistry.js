/*
==================================================
Change ID: M06-002
Date: 2026-05-26
Status: Initial
Purpose: Register pluggable modules
Risk: Low
Rollback: Remove registry
==================================================
*/

import employeeSelfServiceModule
from "../employee-self-service/moduleConfig";

const moduleRegistry = [

employeeSelfServiceModule

];

export default moduleRegistry;