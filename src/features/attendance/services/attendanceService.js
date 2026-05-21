// Centralized Supabase client
import { supabase } from "../../../lib/supabase/client";


// FETCH ALL ATTENDANCE RECORDS
export async function getAttendanceRecords(

  // archiveFilter = false

) {

  const { data, error }

    = 

    await supabase

      .from("attendance")

      .select(`
  *,
  employees(
  employee_code,
  full_name,
  designation
  )
  `)

      // .eq(
      //   "is_archived",
      //   archiveFilter
      // )

      .order(
        "attendance_date",
        {
          ascending: false
        }
      );

  if (error) {

    throw error;

  }

  return data;

}

// CREATE ATTENDANCE
export async function createAttendance(

  attendanceData

) {

  const { data, error } = await supabase

    .from("attendance")

    .insert([attendanceData])

    .select();

  // Handle insert errors
  if (error) {

    throw error;
  }

  return data;
}


// FETCH EMPLOYEES
// Used in attendance dropdown

export async function getEmployees() {

  const { data, error } = await supabase

    .from("employees")

    .select(`
  
  id,
  employee_code,
  full_name,
  email,
  designation,
  shift_id,
  
  shifts(
  id,
  shift_name,
  start_time,
  end_time,
  grace_minutes
  )
  
  `)

    .order("full_name");

  if (error) {

    throw error;

  }

  return data;

}


export async function getHolidays() {

  const { data, error } = await supabase

    .from("holidays")

    .select("*");

  if (error) {

    throw error;

  }

  return data;

}

// Adding  Admin Update Attendance Feature 21-05-2026 – 12:49 PM 

export async function updateAttendance(
  id,
  data
) {

  const { error }

    = await supabase

      .from("attendance")

      .update(data)

      .eq(
        "id",
        id
      );

  if (error) {

    throw error;

  }

}

// Added the Attendace work flow correction Case2 

export async function createCheckIn(data) {

  const {

    data: attendance,

    error

  }

    =

    await supabase

      .from("attendance")

      .insert([data])

      .select()

      .single();

  if (error) {

    throw error;

  }

  return attendance;

}



// archive function

export async function archiveAttendance(

  id

) {

  const {

    error

  }

    =

    await supabase

      .from("attendance")

      .update({

        is_archived: true

      })

      .eq(

        "id",

        id

      );

  if (error) {

    throw error;

  }

}

// Restore Attendance
export async function restoreAttendance(

  id

) {

  const { error }

    =

    await supabase

      .from("attendance")

      .update({

        is_archived: false

      })

      .eq(
        "id",
        id
      );

  if (error) {

    throw error;

  }

}
