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




