/*
==================================================
Change ID: M07-000
Date: 2026-05-30
Status: Initial

Purpose:
Register Leave Management module

Risk:
Low

Rollback:
Remove module registration
==================================================
*/

import leaveManagementNavigation
from "./navigation";

import leaveManagementRoutes
from "./routes";

import leaveManagementPermissions
from "./permissions";

import leaveManagementWidgets
from "./widgets";

const leaveManagementModule = {

id: "M07",

name: "Leave Management",

enabled: true,
// enabled: false,

routes: leaveManagementRoutes,

navigation: leaveManagementNavigation,

permissions: leaveManagementPermissions,

widgets: leaveManagementWidgets

};

export default leaveManagementModule;