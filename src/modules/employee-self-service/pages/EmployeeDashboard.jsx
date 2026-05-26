/*
==================================================
Change ID: M06-006
Date: 2026-05-26
Status: Fix
Purpose: Employee dashboard shell
Risk: Low
Rollback: Restore component
==================================================
*/

// import DashboardLayout
// from "../../../components/layout/DashboardLayout";

import EmployeeLayout
    from "../layout/EmployeeLayout";

function EmployeeDashboard() {

    return (

        // <DashboardLayout>
        <EmployeeLayout>

            <div>

                <h1 className="text-3xl font-bold mb-4">

                    Employee Dashboard

                </h1>

                <p className="text-gray-600">

                    M06 Employee Self Service Module

                </p>

            </div>
        </EmployeeLayout>
        // </DashboardLayout>

    );

}

export default EmployeeDashboard;