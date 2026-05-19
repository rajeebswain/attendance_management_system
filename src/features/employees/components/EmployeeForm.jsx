import { useState } from "react";


// Reusable UI components
import Button from "../../../components/ui/Button";

import Input from "../../../components/ui/Input";

import Card from "../../../components/ui/Card";


// Employee service
import {

  createEmployee,

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


  // Handle form submit
  async function handleSubmit(event) {

    event.preventDefault();

    try {

      setLoading(true);

      // Create employee
      // await createEmployee({

      //   employee_code: employeeCode,

      //   full_name: fullName,

      //   email,

      //   designation,

      //   shift_id: shiftName,
      // });

      await createEmployee({

        employee_code: employeeCode,
        
        full_name: fullName,
        
        email,
        
        designation,
        
        shift_id: shiftId
        
        });

      // Clear form after success
      setEmployeeCode("");

      setFullName("");

      setEmail("");

      setDesignation("");

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
        {/* <select

          value={shiftName}

          onChange={(e) =>

            setShiftName(

              e.target.value

            )

          }

          className="border p-2 rounded w-full"

        > */}

<select

value={shiftId}

onChange={(e)=>

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