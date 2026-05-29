/*
==================================================
Module: M06-032
Feature: Attendance Regularization
Purpose: Admin correction approval workflow
Risk: Medium
Rollback: Remove page
==================================================
*/

import { useEffect, useState }

    from "react";

import DashboardLayout

    from "../../../components/layout/DashboardLayout";

import {

    getAllCorrectionRequests,

    approveCorrectionRequest,

    rejectCorrectionRequest

}

    from "../services/attendanceCorrectionService";


/*
==================================================
Change ID: M06-032
Date: 2026-05-29
Status: Initial
Purpose: Import Audit Service
Risk: Low
Rollback: Remove import
==================================================
*/

import {

    createCorrectionAudit

}

    from "../services/attendanceCorrectionAuditService";

function AdminAttendanceRegularizationPage() {

    const [requests, setRequests]

        = useState([]);

    // const [adminRemark, setAdminRemark]

    //     = useState("");

    /*
    ==================================================
    Change ID: M06-032
    Date: 2026-05-29
    Status: Improved
    Purpose: Per Request Admin Remarks
    Risk: Low
    Rollback: Revert to single state
    ==================================================
    */

    const [adminRemarks, setAdminRemarks]

        = useState({});

        const [statusFilter, setStatusFilter]

        = useState("pending");

    useEffect(() => {

        loadRequests();

    }, []);

    async function loadRequests() {

        try {

            const data =

                await getAllCorrectionRequests();

            setRequests(data);

        } catch (error) {

            console.error(error);
        }
    }

    // async function handleApprove(
    //     id,
    //     adminRemark
    // ) {

    //     console.log("APPROVE ID:", id);

    //     try {

    //         const result =

    //             await approveCorrectionRequest(
    //                 id,
    //                 adminRemark
    //             );

    //         // console.log(result);

    //         // await 
    //         loadRequests();

    //     } catch (error) {

    //         console.error(error);

    //         alert(error.message);
    //     }
    // }

    async function handleApprove(
        id,
        adminRemark
    ) {

        try {

            const request =
                requests.find(
                    item => item.id === id
                );

            await createCorrectionAudit({

                correctionRequestId:
                    id,

                oldStatus:
                    request.status,

                newStatus:
                    "approved",

                adminRemark,

                changedBy:
                    "Admin"

            });

            await approveCorrectionRequest(
                id,
                adminRemark
            );

            await loadRequests();

        }

        catch (error) {

            console.error(error);

        }

    }

    /*
    ==================================================
    Change ID: M06-032
    Date: 2026-05-29
    Status: Initial
    Purpose: Create Audit On Rejection
    Risk: Low
    Rollback: Remove audit creation
    ==================================================
    */

    async function handleReject(

        id,

        adminRemark

    ) {

        try {

            const request =

                requests.find(

                    item => item.id === id

                );
            console.log("AUDIT APPROVE START");
            console.log("AUDIT APPROVE END");

            await createCorrectionAudit({

                correctionRequestId:

                    id,

                oldStatus:

                    request.status,

                newStatus:

                    "rejected",

                adminRemark,

                changedBy:

                    "Admin"

            });
            console.log("AUDIT APPROVE START");
            console.log("AUDIT APPROVE END");
            await rejectCorrectionRequest(

                id,

                adminRemark

            );

            await loadRequests();

        }

        catch (error) {

            console.error(error);

        }

    }


    // async function handleReject(
    //         id,
    //         adminRemark

    //         ) {

    //     try {

    //         await rejectCorrectionRequest(
    //                     id,
    //                     adminRemark
    //                     );

    //                     console.log(
    //                         "REMARK:",
    //                         adminRemark
    //                     );

    //         loadRequests();


    //     } catch (error) {

    //         console.error(error);

    //         alert(error.message);
    //     }
    // }

{/*
    ==================================================
    Change ID: M06-032
    Date: 2026-05-29
    Status: Initial
    Purpose: Filter Requests By Status
    Risk: Low
    Rollback: Use requests directly
    ==================================================
*/}

    const filteredRequests =

    statusFilter === "all"

        ? requests

        : requests.filter(

            (item) =>

                item.status === statusFilter

        );
    return (
        <DashboardLayout>


<div className="mb-4">

<select

    value={statusFilter}

    onChange={(e) =>

        setStatusFilter(
            e.target.value
        )

    }

    className="
border
rounded
p-2
"

>

    <option value="pending">

        Pending

    </option>

    <option value="approved">

        Approved

    </option>

    <option value="rejected">

        Rejected

    </option>

    <option value="all">

        All

    </option>

</select>

</div>
            <div className="p-6">

                <h1
                    className="
text-2xl
font-bold
mb-6
"
                >

                    Attendance Regularization

                </h1>

                <div
                    className="
bg-white
rounded
shadow
p-4
"
                >

                    <table className="w-full">

                        <thead>

                            <tr
                                className="
border-b
text-left
"
                            >

                                <th className="p-2">

                                    Employee

                                </th>

                                <th className="p-2">

                                    Date

                                </th>

                                <th className="p-2">

                                    Reason

                                </th>

                                <th className="p-2">

                                    Status

                                </th>

                                <th className="p-2">

                                    Admin Remark

                                </th>

                                <th className="p-2">

                                    Action

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredRequests.map((item, index) => (

                                    <tr
                                        key={`${item.id}-${index}`}
                                        className="border-b"
                                    >

                                        {/* <td className="p-2">

                                        {

                                            item.employee_id
                                        }

                                    </td> */}

                                        <td className="p-2">

                                            {
                                                item.employees
                                                    ? `${item.employees.employee_code} - ${item.employees.full_name}`
                                                    : item.employee_id
                                            }

                                        </td>


                                        <td className="p-2">

                                            {

                                                item.correction_date
                                            }

                                        </td>

                                        <td className="p-2">

                                            {

                                                item.reason
                                            }

                                        </td>


                                        <td className="p-2">

                                            {

                                                item.status
                                            }

                                        </td>

                                        <td className="p-2">

                                            {/* <textarea

                                            rows="2"

                                            value={adminRemark}

                                            onChange={(e) =>

                                                setAdminRemark(
                                                    e.target.value
                                                )

                                            }

                                            className="
border
p-1
rounded
w-full
"

                                            placeholder="

"

                                        /> */}

                                            <textarea

                                                rows="2"

                                                value={

                                                    adminRemarks[item.id]

                                                    || ""

                                                }

                                                onChange={(e) =>

                                                    setAdminRemarks({

                                                        ...adminRemarks,

                                                        [item.id]:

                                                            e.target.value

                                                    })

                                                }

                                                className="
border
p-1
rounded
w-full
"

                                            />



                                        </td>

                                        <td className="p-2 space-x-2">



                                            <button

                                            onClick={() =>

                                                handleApprove(

                                                    item.id,

                                                    adminRemarks[item.id]

                                                    || ""

                                                )

                                            }

                                            className="
bg-green-600
text-white
px-2
py-1
rounded
"

                                        >

                                            Approve

                                        </button> 

                                             <button

                                            onClick={() =>


                                                handleReject(

                                                    item.id,

                                                    adminRemarks[item.id]

                                                    || ""

                                                )

                                            }

                                            className="
bg-red-600
text-white
px-2
py-1
rounded
"

                                        >

                                            Reject

                                        </button>

            
                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>
        </DashboardLayout>

    );

}

export default AdminAttendanceRegularizationPage;