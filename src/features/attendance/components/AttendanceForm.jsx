import {

  useEffect,

  useState,

} from "react";

// Time & Date format
function formatDuration(hours) {

  const h = Math.floor(hours);

  const m = Math.floor(
    (hours - h) * 60
  );

  return `${h} hr ${m} min`;

}


// Reusable UI components
import Button from "../../../components/ui/Button";

import Card from "../../../components/ui/Card";



// Attendance services
import {

  createAttendance,

  createCheckIn,

  getEmployees,
  updateAttendance,
  createCorrectionRequest,

  getHolidays

} from "../services/attendanceService";


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

  const [earlyReason, setEarlyReason] = useState("");

  //  Added Attendance correction state 21-05-2026
  const [correctionReason, setCorrectionReason] = useState("");


  // Added the Attendace work flow correction Case2
  const [attendanceRecord, setAttendanceRecord] = useState(null);


  // CheckOn Handle Function
  // async function handleCheckIn() {

  //   try {

  //     const currentTime =

  //       new Date();

  //     setCheckInTime(
  //       currentTime
  //     );


  //     const attendance =

  //       await createCheckIn({

  //         employee_id:
  //           employeeId,

  //         attendance_date:
  //           new Date()
  //             .toISOString()
  //             .split("T")[0],

  //         status:
  //           status,

  //         check_in_datetime:
  //           currentTime

  //       });

  //     setAttendanceRecord(
  //       attendance
  //     );

  //     setCheckInTime(
  //       new Date(
  //         attendance.check_in_datetime
  //       )
  //     );
  //     onAttendanceCreated();


  //   }

  //   catch (error) {

  //     console.error(error);

  //     alert(
  //       "Check in failed"
  //     );

  //   }

  // }

  // async function handleCheckIn() {

  //   try {

  //     const currentTime = new Date();

  //     const attendance =

  //       await createCheckIn({

  //         employee_id:
  //           employeeId,

  //         attendance_date:
  //           new Date()
  //             .toISOString()
  //             .split("T")[0],

  //         status:
  //           status,

  //         // check_in_datetime:
  //         //   currentTime.toISOString()

  //         const localTime = new Date(

  //           currentTime.getTime()

  //           -

  //           currentTime.getTimezoneOffset()*60000

  //           )

  //           .toISOString()

  //           .slice(0,-1);


  //           check_in_datetime:
  //           localTime


  //       });

  //     setAttendanceRecord(
  //       attendance
  //     );

  //     setCheckInTime(
  //       currentTime
  //     );

  //     onAttendanceCreated();

  //   }

  //   catch (error) {

  //     console.error(error);

  //     alert(
  //       "Check in failed"
  //     );

  //   }

  // }

  async function handleCheckIn() {

    try {

      const currentTime = new Date();

      const localTime = new Date(

        currentTime.getTime()

        -

        currentTime.getTimezoneOffset() * 60000

      )

        .toISOString()

        .slice(0, -1);

      const attendance =

        await createCheckIn({

          employee_id:
            employeeId,

          attendance_date:
            new Date()
              .toISOString()
              .split("T")[0],

          status:
            status,

          check_in_datetime:
            localTime

        });

      setAttendanceRecord(
        attendance
      );

      setCheckInTime(
        currentTime
      );

      onAttendanceCreated();

    }

    catch (error) {

      console.error(error);

      alert(
        "Check in failed"
      );

    }

  }

  // Checkout Handle Function


  //   async function handleCheckOut() {

  //     if (!checkInTime) {

  //       alert(
  //         "Please check in first"
  //       );

  //       return;

  //     }

  //     try {

  //       const currentTime =
  //         new Date();

  //       const workedMilliseconds =

  //         currentTime.getTime()

  //         -

  //         checkInTime.getTime();

  //       const workedHours =

  //         workedMilliseconds

  //         /

  //         (1000 * 60 * 60);

  //       const overtimeHours =

  //         workedHours > 8

  //           ? workedHours - 8

  //           : 0;

  //       let reason = "";

  //       if (workedHours < 8) {

  //         reason = prompt(

  //           `Employee worked only ${workedHours.toFixed(2)} hrs

  // Enter early checkout reason:`

  //         );

  //         if (!reason) {

  //           return;
  //         }

  //       }

  //       if (!attendanceRecord) {

  //         alert(
  //           "No attendance record found"
  //         );

  //         return;

  //       }

  //       await updateAttendance(

  //         attendanceRecord.id,

  //         {

  //           check_out_datetime:
  //             currentTime.toISOString(),

  //           worked_hours:
  //             workedHours,

  //           overtime_hours:
  //             overtimeHours,

  //           early_checkout_reason:
  //             reason

  //         }

  //       );

  //       setCheckOutTime(
  //         currentTime
  //       );

  //       setWorkedHours(
  //         workedHours
  //       );

  //       setOvertimeHours(
  //         overtimeHours
  //       );

  //       setEarlyReason(
  //         reason
  //       );

  //       setAttendanceRecord({

  //         ...attendanceRecord,

  //         check_out_datetime:
  //           currentTime

  //       });

  //       onAttendanceCreated();

  //     }

  //     catch (error) {

  //       console.error(error);

  //       alert(
  //         "Checkout failed"
  //       );

  //     }

  //   }

  async function handleCheckOut() {

    if (!checkInTime) {

      alert(
        "Please check in first"
      );

      return;

    }

    try {

      const currentTime =
        new Date();

      const localTime = new Date(

        currentTime.getTime()

        -

        currentTime.getTimezoneOffset() * 60000

      )

        .toISOString()

        .slice(0, -1);

      const workedMilliseconds =

        currentTime.getTime()

        -

        checkInTime.getTime();

      const workedHours =

        workedMilliseconds

        /

        (1000 * 60 * 60);

      const overtimeHours =

        workedHours > 8

          ? workedHours - 8

          : 0;

      let reason = "";

      if (workedHours < 8) {

        reason = prompt(

          `Employee worked only ${workedHours.toFixed(2)} hrs
  
  Enter early checkout reason:`

        );

        if (!reason) {

          return;

        }

      }

      if (!attendanceRecord) {

        alert(
          "No attendance record found"
        );

        return;

      }

      await updateAttendance(

        attendanceRecord.id,

        {

          check_out_datetime:
            localTime,

          worked_hours:
            workedHours,

          overtime_hours:
            overtimeHours,

          early_checkout_reason:
            reason

        }

      );

      setCheckOutTime(
        currentTime
      );

      setWorkedHours(
        workedHours
      );

      setOvertimeHours(
        overtimeHours
      );

      setEarlyReason(
        reason
      );

      setAttendanceRecord({

        ...attendanceRecord,

        check_out_datetime:
          currentTime

      });

      onAttendanceCreated();

    }

    catch (error) {

      console.error(error);

      alert(
        "Checkout failed"
      );

    }

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

      const workedHours =

        checkOutTime

          ? (

            new Date(checkOutTime)
            -
            new Date(checkInTime)

          ) /

          (1000 * 60 * 60)

          : 0;

      /* Overtime after shift rule */

      const overtimeHours =

        workedHours > 8

          ?

          workedHours - 8

          :

          0;
      if (workedHours < 8) {

        const reason = prompt(

          `Employee worked only ${workedHours.toFixed(2)} hrs
            
            Enter early checkout reason:`

        );

        if (!reason) {

          return;
        }

        setEarlyReason(reason);

      }


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

          overtimeHours,

        early_checkout_reason:

          earlyReason

      });

      // Reset form
      setEmployeeId("");

      setStatus("present");

      setCheckIn("");

      setCheckOut("");

      setEarlyReason("");

      // Refresh attendance list
      onAttendanceCreated();

      alert("Attendance marked successfully");


      setCheckInTime(null);

      setCheckOutTime(null);

      setWorkedHours(0);

      setOvertimeHours(0);

      setEmployeeId("");

      setStatus("present");


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

  //  Added Attendance correction Function 21-05-2026

  // async function handleCorrectionRequest() {

  //   if (!correctionReason) {

  //     alert(
  //       "Please enter reason"
  //     );

  //     return;
  //   }

  //   try {

  //     await createCorrectionRequest({

  //       attendance_id:
  //         attendanceRecord?.id,

  //       employee_id:
  //         employeeId,

  //       reason:
  //         correctionReason

  //     });

  //     alert(
  //       "Correction request submitted"
  //     );

  //     setCorrectionReason("");

  //   }

  //   catch (error) {

  //     console.error(error);

  //     alert(
  //       "Failed to submit request"
  //     );

  //   }

  // }


  async function handleCorrectionRequest(){

    try{
    
    await createCorrectionRequest({
    
    attendance_id:
    attendanceRecord.id,
    
    employee_id:
    employeeId,
    
    reason:
    earlyReason
    
    });
    
    alert(
    "Correction request submitted"
    );
    
    }
    
    catch(error){
    
    console.error(error);
    
    alert(
    "Request failed"
    );
    
    }
    
    }



  return (

    <Card>


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
            disabled={
              !!checkInTime &&
              !checkOutTime
            }
          >

            Check In

          </Button>

          <Button
            type="button"
            onClick={handleCheckOut}
            disabled={
              !checkInTime
              ||
              !!checkOutTime
            }
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

        {/* Added Attendance correction Button 21-05-2026: 12:30 PM */}

        <input
          type="text"
          placeholder="Correction reason"
          value={correctionReason}
          onChange={(e) =>
            setCorrectionReason(
              e.target.value
            )
          }
          className="
w-full
border
rounded
p-2
mt-4
"
        />

        <Button
          type="button"
          onClick={
            handleCorrectionRequest
          }
        >

          Request Correction

        </Button>

      </form>

    </Card>
  );
}

export default AttendanceForm;