// Centralized Supabase client
import { supabase } from "../../../lib/supabase/client";


// FETCH ALL ATTENDANCE RECORDS
export async function getAttendanceRecords() {

  // Fetch attendance with employee details
  const { data, error } = await supabase

    .from("attendance")

    .select(`
      *,
      employees (
        employee_code,
        full_name,
        designation
      )
    `)

    .order("attendance_date", {

      ascending: false,
    });

  // Handle fetch errors
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

    .select("*")

    .order("full_name");

  if (error) {

    throw error;
  }

  return data;
}