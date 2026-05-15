// Supabase client
import { supabase } from "../../../lib/supabase/client";


// FETCH CURRENT EMPLOYEE
export async function getCurrentEmployee(

  userId

) {

  const { data, error } = await supabase

    .from("employees")

    .select(`
      *,
      shifts (
        *
      )
    `)

    .eq("user_id", userId)

    .single();

  if (error) {

    throw error;
  }

  return data;
}


// CHECK TODAY ATTENDANCE
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


// DETECT LATE STATUS
function detectAttendanceStatus(employee) {

  // Current time
  const now = new Date();


  // Employee shift
  const shift = employee.shifts;


  // Shift start extraction
  const [shiftHour, shiftMinute] =

    shift.start_time

      .split(":")
      .map(Number);


  // Create shift datetime
  const shiftStart = new Date();

  shiftStart.setHours(

    shiftHour,

    shiftMinute,

    0
  );


  // Add grace period
  shiftStart.setMinutes(

    shiftStart.getMinutes() +

    shift.grace_minutes
  );


  // Default status
  let status = "present";


  // Late detection
  if (now > shiftStart) {

    status = "late";
  }

  return status;
}


// DETECT NIGHT SHIFT
function isNightShift(shift) {

  return shift.end_time < shift.start_time;
}


// SELF CHECK-IN
export async function selfCheckIn(

  employee

) {

  // Detect attendance status
  const status =

    detectAttendanceStatus(employee);


  // Current date
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


  // Employee shift
  const shift = employee.shifts;


  // Shift start
  const [shiftHour, shiftMinute] =

    shift.start_time

      .split(":")
      .map(Number);


  const shiftStart = new Date();

  shiftStart.setHours(

    shiftHour,

    shiftMinute,

    0
  );


  // Allow only 1 hour early checkin
  const earlyWindow = new Date(

    shiftStart.getTime() -

    60 * 60 * 1000
  );


  // Prevent too early checkin
  if (new Date() < earlyWindow) {

    throw new Error(

      "Too early for check-in"
    );
  }


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

  attendance,

  employee

) {

  // Prevent double checkout
  if (attendance.check_out) {

    throw new Error(

      "Already checked out"
    );
  }


  // Current auto time
  const currentTime = new Date()

    .toLocaleTimeString(

      "en-GB",

      {

        hour: "2-digit",

        minute: "2-digit",

        hour12: false,
      }
    );


  // Overtime detection
  const shift = employee.shifts;


  const [endHour, endMinute] =

    shift.end_time

      .split(":")
      .map(Number);


  const shiftEnd = new Date();

  shiftEnd.setHours(

    endHour,

    endMinute,

    0
  );


  // Overtime threshold
  shiftEnd.setMinutes(

    shiftEnd.getMinutes() + 30
  );


  // Detect overtime
  const isOvertime =

    new Date() > shiftEnd;


  if (isOvertime) {

    console.log("Overtime detected");
  }


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


