import { useEffect, useState } from "react";

import DashboardLayout

  from "../../../components/layout/DashboardLayout";

import { getAllAttendance } from "../services/adminAttendanceService";


export default function AdminAttendancePage() {

  // Attendance state
  const [attendance,

    setAttendance]

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


    return (

      matchesSearch

      && matchesShift

      && matchesStatus

      && matchesDate
    );
  });
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

              </tr>

            </thead>


            <tbody>

              {filteredAttendance.map((item) => (

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

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}