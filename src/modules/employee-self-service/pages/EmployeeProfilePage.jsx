// import EmployeeLayout
//     from "../layout/EmployeeLayout";

// function EmployeeProfilePage() {

//     return (

//         <EmployeeLayout>

//             <h1
//                 className="
// text-2xl
// font-bold
// mb-6
// "
//             >

//                 My Profile

//             </h1>

//         </EmployeeLayout>

//     );

// }

// export default EmployeeProfilePage;

import {

    useEffect,
    useState

}

    from "react";

import EmployeeLayout
    from "../layout/EmployeeLayout";

import {

    getCurrentEmployee,
    getEmployeeProfile

}

    from "../services/employeeSelfService";

function EmployeeProfilePage() {

    const [

        profile,
        setProfile

    ]

        =

        useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const employee =

                await getCurrentEmployee();

            const data =

                await getEmployeeProfile(
                    employee.id
                );

            setProfile(data);

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

                    My Profile

                </h1>

                {

                    profile && (

                        <div
                            className="
    bg-white
    rounded-lg
    shadow
    p-6
    space-y-3
    "
                        >

                            <div>

                                <b>Name:</b>

                                {profile.full_name}

                            </div>

                            <div>

                                <b>Email:</b>

                                {profile.email}

                            </div>

                            <div>

                                <b>Employee Code:</b>

                                {profile.employee_code}

                            </div>

                            <div>

                                <b>Department:</b>

                                {profile.departments?.department_name || "N/A"}

                            </div>

                            <div>

                                <b>Shift:</b>

                                {profile.shifts?.shift_name || "N/A"}

                            </div>

                        </div>

                    )

                }

            </div>

        </EmployeeLayout>

    );

}

export default EmployeeProfilePage;