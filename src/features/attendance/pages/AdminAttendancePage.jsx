import { useEffect, useState } from "react";

import DashboardLayout from "../../../layouts/DashboardLayout";

import { getAllAttendance } from "../services/adminAttendanceService";


export default function AdminAttendancePage() {

  // Attendance state
  const [attendance,

    setAttendance]

    = useState([]);


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

              {attendance.map((item) => (

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