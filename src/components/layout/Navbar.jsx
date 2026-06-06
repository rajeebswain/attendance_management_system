/*
==================================================
Change ID: M00-002
Date: 2026-06-06
Status: Active

Purpose:
Add notification bell to navbar

Risk:
Low

Rollback:
Remove NotificationBell import and component
==================================================
*/

// Import logout service
import {
  logoutUser
} from "../../features/auth/services/authService";

// Import navigation hook
import {
  useNavigate
} from "react-router-dom";

// Notification Bell
import NotificationBell
from "../../modules/notifications/components/NotificationBell";

function Navbar() {

  const navigate = useNavigate();

  async function handleLogout() {

    try {

      console.log(
        "Logout started"
      );

      await logoutUser();

      console.log(
        "Logout success"
      );

      navigate("/login");

    } catch (error) {

      console.error(
        "Logout failed",
        error
      );

    }

  }

  return (

    <header
      className="
        h-16
        bg-white
        border-b
        flex
        items-center
        justify-between
        px-6
      "
    >

      {/* Application Title */}
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        Attendance Management System
      </h2>

      {/* Right Side Actions */}
      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <NotificationBell />

        <button
          onClick={handleLogout}
          className="
            bg-red-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Logout
        </button>

      </div>

    </header>

  );

}

export default Navbar;
