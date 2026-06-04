import { Link } from "react-router-dom";
import SIDEBAR_LINKS
    from "../../modules/registry/navigationRegistry";

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

            <div className="p-6 border-b border-gray-700">

                <h1 className="text-2xl font-bold">

                    AMS Panel

                </h1>

            </div>

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

                <Link
                    to="/admin-attendance"
                >

                    Admin Attendance

                </Link>

            </nav>

        </aside>

    );

}

export default Sidebar;