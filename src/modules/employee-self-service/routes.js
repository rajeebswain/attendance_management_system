/*
==================================================
Change ID: M06-003
Date: 2026-05-26
Status: Updated
Purpose: Register module routes
Risk: Low
Rollback: Remove routes
==================================================
*/

import EmployeeDashboard
from "./pages/EmployeeDashboard";

const employeeSelfServiceRoutes = [

{

path:"/employee/dashboard",

element:<EmployeeDashboard/>

}

];

export default employeeSelfServiceRoutes;