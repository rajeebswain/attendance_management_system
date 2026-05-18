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
      shift_name
    )
  `);

  if (error) {

    console.error(error);

    return [];
  }

  return data;
}


/* =====================================================

   Calculate Over Time

===================================================== */

export const calculateOvertime = (

  attendance

) => {

  if (

    !attendance.check_in ||

    !attendance.check_out

  ) {

    return 0;
  }



  const checkIn =

    new Date(

      `1970-01-01T${attendance.check_in}`

    );



  const checkOut =

    new Date(

      `1970-01-01T${attendance.check_out}`

    );



  const workedHours =

    (

      checkOut - checkIn

    ) /

    (1000 * 60 * 60);



  const overtime =

    workedHours - 8;



  return overtime > 0

    ? overtime.toFixed(2)

    : 0;
};