/*
==================================================

Module:
M02 Identity & Security

Submodule:
M02-001 Authentication Foundation

Feature:
Authentication Context

Change ID:
M02-001-001

Status:
Active

Purpose:

Provides authenticated user
session across application.

Architecture:

Supabase Auth
      ↓
AuthContext
      ↓
ProtectedRoute
      ↓
Pages

Current Scope:

Authentication only.

Future:

Profile Loading
Role Resolution
Permission Loading

Risk:

Low

Rollback:

Delete file

==================================================
*/

import {

    createContext,
  
    useContext,
  
    useEffect,
  
    useState,
  
  } from "react";
  
  import {
  
    supabase
  
  } from "../../../lib/supabase/client";
  
  const AuthContext =
    createContext();
  
  export function AuthProvider({
  
    children
  
  }) {
  
    const [user, setUser] =
      useState(null);
  
    const [loading, setLoading] =
      useState(true);
  
    useEffect(() => {
  
      async function initializeAuth() {
  
        try {
  
          const {
  
            data: {
  
              session
  
            }
  
          } = await supabase.auth.getSession();
  
          setUser(
            session?.user ?? null
          );
  
        } catch (error) {
  
          console.error(
            "AUTH INIT ERROR",
            error
          );
  
        } finally {
  
          setLoading(false);
  
        }
  
      }
  
      initializeAuth();
  
      const {
  
        data: {
  
          subscription
  
        }
  
      } = supabase.auth.onAuthStateChange(
  
        (
  
          _event,
  
          session
  
        ) => {
  
          setUser(
            session?.user ?? null
          );
  
        }
  
      );
  
      return () => {
  
        subscription.unsubscribe();
  
      };
  
    }, []);
  
    return (
  
      <AuthContext.Provider
  
        value={{
  
          user,
  
          loading,
  
        }}
  
      >
  
        {children}
  
      </AuthContext.Provider>
  
    );
  
  }
  
  export function useAuth() {
  
    return useContext(
      AuthContext
    );
  
  }