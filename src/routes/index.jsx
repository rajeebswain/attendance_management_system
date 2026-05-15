// import { Routes, Route } from 'react-router-dom';

// import LoginPage from '../features/auth/pages/LoginPage';
// import DashboardPage from '../pages/DashboardPage';

// // Import Sign UP Route
// import SignupPage from '../features/auth/pages/SignupPage';

// // Adding Routes for the Pages
// import StudentsPage from '../pages/StudentsPage';
// import AttendancePage from '../pages/AttendancePage';
// import ReportsPage from '../pages/ReportsPage';
// import SettingsPage from '../pages/SettingsPage';

// import ProtectedRoute from '../features/auth/components/ProtectedRoute';

// function AppRoutes() {
//   return (
//     <Routes>
//       // Login Route
//       <Route path="/login" element={<LoginPage />} />
//       // Sign UP Route
//       <Route path="/signup" element={<SignupPage />} />
//       // Dashboard Route
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardPage />
//           </ProtectedRoute>
//         }
//       />
//       //Student Page Route
//       <Route
//         path="/students"
//         element={
//           <ProtectedRoute>
//             <StudentsPage />
//           </ProtectedRoute>
//         }
//       />
//       //Attendance Page Route
//       <Route
//         path="/attendance"
//         element={
//           <ProtectedRoute>
//             <AttendancePage />
//           </ProtectedRoute>
//         }
//       />
//       // Reports Page Route
//       <Route
//         path="/reports"
//         element={
//           <ProtectedRoute>
//             <ReportsPage />
//           </ProtectedRoute>
//         }
//       />
//       // Setting Page Route
//       <Route
//         path="/settings"
//         element={
//           <ProtectedRoute>
//             <SettingsPage />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default AppRoutes;


import {

  BrowserRouter,

  Routes,

  Route,

  Navigate,

} from "react-router-dom";


// Auth Pages
import LoginPage from "../features/auth/pages/LoginPage";

import SignupPage from "../features/auth/pages/SignupPage";


// Protected Route
import ProtectedRoute from "../features/auth/components/ProtectedRoute";


// Pages
import DashboardPage from "../pages/DashboardPage";

import StudentsPage from "../pages/StudentsPage";


// Role Guard
import RoleGuard from "../features/auth/components/RoleGuard";

// Attendance Page Route
import AttendancePage from "../features/attendance/pages/AttendancePage";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Redirect root */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />


        {/* Public routes */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />


        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={

            <ProtectedRoute>

              <DashboardPage />

            </ProtectedRoute>
          }
        />


        {/* Admin-only students page */}
        <Route
          path="/students"
          element={

            <ProtectedRoute>
              <RoleGuard
                allowedRoles={[
                  "admin",
                  "super_admin",
                ]}
              >
                <StudentsPage />
              </RoleGuard>
            </ProtectedRoute>
            }
          />
        </Routes>

        <Route
          path="/attendance"
          element={
           <ProtectedRoute>
              <AttendancePage />
           </ProtectedRoute>
          }
        />

    </BrowserRouter>
  );
}

export default AppRoutes;