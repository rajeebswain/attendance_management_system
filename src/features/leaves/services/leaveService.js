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


// export async function updateLeaveStatus(

//     id,

//     status,

//     leaveData,

//     adminRemark

// ) {

//     /*
// ==================================================
// Change ID: M07-004A
// Date: 2026-05-30
// Status: Initial
// Purpose: Capture previous status
// Risk: Low
// Rollback: Remove variable
// ==================================================
// */

//     const currentStatus =
//         leaveData.status;


//     const { error } = await supabase

//         .from("leaves")

//         .update({

//             status,

//             admin_remark:
//                 adminRemark,


//             approved_at:
//                 new Date()

//         })


//         .eq(

//             "id",

//             id

//         );

//     if (error) {

//         throw error;

//     }

//     /*
// ==================================================
// Change ID: M07-004A
// Date: 2026-05-30
// Status: Initial
// Purpose: Create leave audit record
// Risk: Low
// Rollback: Remove audit call
// ==================================================
// */

//     await createLeaveAuditLog({

//         leaveId: id,

//         oldStatus:
//             currentStatus,

//         newStatus:
//             status,

//         adminRemark

//     });

//     // if (
//     //     status === "approved"
//     // ) 

//     /*
//     ==================================================
//     Change ID: M07-006
//     Date: 2026-05-30
//     Status: Initial
//     Purpose: Validate leave balance before approval
//     Risk: Medium
//     Rollback: Remove validation call
//     ==================================================
//     */

//     if (

//         status === "approved"

//     ) {

//         const duration =

//             calculateLeaveDuration(

//                 leaveData.start_date,

//                 leaveData.end_date

//             );

//         await validateLeaveBalance(

//             leaveData.employee_id,

//             leaveData.leave_type,

//             duration

//         );

//     }


//     {
//         const {

//             data: existingAttendance,

//             error

//         }

//             =

//             await supabase

//                 .from("attendance")

//                 .select("id")

//                 .eq(

//                     "employee_id",

//                     leaveData.employee_id

//                 )

//                 .eq(

//                     "attendance_date",

//                     leaveData.start_date

//                 );


//         /* Create attendance only if none exists */

//         if (

//             !existingAttendance ||

//             existingAttendance.length === 0

//         ) {

//             await supabase

//                 .from("attendance")

//                 .insert([{

//                     employee_id:

//                         leaveData.employee_id,

//                     attendance_date:

//                         leaveData.start_date,

//                     status: "leave"

//                 }]);

//         }
//         console.log(
//             "VALIDATION RUNNING"
//         );

//     }


// }



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

    /*
    ==================================================
    Change ID: M07-006
    Date: 2026-05-31
    Status: Initial
    Purpose: Validate leave balance before approval
    Risk: Medium
    Rollback: Remove validation
    ==================================================
    */

    if (

        status === "approved"

    ) {

        const duration =

            calculateLeaveDuration(

                leaveData.start_date,

                leaveData.end_date

            );

        await validateLeaveBalance(

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

                    leaveData.start_date

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

                        leaveData.start_date,

                    status: "leave"

                }]);

        }

    }

}



export async function deductLeaveBalance(

    employeeId,

    leaveType

) {

    const columnMap = {

        casual: "casual_leave",

        sick: "sick_leave",

        earned: "earned_leave"

    };

    const column =

        columnMap[leaveType];

    const { data } = await supabase

        .from("employees")

        .select(column)

        .eq("id", employeeId)

        .single();

    const currentBalance =

        data[column];

    if (currentBalance <= 0) {

        throw new Error(

            "No leave balance remaining"

        );

    }

    await supabase

        .rpc(

            "decrement_leave",

            {

                employee_id_input: employeeId,

                column_name_input: column

            }

        );

}

