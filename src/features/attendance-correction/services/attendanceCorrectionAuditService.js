/*
==================================================
Change ID: M06-032
Date: 2026-05-29
Status: Initial
Purpose: Create Audit Record
Risk: Low
Rollback: Remove function
==================================================
*/
// import { supabase }

// from "../../../lib/supabase/client";
// export async function createCorrectionAudit({

//     correctionRequestId,

//     oldStatus,

//     newStatus,

//     adminRemark,

//     changedBy

// }){

//     console.log(
//         "AUDIT INSERT STARTED"
//     );

//     const { error }

//     = await supabase

//         .from(

//             "attendance_correction_audit"

//         )

//         .insert([{

//             correction_request_id:

//                 correctionRequestId,

//             old_status:

//                 oldStatus,

//             new_status:

//                 newStatus,

//             admin_remark:

//                 adminRemark,

//             changed_by:

//                 changedBy

//         }]);

//     if(error){

//         console.error(

//             "AUDIT ERROR",

//             error

//         );

//         throw error;

//     }

//     console.log(

//         "AUDIT SUCCESS"

//     );

// }

import { supabase }

from "../../../lib/supabase/client";


export async function createCorrectionAudit({

    correctionRequestId,

    oldStatus,

    newStatus,

    adminRemark,

    changedBy

}){

    const { error }

    = await supabase

        .from(

            "attendance_correction_audit"

        )

        .insert([{

            correction_request_id:
                correctionRequestId,

            old_status:
                oldStatus,

            new_status:
                newStatus,

            admin_remark:
                adminRemark,

            changed_by:
                changedBy

        }]);

    if(error){

        throw error;

    }

}


export async function getCorrectionAuditLogs(){

    const { data, error }

    = await supabase

        .from(

            "attendance_correction_audit"

        )

        // .select("*")

        .select(`
    *,
    attendance_corrections(
        employee_id,
        employees(
            employee_code,
            full_name
        )
    )
`)

        .order(

            "created_at",

            {

                ascending: false

            }

        );

    if(error){

        throw error;

    }

    return data;

}