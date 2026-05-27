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

function EmployeeLeavePage(){

return(

<EmployeeLayout>

<div className="p-6">

<LeaveForm/>

</div>

</EmployeeLayout>

);

}

export default EmployeeLeavePage;