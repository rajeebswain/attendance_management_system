/*
==================================================
ARCH-007
Date: 2026-05-26
Time: 14:40 IST
Status: ACTIVE

Purpose:
Create plugin metadata definition.

Risk:
VERY LOW

Rollback:
Delete manifest file
==================================================
*/

export const pluginManifest = {

    id:"attendance-analytics",
    
    name:"Attendance Analytics Plugin",
    
    version:"1.0.0",
    
    status:"active",
    
    description:
    "Provides attendance statistics and analytics.",
    
    dependencies:[
    
    "attendance"
    
    ],
    
    features:[
    
    "present-count",
    "absent-count"
    
    ]
    
    };