import {

    useEffect,
  
    useState,
  
  } from "react";
  
  
  // Reusable UI components
  import Button from "../../../components/ui/Button";
  
  import Card from "../../../components/ui/Card";
  
  
  // Attendance services
  import {
  
    createAttendance,
  
    getEmployees,
  
  } from "../services/attendanceService";
  
  
  function AttendanceForm({
  
    onAttendanceCreated,
  
  }) {
  
    // Employee dropdown list
    const [employees, setEmployees] = useState([]);
  
  
    // Form states
    const [employeeId, setEmployeeId] = useState("");
  
    const [status, setStatus] = useState("present");
  
    const [checkIn, setCheckIn] = useState("");
  
    const [checkOut, setCheckOut] = useState("");
  
  
    // Loading state
    const [loading, setLoading] = useState(false);
  
  
    // Fetch employees on component load
    useEffect(() => {
  
      async function loadEmployees() {
  
        try {
  
          const data = await getEmployees();
  
          setEmployees(data);
  
        } catch (error) {
  
          alert(error.message);
        }
      }
  
      loadEmployees();
  
    }, []);
  
  
    // Handle attendance form submit
    async function handleSubmit(event) {
  
      event.preventDefault();
  
      try {
  
        setLoading(true);
  
        // Create attendance record
        await createAttendance({
  
          employee_id: employeeId,
  
          attendance_date: new Date(),
  
          status,
  
          check_in: checkIn,
  
          check_out: checkOut,
        });
  
        // Reset form
        setEmployeeId("");
  
        setStatus("present");
  
        setCheckIn("");
  
        setCheckOut("");
  
        // Refresh attendance list
        onAttendanceCreated();
  
        alert("Attendance marked successfully");
  
      } catch (error) {
  
        alert(error.message);
  
      } finally {
  
        setLoading(false);
      }
    }
  
  
    return (
  
      <Card>
  
        <h2 className="text-2xl font-bold mb-4">
  
          Mark Attendance
  
        </h2>
  
  
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
  
          {/* Employee selection */}
          <select
            value={employeeId}
            onChange={(e) =>
              setEmployeeId(e.target.value)
            }
            className="
              w-full
              border
              rounded
              p-3
            "
          >
  
            <option value="">
              Select Employee
            </option>
  
            {employees.map((employee) => (
  
              <option
                key={employee.id}
                value={employee.id}
              >
  
                {employee.full_name}
  
              </option>
  
            ))}
  
          </select>
  
  
          {/* Attendance status */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="
              w-full
              border
              rounded
              p-3
            "
          >
  
            <option value="present">
              Present
            </option>
  
            <option value="absent">
              Absent
            </option>
  
            <option value="late">
              Late
            </option>
  
            <option value="leave">
              Leave
            </option>
  
          </select>
  
  
          {/* Check-in time */}
          <input
            type="time"
            value={checkIn}
            onChange={(e) =>
              setCheckIn(e.target.value)
            }
            className="
              w-full
              border
              rounded
              p-3
            "
          />
  
  
          {/* Check-out time */}
          <input
            type="time"
            value={checkOut}
            onChange={(e) =>
              setCheckOut(e.target.value)
            }
            className="
              w-full
              border
              rounded
              p-3
            "
          />
  
  
          <Button type="submit">
  
            {loading
              ? "Saving..."
              : "Mark Attendance"}
  
          </Button>
  
        </form>
  
      </Card>
    );
  }
  
  export default AttendanceForm;