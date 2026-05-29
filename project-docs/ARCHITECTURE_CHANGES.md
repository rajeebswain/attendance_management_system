==================================================
ARCH-M06-001
Date: 2026-05-26

Module:
M06 Employee Self Service

Change:

Employee Self Service converted from
embedded feature architecture to
isolated pluggable module architecture.

Purpose:

Allow modules to be:

- enabled
- disabled
- attached
- removed

without affecting core application.

Expected behavior:

Enabled:

✓ Routes registered
✓ Navigation registered
✓ Widgets registered
✓ Services available
✓ UI visible

Disabled:

✓ Routes removed
✓ Navigation removed
✓ Widgets removed
✓ Services unavailable
✓ UI hidden

Risk:

Medium

Rollback:

Return M06 to static integration
inside core application.
==================================================


ARCH-M06-002

Employee Self Service is a UI layer only.

Business logic remains in core modules.

Employee and admin panels share services
and database entities.

No duplicate attendance logic allowed.


==================================================
ARCH-M06-004
Date: 2026-05-26

Module:
M06 Employee Self Service

Change:

Sidebar navigation changed from
static configuration to registry-based
navigation loading.

Previous:

Sidebar
↓

SIDEBAR_LINKS (static)

↓

Rendered menu


New:

Core Navigation
+

Enabled Module Navigation

↓

Navigation Registry

↓

Rendered menu


Purpose:

Allow modules to register and remove
their own navigation items without
modifying core application code.

Expected behavior:

Module enabled:

✓ Navigation visible

Module disabled:

✓ Navigation removed automatically

Benefits:

✓ Supports plugin architecture

✓ Prevents hardcoded menu growth

✓ Supports isolated module removal

Risk:

Medium

Rollback:

Revert Sidebar to use static
SIDEBAR_LINKS configuration
==================================================


ARCH-M06-005

Static route registration replaced
with registry-based module route loading.

Purpose:

Allow modules to register and
remove routes automatically.

Behavior:

Enabled:
✓ Route available

Disabled:
✓ Route removed


==================================================
ARCH-M06-006
Date: 2026-05-26

Change:

ProtectedRoute updated to support
optional role restrictions.

Previous:

allowedRoles=[]

↓

Automatic redirect

New:

allowedRoles.length > 0

↓

Apply role validation

Otherwise allow route access

Purpose:

Prevent unintended redirects for
unrestricted routes and plugin pages.

Risk:

Low

Rollback:

Restore previous ProtectedRoute logic
==================================================


==================================================
ARCH-M06-008
Date: 2026-05-26

Change:

Employee UI separated from Admin UI.

New structure:

AdminLayout
→ Admin Sidebar

EmployeeLayout
→ Employee Sidebar

Purpose:

Prevent employee users from accessing
admin controls and dashboards.

Benefits:

✓ UI separation
✓ Security preparation
✓ SaaS scalability
✓ Future role expansion

Risk:

Low

Rollback:

Return Employee pages to DashboardLayout
==================================================

==================================================
ARCH-M06-012
Date: 2026-05-26

Module:
M06 Employee Self Service

Change:

Added current authenticated user
retrieval flow.

Previous:

Employee dashboard

↓

Hardcoded employee information


New:

Supabase Auth User

↓

getCurrentUser()

↓

Employee lookup service

↓

Employee dashboard


Purpose:

Allow employee dashboard data
to be loaded based on the currently
logged-in employee.

Benefits:

✓ Removes hardcoded employee data

✓ Supports employee-specific access

✓ Supports SaaS / multi-company structure

✓ Prevents exposing all employee records

Risk:

Low

Rollback:

Restore hardcoded employee values
==================================================


==================================================
ARCH-M06-013
Date: 2026-05-26

Change:

Added employee-specific service layer.

Flow:

Auth User
↓

EmployeeSelfService

↓

Employee Table

Purpose:

Prevent dashboard from loading
all employee records.

Benefits:

