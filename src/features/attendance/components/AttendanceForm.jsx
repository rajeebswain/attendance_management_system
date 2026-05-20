import {

  useEffect,

  useState,

} from "react";


// Reusable UI components
import Button from "../../../components/ui/Button";

import Card from "../../../components/ui/Card";



// Attendance services
import {

  createAttendance,

  getEmployees,

  getHolidays

} from "../services/attendanceService";

// import {

//   createCorrectionRequest

// }

//   from

//   "../../attendance-correction/services/correctionService";


function AttendanceForm({

  onAttendanceCreated,

}) {

  // Employee dropdown list
  const [employees, setEmployees] = useState([]);


  // Form states
  const [employeeId, setEmployeeId] = useState("");

  const [status, setStatus] = useState("present");

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [checkInTime, setCheckInTime] = useState(null);

  const [checkOutTime, setCheckOutTime] = useState(null);

  const [workedHours, setWorkedHours] = useState(0);

  const [overtimeHours, setOvertimeHours] = useState(0);


  // Loading state
  const [loading, setLoading] = useState(false);

  //Setting the holidayes
  const [holidays, setHolidays] = useState([]);

  const [

    selectedAttendance,

    setSelectedAttendance

  ]

    =

    useState(null);


  const [

    reason,

    setReason

  ]

    =

    useState("");


  function handleCheckIn() {

    setCheckInTime(

      new Date()

    );

  }

  // Checkout Handle Function

  function handleCheckOut() {

    if (

      !checkInTime

    ) {

      alert(

        "Please check in first"

      );

      return;

    }


    const now = new Date();


    const workedMilliseconds =

      now -

      new Date(

        checkInTime

      );


    const hours =

      workedMilliseconds /

      (1000 * 60 * 60);


    if (

      hours < 8

    ) {

      const confirmCheckout =

        window.confirm(

          `Employee worked only ${hours.toFixed(2)} hours. Continue?`

        );


      if (

        !confirmCheckout) {

        return;

      }

    }


    setWorkedHours(

      hours.toFixed(2)

    );


    // Over Time Calculation
    const overtime =

      hours > 8

        ?

        hours - 8

        :

        0;


    setOvertimeHours(

      Number(
        overtime.toFixed(2)
      )

    );

    setCheckOutTime(

      now

    );

  }


  useEffect(() => {

    async function loadData() {

      try {

        const employeeData =

          await getEmployees();

        setEmployees(

          employeeData

        );

        const holidayData =

          await getHolidays();

        setHolidays(

          holidayData

        );

      }

      catch (error) {

        console.log(error);

      }

    }

    loadData();

  }, []);


  // Calculate Attendance Function

  function calculateAttendanceStatus(

    employee,

    checkInTime

  ) {

    if (

      !employee?.shifts ||

      !checkInTime

    )

      return status;


    const shiftStart =

      employee.shifts.start_time;


    const graceMinutes =

      employee.shifts.grace_minutes || 0;


    const shiftDate = new Date();

    const [

      hour,

      minute

    ]

      =

      shiftStart.split(":");


    shiftDate.setHours(

      parseInt(hour),

      parseInt(minute) + graceMinutes,

      0

    );


    if (

      new Date(checkInTime)

      >

      shiftDate

    ) {

      return "late";

    }


    return "present";

  }

  // Request Function

  // async function handleCorrectionRequest() {

  //   const userReason =

  //     window.prompt(

  //       "Enter correction reason"

  //     );


  //   if (

  //     !userReason) {

  //     return;

  //   }


  //   try {

  //     await createCorrectionRequest({

  //       /*attendance_id:

  //     attendanceRecord?.id,*/

  //       employee_id:

  //         employeeId,

  //       reason:

  //         userReason

  //     });


  //     alert(

  //       "Correction request submitted"

  //     );

  //   }

  //   catch (error) {

  //     console.log(error);

  //     alert(error.message);

  //   }
  // }


  // Handle attendance form submit
  async function handleSubmit(event) {

    /*Adding Attendace for unassigned employee */

    event.preventDefault();

    const selectedEmployee =

      employees.find(

        (emp) =>

          emp.id === employeeId

      );


    if (!selectedEmployee?.shifts) {

      alert(

        "No shift assigned. Manual attendance mode enabled."

      );

    }

    try {

      setLoading(true);
      const checkInDate =
        new Date(checkInTime);

      const checkOutDate =
        new Date(checkOutTime);

      const workedHours =

        (

          checkOutDate -

          checkInDate

        )

        /

        (1000 * 60 * 60);


      /* Overtime after shift rule */

      const overtimeHours =

        workedHours > 8

          ?

          workedHours - 8

          :

          0;
      const today =

        new Date()

          .toISOString()

          .split("T")[0];

      const isHoliday =

        holidays.some(

          holiday =>

            holiday.holiday_date === today

        );

      /*Holiday Block*/
      if (isHoliday) {

        alert(

          "Today is a holiday. Attendance will be marked as Holiday Working Day."

        );

      }

      await createAttendance({

        employee_id: employeeId,

        attendance_date:

          new Date()

            .toISOString()

            .split("T")[0],

        status:

          calculateAttendanceStatus(

            employees.find(

              (emp) =>

                emp.id === employeeId

            ),

            checkInTime

          ),

        check_in_datetime:

          checkInTime,

        check_out_datetime:

          checkOutTime,

        worked_hours:

          workedHours,

        overtime_hours:

          overtimeHours

      });

      // Reset form
      setEmployeeId("");

      setStatus("present");

      setCheckIn("");

      setCheckOut("");

      // Refresh attendance list
      onAttendanceCreated();

      alert("Attendance marked successfully");

    } catch (error) {

      if (

        error.message.includes(

          "unique_employee_attendance"

        )

      ) {

        alert(

          "Attendance already marked for today"

        );

      }

      else {

        alert(

          error.message

        );

      }

    }
    finally {

      setLoading(false);
    }
  }


  return (

    <Card>

      <h2 className="text-2xl font-bold mb-4">

        Mark Attendance

      </h2>


      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* Employee selection */}
       
        <select
          value={employeeId}

          onChange={(e) => {

            const selectedId =

              e.target.value;

            setEmployeeId(

              selectedId

            );

            const employee =

              employees.find(

                (emp) =>

                  emp.id === selectedId

              );

            if (

              employee?.shifts

            ) {

              setCheckIn(

                employee.shifts.start_time.slice(0, 5)

              );

              setCheckOut(

                employee.shifts.end_time.slice(0, 5)

              );

            }

          }}

          className="
w-full
border
rounded
p-3
"
        >

          <option value="">
            Select Employee
          </option>

          {employees.map((employee) => (

            <option
              key={employee.id}
              value={employee.id}
            >

              {employee.full_name}

            </option>

          ))}

        </select>


        {/* Attendance status */}
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="
              w-full
              border
              rounded
              p-3
            "
        >

          <option value="present">
            Present
          </option>

          <option value="absent">
            Absent
          </option>

          <option value="late">
            Late
          </option>

          <option value="leave">
            Leave
          </option>

        </select>


        {/* Check In / Check Out */}

        <div className="flex gap-4">

          <Button

            type="button"

            onClick={handleCheckIn}

            disabled={!!checkInTime}

          >

            Check In

          </Button>

          <Button

            type="button"

            onClick={handleCheckOut}

            disabled={!checkInTime}

          >

            Check Out

          </Button>

          </div>


         {/* Show captured times */}

        {checkInTime && (

          <p className="text-sm">

            Checked In:

            {

              new Date(

                checkInTime

              ).toLocaleTimeString()

            }

          </p>

        )}


        {checkOutTime && (

          <p className="text-sm">

            Checked Out:

            {

              new Date(

                checkOutTime

              ).toLocaleTimeString()

            }

          </p>

        )}

        {workedHours > 0 && (

          <div className="mt-2">

            Worked Hours:
            {overtimeHours > 0 && (

              <div className="mt-2">

                Overtime:

                {

                  overtimeHours

                }

                hrs

              </div>

            )}

            {

              workedHours

            }

            hrs

          </div>

        )}


        <Button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >

          {loading
            ? "Saving..."
            : "Mark Attendance"}

        </Button>


      </form>

    </Card>
  );
}

export default AttendanceForm;