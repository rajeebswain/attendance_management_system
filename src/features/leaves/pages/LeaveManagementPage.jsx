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



// function getStatusClass(status) {

//     switch (status) {

//         case "approved":

//             return
//             "bg-green-100 text-green-700";

//         case "rejected":

//             return
//             "bg-red-100 text-red-700";

//         case "pending":

//             return
//             "bg-yellow-100 text-yellow-700";

//         default:

//             return
//             "bg-gray-100 text-gray-700";

//     }

// }

function getStatusClass(status) {

    switch (status) {

        case "approved":
            return "bg-green-100 text-green-700";

        case "rejected":
            return "bg-red-100 text-red-700";

        case "pending":
            return "bg-yellow-100 text-yellow-700";

        default:
            return "bg-gray-100 text-gray-700";

    }

}

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
                            // className="border p-4 mb-2"
                            className="
border
rounded-lg
shadow-sm
p-5
mb-4
bg-white
"
                        >

                            {/* <div>

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

                            </div> */}

                            <div>
                                <strong>Request ID:</strong>{" "}
                                {leave.id}
                            </div>

                            <div className="space-y-2">

                                <div>
                                    <strong>Employee:</strong>{" "}
                                    {leave.employees?.full_name}
                                </div>

                                <div>
                                    <strong>Employee Code:</strong>{" "}
                                    {leave.employees?.employee_code}
                                </div>

                                <div>
                                    <strong>Leave Type:</strong>{" "}
                                    {leave.leave_type}
                                </div>

                                <div>
                                    <strong>From Date:</strong>{" "}
                                    {leave.start_date}
                                </div>

                                <div>
                                    <strong>To Date:</strong>{" "}
                                    {leave.end_date}
                                </div>

                                <div>
                                    <strong>Applied On:</strong>{" "}
                                    {
                                        new Date(
                                            leave.created_at
                                        ).toLocaleString()
                                    }
                                </div>

                                <div>
                                    <strong>Reason:</strong>{" "}
                                    {leave.reason}
                                </div>

                                {/* <div>
                                    <strong>Status:</strong>{" "}
                                    {leave.status}
                                </div> */}

                                <div>

                                    <strong>Status:</strong>{" "}

                                    <span
                                        className={`
px-3
py-1
rounded-full
text-sm
${getStatusClass(
                                            leave.status
                                        )}
`}
                                    >

                                        {/* {leave.status} */}
                                        {
                                            leave.status.charAt(0).toUpperCase()
                                            +
                                            leave.status.slice(1)
                                        }

                                    </span>

                                </div>

                                <div>
                                    <strong>Duration:</strong>{" "}
                                    {
                                        Math.ceil(
                                            (
                                                new Date(leave.end_date) -
                                                new Date(leave.start_date)
                                            )
                                            /
                                            (1000 * 60 * 60 * 24)
                                        )
                                        + 1
                                    }
                                    Day(s)
                                </div>

                            </div>

                            {/* <div className="flex gap-3 mt-3">

                                <button

                                    className="
                                                bg-green-600
                                                text-white
                                                px-4
                                                py-2
                                                rounded
                                                hover:bg-green-700
                                                "

                                    onClick={async () => {

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

                                    className="
                                                bg-red-600
                                                text-white
                                                px-4
                                                py-2
                                                rounded
                                                hover:bg-red-700
                                                "
                                    onClick={async () => {

                                        await updateLeaveStatus(

                                            leave.id,

                                            "rejected",

                                            leave

                                        );

                                        loadLeaves();

                                    }}

                                >

                                    Reject

                                </button>

                            </div> */}

                            {
                                leave.status === "pending" && (

                                    <div className="flex gap-3 mt-3">

                                        <button

                                            className="
bg-green-600
text-white
px-4
py-2
rounded
hover:bg-green-700
"

                                            onClick={async () => {

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

                                            className="
bg-red-600
text-white
px-4
py-2
rounded
hover:bg-red-700
"

                                            onClick={async () => {

                                                await updateLeaveStatus(

                                                    leave.id,

                                                    "rejected",

                                                    leave

                                                );

                                                loadLeaves();

                                            }}

                                        >

                                            Reject

                                        </button>

                                    </div>

                                )
                            }


                        </div>

                    )

                )

            }

        </DashboardLayout>

    );

}

export default LeaveManagementPage;