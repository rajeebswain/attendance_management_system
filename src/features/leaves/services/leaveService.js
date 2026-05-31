import { supabase } from "../../../lib/supabase/client";

/*
==================================================
Change ID: M07-004A
Date: 2026-05-30
Status: Initial
Purpose: Audit integration
Risk: Low
Rollback: Remove import
==================================================
*/

import {

    createLeaveAuditLog

}

    from "./leaveAuditService";

export async function createLeave(data) {


    await validateLeaveOverlap(

        data.employee_id,
    
        data.start_date,
    
        data.end_date
    
    );




    const { error } = await supabase

        .from("leaves")

        .insert([data]);

    if (error) {

        throw error;

    }

}


export async function getLeaves() {

    const { data, error } = await supabase

        .from("leaves")

        .select(`
    id,
    employee_id,
    leave_type,
    start_date,
    end_date,
    reason,
    status,
    created_at,
    admin_remark,
    approved_by,
    approved_at,
    employees(
        full_name,
        employee_code
    )
`)

    if (error) {

        throw error;

    }

    return data;

}



/*
==================================================
Change ID: M07-006
Date: 2026-05-30
Status: Initial
Purpose: Validate leave balance
Risk: Medium
Rollback: Remove validation
==================================================
*/

async function validateLeaveBalance(

    employeeId,

    leaveType,

    duration

) {

    const columnMap = {

        casual:
            "casual_leave",

        sick:
            "sick_leave",

        earned:
            "earned_leave"

    };

    const column =

        columnMap[leaveType];

    const {

        data,

        error

    }

        =

        await supabase

            .from("employees")

            .select(column)

            .eq(
                "id",
                employeeId
            )

            .single();

    if (error) {

        throw error;

    }

    if (

        data[column]

        <

        duration

    ) {

        throw new Error(

            "Insufficient Leave Balance"

        );

    }

}

/*
==================================================
Change ID: M07-006
Date: 2026-05-31
Status: Initial
Purpose: Calculate leave duration
Risk: Low
Rollback: Remove function
==================================================
*/

function calculateLeaveDuration(

    startDate,

    endDate

) {

    const start =

        new Date(startDate);

    const end =

        new Date(endDate);

    const diff =

        end - start;

    return (

        Math.floor(

            diff /

            (1000 * 60 * 60 * 24)

        ) + 1

    );

}


/*
==================================================
Change ID: M07-011
Date: 2026-05-31
Status: Initial
Purpose: Generate leave attendance dates
Risk: Medium
Rollback: Remove helper
==================================================
*/

function getLeaveDates(

    startDate,

    endDate

) {

    const dates = [];

    const current =

        new Date(startDate);

    const end =

        new Date(endDate);

    while (

        current <= end

    ) {

        dates.push(

            current
                .toISOString()
                .split("T")[0]

        );

        current.setDate(

            current.getDate() + 1

        );

    }

    return dates;

}


