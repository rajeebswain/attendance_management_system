function AttendanceHistory({

    records,
  
  }) {
  
    return (
  
      <div className="overflow-x-auto">
  
        <table
          className="
            w-full
            bg-white
            rounded-lg
          "
        >
  
          <thead className="bg-gray-200">
  
            <tr>
  
              <th className="p-4">
                Date
              </th>
  
              <th className="p-4">
                Shift
              </th>
  
              <th className="p-4">
                Status
              </th>
  
              <th className="p-4">
                Check-In
              </th>
  
              <th className="p-4">
                Check-Out
              </th>
  
            </tr>
  
          </thead>
  
  
          <tbody>
  
            {records.map((record) => (
  
              <tr
                key={record.id}
                className="border-b"
              >
  
                <td className="p-4">
  
                  {record.attendance_date}
  
                </td>
  
                <td className="p-4">
  
                  {
                    record.employees?.shifts
                      ?.shift_name
                  }
  
                </td>
  
                <td className="p-4 capitalize">
  
                  {record.status}
  
                </td>
  
                <td className="p-4">
  
                  {record.check_in}
  
                </td>
  
                <td className="p-4">
  
                  {record.check_out || "Pending"}
  
                </td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
    );
  }
  
  export default AttendanceHistory;