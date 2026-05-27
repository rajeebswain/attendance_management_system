import {

    useEffect,
    useState

}

    from "react";

import EmployeeLayout
    from "../layout/EmployeeLayout";

import {

    getCurrentEmployee,
    getEmployeeLeaves

}

    from "../services/employeeSelfService";

function EmployeeLeaveHistoryPage() {

    const [

        leaves,
        setLeaves

    ]

        =

        useState([]);

    useEffect(() => {

        loadLeaves();

    }, []);

    async function loadLeaves() {

        try {

            const employee =

                await getCurrentEmployee();

            const data =

                await getEmployeeLeaves(
                    employee.id
                );

            setLeaves(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <EmployeeLayout>

            <div className="p-6">

                <h1
                    className="
    text-2xl
    font-bold
    mb-6
    "
                >

                    My Leave History

                </h1>

                {/* <table
                    className="
    w-full
    bg-white
    rounded
    "
                >

                    <thead>

                        <tr>

                            <th>Date</th>

                            <th>Type</th>

                            <th>Status</th>

                            <th>Reason</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            leaves.map((leave) => (

                                <tr
                                    key={leave.id}
                                >

                                    <td>

                                        {leave.start_date}

                                    </td>

                                    <td>

                                        {leave.leave_type}

                                    </td>

                                    <td>

                                        {leave.status}

                                    </td>

                                    <td>

                                        {leave.reason}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table> */}

                <table
                    className="
w-full
bg-white
rounded
"
                >

                    <thead>

                        <tr className="border-b">

                            <th className="p-3 text-left">

                                Date

                            </th>

                            <th className="p-3 text-left">

                                Type

                            </th>

                            <th className="p-3 text-left">

                                Status

                            </th>

                            <th className="p-3 text-left">

                                Reason

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            leaves.map((leave) => (

                                <tr
                                    key={leave.id}
                                    className="border-b"
                                >

                                    <td className="p-3">

                                        {leave.start_date}

                                    </td>

                                    <td className="p-3">

                                        {leave.leave_type}

                                    </td>

                                    <td className="p-3">

                                        {leave.status}

                                    </td>

                                    <td className="p-3">

                                        {leave.reason}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </EmployeeLayout>

    );

}

export default EmployeeLeaveHistoryPage;