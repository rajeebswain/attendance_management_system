import { useState } from "react";


// Reusable UI components
import Button from "../../../components/ui/Button";

import Input from "../../../components/ui/Input";

import Card from "../../../components/ui/Card";


// Employee service
import {

  createEmployee,
  uploadEmployeeImage

} from "../services/employeeService";


function EmployeeForm({

  onEmployeeCreated,

  shifts

}) {

  // Form state
  const [employeeCode, setEmployeeCode] = useState("");

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [designation, setDesignation] = useState("");

  // const [shiftName, setShiftName] = useState("");
  const [shiftId, setShiftId] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  const [rotationEnabled, setRotationEnabled] = useState(false);

  /*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EMP-003

Purpose:
Additional employee profile fields
------------------------------------------------------
*/

  const [department, setDepartment] = useState("");

  const [phone, setPhone] = useState("");

  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change ID: AMS-M03-EMP-008
  
  Purpose:
  Store country code
  for phone number.
  ------------------------------------------------------
  */

  const [countryCode, setCountryCode] = useState("+91");

  const [gender, setGender] = useState("");


  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change ID: AMS-M03-EMP-010
  
  Purpose:
  Store employee profile image file.
  
  Risk:
  LOW
  ------------------------------------------------------
  */

  const [
    profileImage,
    setProfileImage
  ] = useState(null);



  // Handle form submit
  async function handleSubmit(event) {

    event.preventDefault();

    /*
Temporary debug
Remove later
*/

    console.log(
      profileImage
    );


    try {

      setLoading(true);

/*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EMP-010

Purpose:
Upload image before employee
creation.

Risk:
MEDIUM
------------------------------------------------------
*/

let imageUrl="";

if(profileImage){

imageUrl=

await uploadEmployeeImage(
profileImage
);

}


      await createEmployee({

        employee_code: employeeCode,

        full_name: fullName,

        email,

        designation,

        department,

        // phone,
        phone:
          `${countryCode}${phone}`,
        gender,

        shift_id: shiftId || null,

        // rotation_enabled: rotationEnabled

        rotation_enabled:
rotationEnabled,

profile_image:
imageUrl

      });

      // Clear form after success
      setEmployeeCode("");

      setFullName("");

      setEmail("");

      setDesignation("");

      setDepartment("");

      setPhone("");

      setGender("");

      // setShiftName("");
      setShiftId("");

      // Refresh employee list
      onEmployeeCreated();

      alert("Employee created successfully");

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);
    }
  }


  return (

    <Card>

      <h2 className="text-2xl font-bold mb-4">

        Add Employee

      </h2>


      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <Input
          placeholder="Employee Code"
          value={employeeCode}
          onChange={(e) =>
            setEmployeeCode(e.target.value)
          }
        />

        <Input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <Input
          placeholder="Designation"
          value={designation}
          onChange={(e) =>
            setDesignation(e.target.value)
          }
        />

        <Input
          placeholder="Department"
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        />

        {/* <Input
placeholder="Phone"
value={phone}
onChange={(e)=>
setPhone(e.target.value)
}
/> */}


        <div className="flex gap-2">

          <select

            value={countryCode}

            onChange={(e) =>

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


          <Input

            placeholder="Phone"

            value={phone}

            onChange={(e) => {

              const value = e.target.value
                .replace(/\D/g, "")
                .slice(0, 10);

              setPhone(value);

            }}

          />

        </div>


        <select

          value={gender}

          onChange={(e) =>
            setGender(e.target.value)
          }

          className="border p-2 rounded w-full"

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
        {/* <select

          value={shiftName}

          onChange={(e) =>

            setShiftName(

              e.target.value

            )

          }

          className="border p-2 rounded w-full"

        > */}

        {/* <select

value={shiftId}

onChange={(e)=>

setShiftId(

e.target.value

)

}

className="border p-2 rounded w-full"

>

<label>

<input

type="checkbox"

onChange={(e)=>

setRotationEnabled(

e.target.checked

)

}

/>

Enable Rotation

</label>

          <option value="">

            Select Shift

          </option>

          {

            shifts?.map(

              (shift) => (

                <option

                  key={shift.id}

                  value={shift.id}

                >

                  {shift.shift_name}

                </option>

              )

            )

          }

        </select> */}

        {/*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EMP-003

Purpose:
Rotation checkbox + Shift selector
Checkbox must stay outside select
------------------------------------------------------
*/}

        <label className="flex gap-2 items-center">

          <input

            type="checkbox"

            checked={rotationEnabled}

            onChange={(e) =>

              setRotationEnabled(

                e.target.checked

              )

            }

          />

          Enable Rotation

        </label>


        {/*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EMP-010

Purpose:
Employee profile image upload.

Rules:

- jpg
- jpeg
- png

Risk:
LOW
------------------------------------------------------
*/}

        <input

          type="file"

          accept="image/png,image/jpeg,image/jpg"

          onChange={(e) =>

            setProfileImage(
              e.target.files[0]
            )

          }

          className="border p-2 rounded w-full"

        />


        <select

          value={shiftId}

          onChange={(e) =>

            setShiftId(

              e.target.value

            )

          }

          className="border p-2 rounded w-full"

        >

          <option value="">

            Select Shift

          </option>

          {

            shifts?.map(

              (shift) => (

                <option

                  key={shift.id}

                  value={shift.id}

                >

                  {shift.shift_name}

                </option>

              )

            )

          }

        </select>


        {/* <Input
          placeholder="Shift Name"<EmployeesTable />
          value={shiftName}
          onChange={(e) =>
            setShiftName(e.target.value)
          }
        /> */}

        <Button type="submit">

          {loading
            ? "Creating..."
            : "Create Employee"}

        </Button>

      </form>

    </Card>
  );
}

export default EmployeeForm;