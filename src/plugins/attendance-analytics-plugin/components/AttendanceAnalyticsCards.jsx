/*
==================================================
ARCH-002
Date: 2026-05-26
Time: 13:35 IST
Status: ACTIVE

Purpose:
Create plugin copy of Attendance Analytics
without modifying existing attendance module.

Risk:
LOW

Rollback:
Delete plugin file only

Dependencies:
Attendance records
==================================================
*/

import Card from "../../../components/ui/Card";

import {
    calculateAttendanceSummary
    }
    from "../utils/attendanceAnalyticsCalculator";




function AttendanceAnalyticsCards({

records,

}) {

// const totalPresent = records.filter(

// (record)=>

// (

// record.status==="present"

// ||

// record.status==="late"

// )

// &&

// record.employees?.is_active===true

// &&

// record.is_archived!==true

// ).length;


// const totalAbsent = records.filter(

// (record)=>

// record.status==="absent"

// &&

// record.employees?.is_active===true

// &&

// record.is_archived!==true

// ).length;
const {

    totalPresent,
    
    totalAbsent
    
    }
    
    =
    
    calculateAttendanceSummary(records);

return (

<div
className="
grid
grid-cols-1
md:grid-cols-2
gap-4
"
>

<Card>

<h3 className="text-xl font-bold">

Present

</h3>

<p className="text-3xl mt-2">

{totalPresent}

</p>

</Card>


<Card>

<h3 className="text-xl font-bold">

Absent

</h3>

<p className="text-3xl mt-2">

{totalAbsent}

</p>

</Card>

</div>

);

}

export default AttendanceAnalyticsCards;