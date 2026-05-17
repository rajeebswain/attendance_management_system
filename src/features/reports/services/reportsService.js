import { supabase }

from "../../../lib/supabase/client";



/* =====================================================

   GET REPORT DATA

===================================================== */

export async function getReportsData() {

  const { data, error } = await supabase

    .from("attendance")

    .select(`
      *,
      employees (
        full_name,
        department,
        shift_name
      )
    `);

  if (error) {

    console.error(error);

    return [];
  }

  return data;
}