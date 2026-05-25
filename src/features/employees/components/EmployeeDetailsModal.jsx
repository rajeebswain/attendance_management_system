/*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EMP-012

Purpose:
Display employee details
without entering edit mode.

Risk:
LOW
------------------------------------------------------
*/

function EmployeeDetailsModal({

    employee,
    onClose
    
    }){
    
    if(!employee){
    
    return null;
    
    }
    
    return(
    
    <div
    className="
    fixed
    inset-0
    bg-black/50
    flex
    justify-center
    items-center
    z-50
    "
    >
    
    <div
    className="
    bg-white
    rounded-lg
    p-6
    w-[500px]
    space-y-3
    max-h-[90vh]
    overflow-y-auto
    "
    >
    
    <h2
    className="
    text-xl
    font-bold
    mb-4
    "
    >
    
    Employee Details
    
    </h2>
    
    <img
    
    src={
    employee.profile_image
    ||
    
    "https://placehold.co/100"
    }
    
    alt="employee"
    
    className="
    w-24
    h-24
    rounded-full
    object-cover
    mx-auto
    "
    
    />
    
    <p><b>Employee Code:</b> {employee.employee_code}</p>
    
    <p><b>Name:</b> {employee.full_name}</p>
    
    <p><b>Email:</b> {employee.email}</p>
    
    <p><b>Designation:</b> {employee.designation}</p>
    
    <p><b>Department:</b> {employee.department}</p>
    
    <p><b>Phone:</b> {employee.phone}</p>
    
    <p><b>Gender:</b> {employee.gender}</p>
    
    <p><b>Shift:</b> {employee.shifts?.shift_name}</p>
    
    <div className="flex justify-end">
    
    <button
    
    onClick={onClose}
    
    className="
    px-4
    py-2
    border
    rounded
    "
    
    >
    
    Close
    
    </button>
    
    </div>
    
    </div>
    
    </div>
    
    );
    
    }
    
    export default EmployeeDetailsModal;