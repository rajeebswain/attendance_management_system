/*
==================================================
Change ID: M06-010
Date: 2026-05-26
Status: Initial
Purpose: Employee layout wrapper
Risk: Low
Rollback: Remove component
==================================================
*/

import Navbar
from "../../../components/layout/Navbar";

import EmployeeSidebar
from "./EmployeeSidebar";

function EmployeeLayout({

children

}){

return(

<div className="flex">

<EmployeeSidebar/>

<div
className="
flex-1
bg-gray-100
min-h-screen
"
>

<Navbar/>

<main className="p-6">

{children}

</main>

</div>

</div>

);

}

export default EmployeeLayout;