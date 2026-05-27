/*
==================================================
Change ID: M06-013
Date: 2026-05-26
Status: Initial
Purpose: Employee self-service data layer
Risk: Low
Rollback: Remove service
==================================================
*/

import { supabase }

from "../../../lib/supabase/client";

import {

getCurrentUser

}

from "../../../features/auth/services/authService";

/*
Load current employee profile
*/

export async function getCurrentEmployee(){

const user = await getCurrentUser();

if(!user){

return null;

}

const {

data,

error

}

=

await supabase

.from("employees")

.select(`
*,
departments(
department_name
),
shifts(
shift_name
)
`)

.eq(

"email",

user.email

)

.single();

if(error){

throw error;

}

return data;

}