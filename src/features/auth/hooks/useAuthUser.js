/*
==================================================

Module:
M02 Identity & Security

Submodule:
M02-002 Identity Layer

Feature:
Auth User Hook

Change ID:
M02-002-002

Status:
Active

Purpose:

Provides authenticated
user from AuthContext.

Architecture:

AuthContext
      ↓
useAuthUser
      ↓
Application

Current Scope:

Authenticated user access.

Future:

Tenant context
Session metadata

Risk:

Low

Rollback:

Delete file

==================================================
*/

import {
    useAuth
  } from "../context/AuthContext";
  
  export function useAuthUser() {
  
    const {
      user
    } = useAuth();
  
    return user;
  
  }