/*
==================================================
Change ID: M06-004
Date: 2026-05-26
Status: Fix
Purpose: Correct module navigation loading
Risk: Low
Rollback: Restore previous registry
==================================================
*/

import { CORE_SIDEBAR_LINKS }
from "../../constants/navigation";

import moduleRegistry
from "./moduleRegistry";

import employeeSelfServiceNavigation
from "../employee-self-service/navigation";

const moduleLinks = [];

moduleRegistry.forEach((module) => {

if(
module.id==="M06"
&&
module.enabled
){

moduleLinks.push(
...employeeSelfServiceNavigation
);

}

});

const SIDEBAR_LINKS=[

...CORE_SIDEBAR_LINKS,

...moduleLinks

];

export default SIDEBAR_LINKS;