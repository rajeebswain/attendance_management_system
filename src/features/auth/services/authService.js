// import { supabase } from "../../../lib/supabase/client";

// export async function loginUser(email, password) {

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   const { error } = await supabase.auth.signOut();

//   if (error) {
//     throw error;
//   }

//   return data;
// }

// import { supabase } from "../../../lib/supabase/client";

// export async function login(email, password) {

//   const { data, error } =
//     await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//   if (error) {
//     throw error;
//   }

//   return data;
// }

// export async function logout() {

//   const { error: signOutError } =
//     await supabase.auth.signOut();

//   if (signOutError) {
//     throw signOutError;
//   }
// }


import { supabase } from '../../../lib/supabase/client';

export async function loginUser(email, password) {

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function logoutUser() {

  const { error: signOutError } =
    await supabase.auth.signOut();

  if (signOutError) {
    throw signOutError;
  }
}

// SignUP Service
// export async function signupUser({
//   fullName,
//   email,
//   password,
// }) {

//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) {
//     throw error;
//   }

//   return data;
// }

export async function signupUser({
  fullName,
  email,
  password,
}) {

  const { data, error } = await supabase.auth.signUp({

    email,

    password,

    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}