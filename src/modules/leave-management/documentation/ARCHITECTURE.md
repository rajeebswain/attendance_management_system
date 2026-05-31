# Leave Management Architecture

ARCH-M07-001

Leave Management implemented as
a pluggable module.

Reason:

Enable module isolation and
future SaaS licensing.

Impact:

Module can be enabled or disabled
without affecting core modules.
==============================================
ARCH-M07-002

Leave requests shall display complete
review information within the admin
approval screen.

Displayed Information:

* Request ID
* Employee Name
* Employee Code
* Leave Type
* Leave Period
* Applied Timestamp
* Leave Duration
* Reason
* Status

Reason:

HR users should be able to review
leave requests without opening
database records or additional pages.

Impact:

Improves leave approval workflow
and administrative efficiency.
===============================================

ARCH-M07-003

Administrative leave review screens
shall provide client-side filtering
and summary statistics.

Reason:

Improve review efficiency for
large employee populations.

Impact:

Reduces manual searching and
improves approval workflow.
=================================================
ARCH-M07-004

Leave approval actions capture
administrative decision metadata.

Stored Data:

- Approval Status
- Admin Remark
- Approval Timestamp

Purpose:

Provide auditability and
decision traceability.

Impact:

Improves leave approval tracking
and compliance readiness.
==============================================
ARCH-M07-005

Leave decisions are visible to
employees after processing.

Displayed Information:

- Status
- Admin Remark
- Approval Timestamp

Purpose:

Improve transparency and
reduce leave-related disputes.
==========================================
ARCH-M07-006

Leave audit logging implemented
as an isolated Leave Module service.

Reason:

Track approval lifecycle without
modifying leave records.

Impact:

Supports compliance,
investigation,
and future workflow auditing.
===============================================
ARCH-M07-008

Leave decisions are managed
through a dedicated modal.

Purpose:

Prevent accidental status changes
and support decision revisions.

Impact:

All decision changes remain
auditable.
===========================================
ARCH-M07-009

Leave decisions support
controlled status reversal.

Rules:

Pending -> Approved
Pending -> Rejected

Approved -> Rejected
Rejected -> Approved

Same-status transitions
are blocked.
===========================================
ARCH-M07-010

Leave Allocation provides
bulk leave entitlement setup.

Purpose:

Allow HR/Admin to allocate
yearly leave balances to all
employees from a single screen.

Impact:

Leave approval validation and
leave deduction depend on the
allocated balances.

Scope:

- Casual Leave Allocation
- Sick Leave Allocation
- Earned Leave Allocation
- Bulk Employee Update
=========================================
ARCH-M07-011

Leave approval requires
sufficient leave balance.

Requested leave duration
must be less than or equal
to available leave balance.
====================================
ARCH-M07-012
Leave requests must have
valid dates.

Rules:

- Start date cannot be
  in the past.

- End date cannot be
  earlier than start date.

Validation occurs before
leave request creation.
=======================================
ARCH-M07-014

Approved leave requests
automatically deduct leave
balance.

Balance validation occurs
before approval.

Deduction is based on leave
duration and leave type.


