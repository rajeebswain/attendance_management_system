import { Routes, Route } from 'react-router-dom';

import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

// Import Sign UP Route
import SignupPage from '../features/auth/pages/SignupPage';

// Adding Routes for the Pages
import StudentsPage from '../pages/StudentsPage';
import AttendancePage from '../pages/AttendancePage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';

import ProtectedRoute from '../features/auth/components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      // Login Route
      <Route path="/login" element={<LoginPage />} />
      // Sign UP Route
      <Route path="/signup" element={<SignupPage />} />
      // Dashboard Route
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      //Student Page Route
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      //Attendance Page Route
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendancePage />
          </ProtectedRoute>
        }
      />
      // Reports Page Route
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      // Setting Page Route
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
