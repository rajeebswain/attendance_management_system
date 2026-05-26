/*
==================================================
ARCH-011
Date: 2026-05-26
Time: 15:45 IST
Status: ACTIVE

Purpose:
Create reusable smart attendance rules.

Risk:
LOW

Rollback:
Delete plugin file only
==================================================
*/

export function calculateOvertime(attendance){

    if(
    
    !attendance.check_in
    
    ||
    
    !attendance.check_out
    
    ){
    
    return {
    
    workedHours:0,
    overtimeHours:0
    
    };
    
    }
    
    const checkIn = new Date(
    
    `1970-01-01T${attendance.check_in}`
    
    );
    
    const checkOut = new Date(
    
    `1970-01-01T${attendance.check_out}`
    
    );
    
    const workedMs =
    
    checkOut - checkIn;
    
    const workedHours =
    
    workedMs/(1000*60*60);
    
    const shiftHours = 8;
    
    const overtimeHours =
    
    workedHours > shiftHours
    
    ?
    
    workedHours-shiftHours
    
    :
    
    0;
    
    return {
    
    workedHours:
    
    workedHours.toFixed(2),
    
    overtimeHours:
    
    overtimeHours.toFixed(2)
    
    };
    
    }