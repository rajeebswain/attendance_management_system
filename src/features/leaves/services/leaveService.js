import { supabase } from "../../../lib/supabase/client";

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

    //     .select(`
    
    // *,
    
    // employees(
    
    // full_name,
    
    // employee_code
    
    // )
    
    // `);
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

/*export async function updateLeaveStatus(

    id,

    status

) {

    const { error } = await supabase

        .from("leaves")

        .update({

            status

        })

        .eq(

            "id",

            id

        );

    if (error) {

        throw error;

    }

}*/


export async function updateLeaveStatus(

    id,

    status,

    leaveData,

    adminRemark

) {

    const { error } = await supabase

        .from("leaves")

        // .update({

        //     status

        // })
        .update({

            status,

            admin_remark:
                adminRemark,

            // approved_by:
            //     "Admin",

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


    /* Create attendance if approved */

    /* if (
 
         status === "approved"
 
     ) {
 
         const { error: attendanceError }
 
             =
 
             await supabase
 
                 .from("attendance")
 
                 .insert([{
 
                     employee_id:
 
                         leaveData.employee_id,
 
                     attendance_date:
 
                         leaveData.start_date,
 
                     status:
 
                         "leave"
 
                 }]);
 
 
         if (attendanceError) {
 
             console.log(
 
                 attendanceError
 
             );
 
         }
 
     } */
    if (status === "approved") {

        const {

            data: existingAttendance,

            error

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


        /* Create attendance only if none exists */

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