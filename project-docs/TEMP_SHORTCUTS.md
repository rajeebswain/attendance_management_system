# Temporary Development Shortcuts


## Active


1. prompt()

Reason:
Quick editing during development

Replace:
Modal popup



2. alert()

Reason:
Fast notification handling

Replace:
Toast notifications



3. window.location.reload()

Reason:
Quick state refresh

Replace:
React state updates



4. mock auth

Reason:
Speed development

Replace:
Real authentication



5. hardcoded work hours

Reason:
Attendance testing

Replace:
Shift settings



6. scattered date logic

Reason:
Fast implementation

Replace:
Shared date utility


Change ID: AMS-M03-EMP-009

Temporary shortcut:

Department and Shift filter values
are hardcoded.

Future replacement:

Load filter options dynamically
from database.
=================================================
TS-M02-001

Hardcoded loggedInUser object.

Current:

const loggedInUser = {
 role: "admin"
};

Purpose:

Temporary route testing.

Production:

Role comes from
AuthContext profile.

Module:

M02 Identity & Security
=======================================================