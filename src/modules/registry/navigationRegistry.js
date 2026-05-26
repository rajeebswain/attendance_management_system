/*
==================================================
Change ID: M06-004
Date: 2026-05-26
Status: Initial
Purpose: Combine navigation
Risk: Low
Rollback: Remove registry
==================================================
*/

import { CORE_SIDEBAR_LINKS }

from "../../constants/navigation";

import moduleRegistry

from "./moduleRegistry";

import employeeSelfServiceNavigation

from "../employee-self-service/navigation";

const moduleLinks = moduleRegistry
.filter(module=>module.enabled)
.flatMap(()=>employeeSelfServiceNavigation);

const SIDEBAR_LINKS=[

...CORE_SIDEBAR_LINKS,

...moduleLinks

];

export default SIDEBAR_LINKS;