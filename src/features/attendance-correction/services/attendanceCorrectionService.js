/*
==================================================
Module: M06-027
Feature: Attendance Correction Service
Purpose: Save employee correction requests
Risk: Low
Rollback: Remove service
==================================================
*/

import { supabase }

from "../../../lib/supabase/client";

// CREATE CORRECTION REQUEST
export async function createCorrectionRequest({

    employeeId,

    correctionDate,

    reason

}) {

    const { data, error }

    = await supabase

        .from("attendance_corrections")

        .insert([

            {

                employee_id: employeeId,

                correction_date: correctionDate,

                reason,

                status: "pending"

            }

        ])

        .select();

    if(error){

        throw error;
    }

    return data;
}

/*
==================================================
Module: M06-027
Feature: Fetch Correction Requests
Purpose: Employee request history
Risk: Low
Rollback: Remove function
==================================================
*/

export async function getCorrectionRequests(

    employeeId

){

    const { data, error }

    = await supabase

        // .from("attendance_corrections")

        // .select("*")

        .from("attendance_corrections")
.select(`
    *,
    employees(
        employee_code,
        full_name
    )
`)






        .eq(

            "employee_id",

            employeeId
        )

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


/*
==================================================
Module: M06-032
Feature: Fetch All Correction Requests
Purpose: Admin regularization management
Risk: Low
Rollback: Remove function
==================================================
*/

// export async function getAllCorrectionRequests(){

//     const { data, error }

//     = await supabase

//         .from("attendance_corrections")

//          .select("*")

//         .order(

//             "created_at",

//             {

//                 ascending: false
//             }

//         );

//     if(error){

//         throw error;
//     }

//     return data;
// }

export async function getAllCorrectionRequests(){

    const { data, error }

    = await supabase

        .from("attendance_corrections")

        .select(`
            *,
            employees(
                employee_code,
                full_name
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

export async function approveCorrectionRequest(
                id,

                adminRemark
                ){

    console.log("SERVICE ID:", id);

    const {

        data,

        error

    }

    = await supabase

        .from("attendance_corrections")

        .update({

            status: "approved",
            admin_remark:

        adminRemark

        })

        .eq("id", id)

        .select();

    console.log(

        "UPDATED DATA:",

        data
    );

    if(error){

        throw error;
    }

    return data;
}

export async function rejectCorrectionRequest(
                id,

                adminRemark
                
                ){

    const { error }

    = await supabase

        .from("attendance_corrections")

        .update({

            status: "rejected",

            admin_remark:

            adminRemark

        })

        .eq("id", id);

    if(error){

        throw error;
    }
}