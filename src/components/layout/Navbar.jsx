// Import logout service
import { logoutUser } from '../../features/auth/services/authService';

// Import navigation hook
import { useNavigate } from 'react-router-dom';

function Navbar() {
  // Used for redirecting users
  const navigate = useNavigate();

  // Handle logout button click
  async function handleLogout() {
    // Logout from Supabase
    await logoutUser();

    // Redirect user to login page
    navigate('/login');
  }

  return (
    // Navbar container
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
      {/* Dashboard title */}
      <h2 className="text-xl font-semibold">Attendance Management System</h2>

      {/* Logout Button */}
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
    </header>
  );
}

export default Navbar;
