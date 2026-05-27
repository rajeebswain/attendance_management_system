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

TD-M06-004

Employee dashboard currently uses
temporary hardcoded values.

Replace with:

getCurrentUser()
↓

Employee lookup service
↓

Real employee data

TD-M06-005

Employee lookup currently uses:

employee.email = auth.email

Production review:

Use auth_user_id relation
instead of email matching
for stronger identity mapping.


TD-M06-006

Temporary fallback employee lookup:

auth.email || "rajeeb@example.com"

Production replacement:

auth.user.id
↓

employees.auth_user_id