export async function updateLeaveStatus(

    id,

    status,

    leaveData,

    adminRemark

) {

    /*
    ==================================================
    Change ID: M07-004A
    Date: 2026-05-30
    Status: Initial
    Purpose: Capture previous status
    Risk: Low
    Rollback: Remove variable
    ==================================================
    */

    const currentStatus =
        leaveData.status;

    const duration =

        calculateLeaveDuration(

            leaveData.start_date,

            leaveData.end_date

        );
    /*
==================================================
Change ID: M07-010
Date: 2026-05-31
Status: Initial
Purpose: Handle balance deduction/restoration
Risk: Medium
Rollback: Restore previous logic
==================================================
*/

    if (

        currentStatus !== "approved" &&

        status === "approved"

    ) {

        await validateLeaveBalance(

            leaveData.employee_id,

            leaveData.leave_type,

            duration

        );

        await deductLeaveBalance(

            leaveData.employee_id,

            leaveData.leave_type,

            duration

        );

    }

    if (

        currentStatus === "approved" &&

        status !== "approved"

    ) {

        await restoreLeaveBalance(

            leaveData.employee_id,

            leaveData.leave_type,

            duration

        );

    }

    const { error } = await supabase

        .from("leaves")

        .update({

            status,

            admin_remark:
                adminRemark,

            approved_at:
                new Date()

        })

        .eq(

            "id",

            id

        );

    if (error) {

        throw error;

    }

    /*
    ==================================================
    Change ID: M07-004A
    Date: 2026-05-30
    Status: Initial
    Purpose: Create leave audit record
    Risk: Low
    Rollback: Remove audit call
    ==================================================
    */

    await createLeaveAuditLog({

        leaveId: id,

        oldStatus:
            currentStatus,

        newStatus:
            status,

        adminRemark

    });

    /*
    ==================================================
    Change ID: M07-003
    Date: 2026-05-30
    Status: Initial
    Purpose: Create attendance for approved leave
    Risk: Medium
    Rollback: Remove attendance creation
    ==================================================
    */

    if (

        status === "approved"

    ) {
        /*
        ==================================================
        Change ID: M07-011
        Date: 2026-05-31
        Status: Initial
        Purpose: Create attendance for all leave dates
        Risk: Medium
        Rollback: Restore single-day logic
        ==================================================
        */

        const leaveDates =

            getLeaveDates(

                leaveData.start_date,

                leaveData.end_date

            );

        for (

            const leaveDate

            of

            leaveDates

        ) {

            const {

                data: existingAttendance

            }

                =

                await supabase

                    .from("attendance")

                    .select("id")

                    .eq(

                        "employee_id",

                        leaveData.employee_id

                    )

                    .eq(

                        "attendance_date",

                        leaveDate

                    );

            if (

                !existingAttendance ||

                existingAttendance.length === 0

            ) {

                await supabase

                    .from("attendance")

                    .insert([{

                        employee_id:

                            leaveData.employee_id,

                        attendance_date:

                            leaveDate,

                        status: "leave"

                    }]);

            }

        }


    }

}


/*
==================================================
Change ID: M07-007
Date: 2026-05-31
Status: Initial
Purpose: Deduct leave balance by duration
Risk: Medium
Rollback: Restore previous version
==================================================
*/

export async function deductLeaveBalance(

    employeeId,

    leaveType,

    duration

) {

    const columnMap = {

        casual:
            "casual_leave",

        sick:
            "sick_leave",

        earned:
            "earned_leave"

    };

    const column =

        columnMap[leaveType];

    const {

        data,

        error

    }

        =

        await supabase

            .from("employees")

            .select(column)

            .eq(

                "id",

                employeeId

            )

            .single();

    if (error) {

        throw error;

    }

    const currentBalance =

        data[column];

    const newBalance =

        currentBalance - duration;

    const {

        error: updateError

    }

        =

        await supabase

            .from("employees")

            .update({

                [column]:
                    newBalance

            })

            .eq(

                "id",

                employeeId

            );

    if (updateError) {

        throw updateError;

    }

}


/*
==================================================
Change ID: M07-010
Date: 2026-05-31
Status: Initial
Purpose: Restore leave balance
Risk: Medium
Rollback: Remove function
==================================================
*/

export async function restoreLeaveBalance(

    employeeId,

    leaveType,

    duration

) {

    const columnMap = {

        casual:
            "casual_leave",

        sick:
            "sick_leave",

        earned:
            "earned_leave"

    };

    const column =

        columnMap[leaveType];

    const {

        data,

        error

    }

        =

        await supabase

            .from("employees")

            .select(column)

            .eq(

                "id",

                employeeId

            )

            .single();

    if (error) {

        throw error;

    }

    const currentBalance =

        data[column];

    const newBalance =

        currentBalance + duration;

    const {

        error: updateError

    }

        =

        await supabase

            .from("employees")

            .update({

                [column]:
                    newBalance

            })

            .eq(

                "id",

                employeeId

            );

    if (updateError) {

        throw updateError;

    }

}


/*
==================================================
Change ID: M07-012
Date: 2026-05-31
Status: Initial
Purpose: Prevent overlapping leave requests
Risk: Medium
Rollback: Remove validation
==================================================
*/

export async function validateLeaveOverlap(

    employeeId,

    startDate,

    endDate

) {

    const {

        data,

        error

    }

        =

        await supabase

            .from("leaves")

            .select("id")

            .eq(

                "employee_id",

                employeeId

            )

            .neq(

                "status",

                "rejected"

            )

            .lte(

                "start_date",

                endDate

            )

            .gte(

                "end_date",

                startDate

            );

    if (error) {

        throw error;

    }

    if (

        data &&
        data.length > 0

    ) {

        throw new Error(

            "Leave request overlaps with existing leave"

        );

    }

}