import { useEffect, useState } from "react";

import {

getAuditLogs

}

from "../../attendance/services/attendanceService";

function AuditHistory(){

const [logs,setLogs]=

useState([]);

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

return(

<div className="mt-6">

<h2 className="font-bold text-lg mb-4">

Attendance Audit History

</h2>

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

{logs.map((log)=>(

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

))}

</tbody>

</table>

</div>

);

}

export default AuditHistory;