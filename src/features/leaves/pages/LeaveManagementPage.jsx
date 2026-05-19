import {

    useEffect,

    useState

}

    from "react";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {

    getLeaves,

    updateLeaveStatus

}

    from "../services/leaveService";

function LeaveManagementPage() {

    const [

        leaves,

        setLeaves

    ]

        =

        useState([]);

    async function loadLeaves() {

        const data =

            await getLeaves();

        setLeaves(data);

    }

    useEffect(() => {

        loadLeaves();

    }, []);

    return (

        <DashboardLayout>

            <h1 className="text-2xl font-bold mb-4">

                Leave Requests

            </h1>

            {

                leaves.map(

                    (leave) => (

                        <div
                            key={leave.id}
                            className="border p-4 mb-2"
                        >

                            <div>

                                Employee:

                                {

                                    leave.employees?.full_name

                                }

                            </div>

                            <div>

                                Type:

                                {

                                    leave.leave_type

                                }

                            </div>

                            <div>

                                Status:

                                {

                                    leave.status

                                }

                            </div>

                            <button

                                onClick={async () => {

                                    /*await updateLeaveStatus(

                                        leave.id,

                                        "approved"

                                    );*/
                                    await updateLeaveStatus(

                                        leave.id,

                                        "approved",

                                        leave

                                    );

                                    loadLeaves();

                                }}

                            >

                                Approve

                            </button>

                            <button

                                onClick={async () => {

                                    await updateLeaveStatus(

                                        leave.id,

                                        "rejected"

                                    );

                                    loadLeaves();

                                }}

                            >

                                Reject

                            </button>

                        </div>

                    )

                )

            }

        </DashboardLayout>

    );

}

export default LeaveManagementPage;