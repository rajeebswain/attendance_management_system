/*
==================================================
Change ID: M06-013
Date: 2026-05-26
Status: Initial
Purpose: Employee self-service data layer
Risk: Low
Rollback: Remove service
==================================================
*/

import { supabase }

    from "../../../lib/supabase/client";

import {

    getCurrentUser

}

    from "../../../features/auth/services/authService";

/*
Load current employee profile
*/

export async function getCurrentEmployee() {

    /*
    ==================================================
    Change ID: M06-015
    Date: 2026-05-26
    Status: Temporary Fix
    Purpose: Handle missing auth session
    Risk: Medium
    Rollback: Remove after M02 auth
    ==================================================
    */

    let email = "rajeeb@example.com";

    try {

        const user = await getCurrentUser();

        if (user) {

            email = user.email;

        }

    }

    catch (error) {

        console.log(

            "Temporary auth fallback active"

        );

    }

    const {

        data,

        error

    }

        =

        await supabase

            .from("employees")

            .select(`
*,
departments(
department_name
),
shifts(
shift_name
)
`)


            .eq(
                "email",
                email
            )

            .single();

    if (error) {

        throw error;

    }

    return data;

}

export async function getEmployeeAttendanceHistory(
    employeeId
) {

    const { data, error } =

        await supabase

            .from("attendance")

            .select("*")

            .eq(
                "employee_id",
                employeeId
            )

            .order(
                "attendance_date",
                {
                    ascending: false
                }
            );

    if (error) {

        throw error;

    }

    return data;

}

export async function getEmployeeLeaves(
    employeeId
) {

    const { data, error } =

        await supabase

            .from("leaves")

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

    if (error) {

        throw error;
    }

    return data;

}