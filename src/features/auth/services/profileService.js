/*
==================================================

Module:
M02 Identity & Security

Submodule:
M02-002 Identity Layer

Feature:
Profile Service

Change ID:
M02-002-001

Status:
Active

Purpose:

Provides profile retrieval
operations for authenticated users.

Architecture:

AuthContext
      ↓
Profile Service
      ↓
Supabase
      ↓
profiles

Current Scope:

Get profile by user id.

Future:

Profile update
Avatar update
Department lookup
Designation lookup

Risk:

Low

Rollback:

Delete file

==================================================
*/

import {
    supabase
  } from "../../../lib/supabase/client";
  
  export async function getProfile(
    userId
  ) {
  
    const {
      data,
      error
    } = await supabase
  
      .from("profiles")
  
      .select("*")
  
      .eq(
        "id",
        userId
      )
  
      .single();
  
    if (error) {
  
      throw error;
  
    }
  
    return data;
  
  }