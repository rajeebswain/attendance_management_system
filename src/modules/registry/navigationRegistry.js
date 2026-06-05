
/*
==================================================
Change ID: M06-020
Date: 2026-06-04
Status: Active

Purpose:
Dynamic module navigation loading

Risk:
Low

Rollback:
Restore previous registry
==================================================
*/

import { CORE_SIDEBAR_LINKS }
    from "../../constants/navigation";

import moduleRegistry
    from "./moduleRegistry";

const moduleLinks = moduleRegistry

    .filter(
        (module) => module.enabled
    )

    .flatMap(
        (module) => module.navigation || []
    );

const SIDEBAR_LINKS = [

    ...CORE_SIDEBAR_LINKS,

    ...moduleLinks

];

export default SIDEBAR_LINKS;