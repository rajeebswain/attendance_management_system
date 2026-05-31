/*
==================================================
Change ID: M07-005C
Date: 2026-05-30
Status: Initial
Purpose: Bulk leave allocation
Risk: Medium
Rollback: Remove service
==================================================
*/

import { supabase }
from "../../../lib/supabase/client";

export async function allocateLeaveBalance({

    casualLeave,

    sickLeave,

    earnedLeave

}) {

    const { error } = await supabase

        .from("employees")

        .update({

            casual_leave:
                casualLeave,

            sick_leave:
                sickLeave,

            earned_leave:
                earnedLeave

        })

        .neq(
            "id",
            ""
        );

    if (error) {

        throw error;

    }

}