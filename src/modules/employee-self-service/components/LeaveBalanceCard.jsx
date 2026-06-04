/*
==================================================
Change ID: M07-009
Date: 2026-05-31
Status: Initial
Purpose: Display employee leave balance
Risk: Low
Rollback: Remove component
==================================================
*/

function LeaveBalanceCard({

    employee

}) {

    return (

        <div
            className="
            bg-white
            p-6
            rounded
            shadow
            "
        >

            <h2
                className="
                text-xl
                font-bold
                mb-4
                "
            >

                Leave Balance

            </h2>

            <div className="space-y-3">

                <div>

                    Casual Leave :

                    {

                        employee
                        ?.casual_leave

                    }

                </div>

                <div>

                    Sick Leave :

                    {

                        employee
                        ?.sick_leave

                    }

                </div>

                <div>

                    Earned Leave :

                    {

                        employee
                        ?.earned_leave

                    }

                </div>

            </div>

        </div>

    );

}

export default LeaveBalanceCard;