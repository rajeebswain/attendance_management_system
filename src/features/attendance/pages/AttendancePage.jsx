import {

    useEffect,
  
    useState,
  
  } from "react";
  
  
  // Dashboard layout
  import DashboardLayout from "../../../components/layout/DashboardLayout";
  
  
  // Attendance components
  import AttendanceForm from "../components/AttendanceForm";
  
  import AttendanceTable from "../components/AttendanceTable";
  
  import AttendanceFilters from "../components/AttendanceFilters";
  
  import AttendanceAnalytics from "../components/AttendanceAnalytics";
  
  
  // Attendance service
  import {
  
    getAttendanceRecords,
  
  } from "../services/attendanceService";
  
  
  function AttendancePage() {
  
    // Attendance list
    const [records, setRecords] = useState([]);
  
  
    // Loading state
    const [loading, setLoading] = useState(true);
  
  
    // Filter state
    const [filterStatus, setFilterStatus] = useState("");
  
  
    // Fetch attendance data
    async function fetchAttendance() {
  
      try {
  
        setLoading(true);
  
        const data = await getAttendanceRecords();
  
        setRecords(data);
  
      } catch (error) {
  
        alert(error.message);
  
      } finally {
  
        setLoading(false);
      }
    }
  
  
    // Load attendance on mount
    useEffect(() => {
  
      fetchAttendance();
  
    }, []);
  
  
    // Filter records
    const filteredRecords = records.filter(
  
      (record) => {
  
        if (!filterStatus) {
  
          return true;
        }
  
        return record.status === filterStatus;
      }
    );
  
    /*Create late-checking function.*/

    function calculateAttendanceStatus(

      employee,
      
      checkInTime
      
      ){
      
      if(
      
      !employee.shifts
      
      )
      
      return "Present";
      
      
      const shiftStart =
      
      employee.shifts.start_time;
      
      
      const graceMinutes =
      
      employee.shifts.grace_minutes || 0;
      
      
      // Convert time values
      const shiftDate = new Date();
      
      const checkDate = new Date();
      
      
      const [
      
      hour,
      
      minute
      
      ] = shiftStart.split(":");
      
      
      shiftDate.setHours(
      
      parseInt(hour),
      
      parseInt(minute)+graceMinutes,
      
      0
      
      );
      
      
      // User checkin
      const [
      
      checkHour,
      
      checkMinute
      
      ]
      
      =
      
      checkInTime.split(":");
      
      
      checkDate.setHours(
      
      parseInt(checkHour),
      
      parseInt(checkMinute),
      
      0
      
      );
      
      
      if(
      
      checkDate > shiftDate
      
      ){
      
      return "Late";
      
      }
      
      
      return "Present";
      
      }
  
    return (
  
      <DashboardLayout>
  
        <div className="space-y-6">
  
          {/* Attendance analytics */}
          <AttendanceAnalytics
            records={records}
          />
  
  
          {/* Attendance form */}
          <AttendanceForm
            onAttendanceCreated={
              fetchAttendance
            }
          />
  
  
          {/* Attendance filters */}
          <AttendanceFilters
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
  
  
          {/* Attendance table */}
          {loading ? (
  
            <div>
              Loading attendance...
            </div>
  
          ) : (
  
            <AttendanceTable
              records={filteredRecords}
            />
          )}
  
        </div>
  
      </DashboardLayout>
    );
  }
  
  export default AttendancePage;