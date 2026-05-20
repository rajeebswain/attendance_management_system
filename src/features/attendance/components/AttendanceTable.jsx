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
                Employee
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
  
                {/* <td className="p-4">
  
                  {record.check_in}
  
                </td>
  
                <td className="p-4">
  
                  {record.check_out}
  
                </td> */}

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
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
    );
  }
  
  export default AttendanceTable;