✓ Employee isolation

✓ SaaS scalability

✓ Reduced data exposure

Risk:

Low
==================================================

==================================================
ARCH-M06-014
Date: 2026-05-26

Module:
M06 Employee Self Service

Change:

Employee Dashboard connected to
employee-specific profile service.

Previous:

Hardcoded employee data

↓

Employee dashboard


New:

Employee Dashboard

↓

EmployeeSelfService

↓

Employee table


Purpose:

Load employee information from
database instead of static values.

Benefits:

✓ Real employee profile data

✓ Removes dashboard hardcoding

✓ Supports employee-specific view

Risk:

Medium

Rollback:

Restore hardcoded profile values
==================================================


==================================================
ARCH-M06-015
Date: 2026-05-26

Module:
M06 Employee Self Service

Change:

Temporary authentication bridge
added because M02 authentication
is incomplete.

Current temporary flow:

getCurrentUser()

↓

If session unavailable

↓

Fallback email

↓

Employee lookup


Future production flow:

Supabase Session

↓

auth_user_id

↓

Employee lookup


Purpose:

Allow M06 development before
M02 authentication completion.

Benefits:

✓ Dashboard continues development

✓ Does not block M06 progress

Risk:

Medium

Rollback:

Remove temporary fallback logic
after M02 completion
==================================================

==================================================
ARCH-M06-016

Change:

Connected Employee Dashboard
quick actions to existing modules.

Flow:

Employee Dashboard

↓

Attendance Module
Leave Module

Purpose:

Reuse existing system logic
instead of duplicating features.

Risk:

Low

==================================================

ARCH-M06-017

Change:

EmployeeSelfAttendance moved
from DashboardLayout to EmployeeLayout.

Purpose:

Prevent employee pages from
rendering admin navigation.

Risk:

Low

==================================================

==================================================
ARCH-M06-018
Date: 2026-05-26

Module:
M06 Employee Self Service

Change:

Employee leave flow moved under
Employee Self Service module.

Previous:

Employee
↓

/leave

↓

Standalone page


New:

Employee
↓

/employee/leave

↓

EmployeeLayout

↓

LeaveForm


Purpose:

Keep employee pages isolated
from shared/admin pages.

Benefits:

✓ Employee UI consistency

✓ Plugin isolation

✓ Cleaner module boundaries

Risk:

Low

Rollback:

Navigate directly to /leave

==================================================
ARCH-M06-019
Date: 2026-05-26

Module:
M06 Employee Self Service

Change:

Module routes moved into
module configuration.

Previous:

Route Registry
↓

Hardcoded route source


New:

Module Config
↓

Own routes
↓

Route Registry


Purpose:

Allow modules to register
their own routes.

Benefits:

✓ Plugin scalability

✓ Cleaner architecture

✓ Supports future modules

Risk:

Medium

Rollback:

Restore static route loading
==================================================

==================================================
ARCH-M06-020
Date: 2026-05-26

Module:
M06 Employee Self Service

Change:

Leave submission uses
current employee context.

Previous:

LeaveForm
↓

Hardcoded employee_id

↓

Leave request


New:

EmployeeLeavePage

↓

Current Employee

↓

employee.id

↓

LeaveForm

↓

Leave request


Purpose:

Prevent leave requests from
being submitted under the
wrong employee.

Benefits:

✓ Removes hardcoded dependency

✓ Supports multiple users

✓ Employee data isolation

✓ SaaS compatibility

Risk:

Medium

Rollback:

Restore hardcoded employee id
==================================================

ARCH-M06-021

Change:

Normalized employee routes under
Employee Self Service module.

Changes:

/self-attendance
→ /employee/self-attendance

/leave
→ /employee/leave

Updated:

- EmployeeSidebar
- QuickActions
- M06 route registry

Purpose:

Keep employee functionality fully
isolated inside plugin boundaries.

Risk:

Low
==================================================

ARCH-M06-022

Change:

