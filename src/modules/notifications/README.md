# M12 Notifications Module

In-app notification center for the HRMS platform.

**Module ID:** `M12`

**MVP Scope:** In-app notifications only

---

## Overview

M12 provides a centralized in-app notification system for the HRMS platform.

The module is implemented as a standalone plugin and follows the same plugin architecture used by M07 Leave Management.

The Notifications module is responsible for:

* Notification event registration
* Notification template generation
* Notification creation
* Notification storage abstraction
* Notification delivery within the application
* Notification center management

---

## Supported Events

| Event                           | Category   |
| ------------------------------- | ---------- |
| Attendance Correction Submitted | Attendance |
| Attendance Correction Approved  | Attendance |
| Attendance Correction Rejected  | Attendance |
| Leave Applied                   | Leave      |
| Leave Approved                  | Leave      |
| Leave Rejected                  | Leave      |

---

## Quick Integration

### Leave Approval Example

```javascript
import notificationService
from '@/modules/notifications/services/notificationService';

import {
  LEAVE_APPROVED
}
from '@/modules/notifications/registry/eventRegistry';

await notificationService.dispatch({

  eventType: LEAVE_APPROVED,

  userId: applicantUserId,

  payload: {

    leaveType: 'Casual Leave',

    fromDate: '2026-06-10',

    toDate: '2026-06-12',

    approverName: 'Manager Name'

  }

});
```

---

## Integration Modules

### M07 Leave Management

Supported Events:

* LEAVE_APPLIED
* LEAVE_APPROVED
* LEAVE_REJECTED

---

### M04 Attendance Engine

Supported Events:

* ATTENDANCE_CORRECTION_SUBMITTED
* ATTENDANCE_CORRECTION_APPROVED
* ATTENDANCE_CORRECTION_REJECTED

---

## Architecture

Notification dispatch flow:

```text
External Module
      ↓
notificationService
      ↓
notificationFactory
      ↓
notificationTemplates
      ↓
notificationRepository
```

---

## Public API

### notificationService.dispatch()

Creates and stores a notification.

```javascript
await notificationService.dispatch({
  eventType,
  userId,
  payload
});
```

---

### notificationService.getNotifications()

Returns notifications for a user.

```javascript
const notifications =
  await notificationService.getNotifications(userId);
```

---

### notificationService.markRead()

Marks a notification as read.

```javascript
await notificationService.markRead(
  notificationId,
  userId
);
```

---

### notificationService.markAllRead()

Marks all notifications as read.

```javascript
await notificationService.markAllRead(
  userId
);
```

---

### notificationService.getUnreadCount()

Returns unread notification count.

```javascript
const count =
  await notificationService.getUnreadCount(
    userId
  );
```

---

## Module Ownership

M12 owns:

* Notification Routes
* Notification Navigation
* Notification Permissions
* Notification Events
* Notification Templates
* Notification Factory
* Notification Repository
* Notification Service
* Notification Center

Other modules must not directly access internal M12 implementation files.

---

## Architecture Rules

External modules must only interact with Notifications through:

```javascript
notificationService
```

External modules must never directly call:

```javascript
notificationFactory
notificationRepository
```

---

## Future Scope

The following features are intentionally excluded from MVP:

* Email Notifications
* SMS Notifications
* WhatsApp Notifications
* Push Notifications
* Webhooks
* Notification Preferences
* Real-Time Notifications

These features will be implemented as future modules or extensions.

---

## Documentation

For complete architecture documentation, implementation details, service responsibilities, repository design, event flow, and integration guidelines see:

```text
documentation/M12-Architecture.md
```

---

## Status

Architecture Approved

Implementation Phase In Progress
