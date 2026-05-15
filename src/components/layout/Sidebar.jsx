import { Link } from "react-router-dom";

// Navigation constants
import { SIDEBAR_LINKS } from "../../constants/navigation";

function Sidebar() {

  return (

    <aside
      className="
        w-64
        min-h-screen
        bg-gray-900
        text-white
      "
    >

      {/* Application Logo Area */}
      <div className="p-6 border-b border-gray-700">

        <h1 className="text-2xl font-bold">
          AMS Panel
        </h1>

      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">

        {SIDEBAR_LINKS.map((item) => (

          <Link
            key={item.path}
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
            {item.label}
          </Link>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;