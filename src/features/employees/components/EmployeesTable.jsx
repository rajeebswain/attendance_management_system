// Reusable button
import Button from "../../../components/ui/Button";

import { useState } from "react";

function EmployeesTable({

    employees,

    onDelete,

    onRestore,

    onEdit

}) {

    const [

        statusFilter,

        setStatusFilter

    ]

        =

        useState(

            "active"

        );


    const [
        searchTerm,
        setSearchTerm
    ] = useState("");

    const [
        genderFilter,
        setGenderFilter
    ] = useState("all");

    const [
        departmentFilter,
        setDepartmentFilter
    ] = useState("all");

    const [
        shiftFilter,
        setShiftFilter
    ] = useState("all");



    return (

        <div className="overflow-x-auto">

            {/* <div className="mb-4">

                <select

                    value={statusFilter}

                    onChange={(e) =>

                        setStatusFilter(

                            e.target.value

                        )

                    }

                    className="border rounded p-2"

                >

                    <option value="active">

                        Active Employees

                    </option>

                    <option value="inactive">

                        Inactive Employees

                    </option>

                </select>

            </div> */}




            <div className="mb-4 flex gap-3 flex-wrap">

                <input

                    placeholder="Search employee"

                    value={searchTerm}

                    onChange={(e) =>

                        setSearchTerm(
                            e.target.value
                        )

                    }

                    className="border rounded p-2"
                />

                <select

                    value={statusFilter}

                    onChange={(e) =>

                        setStatusFilter(
                            e.target.value
                        )

                    }

                    className="border rounded p-2"

                >

                    <option value="active">

                        Active

                    </option>

                    <option value="inactive">

                        Inactive

                    </option>

                </select>



                <select

                    value={genderFilter}

                    onChange={(e) =>

                        setGenderFilter(
                            e.target.value
                        )

                    }

                    className="border rounded p-2"

                >

                    <option value="all">

                        All Gender

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

                    value={departmentFilter}

                    onChange={(e) =>

                        setDepartmentFilter(
                            e.target.value
                        )

                    }

                    className="border rounded p-2"

                >

                    <option value="all">

                        All Department

                    </option>

                    <option value="Operations">

                        Operations

                    </option>

                    <option value="Maintenance">

                        Maintenance

                    </option>

                    <option value="Test">

                        Test

                    </option>

                </select>


                <select

                    value={shiftFilter}

                    onChange={(e) =>

                        setShiftFilter(
                            e.target.value
                        )

                    }

                    className="border rounded p-2"

                >

                    <option value="all">

                        All Shift

                    </option>

                    <option value="Morning Shift">

                        Morning Shift

                    </option>

                    <option value="Evening Shift">

                        Evening Shift

                    </option>

                    <option value="Night Shift">

                        Night Shift

                    </option>

                    <option value="General Shift">

                        General Shift

                    </option>

                </select>


            </div>

            <table
                className="
w-full
bg-white
rounded-lg
overflow-hidden
"
            >

                <thead className="bg-gray-200">

                    <tr>

                        {/* <th className="p-4 text-left">

Employee Code

</th>

<th className="p-4 text-left">

Full Name

</th>

<th className="p-4 text-left">

Email

</th>

<th className="p-4 text-left">

Designation

</th>

<th className="p-4 text-left">

Actions

</th> */}

                        <th className="p-4 text-left">

                            Employee Code

                        </th>

                        <th className="p-4 text-left">

                            Full Name

                        </th>

                        <th className="p-4 text-left">

                            Email

                        </th>

                        <th className="p-4 text-left">

                            Designation

                        </th>

                        <th className="p-4 text-left">

                            Department

                        </th>

                        <th className="p-4 text-left">

                            Phone

                        </th>

                        <th className="p-4 text-left">

                            Gender

                        </th>

                        <th className="p-4 text-left">

                            Shift

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        // employees

                        //     .filter(

                        //         (employee) =>

                        //             statusFilter === "active"

                        //                 ?

                        //                 employee.is_active === true

                        //                 :

                        //                 employee.is_active === false

                        //     )


                        /*
                        ------------------------------------------------------
                        Added: 2026-05-25
                        Change ID: AMS-M03-EMP-009
                        
                        Purpose:
                        Apply employee search and filters
                        ------------------------------------------------------
                        */

                        employees

                            .filter((employee) => {

                                const statusMatch =

                                    statusFilter === "active"

                                        ?

                                        employee.is_active === true

                                        :

                                        employee.is_active === false;


                                const searchMatch =

                                    employee.employee_code
                                        ?.toLowerCase()
                                        .includes(
                                            searchTerm.toLowerCase()
                                        )

                                    ||

                                    employee.full_name
                                        ?.toLowerCase()
                                        .includes(
                                            searchTerm.toLowerCase()
                                        )

                                    ||

                                    employee.email
                                        ?.toLowerCase()
                                        .includes(
                                            searchTerm.toLowerCase()
                                        );


                                const genderMatch =

                                    genderFilter === "all"

                                    ||

                                    employee.gender === genderFilter;


                                const departmentMatch =

                                    departmentFilter === "all"

                                    ||

                                    employee.department === departmentFilter;


                                const shiftMatch =

                                    shiftFilter === "all"

                                    ||

                                    employee.shifts?.shift_name === shiftFilter;





                                return (

                                    statusMatch

                                    &&

                                    searchMatch

                                    &&

                                    genderMatch

                                    &&

                                    departmentMatch

                                    &&

                                    shiftMatch

                                );

                            })

                            .map((employee) => (

                                <tr
                                    key={employee.id}
                                    className="border-b"
                                >

                                    <td className="p-4">

                                        {employee.employee_code}

                                    </td>

                                    <td className="p-4">

                                        {employee.full_name}

                                    </td>

                                    <td className="p-4">

                                        {employee.email}

                                    </td>

                                    <td className="p-4">

                                        {employee.designation}

                                    </td>


                                    <td className="p-4">

                                        {employee.department || "-"}

                                    </td>

                                    <td className="p-4">

                                        {employee.phone || "-"}

                                    </td>

                                    <td className="p-4">

                                        {employee.gender || "-"}

                                    </td>

                                    <td className="p-4">

                                        {employee.shifts?.shift_name || "-"}

                                    </td>

                                    <td className="p-4 flex gap-2">

                                        {/* <Button>

Edit

</Button> */}
                                        {/* <Button

onClick={()=>{

const updatedEmployee={

employee_code:

prompt(

"Employee Code",

employee.employee_code

),

full_name:

prompt(

"Full Name",

employee.full_name

),

email:

prompt(

"Email",

employee.email

),

designation:

prompt(

"Designation",

employee.designation

)

};

if(

updatedEmployee.employee_code

&&

updatedEmployee.full_name

){

onEdit(

employee.id,

updatedEmployee

);

}

}}

>

Edit

</Button> */}

                                        {/* 
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EDIT-001

Purpose:
Open EmployeeEditModal instead of
using prompt().
------------------------------------------------------
*/}

                                        <Button

                                            onClick={() => {

                                                onEdit(employee);

                                            }}

                                        >

                                            Edit

                                        </Button>






                                        {

                                            employee.is_active

                                                ?

                                                (

                                                    /* <Button
                                                    onClick={()=>
                                                    
                                                    onDelete(
                                                    
                                                    employee.id
                                                    
                                                    )
                                                    
                                                    }
                                                    >
                                                    
                                                    Deactivate
                                                    
                                                    </Button> */


                                                    <Button

                                                        onClick={() => {

                                                            const confirmDeactivate =

                                                                window.confirm(

                                                                    "Do you want to deactivate this employee?"

                                                                );

                                                            if (

                                                                confirmDeactivate

                                                            ) {

                                                                onDelete(

                                                                    employee.id

                                                                );

                                                            }

                                                        }}

                                                    >

                                                        Deactivate

                                                    </Button>


                                                )

                                                :

                                                (

                                                    /* <Button
                                                    onClick={()=>
                                                    
                                                    onRestore(
                                                    
                                                    employee.id
                                                    
                                                    )
                                                    
                                                    }
                                                    >
                                                    
                                                    Restore
                                                    
                                                    </Button> */



                                                    <Button

                                                        onClick={() => {

                                                            const confirmRestore =

                                                                window.confirm(

                                                                    "Do you want to restore this employee?"

                                                                );

                                                            if (

                                                                confirmRestore

                                                            ) {

                                                                onRestore(

                                                                    employee.id

                                                                );

                                                            }

                                                        }}

                                                    >

                                                        Restore

                                                    </Button>

                                                )

                                        }

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default EmployeesTable;