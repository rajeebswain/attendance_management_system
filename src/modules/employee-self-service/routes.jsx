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

import EmployeeLeaveHistoryPage
    from "./pages/EmployeeLeaveHistoryPage";

import EmployeeProfilePage
    from "./pages/EmployeeProfilePage";


/*
==================================================
Change ID: M06-027
Date: 2026-05-27
Status: Updated
Purpose: Add employee password route
Risk: Low
Rollback: Remove route
==================================================
*/

import EmployeeChangePasswordPage
from "./pages/EmployeeChangePasswordPage";

/*
==================================================
Module: M06-027
Feature: Attendance Correction Request
Purpose: Employee correction routing
==================================================
*/

import EmployeeAttendanceCorrectionPage

from "../../features/attendance-correction/pages/EmployeeAttendanceCorrectionPage";


import AdminAttendanceRegularizationPage

from "../../features/attendance-correction/pages/AdminAttendanceRegularizationPage";

/*
==================================================
Change ID: M06-032
Date: 2026-05-29
Status: Initial
Purpose: Audit History Route
Risk: Low
Rollback: Remove import and route
==================================================
*/

import AttendanceCorrectionAuditPage

from "../../features/attendance-correction/pages/AttendanceCorrectionAuditPage";

const employeeSelfServiceRoutes = [

    {
        path: "/employee/dashboard",
        element: <EmployeeDashboard />
    },

    {
        path: "/employee/leave",
        element: <EmployeeLeavePage />
    },

    {
        path: "/employee/self-attendance",
        element: <EmployeeSelfAttendancePage />
    },

    {
        path: "/employee/attendance-correction",
        element: <EmployeeAttendanceCorrectionPage />
    },

    {
        path: "/employee/leave-history",
        element: <EmployeeLeaveHistoryPage />
    },

    {
        path: "/employee/profile",
        element: <EmployeeProfilePage />
    },

    {
        path:"/employee/change-password",
        element:<EmployeeChangePasswordPage/>
        },

        {
            path: "/attendance-regularization",
            element: <AdminAttendanceRegularizationPage />
        },

{
    path:
    "/attendance-correction-audit",

    element:
    <AttendanceCorrectionAuditPage />
},

        

];

export default employeeSelfServiceRoutes;