==================================================
TD-M06-001

Temporary module registry introduced.

Current state:

Simple registry loads enabled modules.

Future action:

Merge with final plugin engine when
plugin architecture resumes.

Risk:

Duplicate registration logic

Priority:

Medium
==================================================

TD-M06-003

Temporary employee dashboard data
hardcoded until authentication and
employee profile service are connected.
==================================================
TD-M06-004

Employee dashboard currently uses
temporary hardcoded values.

Replace with:

getCurrentUser()
↓

Employee lookup service
↓

Real employee data
==================================================
TD-M06-005

Employee lookup currently uses:

employee.email = auth.email

Production review:

Use auth_user_id relation
instead of email matching
for stronger identity mapping.

==================================================
TD-M06-006

Temporary fallback employee lookup:

auth.email || "rajeeb@example.com"

Production replacement:

auth.user.id
↓

employees.auth_user_id
==================================================
TD-M06-007

Temporary public storage policy enabled
for employee profile uploads.

Current:
Public bucket access
for development simplicity.

Production replacement:
Authenticated storage policy
using auth.uid() based access control.

Additional production tasks:
- Restrict uploads by employee ownership
- Add image compression
- Add image resizing
- Add image delete workflow
==================================================

TD-M06-008

Current password change flow
uses simplified auth update.

Production replacement:
- Current password verification
- Password strength rules
- Re-authentication
- OTP/email confirmation
- Audit logging
==================================================
TD-M06-009

Early checkout workflow uses:
- prompt()
- hardcoded shift end time

Production replacement:
- modal popup
- dynamic shift timing
- predefined reasons
- textarea support
- audit logging

TD-M06-011

Late duration calculation currently
inside EmployeeSelfAttendancePage.

Production:
Move attendance calculations to
shared attendance utility service.
==================================================