import DashboardLayout

  from "../../../components/layout/DashboardLayout";


export default function ReportsDashboardPage() {

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

              0%

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

              0%

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

              0

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

              0

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

            Reports and analytics
            will appear here.

          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}