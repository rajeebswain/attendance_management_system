import { useState } from "react";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import {

    createLeave

}

    from "../services/leaveService";

// function LeaveForm() {

function LeaveForm({

    employeeId
    
    }) {

    const [leaveType, setLeaveType] = useState("");

    const [startDate, setStartDate] = useState("");

    const [endDate, setEndDate] = useState("");

    const [reason, setReason] = useState("");

    async function handleSubmit(e){

        e.preventDefault();
        
        try{



/*
==================================================
Change ID: M07-008
Date: 2026-05-31
Status: Initial
Purpose: Prevent past leave requests
Risk: Low
Rollback: Remove validation
==================================================
*/

const today = new Date();

today.setHours(
    0,
    0,
    0,
    0
);

const leaveStartDate =

    new Date(startDate);

leaveStartDate.setHours(
    0,
    0,
    0,
    0
);

if (

    leaveStartDate < today

) {

    alert(

        "Cannot apply leave for past dates"

    );

    return;

}



/*
==================================================
Change ID: M07-008A
Date: 2026-05-31
Status: Initial
Purpose: Prevent invalid date range
Risk: Low
Rollback: Remove validation
==================================================
*/

const leaveEndDate =

    new Date(endDate);

leaveEndDate.setHours(
    0,
    0,
    0,
    0
);

if (

    leaveEndDate < leaveStartDate

) {
/home/rajeebswain/attendance_management_system/src/features/leaves/pages
    alert(

        "End date cannot be before start date"

    );

    return;

}



        
        await createLeave({
        
        // employee_id:"d1d21e78-b843-46bc-9041-5cc5c9ab4bcd",
        employee_id:employeeId,
        
        leave_type:leaveType,
        
        start_date:startDate,
        
        end_date:endDate,
        
        reason,
        
        status:"pending"
        
        });
        
        alert(
        
        "Leave request submitted"
        
        );
        
        setLeaveType("");
        
        setStartDate("");
        
        setEndDate("");
        
        setReason("");
        
        }
        
        catch(error){
        
        alert(
        
        error.message
        
        );
        
        }
        
        }

    return (

        <Card>

            <h2 className="text-2xl font-bold mb-4">

                Apply Leave

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <select
                    value={leaveType}
                    onChange={(e) =>
                        setLeaveType(e.target.value)
                    }
                    className="w-full border rounded p-3"
                >

                    <option value="">
                        Select Leave Type
                    </option>

                    <option value="casual">
                        Casual Leave
                    </option>

                    <option value="sick">
                        Sick Leave
                    </option>

                    <option value="earned">
                        Earned Leave
                    </option>

                    <option value="emergency">
                        Emergency Leave
                    </option>

                </select>

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                        setStartDate(e.target.value)
                    }
                    className="w-full border rounded p-3"
                />

                <input
                    type="date"
                    value={endDate}
                    onChange={(e) =>
                        setEndDate(e.target.value)
                    }
                    className="w-full border rounded p-3"
                />

                <textarea
                    placeholder="Reason"
                    value={reason}
                    onChange={(e) =>
                        setReason(e.target.value)
                    }
                    className="w-full border rounded p-3"
                />

                <Button type="submit">

                    Apply Leave

                </Button>

            </form>

        </Card>

    );

}

export default LeaveForm;