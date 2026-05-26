/*
==================================================
ARCH-008
Date: 2026-05-26
Time: 15:00 IST
Status: ACTIVE

Purpose:
Centralize plugin exports.

Risk:
VERY LOW

Rollback:
Delete index.js
==================================================
*/

export {

    default as AttendanceAnalyticsCards
    
    }
    
    from "./components/AttendanceAnalyticsCards";
    
    
    export {
    
    getAttendanceAnalytics
    
    }
    
    from "./services/attendanceAnalyticsService";
    
    
    export {
    
    calculateAttendanceSummary
    
    }
    
    from "./utils/attendanceAnalyticsCalculator";
    
    
    export {
    
    pluginManifest
    
    }
    
    from "./pluginManifest";