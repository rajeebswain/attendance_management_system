/**
 * M12 Notifications - Module Index
 * --------------------------------------------------
 * Module      : M12 Notifications
 * File        : index.js
 * Purpose     : Public API of the Notifications module.
 *               Only export what external modules need.
 *               Internal services are imported directly from their files.
 * Created     : 2026-06-05
 * Author      : HRMS Platform Team
 * --------------------------------------------------
 */

// Module registration (consumed by the app's module loader)
export { default as notificationModuleConfig } from './moduleConfig';

// Event constants (consumed by M04, M07 when dispatching events)
export * from './registry/eventRegistry';

// Service (consumed by M04, M07 when dispatching events)
export { default as notificationService } from './services/notificationService';

// Bell component (consumed by the app shell / header)
// export { default as NotificationBell } from './components/NotificationBell';

// Widget component — dropdown panel paired with NotificationBell
// export { default as NotificationWidget } from './components/NotificationWidget';