import { supabase }

from "../../../lib/supabase/client";


// TEST EMPLOYEE QUERY
export async function testEmployeeQuery() {

  const { data, error } = await supabase

    .from("employees")

    // .select("*");
    .select(`
  *,
  shifts (
    *
  )
`)

  if (error) {

    throw error;
  }

  return data;
}


// GET TODAY ATTENDANCE
export async function getTodayAttendance(

  employeeId

) {

  const today = new Date()

    .toISOString()

    .split("T")[0];

  const { data, error } = await supabase

    .from("attendance")

    .select("*")

    .eq("employee_id", employeeId)

    .eq("attendance_date", today)

    .maybeSingle();

  if (error) {

    throw error;
  }

  return data;
}


// BASIC CHECK-IN
export async function checkInEmployee(

  employeeId

) {

  // Current date
  const today = new Date()

    .toISOString()

    .split("T")[0];

  // Current time
  const currentTime = new Date()

    .toLocaleTimeString(

      "en-GB",

      {

        hour: "2-digit",

        minute: "2-digit",

        hour12: false,
      }
    );

  // Insert attendance
  const { data, error } = await supabase

    .from("attendance")

    .insert([{

      employee_id: employeeId,

      attendance_date: today,

      check_in: currentTime,

      status: "present",
    }])

    .select();

  if (error) {

    throw error;
  }

  return data;
}


// CHECK OUT EMPLOYEE
export async function checkOutEmployee(

  attendanceId

) {

  // Current time
  const currentTime = new Date()

    .toLocaleTimeString(

      "en-GB",

      {

        hour: "2-digit",

        minute: "2-digit",

        hour12: false,
      }
    );


  // Update attendance
  const { data, error } = await supabase

    .from("attendance")

    .update({

      check_out: currentTime,
    })

    .eq("id", attendanceId)

    .select();

  if (error) {

    throw error;
  }

  return data;
}

// ATTENDANCE HISTORY
export async function getAttendanceHistory(

  employeeId

) {

  const { data, error } = await supabase

    .from("attendance")

    .select("*")

    .eq("employee_id", employeeId)

    .order("attendance_date", {

      ascending: false,
    });

  if (error) {

    throw error;
  }

  return data;
}