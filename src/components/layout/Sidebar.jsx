// Import navigation links
import { Link } from "react-router-dom";

function Sidebar() {

  // Sidebar navigation items
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Students",
      path: "/students",
    },
    {
      name: "Attendance",
      path: "/attendance",
    },
    {
      name: "Reports",
      path: "/reports",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];

  return (

    // Main sidebar container
    <aside className="w-64 min-h-screen bg-gray-900 text-white">

      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-700">

        <h1 className="text-2xl font-bold">
          AMS Panel
        </h1>

      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2">

        {menuItems.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            className="
              block
              px-4
              py-3
              rounded
              hover:bg-gray-800
              transition
            "
          >
            {item.name}
          </Link>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;