Integrated employee attendance
with real attendance service.

Added:

- Today attendance loading
- Attendance history loading
- Check-in handling
- Check-out handling

Purpose:

Replace temporary attendance UI
with live attendance records.

Risk:

Low
==================================================

ARCH-M06-023

Change:

Added employee leave history.

Added:

- Employee leave history page
- Leave data fetch service
- Sidebar navigation
- Leave status table

Purpose:

Allow employees to track
their leave requests and
approval status.

Risk:

Low

==================================================

ARCH-M06-024

Change:

Added employee profile page.

Added:

- Employee profile route
- Sidebar navigation
- Employee profile service
- Profile details card

Purpose:

Allow employees to view
their profile information.

Risk:

Low
==================================================

ARCH-M06-025

Change:

Added editable employee profile.

Added:

- Phone editing
- Address editing
- Profile save functionality
- Supabase update service

Purpose:

Allow employees to update
their own personal details.

Risk:

Low
==================================================

ARCH-M06-026

Change:
Added employee profile image upload

Added:
- Profile image upload
- Supabase storage integration
- Profile image preview
- Persistent image rendering
- Employee self-service image management

Purpose:
Allow employees to manage
their own profile photo.

Risk:
Medium

Notes:
Temporary public storage
policy enabled for development.
Must move to authenticated
storage policy before production.

==================================================

ARCH-M06-027

Change:
Added employee password management.

Added:
- Change password page
- Password update workflow
- Sidebar navigation
- Employee password route

Purpose:
Allow employees to securely
change their own account password.

Risk:
Medium

==================================================

ARCH-M06-028

Change:
Added employee early checkout
reason workflow.

Added:
- Early checkout detection
- Mandatory reason popup
- Attendance reason persistence

Purpose:
Improve attendance audit
compliance for employee checkout.

Risk:
Medium

Notes:
Uses temporary hardcoded
shift end time.
==================================================

/*
==================================================
Change ID: M06-029
Date: 2026-05-28
Status: Completed
Module: Employee Self Service
Feature: Employee Late Duration Visibility
==================================================

Purpose:
Show employee late duration based on
assigned shift start time and grace period.

Features Added:
- Dynamic late duration calculation
- Shift-based attendance comparison
- Grace-minute support
- Employee-side late visibility
- Auto recalculation after refresh
- Attendance status integration

Technical Notes:
- Removed derived lateDuration state
- Switched to computed render value
- Fixed stale React state issue
- Fixed refresh persistence issue

Production Improvements Later:
- Shared attendance utility
- Status badges/colors
- Better time formatting utility
- Localization support

Risk:
Low

Rollback:
Restore previous attendance status UI
without late duration rendering.
==================================================
*/

/*
==================================================
Change ID: M06-030
Date: 2026-05-28
Status: Completed
Module: Employee Self Service
Feature: Employee Attendance Statistics
==================================================

Purpose:
Add attendance analytics and metrics
for employee self attendance dashboard.

Features Added:
- Present days statistics
- Late count statistics
- Total attendance count
- OT hours placeholder
- Worked hours column
- Overtime column
- Attendance metric cards
- Attendance analytics UI

Technical Improvements:
- Added attendance statistics service
- Added statistics state management
- Added dynamic attendance analytics
- Added attendance metric rendering
- Extended employee attendance table

UI Improvements:
- Dashboard-style statistics cards
- Cleaner attendance visualization
- Better attendance monitoring
- Employee-side analytics visibility

Architecture Notes:
- Employee attendance now supports:
  worked hours,
  overtime,
  late tracking,
  attendance analytics.

Production Improvements Later:
- Shared attendance calculation engine
- Real overtime calculation integration
- Attendance graphs/charts
- Monthly analytics filtering
- Shared analytics utilities

Technical Debt Added:
TD-M06-012

Risk:
Low

Rollback:
Remove attendance statistics cards
and analytics service integration.
==================================================
*/


