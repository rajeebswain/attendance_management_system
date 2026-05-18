// Import layout components
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import {

  isAdmin

} from "../../utils/roleUtils";

function DashboardLayout({ children }) {

  return (

    // Full page flex layout
    <div className="flex">

      {/* Left sidebar */}
      <Sidebar />

      {/* Right content section */}
      <div className="flex-1 bg-gray-100 min-h-screen">

        {/* Top navbar */}
        <Navbar />

        {/* Main page content */}
        <main className="p-6">

          {children}

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;