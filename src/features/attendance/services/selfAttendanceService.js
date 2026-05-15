import { supabase }

from "../../../lib/supabase/client";


// FETCH CURRENT EMPLOYEE
export async function getCurrentEmployee(

  userId

) {

  const { data, error } = await supabase

    .from("employees")

    .select("*")

    .eq("user_id", userId)

    .maybeSingle();

  if (error) {

    throw error;
  }

  return data;
}