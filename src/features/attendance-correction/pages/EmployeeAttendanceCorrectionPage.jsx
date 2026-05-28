/*
==================================================
Module: M06-027
Feature: Attendance Correction Request
Purpose: Employee attendance correction workflow
Risk: Low
Rollback: Remove page
==================================================
*/

import { useState } from "react";

import EmployeeLayout

from "../../../modules/employee-self-service/layout/EmployeeLayout";

import {

    createCorrectionRequest

}

from "../services/attendanceCorrectionService";

function EmployeeAttendanceCorrectionPage(){

    const [correctionDate, setCorrectionDate]

    = useState("");

    const [reason, setReason]

    = useState("");

    async function handleSubmit(){

        try{

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

            alert(

                "Correction request submitted"
            );

            setCorrectionDate("");

            setReason("");

        }catch(error){

            console.error(error);

            alert(error.message);
        }
    }

    return(

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

                            onChange={(e)=>

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

                            onChange={(e)=>

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

            </div>

        </EmployeeLayout>

    );

}

export default EmployeeAttendanceCorrectionPage;