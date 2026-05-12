// // export default DashboardPage;

// import { useNavigate } from "react-router-dom";

// import { logoutUser } from "../features/auth/services/authService";

// function DashboardPage() {

//   const navigate = useNavigate();

//   async function handleLogout() {

//     await logoutUser();

//     navigate("/login");
//   }

//   return (
//     <div className="p-10">

//       <h1 className="text-3xl font-bold mb-6">
//         Dashboard
//       </h1>

//       <button
//         onClick={handleLogout}
//         className="bg-red-600 text-white px-5 py-3 rounded"
//       >
//         Logout
//       </button>

//     </div>
//   );
// }

// export default DashboardPage;


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

