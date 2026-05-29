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

    useEffect(()=>{

        loadLogs();

    },[]);

    async function loadLogs(){

        try{

            const data

            = await getCorrectionAuditLogs();

            setLogs(data || []);

        }

        catch(error){

            console.error(error);

        }

    }

    return (

        <DashboardLayout>

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

                                logs.map(

                                    (item,index)=>(

                                        <tr
                                            key={`${item.id}-${index}`}
                                            className="
border-b
"
                                        >

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