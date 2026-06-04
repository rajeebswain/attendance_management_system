==================================================

ARCH-M02-001

Title

Permission Based Security Architecture

Date

2026-06-01

Status

Approved

Problem

Current system relies on
hardcoded role checks.

Example:

allowedRoles=["admin"]

This becomes difficult to
maintain as modules increase.

Decision

Move to:

Role
 ↓
Permissions
 ↓
Module Access
 ↓
Feature Access

Every feature must be protected
by permissions instead of
direct role checks.

Future modules will register
their permissions through
a central registry.

Benefits

✓ Plugin Friendly

✓ Multi Tenant Ready

✓ Scalable

✓ Dynamic Roles

Applies To

M02 Identity & Security

==================================================
==================================================

ARCH-M02-002

Title

Authentication First Security Strategy

Date

2026-06-01

Status

Approved

Decision

Permission system development
is paused until authentication
foundation is complete.

Reason

Permission checks depend on
authenticated users and valid
profile records.

Authentication layer must be
fully operational before route
and permission migration.

Applies To

M02 Identity & Security

==================================================
## M02-002 Identity Layer

Introduced a dedicated identity layer separating authentication from profile management.

### Added

* profileService.js
* useAuthUser.js
* useProfile.js

### Architecture

Supabase Auth
↓
AuthContext
↓
Authenticated User
↓
Profile Service
↓
Profile Hook
↓
Application

### Benefits

* Authentication remains lightweight.
* Profile loading is isolated.
* Easier future role and permission integration.
* Supports plugin-based SaaS architecture.

===================================================
## M02-003 Role & Permission Layer

Added RoleGuard and PermissionGuard.

### Architecture

Authenticated User
↓
Profile
↓
Role
↓
Permission Registry
↓
Route / Feature Access

### Benefits

* Route-level protection
* Component-level protection
* Plugin-ready security model
* Supports future multi-tenant RBAC
=================================================
Change ID: M07-PEX-001

Module:
M07 Leave Management

Type:
Plugin Route Ownership

Status:
Completed

Description:
Transferred Leave route ownership from AppRoutes
to Leave Management plugin through module registry.

Database Changes:
None

Business Logic Changes:
None

Risk:
Low

Rollback:
Restore leave routes in AppRoutes.
==============================================
Change ID: M07-PEX-001

Date: 2026-06-04

Module:
M07 Leave Management

Type:
Plugin Extraction

Description:
Leave routes moved from AppRoutes
to module route registry.

Result:
Leave module can now be enabled
or disabled through module config.

Risk:
Low

Rollback:
Restore routes inside AppRoutes.
========================================================

