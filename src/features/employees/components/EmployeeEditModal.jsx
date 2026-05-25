/*
======================================================
AMS CHANGE TRACKER
Change ID: AMS-M03-EDIT-001
Date: 2026-05-25
Module: M03 Employee Core
Feature: Employee Edit Modal

Purpose:
Replace temporary prompt() editing with reusable modal.

Notes:
- Supports Save/Cancel
- Supports validation
- Receives employee data from EmployeesPage
- No database changes

Risk:
LOW
======================================================
*/

import { useEffect, useState } from "react";

function EmployeeEditModal({
  employee,
  shifts,
  onSave,
  onClose
}) {

  /*
  // ------------------------------------------------------
  // Added: 2026-05-25
  // Change ID: AMS-M03-EDIT-001
  
  // Purpose:
  // Match existing employee database schema
  // ------------------------------------------------------
  // */

  // const [formData, setFormData] = useState({

  //     employee_code:"",
  //     full_name:"",
  //     email:"",
  //     designation:"",
  //     shift_id:""

  //     });


  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change ID: AMS-M03-EDIT-002
  
  Purpose:
  Extend employee schema
  for future HR/admin use.
  ------------------------------------------------------
  */

  const [formData, setFormData] = useState({

    employee_code: "",
    full_name: "",
    email: "",
    designation: "",
    department: "",
    phone: "",
    shift_id: ""

  });


  /*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EDIT-007

Purpose:
Store employee country code
for edit workflow.

Risk:
LOW
------------------------------------------------------
*/

const [
  countryCode,
  setCountryCode
  ] = useState("+91");


  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change: AMS-M03-EDIT-001

  Purpose:
  Store validation errors.
  ------------------------------------------------------
  */

  const [errors, setErrors] = useState({});


  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change: AMS-M03-EDIT-001

  Purpose:
  Populate form using selected employee data.
  Runs whenever employee changes.
  ------------------------------------------------------
  */

//   useEffect(() => {

//     if (employee) {

//       setFormData({

//         employee_code:
//           employee.employee_code || "",

//         full_name:
//           employee.full_name || "",

//         email:
//           employee.email || "",

//         designation:
//           employee.designation || "",

//         department:
//           employee.department || "",

//                  phone:
// (employee.phone || "")
// .replace(/^\+\d+/,""),

//         shift_id:
//           employee.shift_id || ""

//       });

//     }

//   }, [employee]);


/*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EDIT-008

Purpose:
Split stored phone value into:

- Country code
- Phone number

Example:

Stored:
+919999999999

Modal shows:

Country: +91
Phone: 9999999999

Risk:
LOW
------------------------------------------------------
*/

useEffect(()=>{

  const phoneValue =
  employee.phone || "";
  
  const countryMatch =
  phoneValue.match(/^\+\d{1,4}/);
  
  if(countryMatch){
  
  setCountryCode(
  countryMatch[0]
  );
  
  }
  
  setFormData({
  
  employee_code:
  employee.employee_code || "",
  
  full_name:
  employee.full_name || "",
  
  email:
  employee.email || "",
  
  designation:
  employee.designation || "",
  
  department:
  employee.department || "",
  
  phone:
  phoneValue.slice(-10),
  
  gender:
  employee.gender || "",
  
  shift_id:
  employee.shift_id || ""
  
  });
  
  },[employee]);


  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change: AMS-M03-EDIT-001

  Purpose:
  Validate required fields.
  ------------------------------------------------------
  */

  // const validate = () => {

  //   let newErrors = {};

  //   if (!formData.name.trim()) {
  //     newErrors.name = "Name required";
  //   }

  //   if (!formData.department.trim()) {
  //     newErrors.department = "Department required";
  //   }

  //   setErrors(newErrors);

  //   return Object.keys(newErrors).length === 0;
  // };


  /*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EDIT-006

Purpose:
Validate employee edit fields
using current employee schema.

Risk:
LOW
------------------------------------------------------
*/

const validate = () => {

  let newErrors = {};
  
  if (!formData.employee_code?.trim()) {
  
  newErrors.employee_code =
  "Employee code required";
  
  }
  
  if (!formData.full_name?.trim()) {
  
  newErrors.full_name =
  "Full name required";
  
  }
  
  if (!formData.email?.trim()) {
  
  newErrors.email =
  "Email required";
  
  }
  
  setErrors(newErrors);
  
  return Object.keys(
  newErrors
  ).length===0;
  
  };

  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change: AMS-M03-EDIT-001

  Purpose:
  Submit updated employee data.
  ------------------------------------------------------
  */

  // const handleSubmit = () => {

  //   if (!validate()) return;

  //   onSave({
  //     ...employee,
  //     ...formData
  //   });

  // };


  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change ID: AMS-M03-EDIT-005
  
  Purpose:
  Send updated employee data using
  current employee schema.
  
  Fields:
  - employee_code
  - full_name
  - email
  - designation
  - department
  - phone
  - gender
  - shift_id
  
  Risk:
  LOW
  ------------------------------------------------------
  */

  const handleSubmit = () => {

    if (!validate()) return;

    onSave({

      employee_code: formData.employee_code,

      full_name: formData.full_name,

      email: formData.email,

      designation: formData.designation,

      department: formData.department,

      // phone: formData.phone,

//       phone:
// `${countryCode}${formData.phone}`,

/*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EDIT-010

Purpose:
Enforce 10-digit phone rule
before saving.

Risk:
LOW
------------------------------------------------------
*/

phone:
`${countryCode}${formData.phone.slice(0,10)}`,

      gender: formData.gender,

      shift_id: formData.shift_id || null

    });

  };


  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">
          Edit Employee
        </h2>

        {/* <div className="space-y-3">

          <input
            className="border p-2 rounded w-full"
            placeholder="Name"
            // value={formData.name}
            value={formData.full_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                // name: e.target.value
                full_name: e.target.value
              })
            }
          />

          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name}
            </p>
          )}

          <input
            className="border p-2 rounded w-full"
            placeholder="Department"
            value={formData.department}
            onChange={(e) =>
              setFormData({
                ...formData,
                department: e.target.value
              })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Designation"
            value={formData.designation}
            onChange={(e) =>
              setFormData({
                ...formData,
                designation: e.target.value
              })
            }
          />



          <input
            className="border p-2 rounded w-full"
            placeholder="Department"
            value={formData.department}
            onChange={(e) =>

              setFormData({

                ...formData,
                department: e.target.value

              })

            }
          />


          <input
            className="border p-2 rounded w-full"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>

              setFormData({

                ...formData,
                phone: e.target.value

              })

            }
          />




          <input
            className="border p-2 rounded w-full"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value
              })
            }
          />

          <select
            className="border p-2 rounded w-full"
            value={formData.shift_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                shift_id: e.target.value
              })
            }
          >

            <option value="">
              Select Shift
            </option>

            {shifts?.map((shift) => (

              <option
                key={shift.id}
                value={shift.id}
              >
                {shift.shift_name}
              </option>

            ))}

          </select>

        </div> */}

        <div className="space-y-3">
          {/*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EDIT-004

Purpose:
Standardize employee edit fields
to match employee schema.

Fields:

- Employee Code
- Full Name
- Email
- Designation
- Department
- Phone
- Gender
- Shift

Risk:
LOW
------------------------------------------------------
*/}

          <input
            className="border p-2 rounded w-full"
            placeholder="Employee Code"
            value={formData.employee_code}
            onChange={(e) =>
              setFormData({
                ...formData,
                employee_code: e.target.value
              })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                full_name: e.target.value
              })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Designation"
            value={formData.designation}
            onChange={(e) =>
              setFormData({
                ...formData,
                designation: e.target.value
              })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Department"
            value={formData.department}
            onChange={(e) =>
              setFormData({
                ...formData,
                department: e.target.value
              })
            }
          />

          {/* <input
            className="border p-2 rounded w-full"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value
              })
            }
          /> */}

<div className="flex gap-2">

<select

value={countryCode}

onChange={(e)=>

setCountryCode(
e.target.value
)

}

className="border p-2 rounded"

>

<option value="+91">

+91

</option>

<option value="+1">

+1

</option>

<option value="+44">

+44

</option>

<option value="+971">

+971

</option>

</select>

<input

className="border p-2 rounded w-full"

placeholder="Phone"

value={formData.phone}

onChange={(e)=>{

const value=e.target.value
.replace(/\D/g,"")
.slice(0,10);

setFormData({

...formData,
phone:value

});

}}

 />

</div>

          <select
            className="border p-2 rounded w-full"
            value={formData.gender}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value
              })
            }
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          <select
            className="border p-2 rounded w-full"
            value={formData.shift_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                shift_id: e.target.value
              })
            }
          >

            <option value="">
              Select Shift
            </option>

            {
              shifts?.map((shift) => (

                <option
                  key={shift.id}
                  value={shift.id}
                >

                  {shift.shift_name}

                </option>

              ))
            }

          </select>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

}

export default EmployeeEditModal;