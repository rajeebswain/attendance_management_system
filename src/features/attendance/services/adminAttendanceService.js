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

// GET ABSENT EMPLOYEES
export async function getAbsentEmployees() {

    // Today's date
    const today = new Date()
  
      .toISOString()
  
      .split("T")[0];
  
  
    // Get all employees
    const {
  
      data: employees,
  
      error: employeeError,
  
    } = await supabase
  
      .from("employees")
  
      .select(`
        *,
        shifts (
          shift_name
        )
      `);
  
  
    if (employeeError) {
  
      throw employeeError;
    }
  
  
    // Get today's attendance
    const {
  
      data: attendance,
  
      error: attendanceError,
  
    } = await supabase
  
      .from("attendance")
  
      .select("employee_id")
  
      .eq("attendance_date", today);
  
  
    if (attendanceError) {
  
      throw attendanceError;
    }
  
  
    // Attendance employee IDs
    const attendanceIds =
  
      attendance.map((item) =>
  
        item.employee_id
      );
  
  
    // Find absent employees
    const absentEmployees =
  
      employees.filter((employee) =>
  
        !attendanceIds.includes(
          employee.id
        )
      );
  
  
    return absentEmployees;
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