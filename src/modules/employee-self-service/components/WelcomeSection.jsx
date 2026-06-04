/*
==================================================
Change ID: M06-011
Date: 2026-05-26
Status: Initial
Purpose: Employee welcome section
Risk: Low
Rollback: Remove component
==================================================
*/

function WelcomeSection() {

    return (

        <div
            className="
    bg-white
    rounded-lg
    shadow
    p-6
    "
        >

            <h2 className="text-2xl font-bold">

                Good Morning 👋

            </h2>

            <p className="text-gray-500">

                Welcome back

            </p>

        </div>

    );

}

export default WelcomeSection;