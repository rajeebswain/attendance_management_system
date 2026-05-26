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

