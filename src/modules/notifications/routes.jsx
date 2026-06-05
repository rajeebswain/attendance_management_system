/*
==================================================
Change ID: M12-003
Date: 2026-06-05
Status: Active

Purpose:
Notifications route registry

Risk:
Low

Rollback:
Remove route registration
==================================================
*/

import NotificationCenterPage
from "./pages/NotificationCenterPage";

import ProtectedRoute
from "../../features/auth/components/ProtectedRoute";

const notificationRoutes = [

  {
    path: "/notifications",
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
        <NotificationCenterPage />
      </ProtectedRoute>
    )
  }

];

export default notificationRoutes;