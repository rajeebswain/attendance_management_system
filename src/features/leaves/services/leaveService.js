import { supabase } from "../../../lib/supabase";

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

export async function updateLeaveStatus(

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

}