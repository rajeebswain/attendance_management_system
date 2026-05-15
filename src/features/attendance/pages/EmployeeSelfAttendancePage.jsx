import {

    useEffect,
  
    useState,
  
  } from "react";
  
  
  // Dashboard layout
  import DashboardLayout from "../../../components/layout/DashboardLayout";
  
  
  // Auth context
  import {
  
    useAuth,
  
  } from "../../auth/context/AuthContext";
  
  
  // UI components
  import Card from "../../../components/ui/Card";
  
  import Button from "../../../components/ui/Button";
  
  
  // Attendance history
  import AttendanceHistory
  
  from "../components/AttendanceHistory";
  
  
  // Attendance service
  import {
  
    getCurrentEmployee,
  
    getTodayAttendance,
  
    selfCheckIn,
  
    selfCheckOut,
  
    getAttendanceHistory,
  
  } from "../services/selfAttendanceService";
  
  
  function EmployeeSelfAttendancePage() {
  
    // Current employee
    const [employee, setEmployee] = useState(null);
  
  
    // Today's attendance
    const [attendance, setAttendance] = useState(null);
  
  
    // Attendance history
    const [history, setHistory] = useState([]);
  
  
    // Loading state
    const [loading, setLoading] = useState(true);
  
  
    // Current auth user
    const { user } = useAuth();
  
  
    // // Load employee data
    // useEffect(() => {
  
    //   async function loadData() {
  
    //     try {
  
    //       setLoading(true);
  
  
    //       // Current employee
    //       const employeeData =
  
    //         await getCurrentEmployee(
  
    //           user.id
    //         );
  
    //       setEmployee(employeeData);
  
  
    //       // Today's attendance
    //       const attendanceData =
  
    //         await getTodayAttendance(
  
    //           employeeData.id
    //         );
  
    //       setAttendance(attendanceData);
  
  
    //       // Attendance history
    //       const historyData =
  
    //         await getAttendanceHistory(
  
    //           employeeData.id
    //         );
  
    //       setHistory(historyData);
  
    //     } catch (error) {
  
    //       alert(error.message);
  
    //     } finally {
  
    //       setLoading(false);
    //     }
    //   }
  
    //   if (user) {
  
    //     loadData();
    //   }
  
    // }, [user]);
  
    useEffect(() => {    

        console.log("PAGE LOADED");
      
        console.log("USER:", user);
      
        setLoading(false);
      
      }, [user]);

  
    // Handle check-in
    async function handleCheckIn() {
  
      try {
  
        const result =
  
          await selfCheckIn(employee);
  
        setAttendance(result[0]);
  
        alert("Check-in successful");
  
      } catch (error) {
  
        alert(error.message);
      }
    }
  
  
    // Handle check-out
    async function handleCheckOut() {
  
      try {
  
        const result =
  
          await selfCheckOut(
  
            attendance,
  
            employee
          );
  
        setAttendance(result[0]);
  
        alert("Check-out successful");
  
      } catch (error) {
  
        alert(error.message);
      }
    }
  
  
    if (loading) {
  
      return <div>Loading...</div>;
    }
  
  
    return (
  
      <DashboardLayout>
  
        <div className="space-y-6">
  
          {/* Employee profile */}
          <Card>
  
            <h2 className="text-2xl font-bold">
  
              Welcome,
              {" "}
              {employee?.full_name}
  
            </h2>
  
            <p className="mt-2">
  
              Designation:
              {" "}
              {employee?.designation}
  
            </p>
  
            <p>
  
              Shift:
              {" "}
              {employee?.shifts?.shift_name}
  
            </p>
  
          </Card>
  
  
          {/* Today's attendance */}
          <Card>
  
            <h3 className="text-xl font-bold mb-4">
  
              Today's Attendance
  
            </h3>
  
  
            {/* No attendance */}
            {!attendance && (
  
              <Button onClick={handleCheckIn}>
  
                Check In
  
              </Button>
            )}
  
  
            {/* Attendance exists */}
            {attendance && (
  
              <div className="space-y-4">
  
                <p>
  
                  Status:
                  {" "}
                  {attendance.status}
  
                </p>
  
                <p>
  
                  Check-In:
                  {" "}
                  {attendance.check_in}
  
                </p>
  
                <p>
  
                  Check-Out:
                  {" "}
                  {attendance.check_out || "Pending"}
  
                </p>
  
  
                {!attendance.check_out && (
  
                  <Button
                    variant="danger"
                    onClick={handleCheckOut}
                  >
  
                    Check Out
  
                  </Button>
                )}
  
              </div>
            )}
  
          </Card>
  
  
          {/* Attendance history */}
          <AttendanceHistory
            records={history}
          />
  
        </div>
  
      </DashboardLayout>
    );
  }
  
  export default EmployeeSelfAttendancePage;