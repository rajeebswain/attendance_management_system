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
  const [correctionReason,setCorrectionReason] = useState("");


// Added the Attendace work flow correction Case2
  const [attendanceRecord, setAttendanceRecord] = useState(null);

  // function handleCheckIn() {

  //   setCheckInTime(

  //     new Date()

  //   );

  // }


  async function handleCheckIn() {

    try{
    
    const currentTime=
    
    new Date();
    
    setCheckInTime(
    currentTime
    );
    
    // const attendance=
    
    // await createCheckIn({
    
    // employee_id:
    // employeeId,
    
    // attendance_date:
    
    // new Date()
    
    // .toISOString()
    
    // .split("T")[0],
    
    // status:
    // status,
    
    // check_in_datetime:
    // currentTime
    
    // });
    
    // setAttendanceRecord(
    // attendance
    // );

    const attendance=

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
    currentTime
    
    });
    
    setAttendanceRecord(
    attendance
    );
    
    setCheckInTime(
    new Date(
    attendance.check_in_datetime
    )
    );


    
    }
    
    catch(error){
    
    console.error(error);
    
    alert(
    "Check in failed"
    );
    
    }
    
    }



  // Checkout Handle Function

  // function handleCheckOut() {

  //   if (!checkInTime) {

  //     alert(
  //       "Please check in first"
  //     );

  //     return;
  //   }

  //   const now = new Date();

  //   const workedMilliseconds =
  //     now - new Date(checkInTime);

  //   const hours =
  //     workedMilliseconds /
  //     (1000 * 60 * 60);

  //      if(hours < 8){

  //     const reason = prompt(
  //     "Early checkout reason:"
  //     );
      
  //     if(!reason) return;
      
  //     setEarlyReason(reason);
      
  //     setCheckOutTime(new Date());
      
  //     return;
  //     }
      
  //     setCheckOutTime(new Date());
  //   setWorkedHours(
  //     Number(hours.toFixed(2))
  //   );

  //   const overtime =
  //     hours > 8
  //       ? hours - 8
  //       : 0;

  //   setOvertimeHours(
  //     Number(
  //       overtime.toFixed(2)
  //     )
  //   );

  //   setCheckOutTime(now);

  // }


  async function handleCheckOut(){

    if(!checkInTime){
    
    alert(
    "Please check in first"
    );
    
    return;
    
    }
    
    try{
    
    const currentTime=
    
    new Date();
    
    setCheckOutTime(
    currentTime
    );
    
    const workedHours=
    
    (currentTime-checkInTime)
    
    /
    
    (1000*60*60);
    
    const overtimeHours=
    
    workedHours>8
    
    ? workedHours-8
    
    :0;
    
    
    // update existing attendance row
    await updateAttendance(
    
    attendanceRecord.id,
    
    {
    
    check_out_datetime:
    currentTime,
    
    worked_hours:
    workedHours,
    
    overtime_hours:
    overtimeHours
    
    }
    
    );
    
    setWorkedHours(
    workedHours
    );
    
    setOvertimeHours(
    overtimeHours
    );
    
    }
    catch(error){
    
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
      // const checkInDate =
      //   new Date(checkInTime);

      // const checkOutDate =
      //   new Date(checkOutTime);

      // const workedHours =

      //   (

      //     checkOutDate -

      //     checkInDate

      //   )

      //   /

      //   (1000 * 60 * 60);

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

async function handleCorrectionRequest(){

    if(!correctionReason){
    
    alert(
    "Please enter reason"
    );
    
    return;
    }
    
    try{
    
    await createCorrectionRequest({
    
    attendance_id:
    attendanceRecord?.id,
    
    employee_id:
    employeeId,
    
    reason:
    correctionReason
    
    });
    
    alert(
    "Correction request submitted"
    );
    
    setCorrectionReason("");
    
    }
    
    catch(error){
    
    console.error(error);
    
    alert(
    "Failed to submit request"
    );
    
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
{/* 
        <div className="flex gap-4">

          <Button

            type="button"

            onClick={handleCheckIn}

            disabled={!!checkInTime && !checkOutTime}

          >

            Check In

          </Button>

          <Button

            type="button"

            onClick={handleCheckOut}

            disabled={!checkInTime || !!checkOutTime}

          >

            Check Out

          </Button> */}


<Button
type="button"
onClick={handleCheckIn}
disabled={!!attendanceRecord?.check_in_datetime}
>
Check In
</Button>

<Button
type="button"
onClick={handleCheckOut}
disabled={
!attendanceRecord?.check_in_datetime
||
attendanceRecord?.check_out_datetime
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
onChange={(e)=>
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


        <Button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={
            !checkInTime ||
            !checkOutTime ||
            loading
          }
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