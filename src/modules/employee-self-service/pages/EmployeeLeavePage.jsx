/*
==================================================
Change ID: M06-018
Date: 2026-05-26
Status: Initial
Purpose: Employee leave wrapper
Risk: Low
Rollback: Remove page
==================================================
*/

import EmployeeLayout
from "../layout/EmployeeLayout";

import LeaveForm
from "../../../features/leaves/components/LeaveForm";

import {

    useEffect,
    
    useState
    
    }
    
    from "react";
    
    import {
    
    getCurrentEmployee
    
    }
    
    from "../services/employeeSelfService";

function EmployeeLeavePage(){

return(
    const [

        employee,
        
        setEmployee
        
        ]
        
        =
        
        useState(null);
        
        useEffect(()=>{
        
        loadEmployee();
        
        },[]);
        
        async function loadEmployee(){
        
        const data=
        
        await getCurrentEmployee();
        
        setEmployee(data);
        
        }

<EmployeeLayout>

<div className="p-6">

{/* <LeaveForm/> */}

<LeaveForm

employeeId={employee?.id}

/>

</div>

</EmployeeLayout>

);

}

export default EmployeeLeavePage;