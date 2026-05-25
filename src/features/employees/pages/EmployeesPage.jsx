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

  updateEmployee,

  uploadEmployeeImage

} from "../services/employeeService";



import {

  getShifts

}

  from "../services/employeeService";


/*
------------------------------------------------------
Added: 2026-05-25
Change: AMS-M03-EDIT-001

Purpose:
Import employee edit modal component.
------------------------------------------------------
*/

import EmployeeEditModal
  from "../components/EmployeeEditModal";




/*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EMP-012

Purpose:
Import employee details modal.
------------------------------------------------------
*/

import EmployeeDetailsModal
  from "../components/EmployeeDetailsModal";

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


  /*
------------------------------------------------------
Added: 2026-05-25
Change: AMS-M03-EDIT-001

Purpose:
Track selected employee
and modal visibility.
------------------------------------------------------
*/

  const [
    selectedEmployee,
    setSelectedEmployee
  ] = useState(null);

  const [
    showEditModal,
    setShowEditModal
  ] = useState(false);

  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change ID: AMS-M03-EMP-012
  
  Purpose:
  Store selected employee
  for view modal.
  
  Risk:
  LOW
  ------------------------------------------------------
  */

  const [
    selectedViewEmployee,
    setSelectedViewEmployee
  ] = useState(null);


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

  ) {

    try {

      await restoreEmployee(

        id

      );

      fetchEmployees();

      alert(

        "Employee restored"

      );

    }

    catch (error) {

      console.log(

        error

      );

      alert(

        "Failed"

      );

    }

  }


  /*
------------------------------------------------------
Added: 2026-05-25
Change: AMS-M03-EDIT-001

Purpose:
Update employee using modal data.
------------------------------------------------------
*/

  async function handleEdit(

    id,

    employeeData

  ) {

    try {


      /*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EMP-013

Purpose:
Upload edited employee image
before updating employee.

Risk:
LOW
------------------------------------------------------
*/

if(

  employeeData.profile_image
  
  instanceof File
  
  ){
  
  employeeData.profile_image=
  
  await uploadEmployeeImage(
  
  employeeData.profile_image
  
  );
  
  }
      await updateEmployee(

        id,

        employeeData

      );

      fetchEmployees();

      setShowEditModal(false);

      setSelectedEmployee(null);

      alert(

        "Employee updated"

      );

    }

    catch (error) {

      console.log(error);

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



          // <EmployeesTable
          //   employees={employees}
          //   onDelete={handleDeactivate}
          //   onRestore={handleRestore}

          //   /*
          //   ------------------------------------------------------
          //   Added: 2026-05-25
          //   Change: AMS-M03-EDIT-001

          //   Purpose:
          //   Open modal instead of updating directly.
          //   ------------------------------------------------------
          //   */
          //   onEdit={(employee) => {

          //     setSelectedEmployee(employee);

          //     setShowEditModal(true);

          //   }}

          // />

          <EmployeesTable
            employees={employees}
            onDelete={handleDeactivate}
            onRestore={handleRestore}

            /*
            ------------------------------------------------------
            Added: 2026-05-25
            Change: AMS-M03-EDIT-001
            
            Purpose:
            Open edit employee modal.
            ------------------------------------------------------
            */
            onEdit={(employee) => {

              setSelectedEmployee(
                employee
              );

              setShowEditModal(
                true
              );

            }}


            /*
            ------------------------------------------------------
            Added: 2026-05-25
            Change: AMS-M03-EMP-012
            
            Purpose:
            Open employee details modal.
            ------------------------------------------------------
            */
            onView={(employee) => {

              setSelectedViewEmployee(
                employee
              );

            }}

          />


        )}

      </div>

      {/* 
------------------------------------------------------
Added: 2026-05-25
Change: AMS-M03-EDIT-001

Purpose:
Render employee edit modal.
------------------------------------------------------
*/}

      {
        showEditModal && (

          <EmployeeEditModal

            employee={selectedEmployee}

            shifts={shifts}

            /*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EDIT-005

Purpose:
Pass employee id with updated data
to save workflow.
------------------------------------------------------
*/

            onSave={(employeeData) => {

              handleEdit(
                selectedEmployee.id,
                employeeData
              );

            }}

            onClose={() => {

              setShowEditModal(false);

              setSelectedEmployee(null);

            }}

          />

        )
      }
{/*
      ------------------------------------------------------
      Added: 2026-05-25
      Change ID: AMS-M03-EMP-012

      Purpose:
      Render employee details modal.
      ------------------------------------------------------
      */}

      {

        selectedViewEmployee && (

          <EmployeeDetailsModal

            employee={
              selectedViewEmployee
            }

            onClose={() => {

              setSelectedViewEmployee(
                null
              );

            }}

          />

        )

      }

    </DashboardLayout>
  );
}




export default EmployeesPage;