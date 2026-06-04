/*
==================================================
Change ID: M07-005C
Date: 2026-05-30
Status: Initial
Purpose: Leave allocation page
Risk: Low
Rollback: Remove page
==================================================
*/

import { useState }
from "react";

import DashboardLayout
from "../../../components/layout/DashboardLayout";

import {
    allocateLeaveBalance
}
from "../services/leaveAllocationService";

function LeaveAllocationPage() {

    const [

        casualLeave,

        setCasualLeave

    ]

    = useState(12);

    const [

        sickLeave,

        setSickLeave

    ]

    = useState(10);

    const [

        earnedLeave,

        setEarnedLeave

    ]

    = useState(15);

    async function handleAllocate() {

        try {

            await allocateLeaveBalance({

                casualLeave,

                sickLeave,

                earnedLeave

            });

            alert(

                "Leave balances allocated successfully"

            );

        }

        catch (error) {

            alert(

                error.message

            );

        }

    }

    return (

        <DashboardLayout>

            <h1
                className="
                text-2xl
                font-bold
                mb-6
                "
            >

                Leave Allocation

            </h1>

            <div
                className="
                bg-white
                p-6
                rounded
                shadow
                "
            >

                <div className="mb-4">

                    <label>

                        Casual Leave

                    </label>

                    <input

                        type="number"

                        value={casualLeave}

                        onChange={(e) =>

                            setCasualLeave(

                                Number(
                                    e.target.value
                                )

                            )

                        }

                        className="
                        border
                        p-2
                        w-full
                        "
                    />

                </div>

                <div className="mb-4">

                    <label>

                        Sick Leave

                    </label>

                    <input

                        type="number"

                        value={sickLeave}

                        onChange={(e) =>

                            setSickLeave(

                                Number(
                                    e.target.value
                                )

                            )

                        }

                        className="
                        border
                        p-2
                        w-full
                        "
                    />

                </div>

                <div className="mb-4">

                    <label>

                        Earned Leave

                    </label>

                    <input

                        type="number"

                        value={earnedLeave}

                        onChange={(e) =>

                            setEarnedLeave(

                                Number(
                                    e.target.value
                                )

                            )

                        }

                        className="
                        border
                        p-2
                        w-full
                        "
                    />

                </div>

                <button

                    onClick={handleAllocate}

                    className="
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded
                    "
                >

                    Allocate To All Employees

                </button>

            </div>

        </DashboardLayout>

    );

}

export default LeaveAllocationPage;