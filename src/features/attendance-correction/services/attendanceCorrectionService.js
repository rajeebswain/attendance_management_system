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

        .from("attendance_corrections")

        .select("*")

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