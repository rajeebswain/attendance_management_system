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

                {new Date(
                  Number(record.worked_hours || 0)
                  * 60 * 60 * 1000
                )
                  .toISOString()
                  .slice(11, 19)}

              </td>


              <td className="p-4">

                {new Date(
                  Number(record.overtime_hours || 0)
                  * 60 * 60 * 1000
                )
                  .toISOString()
                  .slice(11, 19)}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceTable;