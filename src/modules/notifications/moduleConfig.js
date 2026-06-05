/*
==================================================
Change ID: M12-000
Date: 2026-06-05
Status: Initial

Purpose:
Register Notifications module

Risk:
Low

Rollback:
Remove module registration
==================================================
*/

import notificationNavigation
from "./navigation";

import notificationRoutes
from "./routes";

import notificationPermissions
from "./permissions";

import notificationWidgets
from "./widgets";

const notificationsModule = {

    id: "M12",

    name: "Notifications",

    enabled: true,
    // enabled: false,

    routes: notificationRoutes,

    navigation: notificationNavigation,

    permissions: notificationPermissions,

    widgets: notificationWidgets

};

export default notificationsModule;