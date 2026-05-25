// Centralized Supabase client
import { supabase } from "../../../lib/supabase/client";


// FETCH ALL EMPLOYEES
export async function getEmployees() {

  // Fetch employees with department data
  const { data, error } = await supabase

//     .from("employees")
//       .select(`
//   *,
//   departments (
//     department_name
//   )
// `)

/*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EMP-007

Purpose:
Load related data for employee table.

Relationships:
- departments
- shifts

Reason:
Shift name was not available in employee
table even though shift_id was being saved.

Risk:
LOW
------------------------------------------------------
*/

.from("employees")
.select(`
  *,
  departments (
    department_name
  ),
  shifts (
    shift_name
  )
`)

// .eq(
// "is_active",
// true
// )
.order("created_at", {
  ascending: false,
});

  // Handle fetch errors
  if (error) {
    throw error;
  }

  return data;
}


// CREATE EMPLOYEE
export async function createEmployee(employeeData) {

  const { data, error } = await supabase

    .from("employees")

    .insert([employeeData])

    .select();

  // Handle insert errors
  if (error) {
    throw error;
  }

  return data;
}


// UPDATE EMPLOYEE
export async function updateEmployee(

  employeeId,

  employeeData

) {

  const { data, error } = await supabase

    .from("employees")

    .update(employeeData)

    .eq("id", employeeId)

    .select();

  // Handle update errors
  if (error) {
    throw error;
  }

  return data;
}



// DEACTIVATE EMPLOYEE

export async function deactivateEmployee(

  employeeId
  
  ){
  
  const { error }
  
  =
  
  await supabase
  
  .from("employees")
  
  .update({
  
  is_active:false
  
  })
  
  .eq(
  
  "id",
  
  employeeId
  
  );
  
  if(error){
  
  throw error;
  
  }
  
  }

{/*Fetch all shifts from Supabase.*/}
export const getShifts = async () => {

  const { data, error } = await supabase
  
  .from("shifts")
  
  .select("*");
  
  if (error) throw error;
  
  return data;
  
  };


  export async function restoreEmployee(

    employeeId
    
    ){
    
    const {error}
    
    =
    
    await supabase
    
    .from(
    
    "employees"
    
    )
    
    .update({
    
    is_active:true
    
    })
    
    .eq(
    
    "id",
    
    employeeId
    
    );
    
    if(error){
    
    throw error;
    
    }
    
    }


    /*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EMP-010

Purpose:
Upload employee profile image
to Supabase storage.

Risk:
MEDIUM
------------------------------------------------------
*/

export async function uploadEmployeeImage(

  file
  
  ){
  
  const fileName =
  
  `${Date.now()}-${file.name}`;
  
  const { error } =
  
  await supabase.storage
  
  .from(
  "employee-profiles"
  )
  
  .upload(
  
  fileName,
  file
  
  );
  
  if(error){
  
  throw error;
  
  }
  
  const {
  
  data
  
  }
  
  =
  
  supabase.storage
  
  .from(
  "employee-profiles"
  )
  
  .getPublicUrl(
  fileName
  );
  
  return data.publicUrl;
  
  }