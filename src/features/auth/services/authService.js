
// Import centralized Supabase client
import { supabase } from "../../../lib/supabase/client";


// LOGIN USER
// Handles email/password authentication
export async function loginUser({

  email,

  password,

}) {

  // Supabase authentication request
  const { data, error } = await supabase.auth.signInWithPassword({

    email,

    password,
  });

  // Throw error if login fails
  if (error) {
    throw error;
  }

  // Return authenticated user data
  return data;
}


// SIGNUP USER
// Creates new account
export async function signupUser({

  fullName,

  email,

  password,

}) {

  // Supabase signup request
  const { data, error } = await supabase.auth.signUp({

    email,

    password,

    // Additional metadata
    options: {

      data: {

        full_name: fullName,
      },
    },
  });

  // Throw error if signup fails
  if (error) {
    throw error;
  }

  return data;
}


// LOGOUT USER
// Ends authenticated session
export async function logoutUser() {

  const { error } = await supabase.auth.signOut();

  // Throw error if logout fails
  if (error) {
    throw error;
  }
}


/*
==================================================
Change ID: M06-012
Date: 2026-05-26
Status: Initial
Purpose: Get logged-in user
Risk: Low
Rollback: Remove function
==================================================
*/

export async function getCurrentUser(){

  const {
  
  data,
  
  error
  
  }
  
  =
  
  await supabase.auth.getUser();
  
  if(error){
  
  throw error;
  
  }
  
  return data.user;
  
  }