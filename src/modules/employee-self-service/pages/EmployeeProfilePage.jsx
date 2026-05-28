import {

    useEffect,
    useState

}

    from "react";

import {

    updateEmployeeProfile,
    uploadEmployeeImage

}

    from "../services/employeeSelfService";

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

    const [

        editMode,
        setEditMode

    ]

        =

        useState(false);

    const [

        formData,
        setFormData

    ]

        =

        // useState({

        //     phone: "",
        //     address: ""

        // });
        useState({

            phone: "",
            address: "",
            profile_image: ""

        });


    const [

        uploading,
        setUploading

    ]

        =

        useState(false);

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
            setFormData({

                phone:
                    data.phone || "",

                address:
                    data.address || "",

                profile_image:
                    data.profile_image || ""

            });

        }

        catch (error) {

            console.log(error);

        }

    }




    async function handleImageUpload(e) {

        try {

            const file =
                e.target.files[0];

            if (!file) {

                return;

            }

            setUploading(true);

            const imageUrl =

                await uploadEmployeeImage(
                    file
                );

            setFormData({

                ...formData,

                profile_image: imageUrl

            });

        }
        catch (error) {

            alert(error.message);

        }
        finally {

            setUploading(false);

        }

    }

    async function handleSave() {

        try {
            if (

                formData.phone &&
                formData.phone.length !== 10

            ) {

                alert(
                    "Phone number must contain exactly 10 digits"
                );

                return;

            }

            const updated =

                await updateEmployeeProfile(

                    profile.id,

                    formData

                );

            setProfile(updated);

            setEditMode(false);

            alert(
                "Profile updated"
            );

        }

        catch (error) {

            alert(error.message);

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


                            <div className="flex flex-col items-center mb-6">

                                <img
                                    src={

                                        formData.profile_image ||

                                        "https://placehold.co/120x120"

                                    }
                                    alt="Profile"
                                    className="
w-28
h-28
rounded-full
object-cover
border
"
                                />

                                {

                                    editMode && (

                                        <div className="mt-3">

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />

                                            {

                                                uploading && (

                                                    <p>

                                                        Uploading...

                                                    </p>

                                                )

                                            }

                                        </div>

                                    )

                                }

                            </div>


                            <div>

                                <b>Name:</b>{" "}
                                {profile.full_name}

                            </div>

                            <div>

                                <b>Email:</b>{" "}
                                {profile.email}

                            </div>

                            <div>

                                <b>Employee Code:</b>{" "}
                                {profile.employee_code}

                            </div>

                            <div>

                                <b>Department:</b>{" "}
                                {profile.departments?.department_name || "N/A"}

                            </div>

                            <div>

                                <b>Shift:</b>{" "}
                                {profile.shifts?.shift_name || "N/A"}

                            </div>

                            <div>

                                <b>Phone:</b>{" "}

                                {

                                    editMode ?

                                        <div className="flex items-center gap-2 mt-2">

                                            <span
                                                className="
    bg-gray-100
    border
    px-3
    py-2
    rounded
    "
                                            >

                                                +91

                                            </span>

                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                maxLength={10}
                                                placeholder="9876543210"
                                                onChange={(e) => {

                                                    const value =

                                                        e.target.value
                                                            .replace(/\D/g, "");

                                                    if (
                                                        value.length <= 10
                                                    ) {

                                                        setFormData({

                                                            ...formData,

                                                            phone: value

                                                        });

                                                    }

                                                }}
                                                className="
    border
    p-2
    rounded
    "
                                            />

                                        </div>

                                        :

                                        profile.phone || "N/A"

                                }

                            </div>

                            <div>

                                <b>Address:</b>{" "}

                                {

                                    editMode ?

                                        <textarea
                                            value={formData.address}
                                            onChange={(e) =>

                                                setFormData({

                                                    ...formData,

                                                    address: e.target.value

                                                })

                                            }
                                            className="
    border
    p-2
    rounded
    ml-2
    "
                                        />

                                        :

                                        profile.address || "N/A"

                                }

                            </div>

                            <div className="mt-6">

                                {

                                    !editMode ?

                                        <button
                                            onClick={() =>
                                                setEditMode(true)
                                            }
                                            className="
    bg-blue-600
    text-white
    px-4
    py-2
    rounded
    "
                                        >

                                            Edit Profile

                                        </button>

                                        :

                                        <div className="flex gap-2">

                                            <button
                                                onClick={handleSave}
                                                className="
    bg-green-600
    text-white
    px-4
    py-2
    rounded
    "
                                            >

                                                Save Changes

                                            </button>

                                            <button
                                                onClick={() =>
                                                    setEditMode(false)
                                                }
                                                className="
    bg-gray-600
    text-white
    px-4
    py-2
    rounded
    "
                                            >

                                                Cancel

                                            </button>

                                        </div>

                                }

                            </div>

                        </div>

                    )

                }

            </div>

        </EmployeeLayout>

    );
}

export default EmployeeProfilePage;