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