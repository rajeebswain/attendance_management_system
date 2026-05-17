import { useEffect, useState }

from "react";


import {

  getReportsData

} from "../services/reportsService";


import DashboardLayout

  from "../../../components/layout/DashboardLayout";


export default function ReportsDashboardPage() {
    const [reports, setReports] = useState([]);

    const totalReports = reports.length;

    const lateReports = reports.filter(
    
      (item) => item.status === "late"
    
    ).length;
    
    const totalOTHours = reports.reduce(
    
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
    
    const activeEmployees = reports.filter(
    
      (item) => item.check_in && !item.check_out
    
    ).length;


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

      </div>

    </DashboardLayout>
  );
}

