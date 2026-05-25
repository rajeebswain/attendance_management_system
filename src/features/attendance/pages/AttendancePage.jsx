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