/*
==================================================
Change ID: M06-010
Date: 2026-05-26
Status: Initial
Purpose: Employee-only sidebar
Risk: Low
Rollback: Remove component
==================================================
*/

import { Link } from "react-router-dom";

const EMPLOYEE_LINKS = [

    {
        label: "Dashboard",
        path: "/employee/dashboard"
    },

    {
        label: "Attendance History",
        path: "/employee/self-attendance"
    },
   
    {
        label: "Apply Leave",
        path: "/employee/leave"
    },

    {
        label: "My Leave History",
        path: "/employee/leave-history"
    },

    {
        label: "My Profile",
        path: "/employee/profile"
    },

    {
        label: "Change Password",
        path: "/employee/change-password"
    },

{
    label: "Attendance Correction",
    path: "/employee/attendance-correction"
}



];

function EmployeeSidebar() {

    return (

        <aside
            className="
w-64
min-h-screen
bg-gray-900
text-white
"
        >

            <div className="p-6 border-b border-gray-700">

                <h1 className="text-2xl font-bold">

                    Employee Panel

                </h1>

            </div>

            <nav className="p-4 space-y-2">

                {

                    EMPLOYEE_LINKS.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className="
block
px-4
py-3
rounded
hover:bg-gray-800
transition
"
                        >

                            {item.label}

                        </Link>

                    ))

                }

            </nav>

        </aside>

    );

}

export default EmployeeSidebar;