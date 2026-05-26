/*
==================================================
ARCH-010
Date: 2026-05-26
Time: 15:30 IST
Status: ACTIVE

Purpose:
Create audit service foundation.

Risk:
VERY LOW

Rollback:
Delete file

Dependencies:
Attendance
Employees
==================================================
*/

export function logAuditEvent(eventData){

    console.log(
    "[AUDIT]",
    eventData
    );
    
    }