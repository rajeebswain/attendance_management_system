Module: M12 Notifications

File:
moduleConfig.js

Purpose:
Registers the Notifications module with the HRMS plugin architecture.

Owned Resources:
- Routes
- Navigation
- Permissions

Dependencies:
- navigation.js
- routes.jsx
- permissions.js

Future Scope:
- Notification Center
- Notification Bell
- Event Registry
- Notification Services

Risk:
Low

Rollback:
Remove module registration
===================================
Module: M12 Notifications

File:
index.js

Purpose:
Reserved entry point for future public exports.

Current Responsibilities:
None

Future Responsibilities:
Expose shared services
Expose event registry
Expose reusable module APIs

Risk:
Low

Rollback:
Delete file
============================================
# M12 Notifications

## File: navigation.js

### Purpose

Registers navigation entries owned by the Notifications module.

This file is responsible for exposing module routes to the application's navigation system.

---

### Responsibilities

* Register Notifications menu entry
* Route users to Notification Center
* Follow module-owned navigation architecture
* Support module enable/disable behavior through module registration

---

### Navigation Entries

| Label         | Path           |
| ------------- | -------------- |
| Notifications | /notifications |

---

### Ownership

Owned By:

* M12 Notifications

Not Owned By:

* M04 Attendance
* M07 Leave Management
* Any other module

---

### Dependencies

Depends On:

* routes.jsx

Referenced By:

* moduleConfig.js
* Module Registry
* Navigation Renderer

---

### Architecture Notes

The navigation structure follows the existing M07 Leave Management pattern.

Current standard:

```javascript
{
  label: "Notifications",
  path: "/notifications"
}
```

No additional metadata is currently used.

Excluded fields:

* id
* icon
* order
* module
* permission

These fields may be introduced later only if the navigation framework is upgraded globally.

---

### Risk

Low

This file only declares navigation entries and contains no business logic.

---

### Rollback

Remove the Notifications navigation entry and restore the previous navigation configuration.

---

### Future Enhancements

Potential future additions:

* Navigation grouping
* Dynamic permission filtering
* Icon support
* Navigation ordering
* Module-aware navigation rendering

These enhancements should be implemented platform-wide, not only within M12.
=====================================================================

# M12 Notifications

## File: permissions.js

### Purpose

Registers all permissions owned by the Notifications module.

This file acts as the permission registry for M12 and exposes all notification-related permission identifiers to the application's authorization system.

---

### Responsibilities

* Define notification permissions
* Support role-based authorization
* Provide permissions to module registration
* Maintain permission ownership within M12

---

### Permissions Registry

| Permission                  | Purpose                            |
| --------------------------- | ---------------------------------- |
| notifications.view          | Access Notification Center         |
| notifications.read          | Read notification details          |
| notifications.mark-read     | Mark a single notification as read |
| notifications.mark-all-read | Mark all notifications as read     |

---

### Ownership

Owned By:

* M12 Notifications

Not Owned By:

* M04 Attendance
* M07 Leave Management
* M02 Identity & Security

---

### Dependencies

Referenced By:

* moduleConfig.js
* Authorization Layer
* Role Management
* Future RBAC Components

---

### Architecture Notes

The permissions registry follows the existing M07 Leave Management architecture.

Current implementation standard:

```javascript
const notificationPermissions = [

  "notifications.view",

  "notifications.read",

  "notifications.mark-read",

  "notifications.mark-all-read"

];
```

Permissions are stored as simple string identifiers.

No metadata objects are currently used within the existing permission framework.

---

### Security Considerations

The permission registry should remain the single source of truth for all M12 permission identifiers.

New permissions should be added here before being assigned to roles.

---

### Future Expansion

Potential future permissions:

```text
notifications.delete
notifications.archive
notifications.manage
notifications.preferences
notifications.admin
```

These should only be introduced when the corresponding functionality is implemented.

---

### Risk

Low

This file contains configuration only and does not perform authorization checks directly.

---

### Rollback

Restore the previous permission registry or remove newly added permission identifiers.

---

### Change History

M12-002

Purpose:
Create Notifications permission registry.

Status:
Active

Risk:
Low

Rollback:
Restore previous permission configuration.
========================================================
# M12 Notifications

## File: routes.jsx

### Purpose

Registers routes owned by the Notifications module.

This file connects Notification Center pages to the application's routing system.

---

### Responsibilities

* Register Notifications routes
* Protect routes using authentication middleware
* Route users to Notification Center
* Follow plugin route architecture

---

### Routes

| Route          | Component              |
| -------------- | ---------------------- |
| /notifications | NotificationCenterPage |

