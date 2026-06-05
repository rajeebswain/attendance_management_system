/**
 * M12 Notifications - Notification Templates
 * --------------------------------------------------
 * Module      : M12 Notifications
 * File        : services/notificationTemplates.js
 * Purpose     : Defines title/message templates for every notification event.
 *               Templates are pure functions — no side effects, no imports.
 * Created     : 2026-06-05
 * Author      : HRMS Platform Team
 * --------------------------------------------------
 * RULE: This file contains ONLY template definitions.
 *       No repository calls. No factory calls.
 * --------------------------------------------------
 */

import {
    ATTENDANCE_CORRECTION_SUBMITTED,
    ATTENDANCE_CORRECTION_APPROVED,
    ATTENDANCE_CORRECTION_REJECTED,
    LEAVE_APPLIED,
    LEAVE_APPROVED,
    LEAVE_REJECTED,
    SYSTEM_ANNOUNCEMENT,
  } from '../registry/eventRegistry';
  
  // ─── Category Constants ───────────────────────────────────────────────────────
  export const CATEGORY = {
    ATTENDANCE : 'attendance',
    LEAVE      : 'leave',
    SYSTEM     : 'system',
  };
  
  // ─── Priority Constants ───────────────────────────────────────────────────────
  export const PRIORITY = {
    LOW    : 'low',
    NORMAL : 'normal',
    HIGH   : 'high',
  };
  
  // ─── Status Constants ─────────────────────────────────────────────────────────
  export const STATUS = {
    UNREAD : 'unread',
    READ   : 'read',
  };
  
  /**
   * Template map: eventType → template function.
   * Each template receives a `payload` object and returns
   * { title, message, category, priority }.
   *
   * Payload shapes are documented per event.
   */
  const TEMPLATES = {
  
    // ── Attendance ─────────────────────────────────────────────────────────────
  
    [ATTENDANCE_CORRECTION_SUBMITTED]: (payload) => ({
      title    : 'Attendance Correction Submitted',
      message  : `Your attendance correction request for ${payload.date ?? 'the selected date'} has been submitted successfully and is pending review.`,
      category : CATEGORY.ATTENDANCE,
      priority : PRIORITY.NORMAL,
    }),
  
    [ATTENDANCE_CORRECTION_APPROVED]: (payload) => ({
      title    : 'Attendance Correction Approved',
      message  : `Your attendance correction request for ${payload.date ?? 'the selected date'} has been approved by ${payload.approverName ?? 'your manager'}.`,
      category : CATEGORY.ATTENDANCE,
      priority : PRIORITY.HIGH,
    }),
  
    [ATTENDANCE_CORRECTION_REJECTED]: (payload) => ({
      title    : 'Attendance Correction Rejected',
      message  : `Your attendance correction request for ${payload.date ?? 'the selected date'} was rejected${payload.reason ? `: ${payload.reason}` : '. Please contact your manager for details.'}.`,
      category : CATEGORY.ATTENDANCE,
      priority : PRIORITY.HIGH,
    }),
  
    // ── Leave ──────────────────────────────────────────────────────────────────
  
    [LEAVE_APPLIED]: (payload) => ({
      title    : 'Leave Request Submitted',
      message  : `Your ${payload.leaveType ?? 'leave'} request from ${payload.fromDate ?? '—'} to ${payload.toDate ?? '—'} has been submitted and is awaiting approval.`,
      category : CATEGORY.LEAVE,
      priority : PRIORITY.NORMAL,
    }),
  
    [LEAVE_APPROVED]: (payload) => ({
      title    : 'Leave Request Approved',
      message  : `Your ${payload.leaveType ?? 'leave'} request from ${payload.fromDate ?? '—'} to ${payload.toDate ?? '—'} has been approved by ${payload.approverName ?? 'your manager'}.`,
      category : CATEGORY.LEAVE,
      priority : PRIORITY.HIGH,
    }),
  
    [LEAVE_REJECTED]: (payload) => ({
      title    : 'Leave Request Rejected',
      message  : `Your ${payload.leaveType ?? 'leave'} request from ${payload.fromDate ?? '—'} to ${payload.toDate ?? '—'} was rejected${payload.reason ? `: ${payload.reason}` : '. Please contact your manager for details.'}.`,
      category : CATEGORY.LEAVE,
      priority : PRIORITY.HIGH,
    }),
  
    // ── System ─────────────────────────────────────────────────────────────────
  
//     [SYSTEM_ANNOUNCEMENT]: (payload) => ({
//       title    : payload.title ?? 'System Announcement',
//       message  : payload.message ?? 'A new system announcement has been posted.',
//       category : CATEGORY.SYSTEM,
//       priority : payload.priority ?? PRIORITY.NORMAL,
//     }),
//   };
  
  /**
   * Resolves a template for the given eventType + payload.
   *
   * @param {string} eventType  - One of the constants from eventRegistry.js
   * @param {object} payload    - Event-specific data object
   * @returns {{ title, message, category, priority }}
   * @throws {Error} if eventType is not registered
   */
//   export function resolveTemplate(eventType, payload = {}) {
//     const templateFn = TEMPLATES[eventType];
  
//     if (!templateFn) {
//       throw new Error(
//         `[M12 Notifications] No template registered for event: "${eventType}". ` +
//         `Register it in notificationTemplates.js and eventRegistry.js.`
//       );
//     }
  
//     return templateFn(payload);
//   }
  
//   export default { resolveTemplate, CATEGORY, PRIORITY, STATUS };