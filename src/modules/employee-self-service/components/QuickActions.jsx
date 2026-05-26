/*
==================================================
Change ID: M06-011
Date: 2026-05-26
Status: Initial
Purpose: Employee quick actions
Risk: Low
Rollback: Remove component
==================================================
*/

function QuickActions(){

    return(
    
    <div
    className="
    bg-white
    rounded-lg
    shadow
    p-6
    "
    >
    
    <h3 className="font-bold mb-4">
    
    Quick Actions
    
    </h3>
    
    <div className="flex gap-4">
    
    <button
    className="
    bg-blue-600
    text-white
    px-4
    py-2
    rounded
    "
    >
    
    Mark Attendance
    
    </button>
    
    <button
    className="
    bg-green-600
    text-white
    px-4
    py-2
    rounded
    "
    >
    
    Apply Leave
    
    </button>
    
    <button
    className="
    bg-gray-600
    text-white
    px-4
    py-2
    rounded
    "
    >
    
    Attendance History
    
    </button>
    
    </div>
    
    </div>
    
    );
    
    }
    
    export default QuickActions;