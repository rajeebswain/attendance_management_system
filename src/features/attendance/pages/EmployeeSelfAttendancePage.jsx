import {

  useEffect,

  useState,

} from "react";


import DashboardLayout

  from "../../../components/layout/DashboardLayout";


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

  // Check-in loading
  const [checkingIn, setCheckingIn] = useState(false);

  // Check-out loading
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {

    async function loadData() {

      try {

        console.log("START");

        const result = await testEmployeeQuery();

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

          employee.id
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


      setCheckingOut(true);


      const result =

        await checkOutEmployee(

          todayAttendance.id
        );


      console.log(result);


      // setTodayAttendance(
      //   setHistory((prev) =>

      //     prev.map((item) =>

      //       item.id === result[0].id

      //         ? result[0]

      //         : item
      //     )
      //   );

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

    <DashboardLayout>

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
        {todayAttendance && (

          <div className="mt-4 space-y-2">

            <p>

              Status:
              {" "}

              {todayAttendance.status}

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
        )}

      </div>

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

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default EmployeeSelfAttendancePage;