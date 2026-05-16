import { supabase }

  from "../../../lib/supabase/client";


// // TEST EMPLOYEE QUERY
// export async function testEmployeeQuery() {

// const { data, error } = await supabase

//   .from("employees")

//   .select(`
//     *,
//     shifts (
//       shift_name,
//       start_time,
//       end_time,
//       grace_minutes
//     )
//   `);
//   if (error) {

//     throw error;
//   }

//   return data;
// }


// TEST EMPLOYEE QUERY
export async function testEmployeeQuery() {

  // Get employees
  const { data, error } = await supabase

    .from("employees")

    .select("*");


  if (error) {

    throw error;
  }


  // No employee
  if (!data?.length) {

    return [];
  }


  // First employee
  const employee = data[0];


  // Load shift separately
  if (employee.shift_id) {

    const {

      data: shiftData,

      error: shiftError,

    } = await supabase

      .from("shifts")

      .select("*")

      .eq("id", employee.shift_id)

      .maybeSingle();


    if (shiftError) {

      throw shiftError;
    }


    // Attach shift manually
    employee.shifts = shiftData;
  }


  return [employee];
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

// DETECT ATTENDANCE STATUS
function detectAttendanceStatus(

  employee

) {

  // Current time
  const now = new Date();


  // Employee shift
  const shift = employee.shifts;


  // Safety check
  if (!shift) {

    return "present";
  }


  // Extract shift start time
  const [hour, minute] =

    shift.start_time

      .split(":")
      .map(Number);


  // Shift start object
  const shiftStart = new Date();

  shiftStart.setHours(

    hour,

    minute,

    0
  );


  // Add grace period
  shiftStart.setMinutes(

    shiftStart.getMinutes()

    + shift.grace_minutes
  );


  console.log(

    "CURRENT TIME:",

    now
  );

  console.log(

    "LATE AFTER:",

    shiftStart
  );


  // Compare
  if (now > shiftStart) {

    return "late";
  }


  return "present";
}

// BASIC CHECK-IN
export async function checkInEmployee(

  employee

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

      employee_id: employee.Id,

      attendance_date: today,

      check_in: currentTime,

      // status: "present",
      status:

  detectAttendanceStatus(
    employee
  )
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