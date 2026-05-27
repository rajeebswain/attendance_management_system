/*
==================================================
Change ID: M06-014
Date: 2026-05-26
Status: Updated
Purpose: Connect employee profile
Risk: Medium
Rollback: Restore previous component
==================================================
*/

import {
    useEffect,
    useState
} from "react";

import {
    getCurrentEmployee
} from "../services/employeeSelfService";

import EmployeeLayout
    from "../layout/EmployeeLayout";

import WelcomeSection
    from "../components/WelcomeSection";

import EmployeeInfoCard
    from "../components/EmployeeInfoCard";

import AttendanceStatusCard
    from "../components/AttendanceStatusCard";

import QuickActions
    from "../components/QuickActions";

function EmployeeDashboard() {

    const [

        employee,

        setEmployee

    ] = useState(null);


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

            <div className="space-y-6">

                <WelcomeSection />

                <div className="grid grid-cols-2 gap-6">

                    <EmployeeInfoCard
                        employee={employee}
                    />

                    <AttendanceStatusCard />

                </div>

                <QuickActions />

            </div>

        </EmployeeLayout>

    );

}

export default EmployeeDashboard;