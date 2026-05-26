/*
==================================================
ARCH-004
Date: 2026-05-26
Time: 14:00 IST
Status: ACTIVE

Purpose:
Extract analytics calculations from UI component.

Risk:
VERY LOW

Rollback:
Move calculation logic back to component

Dependencies:
Attendance records
==================================================
*/

export function calculateAttendanceSummary(records) {

    const totalPresent = records.filter(
    
    (record)=>
    
    (
    
    record.status==="present"
    
    ||
    
    record.status==="late"
    
    )
    
    &&
    
    record.employees?.is_active===true
    
    &&
    
    record.is_archived!==true
    
    ).length;
    
    
    const totalAbsent = records.filter(
    
    (record)=>
    
    record.status==="absent"
    
    &&
    
    record.employees?.is_active===true
    
    &&
    
    record.is_archived!==true
    
    ).length;
    
    
    return {
    
    totalPresent,
    totalAbsent
    
    };
    
    }