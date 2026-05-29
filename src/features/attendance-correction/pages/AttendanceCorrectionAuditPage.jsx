// /*
// ==================================================
// Change ID: M06-032
// Date: 2026-05-29
// Status: Initial
// Purpose: Attendance Correction Audit Page
// Risk: Low
// Rollback: Remove page
// ==================================================
// */

// import DashboardLayout

// from "../../../components/layout/DashboardLayout";

// function AttendanceCorrectionAuditPage() {

//     return (

//         <DashboardLayout>

//             <div className="p-6">

//                 <h1
//                     className="
// text-2xl
// font-bold
// mb-6
// "
//                 >

//                     Attendance Correction Audit

//                 </h1>

//             </div>

//         </DashboardLayout>

//     );

// }

// export default AttendanceCorrectionAuditPage;

/*
==================================================
Change ID: M06-032
Date: 2026-05-29
Status: Initial
Purpose: Attendance Correction Audit Page
Risk: Low
Rollback: Remove page
==================================================
*/

import { useEffect, useState }

    from "react";

import DashboardLayout

    from "../../../components/layout/DashboardLayout";

import {

    getCorrectionAuditLogs

}

    from "../services/attendanceCorrectionAuditService";

function AttendanceCorrectionAuditPage() {

    const [

        logs,

        setLogs

    ]

        = useState([]);
    {/*
==================================================
Change ID: M06-032
Date: 2026-05-29
Status: Improved
Purpose: Add Audit Status Filter State
Risk: Low
Rollback: Remove state
==================================================

*/}
    const [statusFilter, setStatusFilter]

        = useState("all");

    {/*
==================================================
Change ID: M06-032
Date: 2026-05-29
Status: Improved
Purpose: Add Employee Search State
Risk: Low
Rollback: Remove state
==================================================
*/}

    const [

        employeeSearch,

        setEmployeeSearch

    ]

        = useState("");

    {/*
==================================================
Change ID: M06-032
Date: 2026-05-29
Status: Improved
Purpose: Filter Audit Records
Risk: Low
Rollback: Use logs directly
==================================================
*/}

    // const filteredLogs =

    //     statusFilter === "all"

    //         ? logs

    //         : logs.filter(

    //             (item) =>

    //                 item.new_status === statusFilter

    //         );


    const filteredLogs =

        logs.filter(

            (item) => {

                const statusMatch =

                    statusFilter === "all"

                    ||

                    item.new_status

                    === statusFilter;

                const employeeName =

                    item
                        ?.attendance_corrections
                        ?.employees
                        ?.full_name

                    || "";

                const employeeCode =

                    item
                        ?.attendance_corrections
                        ?.employees
                        ?.employee_code

                    || "";

                const employeeMatch =

                    employeeName

                        .toLowerCase()

                        .includes(

                            employeeSearch
                                .toLowerCase()

                        )

                    ||

                    employeeCode

                        .toLowerCase()

                        .includes(

                            employeeSearch
                                .toLowerCase()

                        );

                return (

                    statusMatch

                    &&

                    employeeMatch

                );

            }

        );


    useEffect(() => {

        loadLogs();

    }, []);

    async function loadLogs() {

        try {

            const data

                = await getCorrectionAuditLogs();

            setLogs(data || []);

        }

        catch (error) {

            console.error(error);

        }

    }


    return (

        <DashboardLayout>


            {/*
            
            ==================================================
Change ID: M06-032
Date: 2026-05-29
Status: Improved
Purpose: Add Employee Search UI
Risk: Low
Rollback: Remove input
==================================================
            */}


            <input

                type="text"

                placeholder="Search employee"

                value={employeeSearch}

                onChange={(e) =>

                    setEmployeeSearch(
                        e.target.value
                    )

                }

                className="
border
rounded
p-2
mb-4
ml-2
"

            />

            {/*
==================================================
Change ID: M06-032
Date: 2026-05-29
Status: Improved
Purpose: Add Audit Status Filter UI
Risk: Low
Rollback: Remove dropdown
==================================================
*/}
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

                    <option value="all">

                        All

                    </option>

                    <option value="approved">

                        Approved

                    </option>

                    <option value="rejected">

                        Rejected

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

                    Attendance Correction Audit

                </h1>

                <div
                    className="
bg-white
rounded
shadow
p-4
"
                >

                    <table
                        className="
w-full
"
                    >

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

                                    Old Status

                                </th>

                                <th className="p-2">

                                    New Status

                                </th>

                                <th className="p-2">

                                    Admin Remark

                                </th>

                                <th className="p-2">

                                    Changed By

                                </th>

                                <th className="p-2">

                                    Date

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredLogs.map(

                                    (item, index) => (

                                        <tr
                                            key={`${item.id}-${index}`}
                                            className="
border-b
"
                                        >



<td className="p-2">

{

    item
        ?.attendance_corrections
        ?.employees

        ?

        `${item
            .attendance_corrections
            .employees
            .employee_code

        } - ${item
            .attendance_corrections
            .employees
            .full_name

        }`

        :

        "-"

}

</td>
                                            <td className="p-2">

                                                {

                                                    item.old_status

                                                }

                                            </td>

                                            <td className="p-2">

                                                {

                                                    item.new_status

                                                }

                                            </td>

                                            <td className="p-2">

                                                {

                                                    item.admin_remark

                                                }

                                            </td>

                                            <td className="p-2">

                                                {

                                                    item.changed_by

                                                }

                                            </td>

                                            <td className="p-2">

                                                {

                                                    item.created_at

                                                }

                                            </td>

                                      

                                            {
                                                filteredLogs.length === 0 && (

                                                    <tr>

                                                        <td
                                                            colSpan="5"
                                                            className="p-4 text-center"
                                                        >

                                                            No audit records found

                                                        </td>

                                                    </tr>

                                                )
                                            }

                                        </tr>

                                    )

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default AttendanceCorrectionAuditPage;