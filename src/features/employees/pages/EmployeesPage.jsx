import {

    useEffect,
  
    useState,
  
  } from "react";
  
  
  // Layout wrapper
  import DashboardLayout from "../../../components/layout/DashboardLayout";
  
  
  // Employee components
  import EmployeeForm from "../components/EmployeeForm";
  
  import EmployeesTable from "../components/EmployeesTable";
  
  
  // Employee services
  import {
  
    getEmployees,
  
    deleteEmployee,
  
  } from "../services/employeeService";
  
  
  function EmployeesPage() {
  
    // Employee list state
    const [employees, setEmployees] = useState([]);
  
  
    // Loading state
    const [loading, setLoading] = useState(true);
  
  
    // Fetch employee list
    async function fetchEmployees() {
  
      try {
  
        setLoading(true);
  
        const data = await getEmployees();
  
        setEmployees(data);
  
      } catch (error) {
  
        alert(error.message);
  
      } finally {
  
        setLoading(false);
      }
    }
  
  
    // Delete employee
    async function handleDelete(employeeId) {
  
      try {
  
        await deleteEmployee(employeeId);
  
        fetchEmployees();
  
      } catch (error) {
  
        alert(error.message);
      }
    }
  
  
    // Load employees initially
    useEffect(() => {
  
      fetchEmployees();
  
    }, []);
  
  
    return (
  
      <DashboardLayout>
  
        <div className="space-y-6">
  
          <EmployeeForm
            onEmployeeCreated={fetchEmployees}
          />
  
          {loading ? (
  
            <div>Loading employees...</div>
  
          ) : (
  
            <EmployeesTable
              employees={employees}
              onDelete={handleDelete}
            />
          )}
  
        </div>
  
      </DashboardLayout>
    );
  }
  
  export default EmployeesPage;