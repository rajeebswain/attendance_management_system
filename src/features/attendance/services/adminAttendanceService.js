import { supabase }

from "../../../lib/supabase/client";

{/*
==================================================
ARCH-012
Date: 2026-05-26
Time: 16:00 IST
Status: ACTIVE

Purpose:
Use Smart Attendance plugin overtime logic.

Risk:
LOW

Rollback:
Remove plugin import
==================================================
*/}

// import {

//   calculateOvertime as pluginCalculateOvertime
  
//   }
  
//   from "../../../plugins/smart-attendance-plugin";

// /*
// ==================================================
// ARCH-014
// Date: 2026-05-26
// Time: 16:40 IST
// Status: ACTIVE

// Purpose:
// Use Smart Attendance plugin rules.

// Risk:
// LOW

// Rollback:
// Restore previous imports
// ==================================================
// */

// import {

//   calculateOvertime as pluginCalculateOvertime,
  
//   isWeeklyOff as pluginIsWeeklyOff,
  
//   isHoliday as pluginIsHoliday
  
//   }
  
//   from "../../../plugins/smart-attendance-plugin";


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


// UPDATE ATTENDANCE
export async function updateAttendance(

  attendanceId,

  updatedData

) {

  const { data, error } = await supabase

    .from("attendance")

    .update(updatedData)

    .eq("id", attendanceId)

    .select();

  if (error) {

    throw error;
  }

  return data;
}

// CALCULATE OVERTIME
export function calculateOvertime(

  attendance
) {

  // Missing checkout
  if (

    !attendance.check_in

    || !attendance.check_out
  ) {

    return {

      workedHours: 0,

      overtimeHours: 0,
    };
  }
  // Convert check-in
  const checkIn = new Date(

    `1970-01-01T${attendance.check_in}`
  );


  // Convert check-out
  const checkOut = new Date(

    `1970-01-01T${attendance.check_out}`
  );


  // Worked milliseconds
  const workedMs =

    checkOut - checkIn;


  // Convert to hours
  const workedHours =

    workedMs / (1000 * 60 * 60);


  // Default shift hours
  const shiftHours = 8;


  // Overtime
  const overtimeHours =

    workedHours > shiftHours

      ? workedHours - shiftHours

      : 0;


  return {

    workedHours:

      workedHours.toFixed(2),

    overtimeHours:

      overtimeHours.toFixed(2),
  };
}


// GET HOLIDAYS
export async function getHolidays() {

  const { data, error } = await supabase

    .from("holidays")

    .select("*")

    .order(

      "holiday_date",

      { ascending: true }
    );

  if (error) {

    throw error;
  }

  return data;
}

// CHECK WEEKLY OFF
export function isWeeklyOff(date) {

  // Convert to date
  const currentDate =

    new Date(date);


  // Sunday = 0
  const day =

    currentDate.getDay();


  // Weekly off
  return day === 0;
}

// CHECK HOLIDAY
export function isHoliday(

  holidays,

  date
) {

  return holidays.some(

    (holiday) =>

      holiday.holiday_date
      === date
  );
}

// CALCULATE ATTENDANCE %
export function calculateAttendancePercentage(

  attendanceRecords,

  holidays
) {

  // No attendance
  if (

    attendanceRecords.length === 0
  ) {

    return "0";
  }


  // Present days
  const presentDays =

    attendanceRecords.filter(

      (record) =>

        record.status === "present"

        ||

        record.status === "late"
    ).length;


  // Total working days
  let workingDays = 0;


  // Track processed dates
  const processedDates = [];


  attendanceRecords.forEach(

    (record) => {

      const date =

        record.attendance_date;


      // Skip duplicate
      if (

        processedDates.includes(date)
      ) {

        return;
      }


      processedDates.push(date);


      // // Weekly off
      const weeklyOff =

        isWeeklyOff(date);


      // Holiday
      const holidayCheck =

        isHoliday(

          holidays,

          date
        );

      // const weeklyOff =

      // pluginIsWeeklyOff(date);
      
      
      // const holidayCheck =
      
      // pluginIsHoliday(
      // holidays,
      // date
      // );
      // Count working day
      if (

        !weeklyOff

        && !holidayCheck
      ) {

        workingDays++;
      }
    }
  );


  // Prevent divide by zero
  if (workingDays === 0) {

    return "0";
  }


  // Calculate percentage
  const percentage =

    (presentDays / workingDays)

    * 100;


  return percentage.toFixed(2);
}


// MONTHLY SUMMARY
export function generateMonthlySummary(

  attendanceRecords,

  holidays
) {

  const summary = {};


  attendanceRecords.forEach(

    (record) => {

      const employee =

        record.employee_name;


      // Create employee summary
      if (!summary[employee]) {

        summary[employee] = {

          employee_name: employee,

          present: 0,

          late: 0,

          absent: 0,

          overtime: 0,
        };
      }


   
      if (

        record.status === "present"
      
        ||
      
        record.status === "late"
      ) {

        summary[employee].present++;
      }


      // Late
      if (

        record.status === "late"
      ) {

        summary[employee].late++;
      }


      // Overtime
      const overtimeData =

        calculateOvertime(record);

//       const overtimeData =

// pluginCalculateOvertime(record);


      summary[employee].overtime +=

        Number(

          overtimeData.overtimeHours
        );
    }
  );


  return Object.values(summary);
}