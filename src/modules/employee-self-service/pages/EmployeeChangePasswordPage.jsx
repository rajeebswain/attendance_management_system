/*
==================================================
Change ID: M06-027
Date: 2026-05-27
Status: Initial
Purpose: Employee password management
Risk: Medium
Rollback: Remove password page
==================================================
*/

import { useState }

from "react";

import { supabase }

    from "../../../lib/supabase/client";

import EmployeeLayout
from "../layout/EmployeeLayout";

function EmployeeChangePasswordPage(){

const [

password,
setPassword

]

=

useState("");

const [

confirmPassword,
setConfirmPassword

]

=

useState("");

async function handleSubmit(e){

e.preventDefault();

try{

if(password !== confirmPassword){

alert(
"Passwords do not match"
);

return;

}

await supabase.auth.updateUser({

password

});

alert(
"Password updated"
);

setPassword("");
setConfirmPassword("");

}
catch(error){

alert(error.message);

}

}

return(

<EmployeeLayout>

<div className="p-6">

<div
className="
bg-white
rounded-lg
shadow
p-6
max-w-md
"
>

<h1
className="
text-2xl
font-bold
mb-6
"
>

Change Password

</h1>

<form
onSubmit={handleSubmit}
className="space-y-4"
>

<input
type="password"
placeholder="New Password"
value={password}
onChange={(e)=>
setPassword(e.target.value)
}
className="
w-full
border
p-3
rounded
"
/>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>
setConfirmPassword(e.target.value)
}
className="
w-full
border
p-3
rounded
"
/>

<button
type="submit"
className="
bg-blue-600
text-white
px-4
py-2
rounded
"
>

Update Password

</button>

</form>

</div>

</div>

</EmployeeLayout>

);

}

export default EmployeeChangePasswordPage;