/*
==================================================
ARCH-005
Date: 2026-05-26
Time: 14:15 IST
Status: ACTIVE

Purpose:
Create analytics service layer.

Risk:
VERY LOW

Rollback:
Delete service file

Dependencies:
attendanceAnalyticsCalculator
==================================================
*/

import {

    calculateAttendanceSummary
    
    }
    
    from "../utils/attendanceAnalyticsCalculator";
    
    
    export function getAttendanceAnalytics(records){
    
    return calculateAttendanceSummary(records);
    
    }