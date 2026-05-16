import { supabase }

from "../../../lib/supabase/client";


// TEST EMPLOYEE QUERY
export async function testEmployeeQuery() {

  const { data, error } = await supabase

    .from("employees")

    .select("*");


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

  // GET TODAY ATTENDANCE
export async function getTodayAttendance(

  employeeId

) {

  // Current date
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