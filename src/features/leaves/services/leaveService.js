import { supabase } from "../../../lib/supabase";

export async function createLeave(data){

const { error } = await supabase

.from("leaves")

.insert([data]);

if(error){

throw error;

}

}