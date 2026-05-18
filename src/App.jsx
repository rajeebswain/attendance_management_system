import AppRoutes from "./routes";
import AdminAttendancePage from "./features/attendance/pages/AdminAttendancePage";

const loggedInUser = {

  full_name: "Rajeeb Kumar",

  role: "admin"

};

function App() {
  return <AppRoutes />;
}

export default App;
