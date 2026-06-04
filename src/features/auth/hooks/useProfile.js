/*
==================================================

Module:
M02 Identity & Security

Submodule:
M02-002 Identity Layer

Feature:
Profile Hook

Change ID:
M02-002-003

Status:
Active

Purpose:

Loads authenticated
user profile.

Architecture:

AuthContext
      ↓
useProfile
      ↓
Profile Service
      ↓
profiles

Current Scope:

Profile retrieval.

Future:

Role loading
Department loading
Designation loading
Permission loading

Risk:

Low

Rollback:

Delete file

==================================================
*/

import {

    useEffect,
  
    useState
  
  } from "react";
  
  import {
  
    useAuthUser
  
  } from "./useAuthUser";
  
  import {
  
    getProfile
  
  } from "../services/profileService";
  
  export function useProfile() {
  
    const user =
      useAuthUser();
  
    const [
  
      profile,
  
      setProfile
  
    ] = useState(null);
  
    const [
  
      loading,
  
      setLoading
  
    ] = useState(true);
  
    useEffect(() => {
  
      async function loadProfile() {
  
        if (!user) {
  
          setLoading(false);
  
          return;
  
        }
  
        try {
  
          const data =
            await getProfile(
              user.id
            );
  
          setProfile(data);
  
        } catch (error) {
  
          console.error(error);
  
        } finally {
  
          setLoading(false);
  
        }
  
      }
  
      loadProfile();
  
    }, [user]);
  
    return {
  
      profile,
  
      loading
  
    };
  
  }