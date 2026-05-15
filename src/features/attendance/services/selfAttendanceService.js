import { supabase }

from "../../../lib/supabase/client";


// FETCH CURRENT EMPLOYEE
export async function getCurrentEmployee(

  userId

) {

  const { data, error } = await supabase

    .from("employees")

    .select(`
      *,
      shifts:shift_id(
        *
      )
    `)
    .eq("user_id", userId)

    .maybeSingle();

  if (error) {

    throw error;
  }

  return data;
}


// TODAY ATTENDANCE
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


// LATE DETECTION
function detectAttendanceStatus(employee) {

  const now = new Date();


  const shift = employee.shifts;


  const [hour, minute] =

    shift.start_time

      .split(":")
      .map(Number);


  const shiftStart = new Date();

  shiftStart.setHours(

    hour,

    minute,

    0
  );


  shiftStart.setMinutes(

    shiftStart.getMinutes() +

    shift.grace_minutes
  );


  if (now > shiftStart) {

    return "late";
  }

  return "present";
}


// SELF CHECK-IN
export async function selfCheckIn(

  employee

) {

  const status =

    detectAttendanceStatus(employee);


  const today = new Date()

    .toISOString()

    .split("T")[0];


  // Auto current time
  const currentTime = new Date()

    .toLocaleTimeString(

      "en-GB",

      {

        hour: "2-digit",

        minute: "2-digit",

        hour12: false,
      }
    );


  const { data, error } = await supabase

    .from("attendance")

    .insert([{

      employee_id: employee.id,

      attendance_date: today,

      status,

      check_in: currentTime,
    }])

    .select();

  if (error) {

    throw error;
  }

  return data;
}


// SELF CHECK-OUT
export async function selfCheckOut(

  attendance

) {

  // Prevent duplicate checkout
  if (attendance.check_out) {

    throw new Error(

      "Already checked out"
    );
  }


  const currentTime = new Date()

    .toLocaleTimeString(

      "en-GB",

      {

        hour: "2-digit",

        minute: "2-digit",

        hour12: false,
      }
    );


  const { data, error } = await supabase

    .from("attendance")

    .update({

      check_out: currentTime,
    })

    .eq("id", attendance.id)

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

    .select(`
      *,
      employees (
        full_name,
        shifts (
          shift_name
        )
      )
    `)

    .eq("employee_id", employeeId)

    .order("attendance_date", {

      ascending: false,
    });

  if (error) {

    throw error;
  }

  return data;
}