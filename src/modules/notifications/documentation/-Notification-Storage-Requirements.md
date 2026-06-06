# M12 Notification Storage Requirements

Module ID: M12

Status: Approved

Purpose: Define storage requirements before database schema design.

---

## Overview

Notification storage must support:

* Multi-tenant SaaS
* User-specific notifications
* Future module integrations
* Notification Center
* Notification Bell
* Unread Count
* Future Email/SMS/Push channels

---

## Ownership Requirements

### Tenant Ownership

Every notification must belong to a tenant.

Example:

```text
Tenant A
  User A1
  User A2

Tenant B
  User B1
```

User A1 must never see notifications belonging to Tenant B.

---

### User Ownership

Every notification belongs to exactly one user.

Example:

```text
Leave Approved
```

Only the leave applicant receives the notification.

---

## Query Requirements

### Query 1

Get all notifications for a user.

Example:

```text
User opens Notification Center
```

System returns:

```text
Latest notifications first
```

---

### Query 2

Get unread notifications.

Example:

```text
Bell badge count
```

System returns:

```text
Unread only
```

---

### Query 3

Get notifications by category.

Categories:

```text
attendance
leave
```

Used by NotificationFilter.

---

### Query 4

Mark single notification as read.

Used by:

```text
Notification Center
```

---

### Query 5

Mark all notifications as read.

Used by:

```text
Notification Center
```

---

## Sorting Requirements

Default ordering:

```text
Newest First
```

Sort Field:

```text
createdAt DESC
```

---

## Filtering Requirements

Supported MVP filters:

```text
All

Attendance

Leave
```

Future filters:

```text
Priority

Status

Date Range

Module
```

---

## Unread Count Requirements

Notification Bell requires:

```text
Unread Count
```

Count rule:

```text
status = unread
```

Read notifications must not be counted.

---

## Event Source Requirements

Notifications may originate from:

```text
M04 Attendance

M07 Leave
```

Future:

```text
Payroll

Inventory

Assets

Projects

Recruitment
```

Storage design must support future modules.

---

## Scalability Requirements

MVP:

```text
Hundreds of notifications
```

Future:

```text
Thousands of notifications
per tenant
```

Storage design must avoid module-specific columns.

Use metadata for event-specific data.

---

## Security Requirements

Notifications must be isolated by:

```text
tenantId
userId
```

Users must never access notifications belonging to another user.

---

## Retention Requirements

MVP:

```text
Keep all notifications
```

No auto-delete.

Future:

```text
90 Day Retention

180 Day Retention

365 Day Retention
```

Tenant configurable.

---

## Architecture Summary

Storage must support:

✓ Multi-Tenant

✓ User Ownership

✓ Notification Center

✓ Bell Badge

✓ Unread Count

✓ Future Channels

✓ Future Modules

Without requiring schema redesign.
