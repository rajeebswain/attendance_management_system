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

// import EmployeesPage from "../pages/EmployeesPage";

import EmployeesPage
  from "../features/employees/pages/EmployeesPage";

// Role Guard
import RoleGuard from "../features/auth/components/RoleGuard";


/*
==================================================
Module:
M02 Identity & Security

Submodule:
M02-007 Route Migration

Purpose:

Introduce PermissionGuard
into routing layer.

Change ID:

M02-007-001

==================================================
*/

import PermissionGuard from "../features/auth/components/PermissionGuard";

/*
==================================================
Module:
M02 Identity & Security

Submodule:
M02-007 Route Migration

Purpose:

Permission constants
for route protection.

Change ID:

M02-007-001

==================================================
*/

import { PERMISSIONS } from "../core/security";

// Attendance Page
import AttendancePage from "../features/attendance/pages/AttendancePage";

// Self Attendance Page
import EmployeeSelfAttendancePage from "../features/attendance/pages/EmployeeSelfAttendancePage";

import AdminAttendancePage from "../features/attendance/pages/AdminAttendancePage";

import ReportsDashboardPage from "../features/reports/pages/ReportsDashboardPage";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import LeaveForm from "../features/leaves/components/LeaveForm";

import LeaveManagementPage from "../features/leaves/pages/LeaveManagementPage";


import LeaveAllocationPage from "../features/leaves/pages/LeaveAllocationPage";


import { ROLES } from "../constants/roles";

import moduleRoutes
  from "../modules/registry/routeRegistry";

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
      <Route
        path="/employees"
        element={

          <ProtectedRoute

            allowedRoles={[

              "admin",
              "super_admin"

            ]}

            userRole={loggedInUser.role}

          >

            <EmployeesPage />

          </ProtectedRoute>

        }
      />


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

      {/* <Route
        path="/self-attendance"
        element={
          <ProtectedRoute>
            <EmployeeSelfAttendancePage />
          </ProtectedRoute>
        }
      /> */}
      <Route

        path="/admin-attendance"

        element={

          <AdminAttendancePage />
        }
      />

      {/* <Route

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

      /> */}

/*
==================================================
Module:
M02 Identity & Security

Submodule:
M02-007 Route Migration

Feature:

Reports Route Permission Migration

Change ID:

M02-007-001

Purpose:

Use permission-based access
instead of role-based access.

Current:

Role
 ↓
Route

Future:

Role
 ↓
Permission
 ↓
Route

==================================================
*/

<Route
  path="/reports"
  element={

    <ProtectedRoute>

      <PermissionGuard

        permission={
          PERMISSIONS.REPORT_VIEW
        }

      >

        <ReportsDashboardPage />

      </PermissionGuard>

    </ProtectedRoute>

  }
/>

      <Route
        path="/leave"
        element={
          <ProtectedRoute

            allowedRoles={[

              "admin",

              "employee",

              "manager",

              "super_admin"

            ]}

            userRole={loggedInUser.role}

          >

            <LeaveForm />

          </ProtectedRoute>
        }
      />

      <Route
        path="/leave-management"
        element={
          <ProtectedRoute

            allowedRoles={[
              "admin",
              "super_admin"
            ]}

            userRole={loggedInUser.role}

          >

            <LeaveManagementPage />

          </ProtectedRoute>
        }
      />
      <Route
        path="/leave-allocation"
        element={
          <ProtectedRoute
            allowedRoles={[
              "admin",
              "super_admin"
            ]}
            userRole={loggedInUser.role}
          >
            <LeaveAllocationPage />
          </ProtectedRoute>
        }
      />




      {

        moduleRoutes.map((route) => (

          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />

        ))

      }


    </Routes>
  );
}

export default AppRoutes;