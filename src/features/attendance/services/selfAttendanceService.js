import { supabase }

  from "../../../lib/supabase/client";







  


// TEST EMPLOYEE QUERY
export async function testEmployeeQuery() {

  // Get employees
  const { data, error } = await supabase

    .from("employees")

    // .select("*");
    .select(`
  id,
  employee_code,
  full_name,
  email,
  shift_id
`)


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
      console.log(

        "SHIFT DATA:",
      
        shiftData
      );
      
      console.log(
      
        "SHIFT ERROR:",
      
        shiftError
      );

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

        second: "2-digit",

        hour12: false,
      }
    );

  // Insert attendance
  const { data, error } = await supabase

    .from("attendance")

    .insert([{

      employee_id: employee.id,

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
// export async function checkOutEmployee(

//   attendanceId

// ) 


/*
==================================================
Change ID: M06-028
Date: 2026-05-28
Status: Updated
Purpose: Save employee early checkout reason
Risk: Medium
Rollback: Restore previous checkout flow
==================================================
*/

// export async function checkOutEmployee(

//   attendanceId,
//   earlyCheckoutReason = null

// ){

//   // Current time
//   const currentTime = new Date()

//     .toLocaleTimeString(

//       "en-GB",

//       {

//         hour: "2-digit",

//         minute: "2-digit",

//         hour12: false,
//       }
//     );


//   // Update attendance
//   const { data, error } = await supabase

//     .from("attendance")

//     // .update({

//     //   check_out: currentTime,
//     // })
//     .update({

//       check_out: currentTime,
    
//       early_checkout_reason:
//         earlyCheckoutReason
    
//     })

//     .eq("id", attendanceId)

//     .select();

//   if (error) {

//     throw error;
//   }

//   return data;
// }


/*
==================================================
Change ID: M04-021
Date: 2026-05-28
Status: Updated
Purpose: Calculate worked hours during checkout
Risk: Medium
Rollback: Restore previous checkout update logic
==================================================
*/

// // CHECK OUT EMPLOYEE
// export async function checkOutEmployee(

//   attendanceId

// ) {

//   // Current time
//   const currentTime = new Date()

//     .toLocaleTimeString(

//       "en-GB",

//       {

//         hour: "2-digit",

//         minute: "2-digit",

//         second: "2-digit",

//         hour12: false,
//       }
//     );

//   // Load attendance record
//   const {

//     data: attendance,

//     error: attendanceError,

//   }

//   = await supabase

//     .from("attendance")

//     .select("*")

//     .eq("id", attendanceId)

//     .single();

//   if(attendanceError){

//     throw attendanceError;

//   }

//   /*
//   ==================================================
//   WORKED HOURS CALCULATION
//   ==================================================
//   */

//   const checkIn =

//     new Date(

//       `1970-01-01T${attendance.check_in}`

//     );

//   const checkOut =

//     new Date(

//       `1970-01-01T${currentTime}`

//     );

//   // Difference in milliseconds
//   const diffMs =

//     checkOut - checkIn;

//   // Convert to seconds
//   const totalSeconds =

//     Math.floor(diffMs / 1000);

//   const hours =

//     String(

//       Math.floor(totalSeconds / 3600)

//     ).padStart(2, "0");

//   const minutes =

//     String(

//       Math.floor(

//         (totalSeconds % 3600) / 60

//       )

//     ).padStart(2, "0");

//   const seconds =

//     String(

//       totalSeconds % 60

//     ).padStart(2, "0");

//   const workedHours =

//     `${hours}:${minutes}:${seconds}`;

//   console.log(

//     "WORKED HOURS:",

//     workedHours

//   );

//   /*
//   Temporary OT logic.

//   Production:
//   Calculate using shift duration.
//   */

//   // const overtime = "00:00:00";
//   const overtimeHours = 0;

//   // Update attendance
//   const { data, error } = await supabase

//     .from("attendance")

//     // .update({

//     //   check_out: currentTime,

//     //   worked_hours: workedHours,

//     //   overtime,

//     // })
//     .update({

//       check_out: currentTime,
    
//       worked_hours:
    
//         totalSeconds / 3600,
    
//       overtime_hours:
    
//         overtimeHours,
    
//     })

//     .eq("id", attendanceId)

//     .select();

//   if (error) {

//     throw error;
//   }

//   return data;
// }

/*
==================================================
Change ID: M06-028
Date: 2026-05-28
Status: Updated
Purpose: Save early checkout reason and calculate worked hours
Risk: Medium
Rollback: Restore previous checkout function
==================================================
*/

// CHECK OUT EMPLOYEE
export async function checkOutEmployee(

  attendanceId,

  earlyReason
) {

  // Current time
  const currentTime = new Date()

    .toLocaleTimeString(

      "en-GB",

      {

        hour: "2-digit",

        minute: "2-digit",

        second: "2-digit",

        hour12: false,
      }
    );

  // Load attendance record
  const {

    data: attendance,

    error: attendanceError,

  }

  = await supabase

    .from("attendance")

    .select("*")

    .eq("id", attendanceId)

    .single();

  // Attendance fetch error
  if (

    attendanceError

  ) {

    throw attendanceError;
  }

  /*
  ==================================================
  WORKED HOURS CALCULATION
  ==================================================
  */

  // Check-in datetime
  const checkIn =

    new Date(

      `1970-01-01T${attendance.check_in}`

    );

  // Check-out datetime
  const checkOut =

    new Date(

      `1970-01-01T${currentTime}`

    );

  // Difference in milliseconds
  const diffMs =

    checkOut - checkIn;

  // Convert to total seconds
  const totalSeconds =

    Math.floor(

      diffMs / 1000
    );

  // Convert to decimal hours
  const workedHours =

    totalSeconds / 3600;

  console.log(

    "WORKED HOURS:",

    workedHours
  );

  /*
  ==================================================
  TEMPORARY OVERTIME LOGIC
  ==================================================

  Production:
  Calculate overtime using shift duration.
  */

  const overtimeHours = 0;

  /*
  ==================================================
  UPDATE ATTENDANCE
  ==================================================
  */

  const { data, error } = await supabase

    .from("attendance")

    .update({

      check_out: currentTime,

      worked_hours:

        workedHours,

      overtime_hours:

        overtimeHours,

      early_checkout_reason:

        earlyReason,

    })

    .eq("id", attendanceId)

    .select();

  // Update error
  if (

    error

  ) {

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


/*
==================================================
Change ID: M06-030
Date: 2026-05-28
Status: Added
Purpose: Generate employee attendance statistics
Risk: Low
Rollback: Remove attendance statistics service
==================================================
*/

// EMPLOYEE ATTENDANCE STATS
export async function getAttendanceStats(

  employeeId

){

  const { data, error } = await supabase

    .from("attendance")

    .select("*")

    .eq("employee_id", employeeId);

  if(error){

    throw error;

  }

  // Present count
  const presentDays =

    data.filter(

      item =>

        item.status === "present"

    ).length;

  // Late count
  const lateDays =

    data.filter(

      item =>

        item.status === "late"

    ).length;

  // Total attendance
  const totalAttendance =

    data.length;

  /*
  Temporary OT logic.

  Production:
  Calculate from worked_hours.
  */

  const overtimeHours = 0;

  return {

    presentDays,
    lateDays,
    totalAttendance,
    overtimeHours,

  };

}