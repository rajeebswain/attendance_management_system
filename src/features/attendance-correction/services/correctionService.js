import { supabase }

from "../../../lib/supabase/client";


export async function createCorrectionRequest(

data

){

const {

data:result,

error

}

=

await supabase

.from(

"attendance_corrections"

)

.insert([

data

])

.select();


if(error)

throw error;


return result;

}