import { useState, useEffect } from "react";

// Adding  Admin Override Feature 21-05-2026 – 12:49 PM 
import Button from "../../../components/ui/Button";

// Adding  Admin Override Feature 21-05-2026 – 12:50 PM 

import {

  updateAttendance,
  getEmployees,
  archiveAttendance,
  restoreAttendance

}

  from "../services/attendanceService";

  import {

    createAuditLog
    
    }
    
    from "../services/attendanceService";

function AttendanceTable({

  records,

}) {

  const [search, setSearch] = useState("");

  const [employees, setEmployees] = useState([]);

  const [archiveView, setArchiveView] = useState(false);

  useEffect(() => {

    async function loadEmployees() {

      try {

        const data =

          await getEmployees();

        setEmployees(data);

      }

      catch (error) {

        console.error(error);

      }

    }

    loadEmployees();

  }, []);




  // Adding  Admin Override Feature 21-05-2026 – 12:50 PM 
  async function handleAdminEdit(
    attendanceId,
    newCheckout,
    record
  ) {

    try {

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const updatedCheckout =

        `${today}T${newCheckout}:00`;

      const checkInDate = new Date(
        record.check_in_datetime
      );

      const checkOutDate = new Date(
        updatedCheckout
      );

      const workedHours =

        (checkOutDate.getTime()

          -

          checkInDate.getTime())

        /

        (1000 * 60 * 60);

      const overtimeHours =

        workedHours > 8

          ? workedHours - 8

          : 0;

          await createAuditLog({

            attendance_id:
            attendanceId,
            
            action_type:
            "Edit Checkout",
            
            old_value:
            record.check_out_datetime || "None",
            
            new_value:
            updatedCheckout,
            
            changed_by:
            "Admin"
            
            });




      await updateAttendance(

        attendanceId,

        {

          check_out_datetime:
            updatedCheckout,

          worked_hours:
            workedHours,

          overtime_hours:
            overtimeHours,

        }

      );

      alert(
        "Attendance updated"
      );

      window.location.reload();

    }

    catch (error) {

      console.error(error);

      alert(
        "Update failed"
      );

    }

  }



  // Adding  Admin Force Checkout Function Feature 21-05-2026 Case1 

  async function handleForceCheckout(record) {

    try {

      const checkoutTime = new Date();

      const checkInTime = new Date(
        record.check_in_datetime
      );

      const workedHours =

        (checkoutTime - checkInTime)

        /

        (1000 * 60 * 60);

      const overtimeHours =

        workedHours > 8

          ? workedHours - 8

          : 0;


      // Convert local time properly
      const localTime = new Date(

        checkoutTime.getTime()

        -

        checkoutTime.getTimezoneOffset()
        * 60000

      )

        .toISOString()

        .slice(0, -1);


      await updateAttendance(

        record.id,

        {

          check_out_datetime:
            localTime,

          worked_hours:
            workedHours,

          overtime_hours:
            overtimeHours,

        }

      );

      alert(
        "Force checkout completed"
      );

      window.location.reload();

    }

    catch (error) {

      console.error(error);

      alert(
        "Force checkout failed"
      );

    }

  }



  async function handleReassignAttendance(record) {

    try {

      const employeeId =

        prompt(
          "Enter employee ID"
        );

      if (!employeeId) {

        return;

      }

      await updateAttendance(

        record.id,

        {

          employee_id:
            employeeId

        }

      );

      alert(
        "Attendance reassigned"
      );

      window.location.reload();

    }

    catch (error) {

      console.error(error);

      alert(
        "Reassign failed"
      );

    }

  }

  // Archieve 
  async function handleArchiveAttendance(

    record

  ) {

    try {

      const confirmArchive =

        window.confirm(

          "Archive attendance?"

        );

      if (!confirmArchive) {

        return;

      }

      await archiveAttendance(

        record.id

      );

      alert(

        "Attendance archived"

      );

      window.location.reload();

    }

    catch (error) {

      console.error(error);

      alert(

        "Archive failed"

      );

    }

  }

  // Handle Restore
  async function handleRestore(

    record

  ) {

    try {

      await restoreAttendance(

        record.id

      );

      alert(

        "Attendance restored"

      );

      window.location.reload();

    }

    catch (error) {

      console.error(error);

      alert(

        "Restore failed"

      );

    }

  }


  return (

    <div className="overflow-x-auto">


      <div className="mb-4">

        <select

          value={archiveView}

          onChange={(e) =>

            setArchiveView(

              e.target.value === "true"

            )

          }

          className="border rounded p-2"

        >

          <option value="false">

            Active

          </option>

          <option value="true">

            Archived

          </option>

        </select>

      </div>



      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
w-full
border
rounded
p-3
mb-4
"
      />




      <table
        className="
            w-full
            bg-white
            rounded-lg
            overflow-hidden
          "
      >

        {/* Table header */}
        <thead className="bg-gray-200">

          <tr>

            <th className="p-4 text-left">
              Employees
            </th>

            <th className="p-4 text-left">
              Designation
            </th>

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Check In
            </th>

            <th className="p-4 text-left">
              Check Out
            </th>

            <th className="p-4 text-left">
              Worked Hours
            </th>

            <th className="p-4 text-left">
              Overtime
            </th>

            <th className="p-4 text-left">
              Reason
            </th>


            <th className="p-4 text-left">
              Actions
            </th>


          </tr>

        </thead>


        {/* Table body */}
        <tbody>

          {

            // records

            //   .filter(

            //     (record) =>

            //       record.employees?.full_name
            //         ?.toLowerCase()
            //         .includes(
            //           search.toLowerCase()
            //         )

            //   )

            //   .map((record) => (

            records

              .filter(

                (record) =>

                  record.is_archived === archiveView

              )

              .filter(

                (record) =>

                  record.employees?.full_name
                    ?.toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )

              )

              .map((record) => (


                <tr
                  key={record.id}
                  className="border-b"
                >

                  {/* <td className="p-4">

                    {record.employees?.full_name}

                  </td> */}


<td className="p-4">

<div className="flex items-center gap-2">

{record.employees?.full_name}

{

record.employees?.is_active===false

&&

<span
className="
px-2
py-1
bg-red-100
text-red-600
rounded
text-xs
"
>

Inactive

</span>

}

</div>

</td>

                  <td className="p-4">

                    {record.employees?.designation}

                  </td>

                  <td className="p-4">

                    {record.attendance_date}

                  </td>

                  <td className="p-4">

                    <span className={`

px-2
py-1
rounded
text-white
capitalize

${record.status === "present"
                        ? "bg-green-500"

                        : record.status === "late"
                          ? "bg-yellow-500"

                          : record.status === "leave"
                            ? "bg-blue-500"

                            : "bg-red-500"
                      }

`}>

                      {record.status}

                    </span>

                  </td>

                  <td>

                    {record.check_in_datetime
                      ? new Date(
                        record.check_in_datetime
                      ).toLocaleTimeString(
                        'en-GB',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false
                        }
                      )
                      : "-"}

                  </td>

                  <td className="p-4">

                    {record.check_out_datetime

                      ? new Date(
                        record.check_out_datetime
                      ).toLocaleTimeString(
                        'en-GB',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false
                        }
                      )

                      : "-"}

                  </td>

                  <td className="p-4">

                    {record.worked_hours

                      ? new Date(
                        Number(record.worked_hours)
                        * 60 * 60 * 1000
                      )
                        .toISOString()
                        .slice(11, 19)

                      : "00:00:00"}

                  </td>

                  <td className="p-4">

                    {record.overtime_hours

                      ? new Date(
                        Number(record.overtime_hours)
                        * 60 * 60 * 1000
                      )
                        .toISOString()
                        .slice(11, 19)

                      : "00:00:00"}

                  </td>

                  <td className="p-4">

                    {record.early_checkout_reason || "-"}

                  </td>


                  <td className="p-4 flex gap-2">

                      {record.is_archived ? (

                        <Button
                          type="button"
                          onClick={() =>
                            handleRestore(record)
                          }
                        >

                          Restore

                        </Button>

                      )

                        :

                        (

                          <>

                            {/* <Button
                              type="button"
                              onClick={() => {

                                const newCheckout =

                                  prompt(
                                    "Enter checkout time (HH:MM)"
                                  );

                                if (newCheckout) {

                                  handleAdminEdit(
                                    record.id,
                                    newCheckout,
                                    record
                                  );

                                }

                              }}
                            >

                              Edit

                            </Button> */}



<Button
type="button"

disabled={
record.employees?.is_active===false
}

onClick={() => {

const newCheckout=

prompt(
"Enter checkout time (HH:MM)"
);

if(newCheckout){

handleAdminEdit(
record.id,
newCheckout,
record
);

}

}}
>

Edit

</Button>

                            {/* <Button
                              type="button"
                              disabled={!!record.check_out_datetime}
                              onClick={() =>
                                handleForceCheckout(record)
                              }
                            >

                              Force

                            </Button> */}

<Button
type="button"

disabled={

!!record.check_out_datetime

||

record.employees?.is_active===false

}

onClick={()=>
handleForceCheckout(record)
}
>

Force
</Button>

{/* </Button>

                            <Button
                              type="button"
                              onClick={() =>
                                handleReassignAttendance(record)
                              }
                            >

                              Reassign

                            </Button> */}

<Button
type="button"

disabled={
record.employees?.is_active===false
}

onClick={()=>
handleReassignAttendance(record)
}
>

Reassign

</Button>

                            <Button
                              type="button"
                              onClick={() =>
                                handleArchiveAttendance(record)
                              }
                            >

                              Archive

                            </Button>

                          </>

                        )}


                  </td>

                </tr>

              ))}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceTable;