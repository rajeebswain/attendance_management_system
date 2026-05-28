/*
==================================================
Module: M06-027
Feature: Attendance Correction Request
Purpose: Employee attendance correction workflow
Risk: Low
Rollback: Remove page
==================================================
*/

import { useState, useEffect } from "react";

import EmployeeLayout

    from "../../../modules/employee-self-service/layout/EmployeeLayout";

import {

    createCorrectionRequest,
    getCorrectionRequests

}

    from "../services/attendanceCorrectionService";

function EmployeeAttendanceCorrectionPage() {

    const [correctionDate, setCorrectionDate]

        = useState("");

    const [reason, setReason]

        = useState("");

    const [requests, setRequests]

        = useState([]);

    useEffect(() => {

        loadRequests();

    }, []);

    async function handleSubmit() {

        try {

            /*
            Temporary employee ID

            Production:
            Use auth session mapping
            */

            const employeeId =

                "90b6e971-264f-477e-8c40-68cf0567fadc";

            await createCorrectionRequest({

                employeeId,

                correctionDate,

                reason
            });
            loadRequests();

            alert(

                "Correction request submitted"
            );

            setCorrectionDate("");

            setReason("");

        } catch (error) {

            console.error(error);

            alert(error.message);
        }
    }

    async function loadRequests() {

        try {

            const employeeId =

                "90b6e971-264f-477e-8c40-68cf0567fadc";

            const data =

                await getCorrectionRequests(

                    employeeId
                );

            setRequests(data);

        } catch (error) {

            console.error(error);
        }
    }

    return (

        <EmployeeLayout>

            <div className="space-y-6">

                <h1 className="text-2xl font-bold">

                    Attendance Correction Request

                </h1>

                <div
                    className="
bg-white
p-6
rounded
shadow
space-y-4
"
                >

                    <div>

                        <label className="block mb-1">

                            Attendance Date

                        </label>

                        <input
                            type="date"

                            value={correctionDate}

                            onChange={(e) =>

                                setCorrectionDate(
                                    e.target.value
                                )
                            }

                            className="
w-full
border
p-2
rounded
"
                        />

                    </div>

                    <div>

                        <label className="block mb-1">

                            Reason

                        </label>

                        <textarea
                            rows="4"

                            value={reason}

                            onChange={(e) =>

                                setReason(
                                    e.target.value
                                )
                            }

                            placeholder="
Enter correction reason
"

                            className="
w-full
border
p-2
rounded
"
                        />

                    </div>

                    <button

                        onClick={handleSubmit}

                        className="
bg-blue-600
text-white
px-4
py-2
rounded
"
                    >

                        Submit Request

                    </button>

                </div>
                

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
font-semibold
mb-4
"
    >

        Correction Request History

    </h2>

    <table className="w-full">

        <thead>

            <tr
                className="
border-b
text-left
"
            >

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

            </tr>

        </thead>

        <tbody>

            {

                requests.map((item)=>(

                    <tr
                        // key={item.id}

                        key={`${item.id}-${item.created_at}`}
                        className="border-b"
                    >

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

                            {

                                item.admin_remark

                                ||

                                "-"

                            }

                        </td>

                    </tr>

                ))

            }

        </tbody>

    </table>

</div>



            </div>

        </EmployeeLayout>

    );

}

export default EmployeeAttendanceCorrectionPage;