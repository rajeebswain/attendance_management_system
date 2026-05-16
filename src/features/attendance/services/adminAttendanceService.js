import { supabase }

from "../../../lib/supabase/client";


// GET ALL ATTENDANCE
export async function getAllAttendance() {

  // Attendance query
  const { data, error } = await supabase

    .from("attendance")

    .select(`
      *,
      employees (
        full_name,
        shifts (
          shift_name
        )
      )
    `)

    .order(

      "attendance_date",

      {

        ascending: false,
      }
    );


  if (error) {

    throw error;
  }


  // Format data
  const formattedData =

    data.map((item) => ({

      ...item,

      employee_name:

        item.employees?.full_name,

      shift_name:

        item.employees?.shifts?.shift_name,
    }));


  return formattedData;
}