import {

  useEffect,

  useState,

} from "react";


// import DashboardLayout

//   from "../../../components/layout/DashboardLayout";

import EmployeeLayout
  from "../../../modules/employee-self-service/layout/EmployeeLayout";


import {

  useAuth,

} from "../../auth/context/AuthContext";

import {

  testEmployeeQuery,

  checkInEmployee,

  getTodayAttendance,

  checkOutEmployee,

  getAttendanceHistory,

} from "../services/selfAttendanceService";



function EmployeeSelfAttendancePage() {

  // Loading state
  const [loading, setLoading] = useState(true);


  // Current auth user
  const { user } = useAuth();


  // Employee state
  const [employee, setEmployee] = useState(null);

  // Today's attendance
  const [todayAttendance, setTodayAttendance] = useState(null);

  // Attendance history
  const [history, setHistory] = useState([]);


  /*
==================================================
Change ID: M06-029
Date: 2026-05-28
Status: Updated
Purpose: Calculate late duration dynamically
Risk: Low
Rollback: Restore lateDuration state
==================================================
*/

const lateDuration =

todayAttendance?.status === "late"

  ?

  calculateLateDuration(

    employee,
    todayAttendance

  )

  :

  "";

  

  // Check-in loading
  const [checkingIn, setCheckingIn] = useState(false);

  // Check-out loading
  const [checkingOut, setCheckingOut] = useState(false);

  /*
==================================================
Change ID: M06-029
Date: 2026-05-28
Status: Updated
Purpose: Add employee late duration state
Risk: Low
Rollback: Remove late state
==================================================
*/

  // const [

  //   lateDuration,
  //   setLateDuration

  // ]

  //   =

  //   useState("");



  /*
  ==================================================
  Change ID: M06-029
  Date: 2026-05-28
  Status: Updated
  Purpose: Calculate employee late duration
  Risk: Low
  Rollback: Remove duration logic
  ==================================================
  */

  // function calculateLateDuration(

  //   employee,
  //   attendance

  // ) {

  //   if (

  //     attendance?.status !== "late"

  //   ) {

  //     return "TEST";

  //   }

  //   const shift = employee?.shifts;

  //   if (!shift) {

  //     return "";

  //   }

  //   const [hour, minute] =

  //     shift.start_time

  //       .split(":")

  //       .map(Number);

  //   const shiftStart = new Date();

  //   shiftStart.setHours(

  //     hour,
  //     minute,
  //     0

  //   );

  //   shiftStart.setMinutes(

  //     shiftStart.getMinutes()

  //     +

  //     shift.grace_minutes

  //   );

  //   const [

  //     checkInHour,
  //     checkInMinute
      
  //     ] =
      
  //     attendance.check_in
      
  //     .split(":");

  //   const checkInTime = new Date();

  //   checkInTime.setHours(

  //     Number(checkInHour),
  //     Number(checkInMinute),
  //     0
      
  //     );

  //   const diffMs =

  //     checkInTime - shiftStart;

  //   const diffMinutes =

  //     Math.max(

  //       0,

  //       Math.floor(

  //         diffMs / 60000

  //       )

  //     );

  //   const hours =

  //     Math.floor(

  //       diffMinutes / 60

  //     );

  //   const minutes =

  //     diffMinutes % 60;

  //   // Only minutes
  //   if (hours <= 0) {

  //     return `${minutes}m`;

  //   }

  //   console.log(

  //     "SHIFT:",
  //     shift
      
  //     );
      
  //     console.log(
      
  //     "CHECK IN:",
  //     attendance.check_in
      
  //     );
      
  //     console.log(
      
  //     "DIFF MINUTES:",
  //     diffMinutes
      
  //     );
      
  //     console.log(
      
  //     "HOURS:",
  //     hours
      
  //     );
      
  //     console.log(
      
  //     "MINUTES:",
  //     minutes
      
  //     );



  //   // Hours + minutes
  //   return `${hours}h ${minutes}m`;

  // }

/*
==================================================
Change ID: M06-029
Date: 2026-05-28
Status: Updated
Purpose: Calculate employee late duration
Risk: Low
Rollback: Restore previous duration logic
==================================================
*/

function calculateLateDuration(

  employee,
  attendance

){

  // Not late
  // if(

  //   attendance?.status !== "late"

  // ){

  //   return "";

  // }

  const status =

attendance?.status

?.trim()

?.toLowerCase();

if(status !== "late"){

  return "";

}

  // Employee shift
  const shift = employee?.shifts;

  // No shift
  if(!shift){

    return "";

  }

  // Shift start
  // const [

  //   shiftHour,
  //   shiftMinute

  // ] =

  //   shift.start_time

  //   .split(":")

  //   .map(Number);

  const shiftParts =

shift.start_time

.split(":");

const shiftHour =

Number(shiftParts[0]);

const shiftMinute =

Number(shiftParts[1]);

  // Shift start object
  const shiftStart = new Date();

  shiftStart.setHours(

    shiftHour,
    shiftMinute,
    0

  );

  // Add grace period
  shiftStart.setMinutes(

    shiftStart.getMinutes()

    +

    shift.grace_minutes

  );

  // Check-in time
  // const [

  //   checkInHour,
  //   checkInMinute

  // ] =

  //   attendance.check_in

  //   .split(":")
  //   .map(Number);

  const checkInParts =

attendance.check_in

.split(":");

const checkInHour =

Number(checkInParts[0]);

const checkInMinute =

Number(checkInParts[1]);

  const checkInTime = new Date();

  checkInTime.setHours(

    checkInHour,
    checkInMinute,
    0

  );

  // Difference
  const diffMs =

    checkInTime - shiftStart;

  // Minutes
  const diffMinutes =

    Math.max(

      0,

      Math.floor(

        diffMs / 60000

      )

    );

  // Hours/minutes
  const hours =

    Math.floor(

      diffMinutes / 60

    );

  const minutes =

    diffMinutes % 60;

  // Only minutes
  if(hours <= 0){

    return `${minutes}m`;

  }

  console.log(

    "FINAL LATE STRING:",
    
    `${hours}h ${minutes}m`
    
    );

  // Hours + minutes
  return `${hours}h ${minutes}m`;

}






  useEffect(() => {

    async function loadData() {

      try {

        console.log("START");

        const result = await testEmployeeQuery();

        console.log(
          "EMPLOYEE FULL:",
          result[0]
        );

        console.log("FULL RESULT:", result);

        console.log("TYPE:", typeof result);

        console.log("IS ARRAY:", Array.isArray(result));

        console.log("FIRST ITEM:", result?.[0]);

        setEmployee(result[0]);

        const attendanceData =

          await getTodayAttendance(

            result[0].id
          );

        console.log(

          "TODAY ATTENDANCE:",

          attendanceData
        );
        setTodayAttendance(

          attendanceData
        );

// Restore late duration after refresh
if(

  attendanceData?.status === "late"

){

   
  const duration =

  calculateLateDuration(

    result[0],
    attendanceData

  );

  console.log(

    "RESTORED LATE:",

    duration

  );

  // setLateDuration(duration);

}



        // if (

        //   attendanceData?.status === "late"

        // ) {

        //   setLateDuration(

        //     calculateLateDuration(

        //       result[0],
        //       attendanceData

        //     )

        //   );

        // }

        // Attendance history
        const historyData =

          await getAttendanceHistory(

            result[0].id
          );

        console.log(

          "HISTORY:",

          historyData
        );

        setHistory(historyData);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }
    loadData();

  }, []);

  // Loading UI
  if (loading) {

    return (

      <div>

        Loading...

        <br />

        Employee:
        {" "}

        {employee?.full_name}

        <br />

        Attendance:
        {" "}

        {

          JSON.stringify(

            todayAttendance
          )
        }

      </div>
    );
  }
  async function handleCheckIn() {

    try {

      setCheckingIn(true);

      console.log(

        "CHECK IN START"
      );


      const result =

        await checkInEmployee(

          employee
        );

      console.log(result);

      setTodayAttendance(result[0]);
      setHistory((prev) => [

        result[0],

        ...prev,
      ]);

      alert(

        "Check-in successful"
      );

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setCheckingIn(false);
    }
  }

  // Handle check-out
  // async function handleCheckOut() {

  //   try {

  //     // Prevent duplicate checkout
  //     if (

  //       todayAttendance?.check_out

  //     ) {

  //       alert(

  //         "Already checked out"
  //       );

  //       return;
  //     }


  //     setCheckingOut(true);


  //     const result =

  //       await checkOutEmployee(

  //         todayAttendance.id
  //       );


  //     console.log(result);

  //     setTodayAttendance(result[0]);

  //     setHistory((prev) =>

  //       prev.map((item) =>

  //         item.id === result[0].id

  //           ? result[0]

  //           : item
  //       )
  //     );



  //     alert(

  //       "Check-out successful"
  //     );

  //   } catch (error) {

  //     console.error(error);

  //     alert(error.message);

  //   } finally {

  //     setCheckingOut(false);
  //   }
  // }


  /*
==================================================
Change ID: M06-028
Date: 2026-05-28
Status: Updated
Purpose: Add employee early checkout validation
Risk: Medium
Rollback: Restore previous checkout flow
==================================================
*/

  // Handle check-out
  async function handleCheckOut() {

    try {

      // Prevent duplicate checkout
      if (

        todayAttendance?.check_out

      ) {

        alert(

          "Already checked out"
        );

        return;
      }

      let earlyCheckoutReason = null;

      const currentHour =
        new Date().getHours();

      const shiftEndHour = 18;

      /*
      Temporary hardcoded shift end.
  
      Production:
      Load from shift table.
      */

      // Detect early checkout
      if (currentHour < shiftEndHour) {

        earlyCheckoutReason =

          prompt(

            "Early checkout reason?"

          );

        // Mandatory reason
        if (!earlyCheckoutReason) {

          alert(

            "Reason is required"

          );

          return;
        }

      }

      setCheckingOut(true);

      const result =

        await checkOutEmployee(

          todayAttendance.id,

          earlyCheckoutReason

        );

      console.log(result);

      setTodayAttendance(result[0]);

      setHistory((prev) =>

        prev.map((item) =>

          item.id === result[0].id

            ? result[0]

            : item
        )
      );

      alert(

        "Check-out successful"
      );

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setCheckingOut(false);
    }
  }


  return (

    <EmployeeLayout>
      {/* <DashboardLayout> */}

      <div className="p-6">

        <h1 className="text-2xl font-bold">

          Employee Self Attendance

        </h1>


        <p className="mt-4">

          Employee Name:
          {" "}

          {employee?.full_name}

        </p>


        <p>

          Employee Code:
          {" "}

          {employee?.employee_code}

        </p>
        <p>

          Shift:
          {" "}

          {employee?.shifts?.shift_name}

        </p>
        <div className="mt-4">

          {/* Not checked in */}
          {!todayAttendance && (

            <button

              onClick={handleCheckIn}

              disabled={checkingIn}

              className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded
    "
            >

              {checkingIn

                ? "Checking In..."

                : "Check In"}

            </button>
          )}


          {/* Checked in but not checked out */}
          {todayAttendance &&

            !todayAttendance.check_out && (

              <button

                onClick={handleCheckOut}

                disabled={checkingOut}

                className="
      bg-red-600
      text-white
      px-4
      py-2
      rounded
    "
              >

                {checkingOut

                  ? "Checking Out..."

                  : "Check Out"}

              </button>
            )}


          {/* Already checked out */}
          {todayAttendance?.check_out && (

            <button

              disabled

              className="
      bg-gray-500
      text-white
      px-4
      py-2
      rounded
    "
            >

              Attendance Completed

            </button>
          )}

        </div>
        {/* {todayAttendance && (

          <div className="mt-4 space-y-2">

            <div className="space-y-2">

              <div>

                <b>Status:</b>

                {" "}

                {todayAttendance.status}

              </div>

              {

                todayAttendance.status === "late"

                &&

                (

                  <div>

                    <b>Late By:</b>

                    {" "}

                    {lateDuration}

                  </div>

                )

              }

            </div>

            <b>Status:</b>

            {

              todayAttendance.status

            }

          </div>

              {

          todayAttendance.status === "late"

          &&

          (

            <div>

              <b>Late By:</b>

              {lateDuration}

            </div>

          )

        }

      </p>

      <p>

        Check-In:
        {" "}

        {todayAttendance.check_in}

      </p>

      <p>

        Check-Out:
        {" "}

        {

          todayAttendance.check_out

          || "Pending"
        }

      </p>

    </div>
  )
} */}
        {todayAttendance && (

          <div className="mt-4 space-y-2">

            <div className="space-y-2">

              <div>

                <b>Status:</b>

                {" "}

                {todayAttendance.status}

              </div>

              {

                todayAttendance.status === "late"

                &&

                (

                  <div>

                    <b>Late By:</b>

                    {" "}

                    {lateDuration}

                  </div>

                )

              }

            </div>

            <p>

              Check-In:
              {" "}

              {todayAttendance.check_in}

            </p>

            <p>

              Check-Out:
              {" "}

              {

                todayAttendance.check_out

                || "Pending"

              }

            </p>

          </div>

        )}

      </div >

      <div
        className="
    mt-8
    bg-white
    p-6
    rounded-lg
  "
      >

        <h2
          className="
      text-xl
      font-bold
      mb-4
    "
        >

          Attendance History

        </h2>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr
                className="
            border-b
            text-left
          "
              >

                <th className="p-2">

                  Date

                </th>

                <th className="p-2">

                  Status

                </th>

                <th className="p-2">

                  Check-In

                </th>

                <th className="p-2">

                  Check-Out

                </th>

                <th className="p-2">

                  Reason

                </th>

              </tr>

            </thead>


            <tbody>

              {history.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-2">

                    {item.attendance_date}

                  </td>

                  <td className="p-2">

                    {item.status}

                  </td>

                  <td className="p-2">

                    {item.check_in}

                  </td>

                  <td className="p-2">

                    {

                      item.check_out

                      || "Pending"
                    }

                  </td>
                  <td>

                    {

                      item.early_checkout_reason

                      ||

                      "-"

                    }

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* </DashboardLayout> */}
    </EmployeeLayout >
  );
}

export default EmployeeSelfAttendancePage;