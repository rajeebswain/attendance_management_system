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


/*
==================================================
Change ID: M07-004B
Date: 2026-05-30
Status: Initial
Purpose: Audit history integration
Risk: Low
Rollback: Remove import
==================================================
*/

import {

    getLeaveAuditLogs

}

    from "../services/leaveAuditService";

/*
==================================================
Change ID: M07-005A
Date: 2026-05-30
Status: Initial
Purpose: Decision modal integration
Risk: Low
Rollback: Remove import
==================================================
*/

import LeaveDecisionModal

    from "../components/LeaveDecisionModal";

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

    const [leaves, setLeaves] = useState([]);


    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    const [leaveTypeFilter, setLeaveTypeFilter] = useState("all");
    /*
==================================================
Change ID: M07-004B
Date: 2026-05-30
Status: Initial
Purpose: Store audit history
Risk: Low
Rollback: Remove state
==================================================
*/

    const [

        auditLogs,

        setAuditLogs

    ]

        =

        useState({});


    /*
==================================================
Change ID: M07-005A
Date: 2026-05-30
Status: Initial
Purpose: Modal state
Risk: Low
Rollback: Remove state
==================================================
*/

    const [

        selectedLeave,

        setSelectedLeave

    ]

        =

        useState(null);

    const pendingCount =

        leaves.filter(
            leave => leave.status === "pending"
        ).length;

    const approvedCount =

        leaves.filter(
            leave => leave.status === "approved"
        ).length;

    const rejectedCount =

        leaves.filter(
            leave => leave.status === "rejected"
        ).length;

    const filteredLeaves =

        leaves.filter((leave) => {

            const employeeMatch =

                leave.employees?.full_name

                    .toLowerCase()

                    .includes(

                        searchTerm.toLowerCase()

                    );

            const statusMatch =

                statusFilter === "all"

                ||

                leave.status === statusFilter;

            const leaveTypeMatch =

                leaveTypeFilter === "all"

                ||

                leave.leave_type === leaveTypeFilter;

            return (

                employeeMatch

                &&

                statusMatch

                &&

                leaveTypeMatch

            );

        });

    async function loadLeaves() {

        const data =

            await getLeaves();

        setLeaves(data);

    }

    useEffect(() => {

        loadLeaves();

    }, []);


    /*
    ==================================================
    Change ID: M07-004B
    Date: 2026-05-30
    Status: Initial
    Purpose: Load audit history
    Risk: Low
    Rollback: Remove function
    ==================================================
    */

    async function loadAuditLogs(

        leaveId

    ) {

        try {

            const data =

                await getLeaveAuditLogs(

                    leaveId

                );

            setAuditLogs(

                prev => ({

                    ...prev,

                    [leaveId]:

                        data

                })

            );

        }

        catch (error) {

            console.log(error);

        }

    }





    return (

        <DashboardLayout>

            <h1 className="text-2xl font-bold mb-4">

                Leave Requests

            </h1>

            <div className="border p-4 mb-4 bg-white">

                <strong>Total:</strong> {leaves.length}

                {" | "}

                <strong>Pending:</strong> {pendingCount}

                {" | "}

                <strong>Approved:</strong> {approvedCount}

                {" | "}

                <strong>Rejected:</strong> {rejectedCount}

            </div>

            <div className="border p-4 mb-4 bg-white">

                <input

                    type="text"

                    placeholder="Search Employee"

                    value={searchTerm}

                    onChange={(e) =>

                        setSearchTerm(

                            e.target.value

                        )

                    }

                    className="border p-2 mr-2"

                />

                <select

                    value={statusFilter}

                    onChange={(e) =>

                        setStatusFilter(

                            e.target.value

                        )

                    }

                    className="border p-2 mr-2"

                >

                    <option value="all">

                        All Status

                    </option>

                    <option value="pending">

                        Pending

                    </option>

                    <option value="approved">

                        Approved

                    </option>

                    <option value="rejected">

                        Rejected

                    </option>

                </select>

            </div>

            {

                filteredLeaves.map(

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

                                    {leave.reason || "-"}

                                </div>


                                <div>

                                    <strong>Admin Remark:</strong>{" "}

                                    {leave.admin_remark || "-"}

                                </div>

                               

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

                                        {
                                            leave.status.charAt(0).toUpperCase()
                                            +
                                            leave.status.slice(1)
                                        }

                                    </span>

                                </div>
                                {
                                    leave.approved_by && (

                                        <div>

                                            <strong>
                                                Approved By:
                                            </strong>{" "}

                                            {leave.approved_by}

                                        </div>

                                    )
                                }

                                {
                                    leave.approved_at && (

                                        <div>

                                            <strong>
                                                Approved On:
                                            </strong>{" "}

                                            {
                                                new Date(
                                                    leave.approved_at
                                                ).toLocaleString()
                                            }

                                        </div>

                                    )
                                }


                               
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

                                { /*
==================================================
Change ID: M07-004B
Date: 2026-05-30
Status: Initial
Purpose: Display audit history
Risk: Low
Rollback: Remove section
==================================================
*/}

                                <button

                                    className="
mt-3
px-3
py-2
bg-gray-200
rounded
"

                                    onClick={() =>

                                        loadAuditLogs(

                                            leave.id

                                        )

                                    }

                                >

                                    View Audit History

                                </button>

                                {
                                    auditLogs[
                                        leave.id
                                    ]?.map(

                                        (log) => (

                                            <div

                                                key={log.id}

                                                className="
mt-2
border-l-4
pl-3
text-sm
"

                                            >

                                                <div>

                                                    {log.old_status}

                                                    →

                                                    {log.new_status}

                                                </div>

                                                <div>

                                                    Remark:

                                                    {log.admin_remark}

                                                </div>

                                                <div>

                                                    {

                                                        new Date(

                                                            log.changed_at

                                                        ).toLocaleString()

                                                    }

                                                </div>

                                            </div>

                                        )

                                    )
                                }

                            </div>

                           
                            <div className="flex gap-3 mt-3">

                               
                                <button

                                    className="
                                                    bg-blue-600
                                                    text-white
                                                    px-4
                                                    py-2
                                                    rounded
                                                    "

                                    onClick={() =>

                                        setSelectedLeave(

                                            leave

                                        )

                                    }

                                >

                                    Decision

                                </button>

                            </div>

                           
                        </div>

                    )

                )

            }


            {
                selectedLeave && (

                  
                    <LeaveDecisionModal

                        key={selectedLeave.id}

                        leave={selectedLeave}

                        onClose={() =>

                            setSelectedLeave(
                                null
                            )
                        }


                        // onSave={async ({

                        //     status,

                        //     remark

                        // }) => {

                        //     await updateLeaveStatus(
                        //         selectedLeave.id,
                        //         status,
                        //         selectedLeave,
                        //         remark
                        //     );

                        //     setSelectedLeave(null);

                        //     window.location.reload();

                        // }}

                        onSave={async ({ status, remark }) => {

                            try {
                        
                                await updateLeaveStatus(
                                    selectedLeave.id,
                                    status,
                                    selectedLeave,
                                    remark
                                );
                        
                                await loadLeaves();
                        
                                setSelectedLeave(null);
                        
                            }
                        
                            catch (error) {
                        
                                alert(
                                    error.message
                                );
                        
                            }
                        
                        }}

                    />

                )
            }




        </DashboardLayout>

    );

}

export default LeaveManagementPage;