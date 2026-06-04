


// Import reusable dashboard layout
import DashboardLayout from "../components/layout/DashboardLayout";

function DashboardPage() {

  return (

    // Reusable dashboard wrapper
    <DashboardLayout>

      {/* Dashboard content */}
      <div>

        <h1 className="text-3xl font-bold mb-4">
          Dashboard
        </h1>

        <p className="text-gray-600">
          Welcome to Attendance Management System
        </p>

      </div>

    </DashboardLayout>
  );
}

export default DashboardPage;

