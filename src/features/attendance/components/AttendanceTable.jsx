function AttendanceTable({

  records,

}) {

  return (

    <div className="overflow-x-auto">

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

          </tr>

        </thead>


        {/* Table body */}
        <tbody>

          {records.map((record) => (

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

              <td className="p-4 capitalize">

                {record.status}

              </td>

              <td>

                {record.check_in_datetime
                  ? new Date(
                    record.check_in_datetime
                  ).toLocaleTimeString()
                  : "-"}

              </td>


              <td>

                {record.check_out_datetime
                  ? new Date(
                    record.check_out_datetime
                  ).toLocaleTimeString()
                  : "-"}

              </td>
              {/* 
              <td className="p-4">

                {record.worked_hours || 0} hrs

              </td>
            

              <td className="p-4">

                {Number(
                  record.overtime_hours || 0
                ).toFixed(2)} hrs

              </td> */}
              <td className="p-4">

                {Number(
                  record.worked_hours || 0
                ).toFixed(2)} hrs

              </td>

              <td className="p-4">

                {Number(
                  record.overtime_hours || 0
                ).toFixed(2)} hrs

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceTable;