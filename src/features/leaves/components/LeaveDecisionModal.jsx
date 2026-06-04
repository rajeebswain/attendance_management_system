/*
==================================================
Change ID: M07-005A
Date: 2026-05-30
Status: Initial
Purpose: Leave decision modal
Risk: Medium
Rollback: Remove component
==================================================
*/

import { useState } from "react";

function LeaveDecisionModal({

    leave,

    onSave,

    onClose

}) {

    // const [

    //     status,

    //     setStatus

    // ]

    //     =

    //     useState(

    //         leave.status

    //     );

    // const [

    //     status,

    //     setStatus

    // ]

    // =

    // useState("");

    const [

        status,

        setStatus

    ]

        =

        useState(

            leave.status === "approved"

                ? "rejected"

                : "approved"

        );

    const [

        remark,

        setRemark

    ]

        =

        useState("");

    async function handleSave() {

        if (!status) {

            alert(

                "Select a decision"

            );

            return;

        }

        if (

            !remark.trim()

        ) {

            alert(

                "Admin remark is required"

            );

            return;

        }

        await onSave({

            status,

            remark

        });

    }

    return (

        <div
            className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
            "
        >

            <div
                className="
                bg-white
                p-6
                rounded
                w-[500px]
                "
            >

                <h2
                    className="
                    text-xl
                    font-bold
                    mb-4
                    "
                >

                    Leave Decision

                </h2>

                <div className="mb-4">

                    Employee:

                    {

                        leave.employees?.full_name

                    }

                </div>

                <div className="mb-4">

                    Current Status:

                    {

                        leave.status

                    }

                </div>

                {/* <select

                    value={status}

                    onChange={(e) =>

                        setStatus(

                            e.target.value

                        )

                    }

                    className="
                    w-full
                    border
                    p-3
                    rounded
                    mb-4
                    "
                >

                    <option value="approved">

                        Approved

                    </option>

                    <option value="rejected">

                        Rejected

                    </option>

                </select> */}


                {/* <select

                    value={status}

                    onChange={(e) =>

                        setStatus(

                            e.target.value

                        )

                    }

                    className="
w-full
border
p-3
rounded
mb-4
"

                >

                    <option value="">

                        Select Decision

                    </option>

                    <option value="approved">

                        Approve

                    </option>

                    <option value="rejected">

                        Reject

                    </option>

                </select> */}



<div className="mb-4">

    <label
        className="
        block
        font-semibold
        mb-2
        "
    >

        Change To

    </label>

    <select

        value={status}

        onChange={(e) =>

            setStatus(

                e.target.value

            )

        }

        className="
        w-full
        border
        rounded
        p-3
        "

    >

        {

            leave.status === "pending" && (

                <>

                    <option value="approved">

                        Approve

                    </option>

                    <option value="rejected">

                        Reject

                    </option>

                </>

            )

        }

        {

            leave.status === "approved" && (

                <option value="rejected">

                    Reject

                </option>

            )

        }

        {

            leave.status === "rejected" && (

                <option value="approved">

                    Approve

                </option>

            )

        }

    </select>

</div>




                <textarea

                    value={remark}

                    onChange={(e) =>

                        setRemark(

                            e.target.value

                        )

                    }

                    placeholder="
                    Enter decision remark
                    "

                    className="
                    w-full
                    border
                    rounded
                    p-3
                    mb-4
                    "

                    rows={4}

                />

                <div
                    className="
                    flex
                    justify-end
                    gap-3
                    "
                >

                    <button

                        onClick={onClose}

                        className="
                        px-4
                        py-2
                        border
                        rounded
                        "
                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleSave}

                        className="
                        px-4
                        py-2
                        bg-blue-600
                        text-white
                        rounded
                        "
                    >

                        Save

                    </button>

                </div>

            </div>

        </div>

    );

}

export default LeaveDecisionModal;