==================================================
ARCHITECTURE UPDATE
==================================================

Module:
M06 - Employee Self Service Attendance

Change ID:
M06-030

Date:
2026-05-28

Status:
Completed

Purpose:
Enhance employee self attendance dashboard
with attendance statistics, late duration,
worked hours, and overtime display.

Implemented Features:
- Employee attendance statistics cards
- Dynamic late duration calculation
- Attendance persistence after refresh
- HH:MM:SS worked hours formatting
- Employee-side overtime calculation helper
- Attendance history enhancements
- Early checkout reason display

Technical Notes:
- Worked hours calculated directly from
  check_in/check_out timestamps
- Overtime currently uses temporary
  fixed 8-hour shift baseline
- Employee attendance metrics isolated
  from admin attendance engine to avoid
  schema mismatch and formatting conflicts
- Refresh persistence handled using
  getTodayAttendance()

Temporary Shortcuts:
- Shift duration hardcoded as 8 hours
- Early checkout shift end hardcoded
- Overtime logic simplified

Production Improvements Required:
- Load shift duration dynamically
- Centralize overtime engine
- Replace prompt() with modal popup
- Add timezone-safe datetime handling
- Add real attendance policy engine

Risk Level:
Medium

Rollback:
Remove:
- calculateWorkedHours()
- calculateEmployeeOvertime()
- statistics cards
- late duration helper
- attendance history metrics columns

==================================================

M06-027
Attendance Correction Request

- Added plugin-based correction request module
- Added ESS sidebar integration
- Added correction request route
- Added attendance correction form
- Added Supabase correction service
- Added attendance_corrections table
- Added temporary RLS policies
- Added correction request insert workflow

Temporary Shortcuts:
- Hardcoded employee UUID
- Open insert/select policy
- No auth-session employee mapping
==================================================

M06-027 Step 2
Attendance Correction History

- Added correction request history table
- Added request status tracking
- Added admin remark column
- Added request history loading service
- Connected ESS correction workflow

Temporary Shortcuts:
- Hardcoded employee UUID
- Open RLS policy
- No auth-session mapping
==================================================
ARCH-M06-032

Attendance correction workflow is split
into employee request and admin approval.

Employee creates correction requests.

Admin reviews requests and updates
status.

Workflow state is stored in
attendance_corrections table.
==================================================
ARCH-M06-032-A

Attendance correction audit history is
stored separately from correction
requests.

Operational records and audit records
use separate tables.

Audit data preserves status changes
and admin remarks.
==================================================
ARCH-M06-032-B

Admin remarks are maintained per
correction request.

Each request owns its own remark state.

Shared remark state removed to prevent
cross-request updates.
==================================================
==================================================
ARCH-M06-034

Attendance regularization now displays
employee code and employee name instead
of raw employee UUID.

Employee details are resolved through
employee relationship mapping.

This improves HR usability and audit
readability.
==================================================

==================================================
ARCH-M06-036

Attendance Regularization uses
status-based filtering.

Default view shows Pending requests.

Admins can switch between:

Pending
Approved
Rejected
All

This separates operational work
from historical records while
keeping all data accessible.
==================================================
==================================================
ARCH-M06-035

Attendance regularization actions are
available only for pending requests.

Approved and rejected requests become
read-only in the admin workflow.

This prevents accidental repeated status
changes and improves audit consistency.
==================================================
==================================================
ARCH-M06-037

Attendance regularization actions require
confirmation before status changes.

This prevents accidental approval or
rejection while preserving the ability
to reverse decisions when necessary.

All changes continue to be recorded
through attendance correction audit logs.
==================================================
==================================================
ARCH-M06-038

Attendance Correction Audit supports
status-based filtering.

Audit records can be filtered by:

All
Approved
Rejected

This improves audit review while
keeping the interface simple.

Advanced filtering will be added
during reporting modules.
==================================================
==================================================

==================================================

==================================================

==================================================

==================================================

==================================================