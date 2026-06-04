/*
==================================================
Module: M07 Leave Management
Submodule: Routes
Feature: Route Registration
Change ID: M07-PEX-001
Status: Active
Purpose: Register leave routes
Architecture: Plugin Route Registry
Risk: Low
Rollback: Restore empty array
==================================================
*/

import LeaveForm
from "../../features/leaves/components/LeaveForm";

import LeaveManagementPage
from "../../features/leaves/pages/LeaveManagementPage";

import LeaveAllocationPage
from "../../features/leaves/pages/LeaveAllocationPage";

// import ProtectedRoute from "../../../components/features/auth/ProtectedRoute";

import ProtectedRoute from "../../features/auth/components/ProtectedRoute";

const leaveManagementRoutes = [

  {
    path: "/leave",
    element: (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "employee",
          "manager",
          "super_admin"
        ]}
        userRole="admin"
      >
        <LeaveForm />
      </ProtectedRoute>
    )
  },

  {
    path: "/leave-management",
    element: (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "super_admin"
        ]}
        userRole="admin"
      >
        <LeaveManagementPage />
      </ProtectedRoute>
    )
  },

  {
    path: "/leave-allocation",
    element: (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "super_admin"
        ]}
        userRole="admin"
      >
        <LeaveAllocationPage />
      </ProtectedRoute>
    )
  }

];

export default leaveManagementRoutes;