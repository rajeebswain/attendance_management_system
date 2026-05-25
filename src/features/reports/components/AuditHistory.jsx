// import { useEffect, useState } from "react";

// import {

// getAuditLogs

// }

// from "../../attendance/services/attendanceService";

// function AuditHistory(){

// const [logs,setLogs]=

// useState([]);

// useEffect(()=>{

// loadLogs();

// },[]);

// async function loadLogs(){

// try{

// const data=

// await getAuditLogs();

// setLogs(data);

// }

// catch(error){

// console.error(error);

// }

// }

// return(

// <div className="mt-6">

// <h2 className="font-bold text-lg mb-4">

// Attendance Audit History

// </h2>

// <table className="w-full border">

// <thead>

// <tr>

// <th>Employee</th>

// <th>Action</th>

// <th>Old</th>

// <th>New</th>

// <th>Changed By</th>

// <th>Time</th>

// </tr>

// </thead>

// <tbody>

// {logs.map((log)=>(

// <tr key={log.id}>

// <td>

// {log.attendance?.employees?.full_name}

// </td>

// <td>

// {log.action_type}

// </td>

// <td>

// {log.old_value}

// </td>

// <td>

// {log.new_value}

// </td>

// <td>

// {log.changed_by}

// </td>

// <td>

// {

// new Date(

// log.created_at

// )

// .toLocaleString()

// }

// </td>

// </tr>

// ))}

// </tbody>

// </table>

// </div>

// );

// }

// export default AuditHistory;



import { useEffect, useState } from "react";

import {
getAuditLogs
}
from "../../attendance/services/attendanceService";

function AuditHistory(){

const [logs,setLogs]=useState([]);

const [searchTerm,setSearchTerm]=useState("");

const [fromDate,setFromDate]=useState("");

const [toDate,setToDate]=useState("");

const [rowsPerPage,setRowsPerPage]=
useState(10);

const [currentPage,setCurrentPage]=
useState(1);


useEffect(()=>{

loadLogs();

},[]);


async function loadLogs(){

try{

const data=

await getAuditLogs();

setLogs(data);

}

catch(error){

console.error(error);

}

}


// filter

const filteredLogs=

logs.filter((log)=>{

const employeeName=

log.attendance?.employees
?.full_name || "";

const employeeMatch=

employeeName
.toLowerCase()
.includes(
searchTerm.toLowerCase()
);

const dateMatch=

(

!fromDate ||

log.created_at
>=fromDate

)

&&

(

!toDate ||

log.created_at
<=toDate

);

return(

employeeMatch

&&

dateMatch

);

});


// pagination

const startIndex=

(currentPage-1)

*

rowsPerPage;


const paginatedLogs=

filteredLogs.slice(

startIndex,

startIndex+rowsPerPage

);


const totalPages=

Math.ceil(

filteredLogs.length

/

rowsPerPage

);


return(

<div className="mt-6">

<h2 className="font-bold text-lg mb-4">

Attendance Audit History

</h2>


<div
className="flex gap-2 mb-4 flex-wrap"
>

<input
type="text"
placeholder="Search Employee"
value={searchTerm}
onChange={(e)=>{
setSearchTerm(
e.target.value
);
setCurrentPage(1);
}}
className="border p-2 rounded"
/>

<input
type="date"
value={fromDate}
onChange={(e)=>{
setFromDate(
e.target.value
);
setCurrentPage(1);
}}
className="border p-2 rounded"
/>

<input
type="date"
value={toDate}
onChange={(e)=>{
setToDate(
e.target.value
);
setCurrentPage(1);
}}
className="border p-2 rounded"
/>

<select
value={rowsPerPage}
onChange={(e)=>{

setRowsPerPage(
Number(
e.target.value
)
);

setCurrentPage(1);

}}
className="border p-2 rounded"
>

<option value={10}>
10
</option>

<option value={25}>
25
</option>

<option value={50}>
50
</option>

<option value={100}>
100
</option>

</select>

</div>


<table className="w-full border">

<thead>

<tr>

<th>Employee</th>
<th>Action</th>
<th>Old</th>
<th>New</th>
<th>Changed By</th>
<th>Time</th>

</tr>

</thead>

<tbody>

{

paginatedLogs.map(

(log)=>(

<tr key={log.id}>

<td>

{log.attendance?.employees?.full_name}

</td>

<td>

{log.action_type}

</td>

<td>

{log.old_value}

</td>

<td>

{log.new_value}

</td>

<td>

{log.changed_by}

</td>

<td>

{

new Date(
log.created_at
)

.toLocaleString()

}

</td>

</tr>

)

)

}

</tbody>

</table>


<div
className="flex gap-2 mt-4"
>

<button

disabled={
currentPage===1
}

onClick={()=>

setCurrentPage(

currentPage-1

)

}

className="border px-2 py-1"

>

Previous

</button>


<span>

Page

{currentPage}

of

{totalPages || 1}

</span>


<button

disabled={

currentPage===totalPages

||

totalPages===0

}

onClick={()=>

setCurrentPage(

currentPage+1

)

}

className="border px-2 py-1"

>

Next

</button>

</div>

</div>

);

}

export default AuditHistory;