---

### Access Control

Allowed Roles:

* admin
* employee
* manager
* super_admin

Authentication is enforced through ProtectedRoute.

---

### Dependencies

Depends On:

* NotificationCenterPage.jsx
* ProtectedRoute

Referenced By:

* moduleConfig.js
* Route Registry

---

### Architecture Notes

Follows the same route registration pattern used by M07 Leave Management.

All routes must be wrapped with ProtectedRoute.

Route metadata such as:

* module
* permission

is not currently used by the route registry and should not be added unless adopted platform-wide.

---

### Risk

Medium

Improper route protection can expose pages outside the authorization model.

---

### Rollback

Remove route registration and restore previous routing configuration.
===========================================================================
# M12 Notifications

## File: registry/eventRegistry.js

### Purpose

Provides a centralized registry of all notification event identifiers used by the Notifications module.

---

### Responsibilities

* Define notification event constants
* Prevent hardcoded event strings
* Provide a single source of truth for notification events
* Support integration between M04 Attendance and M07 Leave Management

---

### Event Categories

#### Attendance Events

* ATTENDANCE_CORRECTION_SUBMITTED
* ATTENDANCE_CORRECTION_APPROVED
* ATTENDANCE_CORRECTION_REJECTED

#### Leave Events

* LEAVE_APPLIED
* LEAVE_APPROVED
* LEAVE_REJECTED

---

### Dependencies

Consumed By:

* notificationService.js
* notificationFactory.js
* M04 Attendance Engine
* M07 Leave Management

---

### Architecture Notes

This file must remain constants-only.

Business logic, validation logic, and notification generation logic must not be added here.

---

### Risk

Low

Contains only static event definitions.

---

### Rollback

Restore previous event definitions or remove unused events.

=============================================================
# M12 Notifications

## File: services/notificationTemplates.js

### Purpose

Provides all notification templates used by the Notifications module.

This file converts notification events into user-facing notification content.

---

### Responsibilities

* Define notification titles
* Define notification messages
* Define notification categories
* Define notification priorities
* Resolve templates by event type

---

### Supported Events

#### Attendance

* ATTENDANCE_CORRECTION_SUBMITTED
* ATTENDANCE_CORRECTION_APPROVED
* ATTENDANCE_CORRECTION_REJECTED

#### Leave

* LEAVE_APPLIED
* LEAVE_APPROVED
* LEAVE_REJECTED

---

### Exported Constants

#### CATEGORY

```text
attendance
leave
```

#### PRIORITY

```text
low
normal
high
```

#### STATUS

```text
unread
read
```

---

### Exported Functions

#### resolveTemplate(eventType, payload)

Returns:

```js
{
  title,
  message,
  category,
  priority
}
```

Throws an error when the event type is not registered.

---

### Dependencies

Depends On:

* registry/eventRegistry.js

Consumed By:

* notificationFactory.js
* notificationService.js

---

### Architecture Notes

This file must remain template-only.

Do NOT add:

* Database access
* Repository calls
* Service calls
* UI logic
* API requests

---

### Risk

Low

Contains only pure template functions.

---

### Rollback

Restore previous template definitions.

================================================
# M12 Notifications

## File: services/notificationTemplates.js

### Purpose

Provides all notification templates used by the Notifications module.

This file converts notification events into user-facing notification content.

---

### Responsibilities

* Define notification titles
* Define notification messages
* Define notification categories
* Define notification priorities
* Resolve templates by event type

---

### Supported Events

#### Attendance

* ATTENDANCE_CORRECTION_SUBMITTED
* ATTENDANCE_CORRECTION_APPROVED
* ATTENDANCE_CORRECTION_REJECTED

#### Leave

* LEAVE_APPLIED
* LEAVE_APPROVED
* LEAVE_REJECTED

---

### Exported Constants

#### CATEGORY

```text
attendance
leave
```

#### PRIORITY

```text
low
normal
high
```

#### STATUS

```text
unread
read
```

---

### Exported Functions

#### resolveTemplate(eventType, payload)

Returns:

```js
{
  title,
  message,
  category,
  priority
}
```

Throws an error when the event type is not registered.

---

### Dependencies

Depends On:

* registry/eventRegistry.js

Consumed By:

* notificationFactory.js
* notificationService.js

---

### Architecture Notes

This file must remain template-only.

Do NOT add:

* Database access
* Repository calls
* Service calls
* UI logic
* API requests

---

### Risk

Low

Contains only pure template functions.

---

### Rollback

Restore previous template definitions.
=======================================================