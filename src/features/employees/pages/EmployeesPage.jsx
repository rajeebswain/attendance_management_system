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

  deactivateEmployee,

  restoreEmployee,

  updateEmployee

} from "../services/employeeService";



import {

  getShifts

}

  from "../services/employeeService";


function EmployeesPage() {

  // Employee list state
  const [employees, setEmployees] = useState([]);


  // Loading state
  const [loading, setLoading] = useState(true);


  // Shift list state
  const [

    shifts,

    setShifts

  ] = useState([]);

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

  /* Load shifts from database */
  async function loadShifts() {

    try {

      const data =

        await getShifts();

      setShifts(data);

    }

    catch (error) {

      console.log(error);

    }

  }


  async function handleDeactivate(

    id

  ) {

    try {

      // await deactivateEmployee(

      // id

      // );

      // loadEmployees();

      await deactivateEmployee(

        id

      );

      fetchEmployees();

      alert(

        "Employee deactivated"

      );

    }

    catch (error) {

      console.log(error);

      alert(

        "Failed"

      );

    }

  }

  async function handleRestore(

    id
    
    ){
    
    try{
    
    await restoreEmployee(
    
    id
    
    );
    
    fetchEmployees();
    
    alert(
    
    "Employee restored"
    
    );
    
    }
    
    catch(error){
    
    console.log(
    
    error
    
    );
    
    alert(
    
    "Failed"
    
    );
    
    }
    
    }


    async function handleEdit(

      id,
      
      employeeData
      
      ){
      
      try{
      
      await updateEmployee(
      
      id,
      
      employeeData
      
      );
      
      fetchEmployees();
      
      alert(
      
      "Employee updated"
      
      );
      
      }
      
      catch(error){
      
      console.log(
      
      error
      
      );
      
      alert(
      
      "Update failed"
      
      );
      
      }
      
      }






  // Load employees initially
  useEffect(() => {

    fetchEmployees();

    loadShifts();



  }, []);


  return (

    <DashboardLayout>

      <div className="space-y-6">

        <EmployeeForm
          onEmployeeCreated={fetchEmployees}
          shifts={shifts}
        />

        {loading ? (

          <div>Loading employees...</div>

        ) : (

           <EmployeesTable
            employees={employees}
            onDelete={handleDeactivate}
            onRestore={handleRestore}
            onEdit={handleEdit}
          />
        )}

      </div>

    </DashboardLayout>
  );
}

export default EmployeesPage;