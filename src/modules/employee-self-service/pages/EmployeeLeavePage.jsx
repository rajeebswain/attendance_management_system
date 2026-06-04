
/*
==================================================
Change ID: M06-020
Date: 2026-05-26
Status: Updated
Purpose: Employee leave wrapper
Risk: Low
Rollback: Restore previous file
==================================================
*/

import {

    useEffect,

    useState

}

    from "react";

import EmployeeLayout
    from "../layout/EmployeeLayout";

import LeaveForm
    from "../../../features/leaves/components/LeaveForm";

import {

    getCurrentEmployee

}

    from "../services/employeeSelfService";

function EmployeeLeavePage() {

    const [

        employee,

        setEmployee

    ]

        =

        useState(null);

    useEffect(() => {

        loadEmployee();

    }, []);

    async function loadEmployee() {

        try {

            const data =

                await getCurrentEmployee();

            setEmployee(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <EmployeeLayout>

            <div className="p-6">

                <LeaveForm

                    employeeId={employee?.id}

                />

            </div>

        </EmployeeLayout>

    );

}

export default EmployeeLeavePage;