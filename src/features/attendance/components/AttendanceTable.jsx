import { useState } from "react";

// Adding  Admin Override Feature 21-05-2026 – 12:49 PM 
import Button from "../../../components/ui/Button";

// Adding  Admin Override Feature 21-05-2026 – 12:50 PM 

import {

  updateAttendance
  
  }
  
  from "../services/attendanceService";

function AttendanceTable({

  records,

}) {

  const [search, setSearch] = useState("");

// Adding  Admin Override Feature 21-05-2026 – 12:50 PM 
  // async function handleAdminEdit(
  //   attendanceId,
  //   newCheckout
  //   ){
    
  //   try{
    
  //   await updateAttendance(
    
  //   attendanceId,
    
  //   {
  //   check_out_datetime:
  //   new Date().toISOString()
  //   }
    
  //   );
    
  //   alert(
  //   "Attendance updated"
  //   );
    
  //   }
  //   catch(error){
    
  //   console.error(error);
    
  //   alert(
  //   "Update failed"
  //   );
    
  //   }
    
  //   }


  async function handleAdminEdit(
    attendanceId,
    newCheckout
    ){
    
    try{
    
    const today = new Date()
    .toISOString()
    .split("T")[0];
    
    await updateAttendance(
    
    attendanceId,
    
    {
    check_out_datetime:
    `${today}T${newCheckout}:00`
    }
    
    );
    
    alert(
    "Attendance updated"
    );
    
    window.location.reload();
    
    }
    
    catch(error){
    
    console.error(error);
    
    alert(
    "Update failed"
    );
    
    }
    
    }




  return (

    <div className="overflow-x-auto">


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

            records

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

                  <td className="p-4">

                    {record.employees?.full_name}

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
              
                  <td className="p-4">

<Button
type="button"
onClick={()=>{

const newCheckout=

prompt(
"Enter new checkout time (HH:MM)"
);

if(newCheckout){

handleAdminEdit(
record.id,
newCheckout
);

}

}}
>

Edit

</Button>

</td>

                </tr>

              ))}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceTable;