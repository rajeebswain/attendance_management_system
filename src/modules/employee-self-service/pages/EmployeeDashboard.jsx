// /*
// ==================================================
// Change ID: M06-006
// Date: 2026-05-26
// Status: Fix
// Purpose: Employee dashboard shell
// Risk: Low
// Rollback: Restore component
// ==================================================
// */


// import EmployeeLayout
//     from "../layout/EmployeeLayout";

// function EmployeeDashboard() {

//     return (

//         // <DashboardLayout>
//         <EmployeeLayout>

//             {/* <div>

//                 <h1 className="text-3xl font-bold mb-4">

//                     Employee Dashboard

//                 </h1>

//                 <p className="text-gray-600">

//                     M06 Employee Self Service Module

//                 </p>

//             </div> */}

//             import WelcomeSection
//             from "../components/WelcomeSection";

//             import EmployeeInfoCard
//             from "../components/EmployeeInfoCard";

//             import AttendanceStatusCard
//             from "../components/AttendanceStatusCard";

//             import QuickActions
//             from "../components/QuickActions";


//             <div className="space-y-6">

//                 <WelcomeSection />

//                 <div className="grid grid-cols-2 gap-6">

//                     <EmployeeInfoCard />

//                     <AttendanceStatusCard />

//                 </div>

//                 <QuickActions />

//             </div>
//         </EmployeeLayout>
//         // </DashboardLayout>

//     );

// }

// export default EmployeeDashboard;


/*
==================================================
Change ID: M06-011
Date: 2026-05-26
Status: Updated
Purpose: Employee dashboard UI foundation
Risk: Low
Rollback: Restore previous component
==================================================
*/

import EmployeeLayout
from "../layout/EmployeeLayout";

import WelcomeSection
from "../components/WelcomeSection";

import EmployeeInfoCard
from "../components/EmployeeInfoCard";

import AttendanceStatusCard
from "../components/AttendanceStatusCard";

import QuickActions
from "../components/QuickActions";

function EmployeeDashboard() {

return (

<EmployeeLayout>

<div className="space-y-6">

<WelcomeSection />

<div className="grid grid-cols-2 gap-6">

<EmployeeInfoCard />

<AttendanceStatusCard />

</div>

<QuickActions />

</div>

</EmployeeLayout>

);

}

export default EmployeeDashboard;