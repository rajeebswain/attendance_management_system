/*
==================================================
Change ID: M06-006
Date: 2026-05-26
Status: Fix
Purpose: Correct M06 route rendering
Risk: Low
Rollback: Restore previous route config
==================================================
*/

import EmployeeDashboard
from "./pages/EmployeeDashboard";

import EmployeeLeavePage
from "./pages/EmployeeLeavePage";

import EmployeeSelfAttendancePage
from "../../features/attendance/pages/EmployeeSelfAttendancePage";

const employeeSelfServiceRoutes = [

{
path:"/employee/dashboard",
element:<EmployeeDashboard/>
},

{
path:"/employee/leave",
element:<EmployeeLeavePage/>
},

{
path:"/employee/self-attendance",
element:<EmployeeSelfAttendancePage/>
}

];

export default employeeSelfServiceRoutes;