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