/*
==================================================
Change ID: M00-001
Date: 2026-06-04
Status: Active

Purpose:
Aggregate module permissions

Risk:
Low

Rollback:
Delete file
==================================================
*/

import moduleRegistry
from "./moduleRegistry";

const modulePermissions =

moduleRegistry

.filter(
  (module) => module.enabled
)

.flatMap(
  (module) => module.permissions || []
);

export default modulePermissions;

