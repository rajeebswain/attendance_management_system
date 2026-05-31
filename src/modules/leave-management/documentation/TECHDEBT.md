# M07 Technical Debt
TD-M07-001

Current Behavior:

Approved leave creates attendance
record only for start_date.

Impact:

Multi-day leave requests do not
generate attendance records for
all leave dates.

Future Solution:

Generate attendance records for
every date between:

start_date
and
end_date

Priority:

Medium

Status:

Open
==============================================
TD-M07-002

approved_by temporarily disabled.

Reason:

Database column expects UUID
but authenticated approver
identity is not yet integrated.

Future:

Store logged-in approver UUID.
======================================
TD-M07-004

Audit records currently do not
capture authenticated approver UUID.

Future:

Store approver UUID after
authentication integration.
============================================
TD-M07-005

Leave Allocation currently
overwrites leave balances for
all employees.

Future Enhancement:

Support allocation by:

- Department
- Employee Type
- Leave Policy

Priority:

Medium

Target:

Future Leave Policy Module
=============================
TD-M07-004

Leave balance may be deducted
multiple times if leave status
changes Approved → Rejected →
Approved.

Future enhancement:
Implement balance reversal or
first-approval tracking.
=====================================
TD-M07-005

approved_at timestamp is
updated on every status
change.

Future enhancement:
Update approved_at only
when status becomes approved.
