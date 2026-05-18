import { useEffect, useState }

  from "react";


import {

  getReportsData

} from "../services/reportsService";


import DashboardLayout

  from "../../../components/layout/DashboardLayout";


export default function ReportsDashboardPage() {
  const [reports, setReports] = useState([]);

  const [searchEmployee, setSearchEmployee] =

    useState("");

  const [statusFilter, setStatusFilter] =

    useState("");

  const [monthFilter, setMonthFilter] =

    useState("");

  const [dateFilter, setDateFilter] =

    useState("");

  const filteredReports = reports.filter(

    (item) => {

      const employeeName =

        item.employees?.full_name

          ?.toLowerCase() || "";



      // Employee search
      const matchesEmployee =

        employeeName.includes(

          searchEmployee.toLowerCase()

        );



      // Status filter
      const matchesStatus =

        statusFilter

          ? item.status === statusFilter

          : true;



      // Month filter
      const matchesMonth =

        monthFilter

          ? item.attendance_date?.startsWith(

            monthFilter

          )

          : true;



      // Date filter
      const matchesDate =

        dateFilter

          ? item.attendance_date ===

          dateFilter

          : true;



      return (

        matchesEmployee &&

        matchesStatus &&

        matchesMonth &&

        matchesDate

      );
    }
  );

  // const totalReports = reports.length;
  const totalReports = filteredReports.length;

  // const lateReports = reports.filter(
  const lateReports = filteredReports.filter(

    (item) => item.status === "late"

  ).length;

  // const totalOTHours = reports.reduce(
  const totalOTHours = filteredReports.reduce(

    (total, item) => {

      const checkIn = item.check_in;
      const checkOut = item.check_out;

      if (!checkIn || !checkOut) return total;

      const start = new Date(`2000-01-01 ${checkIn}`);
      const end = new Date(`2000-01-01 ${checkOut}`);

      const diffHours =

        (end - start) / 1000 / 60 / 60;

      const overtime = diffHours - 8;

      return overtime > 0

        ? total + overtime

        : total;
    },

    0

  );

  const attendanceRate = totalReports

    ? (
      ((totalReports - lateReports) /

        totalReports) *

      100
    ).toFixed(2)

    : 0;

  // const activeEmployees = reports.filter(
  const activeEmployees = filteredReports.filter(

    (item) => item.check_in && !item.check_out

  ).length;

  const employeeSummary = {};

  // reports.forEach((item) => {
  filteredReports.forEach((item) => {

    const employeeName =

      item.employees?.full_name ||

      "Unknown Employee";



    if (!employeeSummary[employeeName]) {

      employeeSummary[employeeName] = {

        present: 0,

        late: 0,

        overtime: 0,
      };
    }



    // Present count
    if (item.status === "present") {

      employeeSummary[employeeName]

        .present += 1;
    }



    // Late count
    if (item.status === "late") {

      employeeSummary[employeeName]

        .late += 1;
    }



    // Overtime
    const checkIn = item.check_in;
    const checkOut = item.check_out;

    if (checkIn && checkOut) {

      const start = new Date(

        `2000-01-01 ${checkIn}`

      );

      const end = new Date(

        `2000-01-01 ${checkOut}`

      );

      const diffHours =

        (end - start) / 1000 / 60 / 60;

      const overtime = diffHours - 8;

      if (overtime > 0) {

        employeeSummary[employeeName]

          .overtime += overtime;
      }
    }
  });
  useEffect(() => {

    loadReports();

  }, []);
  async function loadReports() {

    const data = await getReportsData();

    console.log("REPORT DATA:", data);

    setReports(data);
  }




  return (

    <DashboardLayout>

      <div className="p-6">

        {/* Page title */}
        <h1
          className="
            text-2xl
            font-bold
            mb-6
          "
        >

          Reports & Analytics

        </h1>


        {/* Summary cards */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-4
            gap-4
            mb-6
          "
        >

          {/* Attendance Rate */}
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

              Attendance Rate

            </h2>

            <p
              className="
                text-3xl
                font-bold
                mt-2
              "
            >

              {attendanceRate}%

            </p>

          </div>


          {/* Late Rate */}
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

              Late Rate

            </h2>

            <p
              className="
                text-3xl
                font-bold
                mt-2
              "
            >

              {lateReports}

            </p>

          </div>


          {/* OT Hours */}
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

              Total OT Hours

            </h2>

            <p
              className="
                text-3xl
                font-bold
                mt-2
              "
            >

              {totalOTHours.toFixed(2)}

            </p>

          </div>


          {/* Active Employees */}
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

          </div>

        </div>

        {/* Filters */}

        <div
          className="
    bg-white
    p-4
    rounded-lg
    shadow
    mb-6
    grid
    grid-cols-1
    md:grid-cols-4
    gap-4
  "
        >

          {/* Employee Search */}

          <input
            type="text"
            placeholder="Search Employee"
            value={searchEmployee}
            onChange={(e) =>

              setSearchEmployee(

                e.target.value

              )
            }
            className="
      border
      rounded-lg
      p-2
    "
          />


          {/* Status Filter */}

          <select
            value={statusFilter}
            onChange={(e) =>

              setStatusFilter(

                e.target.value

              )
            }
            className="
      border
      rounded-lg
      p-2
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

            <option value="absent">

              Absent

            </option>

          </select>


          {/* Month Filter */}

          {/* <input
            type="month"
            value={monthFilter}
            onChange={(e) =>

              setMonthFilter(

                e.target.value

              )
            }
            className="
      border
      rounded-lg
      p-2
    "
          /> */}

          <select
            value={monthFilter}
            onChange={(e) =>

              setMonthFilter(

                e.target.value

              )
            }
            className="
    border
    rounded-lg
    p-2
  "
          >

            <option value="">

              All Months

            </option>

            <option value="2026-01">

              January 2026

            </option>

            <option value="2026-02">

              February 2026

            </option>

            <option value="2026-03">

              March 2026

            </option>

            <option value="2026-04">

              April 2026

            </option>

            <option value="2026-05">

              May 2026

            </option>

          </select>


          {/* Date Filter */}

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
      rounded-lg
      p-2
    "
          />

        </div>
        {/* Reports section */}
        <div
          className="
            bg-white
            rounded-lg
            p-6
            shadow
          "
        >

          <h2
            className="
              text-xl
              font-bold
              mb-4
            "
          >

            Reports Dashboard

          </h2>


          <p className="text-gray-500">

            Real reports data connected successfully.

          </p>

        </div>

        {/* Monthly Summary */}

        <div
          className="
    bg-white
    rounded-lg
    p-6
    shadow
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

            Monthly Employee Summary

          </h2>


          <table className="w-full">

            <thead>

              <tr
                className="
          border-b
        "
              >

                <th className="text-left p-2">

                  Employee

                </th>

                <th className="text-left p-2">

                  Present

                </th>

                <th className="text-left p-2">

                  Late

                </th>

                <th className="text-left p-2">

                  OT Hours

                </th>

              </tr>

            </thead>


            <tbody>

              {

                Object.entries(

                  employeeSummary

                ).map(

                  ([name, summary]) => (

                    <tr
                      key={name}
                      className="
                border-b
              "
                    >

                      <td className="p-2">

                        {name}

                      </td>

                      <td className="p-2">

                        {summary.present}

                      </td>

                      <td className="p-2">

                        {summary.late}

                      </td>

                      <td className="p-2">

                        {

                          summary.overtime.toFixed(2)

                        } hrs

                      </td>

                    </tr>
                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

