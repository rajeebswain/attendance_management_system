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