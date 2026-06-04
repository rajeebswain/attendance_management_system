/*
==================================================
Change ID: M06-011
Date: 2026-05-26
Status: Initial
Purpose: Attendance status card
Risk: Low
Rollback: Remove component
==================================================
*/

function AttendanceStatusCard(){

    return(
    
    <div
    className="
    bg-white
    rounded-lg
    shadow
    p-6
    "
    >
    
    <h3 className="font-bold">
    
    Today's Status
    
    </h3>
    
    <p className="text-green-600">
    
    Present
    
    </p>
    
    <p>
    
    Worked Hours:
    
    7h 20m
    
    </p>
    
    </div>
    
    );
    
    }
    
    export default AttendanceStatusCard;