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

