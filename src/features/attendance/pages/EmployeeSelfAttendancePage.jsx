import DashboardLayout

from "../../../components/layout/DashboardLayout";


function EmployeeSelfAttendancePage() {

  return (

    <DashboardLayout>

      <div className="space-y-6">

        <div
          className="
            bg-white
            p-6
            rounded-lg
          "
        >

          <h1
            className="
              text-2xl
              font-bold
            "
          >

            Employee Self Attendance

          </h1>

          <p className="mt-2">

            Basic page working.

          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default EmployeeSelfAttendancePage;