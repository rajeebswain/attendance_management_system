// Reusable button
import Button from "../../../components/ui/Button";

import { useState } from "react";

function EmployeesTable({

employees,

onDelete,

onRestore,

onEdit

}) {

const [

statusFilter,

setStatusFilter

]

=

useState(

"active"

);

return (

<div className="overflow-x-auto">

<div className="mb-4">

<select

value={statusFilter}

onChange={(e)=>

setStatusFilter(

e.target.value

)

}

className="border rounded p-2"

>

<option value="active">

Active Employees

</option>

<option value="inactive">

Inactive Employees

</option>

</select>

</div>

<table
className="
w-full
bg-white
rounded-lg
overflow-hidden
"
>

<thead className="bg-gray-200">

<tr>

{/* <th className="p-4 text-left">

Employee Code

</th>

<th className="p-4 text-left">

Full Name

</th>

<th className="p-4 text-left">

Email

</th>

<th className="p-4 text-left">

Designation

</th>

<th className="p-4 text-left">

Actions

</th> */}

<th className="p-4 text-left">

Employee Code

</th>

<th className="p-4 text-left">

Full Name

</th>

<th className="p-4 text-left">

Email

</th>

<th className="p-4 text-left">

Designation

</th>

<th className="p-4 text-left">

Department

</th>

<th className="p-4 text-left">

Phone

</th>

<th className="p-4 text-left">

Gender

</th>

<th className="p-4 text-left">

Shift

</th>

</tr>

</thead>

<tbody>

{

employees

.filter(

(employee)=>

statusFilter==="active"

?

employee.is_active===true

:

employee.is_active===false

)

.map((employee)=>(

<tr
key={employee.id}
className="border-b"
>

<td className="p-4">

{employee.employee_code}

</td>

<td className="p-4">

{employee.full_name}

</td>

<td className="p-4">

{employee.email}

</td>

<td className="p-4">

{employee.designation}

</td>


<td className="p-4">

{employee.department || "-"}

</td>

<td className="p-4">

{employee.phone || "-"}

</td>

<td className="p-4">

{employee.gender || "-"}

</td>

<td className="p-4">

{employee.shifts?.shift_name || "-"}

</td>

<td className="p-4 flex gap-2">

{/* <Button>

Edit

</Button> */}
{/* <Button

onClick={()=>{

const updatedEmployee={

employee_code:

prompt(

"Employee Code",

employee.employee_code

),

full_name:

prompt(

"Full Name",

employee.full_name

),

email:

prompt(

"Email",

employee.email

),

designation:

prompt(

"Designation",

employee.designation

)

};

if(

updatedEmployee.employee_code

&&

updatedEmployee.full_name

){

onEdit(

employee.id,

updatedEmployee

);

}

}}

>

Edit

</Button> */}

{/* 
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EDIT-001

Purpose:
Open EmployeeEditModal instead of
using prompt().
------------------------------------------------------
*/}

<Button

onClick={()=>{

onEdit(employee);

}}

>

Edit

</Button>






{

employee.is_active

?

(

/* <Button
onClick={()=>

onDelete(

employee.id

)

}
>

Deactivate

</Button> */


<Button

onClick={()=>{

const confirmDeactivate=

window.confirm(

"Do you want to deactivate this employee?"

);

if(

confirmDeactivate

){

onDelete(

employee.id

);

}

}}

>

Deactivate

</Button>


)

:

(

/* <Button
onClick={()=>

onRestore(

employee.id

)

}
>

Restore

</Button> */



<Button

onClick={()=>{

const confirmRestore=

window.confirm(

"Do you want to restore this employee?"

);

if(

confirmRestore

){

onRestore(

employee.id

);

}

}}

>

Restore

</Button>

)

}

</td>

</tr>

))

}

</tbody>

</table>

</div>

);

}

export default EmployeesTable;