// import DashboardLayout

// from "../../../components/layout/DashboardLayout";


// function EmployeeSelfAttendancePage() {

//   return (

//     <DashboardLayout>

//       <div className="space-y-6">

//         <div
//           className="
//             bg-white
//             p-6
//             rounded-lg
//           "
//         >

//           <h1
//             className="
//               text-2xl
//               font-bold
//             "
//           >

//             Employee Self Attendance

//           </h1>

//           <p className="mt-2">

//             Basic page working.

//           </p>

//         </div>

//       </div>

//     </DashboardLayout>
//   );
// }

// export default EmployeeSelfAttendancePage;


// import {

//   useEffect,

//   useState,

// } from "react";


// import DashboardLayout

// from "../../../components/layout/DashboardLayout";


// import {

//   useAuth,

// } from "../../auth/context/AuthContext";


// import {

//   getCurrentEmployee,

// } from "../services/selfAttendanceService";


// function EmployeeSelfAttendancePage() {

//   // Employee state
//   const [employee, setEmployee] = useState(null);


//   // Loading state
//   const [loading, setLoading] = useState(true);


//   // Current auth user
//   const { user } = useAuth();


//   // Load employee
//   useEffect(() => {

//     async function loadEmployee() {

//       try {

//         console.log("USER:", user);

//         const employeeData =

//           await getCurrentEmployee(

//             user.id
//           );

//         console.log(

//           "EMPLOYEE:",
//           employeeData
//         );

//         setEmployee(employeeData);

//       } catch (error) {

//         console.error(error);

//       } finally {

//         setLoading(false);
//       }
//     }

//     if (user) {

//       loadEmployee();
//     }

//   }, [user]);


//   // Loading UI
//   if (loading) {

//     return <div>Loading...</div>;
//   }


//   return (

//     <DashboardLayout>

//       <div className="space-y-6">

//         <div
//           className="
//             bg-white
//             p-6
//             rounded-lg
//           "
//         >

//           <h1
//             className="
//               text-2xl
//               font-bold
//             "
//           >

//             Employee Self Attendance

//           </h1>


//           <p className="mt-4">

//             Employee Name:
//             {" "}

//             {employee?.full_name}

//           </p>


//           <p>

//             Employee Code:
//             {" "}

//             {employee?.employee_code}

//           </p>

//         </div>

//       </div>

//     </DashboardLayout>
//   );
// }

// export default EmployeeSelfAttendancePage;



import {

  useEffect,

  useState,

} from "react";


import DashboardLayout

from "../../../components/layout/DashboardLayout";


import {

  useAuth,

} from "../../auth/context/AuthContext";

import {

  testEmployeeQuery,

} from "../services/selfAttendanceService";

function EmployeeSelfAttendancePage() {

  // Loading state
  const [loading, setLoading] = useState(true);


  // Current auth user
  const { user } = useAuth();


  // Employee state
  const [employee, setEmployee] = useState(null);


  // useEffect(() => {

  //   console.log("PAGE LOADED");

  //   console.log("USER:", user);


  //   // Fake employee data
  //   setEmployee({

  //     full_name: "Test Employee",

  //     employee_code: "EMP001",
  //   });


  //   setLoading(false);

  // }, [user]);

  useEffect(() => {

    async function loadData() {
  
      try {
  
        console.log("START");
  
  
        // const result = await testEmployeeQuery();
  
        // console.log("RESULT:", result);
  
  
        // // if (result?.length > 0) {
  
        // //   setEmployee(result[0]);
        // // }
        // console.log("RESULT:", result);

        // setEmployee(result[0]);
        const result = await testEmployeeQuery();

        console.log("FULL RESULT:", result);

        console.log("TYPE:", typeof result);

        console.log("IS ARRAY:", Array.isArray(result));

        console.log("FIRST ITEM:", result?.[0]);

        setEmployee(result[0]);
  
      } catch (error) {
  
        console.error(error);
  
      } finally {
  
        setLoading(false);
      }
    }
  
    loadData();
  
  }, []);

  // Loading UI
  if (loading) {

    return <div>Loading...</div>;
  }


  return (

    <DashboardLayout>

      <div className="p-6">

        <h1 className="text-2xl font-bold">

          Employee Self Attendance

        </h1>


        <p className="mt-4">

          Employee Name:
          {" "}

          {employee?.full_name}

        </p>


        <p>

          Employee Code:
          {" "}

          {employee?.employee_code}

        </p>

      </div>

    </DashboardLayout>
  );
}

export default EmployeeSelfAttendancePage;