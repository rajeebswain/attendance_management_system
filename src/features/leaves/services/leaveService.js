import { supabase } from "../lib/supabase";

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
    
    *,
    
    employees(
    
    full_name,
    
    employee_code
    
    )
    
    `);

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

    leaveData

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


    /* Create attendance if approved */

    if (

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