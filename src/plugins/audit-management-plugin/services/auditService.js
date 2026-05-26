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


    /*
==================================================
ARCH-016
Date: 2026-05-26
Time: 17:20 IST
Status: ACTIVE

Purpose:
Connect audit schema and service.

Risk:
VERY LOW

Rollback:
Restore previous service
==================================================
*/

import {

    createAuditEvent
    
    }
    
    from "../utils/auditEventSchema";
    
    
    export function logAuditEvent(eventData){
    
    const auditEvent =
    
    createAuditEvent(
    
    eventData
    
    );
    
    console.log(
    
    "[AUDIT]",
    
    auditEvent
    
    );
    
    return auditEvent;
    
    }