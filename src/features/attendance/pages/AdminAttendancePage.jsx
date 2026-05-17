import { useEffect, useState } from "react";

import DashboardLayout

  from "../../../components/layout/DashboardLayout";
import {

  getAllAttendance,

  getAbsentEmployees,

  updateAttendance,

  calculateOvertime,

  getHolidays,

  isWeeklyOff,

  isHoliday,

  calculateAttendancePercentage,

  generateMonthlySummary,

} from "../services/adminAttendanceService";

export default function AdminAttendancePage() {

  // Attendance state
  const [attendance,

    setAttendance]

    = useState([]);

  // Holidays
  const [holidays,

    setHolidays]

    = useState([]);
  // Edit modal
  const [selectedAttendance,

    setSelectedAttendance]

    = useState(null);


  // Edit form
  const [editCheckIn,

    setEditCheckIn]

    = useState("");

  const [editCheckOut,

    setEditCheckOut]

    = useState("");

  const [editStatus,

    setEditStatus]

    = useState("");
  // Absent employees
  const [absentEmployees,

    setAbsentEmployees]

    = useState([]);


  // Search employee
  const [search,

    setSearch]

    = useState("");


  // Shift filter
  const [shiftFilter,

    setShiftFilter]

    = useState("");


  // Status filter
  const [statusFilter,

    setStatusFilter]

    = useState("");


  // Date filter
  const [dateFilter,

    setDateFilter]

    = useState("");

  // Loading state
  const [loading,

    setLoading]

    = useState(true);


  // Load attendance
  useEffect(() => {

    loadAttendance();

  }, []);


  async function loadAttendance() {

    try {

      const data =

        await getAllAttendance();

      console.log(data);

      setAttendance(data);

      // Load holidays
      const holidayData =

        await getHolidays();

      console.log(

        "HOLIDAYS:",

        holidayData
      );

      setHolidays(

        holidayData
      );
      // Load absent employees
      const absentData =

        await getAbsentEmployees();

      console.log(

        "ABSENT:",

        absentData
      );

      setAbsentEmployees(

        absentData
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }


  // Loading UI
  if (loading) {

    return <div>Loading...</div>;
  }
  // Open edit modal
  function openEditModal(item) {

    console.log(
      "EDIT ITEM:",
      item
    );

    setSelectedAttendance(item);

    setEditCheckIn(
      item.check_in || ""
    );

    setEditCheckOut(
      item.check_out || ""
    );

    setEditStatus(
      item.status || ""
    );
  }


  // Save attendance update
  async function saveAttendanceUpdate() {

    try {

      const updatedData = {

        check_in: editCheckIn,

        check_out: editCheckOut,

        status: editStatus,
      };


      await updateAttendance(

        selectedAttendance.id,

        updatedData
      );


      await loadAttendance();

      setSelectedAttendance(null);

      alert(
        "Attendance updated"
      );

    } catch (error) {

      console.error(error);

      alert(error.message);
    }
  }
  // Today's date
  const today =

    new Date();


  // Weekly off check
  const todayWeeklyOff =

    isWeeklyOff(today);
// Attendance percentage
const attendancePercentage =

  calculateAttendancePercentage(

    attendance,

    holidays
  );

  // Monthly summary
const monthlySummary =

generateMonthlySummary(

  attendance,

  holidays
);

  // Filter attendance
  const filteredAttendance =

    attendance.filter((item) => {

      // Employee search
      const matchesSearch =

        item.employee_name

          ?.toLowerCase()

          .includes(

            search.toLowerCase()
          );


      // Shift filter
      const matchesShift =

        shiftFilter

          ? item.shift_name

          === shiftFilter

          : true;


      // Status filter
      const matchesStatus =

        statusFilter

          ? item.status

          === statusFilter

          : true;


      // Date filter
      const matchesDate =

        dateFilter

          ? item.attendance_date

          === dateFilter

          : true;

      // Attendance percentage
      const attendancePercentage =

        calculateAttendancePercentage(

          attendance,

          holidays
        );
      return (

        matchesSearch

        && matchesShift

        && matchesStatus

        && matchesDate
      );
    });

  // Filter valid absents
  const validAbsentEmployees =

    absentEmployees.filter(

      (employee) => {

        // Today's date
        const todayDate =

          new Date()

            .toISOString()

            .split("T")[0];


        // Weekly off
        const weeklyOff =

          isWeeklyOff(

            todayDate
          );


        // Holiday
        const holidayCheck =

          isHoliday(

            holidays,

            todayDate
          );


        // Exclude holidays/off
        return (

          !weeklyOff

          && !holidayCheck
        );
      }
    );
  // Total absent
  // const totalAbsent =

  // absentEmployees.length;

  const totalAbsent =

    validAbsentEmployees.length;

  // Present employees
  const totalPresent =

    attendance.filter((item) =>

      item.status === "present"

      || item.status === "late"
    ).length;


  // Late employees
  const totalLate =

    attendance.filter((item) =>

      item.status === "late"
    ).length;


  // Completed attendance
  const completedAttendance =

    attendance.filter((item) =>

      item.check_out
    ).length;


  // Active employees
  const activeEmployees =

    attendance.filter((item) =>

      !item.check_out
    ).length;
  return (

    <DashboardLayout>

      <div className="p-6">

        <h1
          className="
            text-2xl
            font-bold
            mb-6
          "
        >

          Admin Attendance Dashboard

        </h1>
        {/* Weekly off status */}
        {todayWeeklyOff && (

          <div
            className="
    bg-yellow-100
    border
    border-yellow-400
    text-yellow-800
    p-4
    rounded-lg
    mb-6
  "
          >

            Today is Weekly Off
            (Sunday)

          </div>
        )}

        {/* Statistics cards */}
        <div
          className="
    grid
    grid-cols-1
    md:grid-cols-4
    gap-4
    mb-6
  "
        >

          {/* Present */}
          <div
            className="
      bg-white
      rounded-lg
      p-4
      shadow
    "
          >

            <h2
              className="
        text-gray-500
        text-sm
      "
            >

              Present Employees

            </h2>

            <p
              className="
        text-3xl
        font-bold
        mt-2
      "
            >

              {totalPresent}

            </p>

          </div>


          {/* Late */}
          <div
            className="
      bg-white
      rounded-lg
      p-4
      shadow
    "
          >

            <h2
              className="
        text-gray-500
        text-sm
      "
            >

              Late Employees

            </h2>

            <p
              className="
        text-3xl
        font-bold
        mt-2
      "
            >

              {totalLate}

            </p>

          </div>


          {/* Completed */}
          <div
            className="
      bg-white
      rounded-lg
      p-4
      shadow
    "
          >

            <h2
              className="
        text-gray-500
        text-sm
      "
            >

              Completed Attendance

            </h2>

            <p
              className="
        text-3xl
        font-bold
        mt-2
      "
            >

              {completedAttendance}

            </p>

          </div>


          {/* Active */}
          <div
            className="
      bg-white
      rounded-lg
      p-4
      shadow
    "
          >

            <h2
              className="
        text-gray-500
        text-sm
      "
            >

              Active Employees

            </h2>

            <p
              className="
        text-3xl
        font-bold
        mt-2
      "
            >

              {activeEmployees}

            </p>
            {/* <div
              className="
    bg-white
    p-4
    rounded-lg
    shadow
  "
            >

              <h3
                className="
      text-sm
      text-gray-500
    "
              >

                Attendance %

              </h3>

              <p
                className="
      text-3xl
      font-bold
      mt-2
    "
              >

                {attendancePercentage}%

              </p>

            </div> */}
          </div>
          <div
              className="
    bg-white
    p-4
    rounded-lg
    shadow
  "
            >

              <h3
                className="
      text-sm
      text-gray-500
    "
              >

                Attendance %

              </h3>

              <p
                className="
      text-3xl
      font-bold
      mt-2
    "
              >

                {attendancePercentage}%

              </p>

            </div>
        </div>
        {/* Filters */}
        <div
          className="
    bg-white
    p-4
    rounded-lg
    mb-6
    grid
    grid-cols-1
    md:grid-cols-4
    gap-4
  "
        >

          {/* Search */}
          <input

            type="text"

            placeholder="Search Employee"

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)
            }

            className="
      border
      p-2
      rounded
    "
          />


          {/* Shift filter */}
          <select

            value={shiftFilter}

            onChange={(e) =>

              setShiftFilter(
                e.target.value
              )
            }

            className="
      border
      p-2
      rounded
    "
          >

            <option value="">

              All Shifts

            </option>

            <option value="Morning Shift">

              Morning Shift

            </option>

            <option value="Evening Shift">

              Evening Shift

            </option>

            <option value="Night Shift">

              Night Shift

            </option>

            <option value="General Shift">

              General Shift

            </option>

          </select>


          {/* Status filter */}
          <select

            value={statusFilter}

            onChange={(e) =>

              setStatusFilter(
                e.target.value
              )
            }

            className="
      border
      p-2
      rounded
    "
          >

            <option value="">

              All Status

            </option>

            <option value="present">

              Present

            </option>

            <option value="late">

              Late

            </option>

          </select>


          {/* Date filter */}
          <input

            type="date"

            value={dateFilter}

            onChange={(e) =>

              setDateFilter(
                e.target.value
              )
            }

            className="
      border
      p-2
      rounded
    "
          />

        </div>

        {/* Attendance table */}
        <div
          className="
            bg-white
            rounded-lg
            p-6
          "
        >

          <table className="w-full">

            <thead>

              <tr
                className="
                  border-b
                  text-left
                "
              >

                <th className="p-2">

                  Employee

                </th>

                <th className="p-2">

                  Shift

                </th>

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

                  Worked Hours

                </th>

                <th className="p-2">

                  Overtime

                </th>

                <th className="p-2">

                  Action

                </th>

              </tr>

            </thead>

            {/* 
            <tbody>

              {filteredAttendance.map((item) => (
                  const overtimeData =

                  calculateOvertime(item);
                  
                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-2">

                    {

                      item.employee_name
                    }

                  </td>

                  <td className="p-2">

                    {

                      item.shift_name
                    }

                  </td>

                  <td className="p-2">

                    {

                      item.attendance_date
                    }

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
                  <td className="p-2">

  {

    overtimeData.workedHours
  } hrs

</td>

<td className="p-2">

  {

    overtimeData.overtimeHours
  } hrs

</td>
                  <td className="p-2">

  <button

    onClick={() =>

      openEditModal(item)
    }

    className="
      bg-blue-600
      text-white
      px-3
      py-1
      rounded
    "
  >

    Edit

  </button>

</td>

                </tr>
              ))}

            </tbody> */}

            <tbody>

              {filteredAttendance.map((item) => {

                const overtimeData =

                  calculateOvertime(item);

                return (

                  <tr
                    key={item.id}
                    className="border-b"
                  >

                    <td className="p-2">

                      {item.employee_name}

                    </td>

                    <td className="p-2">

                      {item.shift_name}

                    </td>

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

                      {item.check_out || "Pending"}

                    </td>

                    <td className="p-2">

                      {overtimeData.workedHours} hrs

                    </td>

                    <td className="p-2">

                      {overtimeData.overtimeHours} hrs

                    </td>

                    <td className="p-2">

                      <button

                        onClick={() =>

                          openEditModal(item)
                        }

                        className="
              bg-blue-600
              text-white
              px-3
              py-1
              rounded
            "
                      >

                        Edit

                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* Absent employees */}
        <div
          className="
    bg-white
    rounded-lg
    p-6
    mt-6
  "
        >

          <h2
            className="
      text-xl
      font-bold
      mb-4
    "
          >

            Absent Employees

          </h2>


          <table className="w-full">

            <thead>

              <tr
                className="
          border-b
          text-left
        "
              >

                <th className="p-2">

                  Employee

                </th>

                <th className="p-2">

                  Shift

                </th>

              </tr>

            </thead>


            <tbody>

              {validAbsentEmployees.map((employee) => (

                <tr
                  key={employee.id}
                  className="border-b"
                >

                  <td className="p-2">

                    {employee.full_name}

                  </td>

                  <td className="p-2">

                    {

                      employee.shifts
                        ?.shift_name
                    }

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* Holidays */}
      <div
        className="
    bg-white
    rounded-lg
    p-6
    mt-6
  "
      >

        <h2
          className="
      text-xl
      font-bold
      mb-4
    "
        >

          Company Holidays

        </h2>


        <table className="w-full">

          <thead>

            <tr
              className="
          border-b
          text-left
        "
            >

              <th className="p-2">

                Holiday

              </th>

              <th className="p-2">

                Date

              </th>

            </tr>

          </thead>


          <tbody>

            {holidays.map((holiday) => (

              <tr
                key={holiday.id}
                className="border-b"
              >

                <td className="p-2">

                  {holiday.holiday_name}

                </td>

                <td className="p-2">

                  {holiday.holiday_date}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
      {/* Edit modal */}
      {selectedAttendance && (

        <div
          className="
    fixed
    inset-0
    bg-black/50
    flex
    items-center
    justify-center
  "
        >

          <div
            className="
      bg-white
      p-6
      rounded-lg
      w-full
      max-w-md
    "
          >

            <h2
              className="
        text-xl
        font-bold
        mb-4
      "
            >

              Edit Attendance

            </h2>


            {/* Check-in */}
            <div className="mb-4">

              <label>

                Check-In

              </label>

              <input

                type="time"

                value={editCheckIn}

                onChange={(e) =>

                  setEditCheckIn(
                    e.target.value
                  )
                }

                className="
          border
          p-2
          w-full
          rounded
        "
              />

            </div>


            {/* Check-out */}
            <div className="mb-4">

              <label>

                Check-Out

              </label>

              <input

                type="time"

                value={editCheckOut}

                onChange={(e) =>

                  setEditCheckOut(
                    e.target.value
                  )
                }

                className="
          border
          p-2
          w-full
          rounded
        "
              />

            </div>


            {/* Status */}
            <div className="mb-4">

              <label>

                Status

              </label>

              <select

                value={editStatus}

                onChange={(e) =>

                  setEditStatus(
                    e.target.value
                  )
                }

                className="
          border
          p-2
          w-full
          rounded
        "
              >

                <option value="present">

                  Present

                </option>

                <option value="late">

                  Late

                </option>

                <option value="absent">

                  Absent

                </option>

              </select>

            </div>


            {/* Actions */}
            <div
              className="
        flex
        gap-4
      "
            >

              <button

                onClick={saveAttendanceUpdate}

                className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded
        "
              >

                Save

              </button>


              <button

                onClick={() =>

                  setSelectedAttendance(null)
                }

                className="
          bg-gray-500
          text-white
          px-4
          py-2
          rounded
        "
              >

                Cancel

              </button>

            </div>

          </div>

        </div>
      )}
    </DashboardLayout>
  );
}

// {/* Weekly off status */}
// {todayWeeklyOff && (

//   <div
//     className="
//       bg-yellow-100
//       border
//       border-yellow-400
//       text-yellow-800
//       p-4
//       rounded-lg
//       mb-6
//     "
//   >

//     Today is Weekly Off
//     (Sunday)

//   </div>
// )}