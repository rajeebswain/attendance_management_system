// Reusable button
import Button from "../../../components/ui/Button";


function EmployeesTable({

  employees,

  onDelete,

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
            </th>

          </tr>

        </thead>


        {/* Table body */}
        <tbody>

          {employees.map((employee) => (

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

                {/* <Button
                  variant="danger"
                  onClick={() =>
                    onDelete(employee.id)
                  }
                >
                  Delete
                </Button> */}

                <Button
                  onClick={() => {

                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete this employee?"
                    );

                    if (confirmDelete) {

                      onDelete(employee.id);

                    }

                  }}
                >

                  Delete

                </Button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeesTable;