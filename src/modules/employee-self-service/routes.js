/*
==================================================
Change ID: M06-005
Date: 2026-05-26
Status: Updated
Purpose: Register module routes
Risk: Low
Rollback: Remove routes
==================================================
*/

import React from "react";

import EmployeeDashboard
from "./pages/EmployeeDashboard";

const employeeSelfServiceRoutes = [

{
path:"/employee/dashboard",
element: React.createElement(
EmployeeDashboard
)
}

];

export default employeeSelfServiceRoutes;