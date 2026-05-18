import { Link } from "react-router-dom";


import {

  isAdmin

} from "../../utils/roleUtils";


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

        {/* Report Menu */}


        {

          isAdmin(

            "admin"

          ) && (
            <Link
              to="/reports"
              className="
    block
    px-4
    py-2
    rounded
    hover:bg-gray-100
  "
            >

              Reports & Analytics

            </Link>

          )
        }

        <Link to="/admin-attendance">

          Admin Attendance

        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;