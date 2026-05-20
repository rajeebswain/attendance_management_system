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




  // Loading state
  const [loading, setLoading] = useState(false);

  //Setting the holidayes
  const [holidays, setHolidays] = useState([]);

  // Fetch employees on component load
  /*useEffect(() => {

    async function loadEmployees() {

      try {

        const data = await getEmployees();

        setEmployees(data);
        const holidayData = await getHolidays();

        setHolidays(

          holidayData);

      } catch (error) {

        alert(error.message);
      }
    }

    loadEmployees();
    
  }, []);*/

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


  // Handle attendance form submit
  async function handleSubmit(event) {

    {/*Automati cTime and Date Capture Function*/ }

    function handleCheckIn() {

      setCheckInTime(

        new Date()

      );

    }


    function handleCheckOut() {

      setCheckOutTime(

        new Date()

      );

    }


    /*Adding Attendace for unassigned employee */

    event.preventDefault();

    const selectedEmployee =

      employees.find(

        (emp) =>

          emp.id === employeeId

      );

    /* if(!selectedEmployee?.shifts){
     
     alert(
     
     "No shift assigned to this employee"
     
     );
     
     return;
     
     } */

    if (!selectedEmployee?.shifts) {

      alert(

        "No shift assigned. Manual attendance mode enabled."

      );

    }

    try {

      setLoading(true);

      /* Calculate work hours */

      const checkInDate =

        new Date(

          `2000-01-01 ${checkIn}`

        );

      const checkOutDate =

        new Date(

          `2000-01-01 ${checkOut}`

        );

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

      /*if (isHoliday) {
    
            alert(
    
              "Today is holiday. Attendance disabled."
    
            );
    
            return;
    
          } */

      /*Holiday Block*/
      if (isHoliday) {

        alert(

          "Today is a holiday. Attendance will be marked as Holiday Working Day."

        );

      }

      /*Create Attendance*/

      // await createAttendance({

      //   employee_id: employeeId,

      //   attendance_date: new Date(),

      //   status:

      //     checkIn >

      //       employees.find(

      //         (emp) =>

      //           emp.id === employeeId

      //       )?.shifts?.start_time

      //       ?

      //       "late"

      //       :

      //       status,

      //   check_in: checkIn,

      //   check_out: checkOut,

      //   worked_hours:

      //     workedHours,

      //   overtime_hours:

      //     overtimeHours

      // });

      await createAttendance({

        employee_id: employeeId,
        
        attendance_date:
        
        new Date()
        
        .toISOString()
        
        .split("T")[0],
        
        status:
        
        calculateAttendanceStatus(
        
        employees.find(
        
        (emp)=>
        
        emp.id===employeeId
        
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
        {/* <select
            value={employeeId}
            onChange={(e) =>
              setEmployeeId(e.target.value)
            }
            className="
              w-full
              border
              rounded
              p-3
            "
          > */}

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


        {/*Check-in time*/}
        {/* <input
          type="time"
          value={checkIn}
          onChange={(e) =>
            setCheckIn(e.target.value)
          }
          className="
              w-full
              border
              rounded
              p-3
            "
        />  */}


        {/* Check-out time*/}
        {/* <input
          type="time"
          value={checkOut}
          onChange={(e) =>
            setCheckOut(e.target.value)
          }
          className="
              w-full
              border
              rounded
              p-3
            "
        />  */}

        {/*Check-in time*/}

        <div className="flex gap-4">

          <Button

            type="button"

            onClick={handleCheckIn}

          >

            Check In

          </Button>

          {/* Check-out time*/}

          <Button

            type="button"

            onClick={handleCheckOut}

          >

            Check Out

          </Button>

        </div>




        <Button type="submit">

          {loading
            ? "Saving..."
            : "Mark Attendance"}

        </Button>

      </form>

    </Card>
  );
}

export default AttendanceForm;