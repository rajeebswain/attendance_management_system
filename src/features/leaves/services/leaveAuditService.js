/*
==================================================
Change ID: M07-004A
Date: 2026-05-30
Status: Initial
Purpose: Leave audit logging service
Risk: Low
Rollback: Remove service
==================================================
*/

import { supabase }

    from "../../../lib/supabase/client";

export async function createLeaveAuditLog({

    leaveId,

    oldStatus,

    newStatus,

    adminRemark

}) {

    const { error } =

        await supabase

            .from("leave_audit_logs")

            .insert([{

                leave_id: leaveId,

                old_status: oldStatus,

                new_status: newStatus,

                admin_remark: adminRemark

            }]);

    if (error) {

        throw error;

    }

}

/*
==================================================
Change ID: M07-004B
Date: 2026-05-30
Status: Initial
Purpose: Load leave audit history
Risk: Low
Rollback: Remove function
==================================================
*/

export async function getLeaveAuditLogs(

    leaveId

) {

    const {

        data,

        error

    }

        =

        await supabase

            .from(

                "leave_audit_logs"

            )

            .select("*")

            .eq(

                "leave_id",

                leaveId

            )

            .order(

                "changed_at",

                {

                    ascending:false

                }

            );

    if(error){

        throw error;

    }

    return data;

}