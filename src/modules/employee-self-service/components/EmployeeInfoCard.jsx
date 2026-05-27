// /*
// ==================================================
// Change ID: M06-011
// Date: 2026-05-26
// Status: Initial
// Purpose: Employee information card
// Risk: Low
// Rollback: Remove component
// ==================================================
// */

// function EmployeeInfoCard(){

//     return(
    
//     <div
//     className="
//     bg-white
//     rounded-lg
//     shadow
//     p-6
//     "
//     >
    
//     <h3 className="font-bold mb-3">
    
//     Employee Information
    
//     </h3>
    
//     <p>Name: Rajeeb Kumar</p>
    
//     <p>ID: EMP001</p>
    
//     <p>Department: Maintenance</p>
    
//     <p>Shift: General Shift</p>
    
//     </div>
    
//     );
    
//     }
    
//     export default EmployeeInfoCard;


/*
==================================================
Change ID: M06-014
Date: 2026-05-26
Status: Updated
Purpose: Show real employee information
Risk: Medium
Rollback: Restore hardcoded data
==================================================
*/

function EmployeeInfoCard({

    employee
    
    }){
    
    if(!employee){
    
    return(
    
    <div
    className="
    bg-white
    rounded-lg
    shadow
    p-6
    "
    >
    
    Loading employee...
    
    </div>
    
    );
    
    }
    
    return(
    
    <div
    className="
    bg-white
    rounded-lg
    shadow
    p-6
    "
    >
    
    <h3 className="font-bold mb-3">
    
    Employee Information
    
    </h3>
    
    <p>
    
    Name:
    
    {employee.full_name}
    
    </p>
    
    <p>
    
    Department:
    
    {
    
    employee.departments
    ?.department_name
    
    ||
    
    "N/A"
    
    }
    
    </p>
    
    <p>
    
    Shift:
    
    {
    
    employee.shifts
    ?.shift_name
    
    ||
    
    "N/A"
    
    }
    
    </p>
    
    </div>
    
    );
    
    }
    
    export default EmployeeInfoCard;