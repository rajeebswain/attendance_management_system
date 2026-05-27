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

    // const user = await getCurrentUser();

    // if (!user) {

    //     return null;

    // }
    /*
==================================================
Change ID: M06-015
Date: 2026-05-26
Status: Temporary
Purpose: Allow dashboard while auth
is incomplete
Risk: Medium
Rollback: Restore getCurrentUser()
==================================================
*/

    const user = await getCurrentUser();

    /*
    Temporary bridge until M02 auth
    is completed
    */

    const email =

        user?.email

        ||

        "rajeeb@example.com";

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

            // .eq(

            //     "email",

            //     user.email

            // )
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