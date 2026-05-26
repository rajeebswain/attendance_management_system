/*
==================================================
ARCH-015
Date: 2026-05-26
Time: 17:00 IST
Status: ACTIVE

Purpose:
Standardize audit event structure.

Risk:
VERY LOW

Rollback:
Delete file
==================================================
*/

export function createAuditEvent({

    action,
    
    module,
    
    user,
    
    recordId,
    
    reason=""
    
    }){
    
    return{
    
    timestamp:
    
    new Date().toISOString(),
    
    action,
    
    module,
    
    user,
    
    recordId,
    
    reason
    
    };
    
    }