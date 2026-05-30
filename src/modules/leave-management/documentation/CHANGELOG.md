# M07 Changelog

M07-000

Created Leave Management plugin foundation.
===============================================

M07-002B

Improved Leave Management UI.

Changes:

* Added Employee Code display
* Added From Date
* Added To Date
* Added Applied On timestamp
* Added Leave Duration calculation
* Added Request ID display
* Added Status Badge styling
* Restricted Approve/Reject actions
  to Pending requests only
* Improved card layout and readability
==============================================================

M07-002C

Added Leave Management Filters.

Features:

- Employee Search
- Status Filter
- Leave Type Filter
- Leave Summary Counters

Improves leave request navigation
for HR and Admin users.
================================================
M07-003A

Added leave approval metadata.

Features:

- Admin Remark
- Approval Timestamp
- Approval Status Tracking

Leave decisions now store
approval context.
==================================
M07-003B

Employee leave history now shows:

- Admin Remark
- Approval Timestamp

Employees can view approval
or rejection comments.
=========================================
M07-004A

Created Leave Audit Trail Foundation.

Added:

- leave_audit_logs table
- leaveAuditService
- Status transition logging
- Remark logging
- Change timestamp logging
==========================================
