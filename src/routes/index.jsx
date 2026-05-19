const loggedInUser = {

  role: "admin"

};

import {

  Routes,

  Route,

  Navigate,

} from "react-router-dom";


// Auth Pages
import LoginPage from "../features/auth/pages/LoginPage";

import SignupPage from "../features/auth/pages/SignupPage";


// Protected Route
// import ProtectedRoute from "../features/auth/components/ProtectedRoute";


// Pages
import DashboardPage from "../pages/DashboardPage";

import EmployeesPage from "../pages/EmployeesPage";


// Role Guard
import RoleGuard from "../features/auth/components/RoleGuard";


// Attendance Page
import AttendancePage from "../features/attendance/pages/AttendancePage";

// Self Attendance Page
import EmployeeSelfAttendancePage from "../features/attendance/pages/EmployeeSelfAttendancePage";

import AdminAttendancePage from "../features/attendance/pages/AdminAttendancePage";

import ReportsDashboardPage from "../features/reports/pages/ReportsDashboardPage";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import { ROLES } from "../constants/roles";

function AppRoutes() {

  return (

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

      {/* Admin-only employees page */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <RoleGuard
              allowedRoles={[
                "admin",
                "super_admin",
              ]}
            >
              <EmployeesPage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Attendance page */}
      {/* <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendancePage />
          </ProtectedRoute>
        }
      /> */}

<Route
path="/attendance"
element={
   <ProtectedRoute
      allowedRoles={[
         "admin",
         "manager",
         "employee",
         "super_admin"
      ]}
      userRole={loggedInUser.role}
   >
      <AttendancePage />
   </ProtectedRoute>
}
/>

      <Route
        path="/self-attendance"
        element={
          <ProtectedRoute>
            <EmployeeSelfAttendancePage />
          </ProtectedRoute>
        }
      />
      <Route

        path="/admin-attendance"

        element={

          <AdminAttendancePage />
        }
      />

<Route

path="/reports"

element={

  <ProtectedRoute

    allowedRoles={[

      ROLES.ADMIN,

      ROLES.HR

    ]}

    userRole={

      loggedInUser.role

    }

  >

    <ReportsDashboardPage />

  </ProtectedRoute>

}

/>
    </Routes>
  );
}

export default AppRoutes;