/*
======================================================
AMS CHANGE TRACKER
Change ID: AMS-M03-EDIT-001
Date: 2026-05-25
Module: M03 Employee Core
Feature: Employee Edit Modal

Purpose:
Replace temporary prompt() editing with reusable modal.

Notes:
- Supports Save/Cancel
- Supports validation
- Receives employee data from EmployeesPage
- No database changes

Risk:
LOW
======================================================
*/

import { useEffect, useState } from "react";

function EmployeeEditModal({
  employee,
  shifts,
  onSave,
  onClose
}) {

  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change: AMS-M03-EDIT-001

  Purpose:
  Stores editable employee values.
  ------------------------------------------------------
  */

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    designation: "",
    email: "",
    phone: "",
    shift_id: ""
  });


  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change: AMS-M03-EDIT-001

  Purpose:
  Store validation errors.
  ------------------------------------------------------
  */

  const [errors, setErrors] = useState({});


  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change: AMS-M03-EDIT-001

  Purpose:
  Populate form using selected employee data.
  Runs whenever employee changes.
  ------------------------------------------------------
  */

  useEffect(() => {

    if (employee) {

      setFormData({
        name: employee.name || "",
        department: employee.department || "",
        designation: employee.designation || "",
        email: employee.email || "",
        phone: employee.phone || "",
        shift_id: employee.shift_id || ""
      });

    }

  }, [employee]);


  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change: AMS-M03-EDIT-001

  Purpose:
  Validate required fields.
  ------------------------------------------------------
  */

  const validate = () => {

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name required";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  /*
  ------------------------------------------------------
  Added: 2026-05-25
  Change: AMS-M03-EDIT-001

  Purpose:
  Submit updated employee data.
  ------------------------------------------------------
  */

  const handleSubmit = () => {

    if (!validate()) return;

    onSave({
      ...employee,
      ...formData
    });

  };


  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">
          Edit Employee
        </h2>

        <div className="space-y-3">

          <input
            className="border p-2 rounded w-full"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
          />

          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name}
            </p>
          )}

          <input
            className="border p-2 rounded w-full"
            placeholder="Department"
            value={formData.department}
            onChange={(e) =>
              setFormData({
                ...formData,
                department: e.target.value
              })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Designation"
            value={formData.designation}
            onChange={(e) =>
              setFormData({
                ...formData,
                designation: e.target.value
              })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value
              })
            }
          />

          <select
            className="border p-2 rounded w-full"
            value={formData.shift_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                shift_id: e.target.value
              })
            }
          >

            <option value="">
              Select Shift
            </option>

            {shifts?.map((shift) => (

              <option
                key={shift.id}
                value={shift.id}
              >
                {shift.shift_name}
              </option>

            ))}

          </select>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

}

export default EmployeeEditModal;