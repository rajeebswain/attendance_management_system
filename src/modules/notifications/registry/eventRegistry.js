/**
 * M12 Notifications - Event Registry
 * --------------------------------------------------
 * Module      : M12 Notifications
 * File        : registry/eventRegistry.js
 * Purpose     : Central registry of all notification event constants.
 *               Import these constants in M04/M07 when dispatching events.
 * Created     : 2026-06-05
 * Author      : HRMS Platform Team
 * --------------------------------------------------
 * IMPORTANT: Do NOT add implementation logic here.
 * This file is constants-only.
 * --------------------------------------------------
 */

// ─── Attendance Events ────────────────────────────────────────────────────────
export const ATTENDANCE_CORRECTION_SUBMITTED = 'ATTENDANCE_CORRECTION_SUBMITTED';
export const ATTENDANCE_CORRECTION_APPROVED  = 'ATTENDANCE_CORRECTION_APPROVED';
export const ATTENDANCE_CORRECTION_REJECTED  = 'ATTENDANCE_CORRECTION_REJECTED';

// ─── Leave Events ─────────────────────────────────────────────────────────────
export const LEAVE_APPLIED   = 'LEAVE_APPLIED';
export const LEAVE_APPROVED  = 'LEAVE_APPROVED';
export const LEAVE_REJECTED  = 'LEAVE_REJECTED';

// ─── System Events ────────────────────────────────────────────────────────────
// export const SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT';

// ─── Grouped Export (for iteration / validation) ──────────────────────────────
// export const ATTENDANCE_EVENTS = [
//   ATTENDANCE_CORRECTION_SUBMITTED,
//   ATTENDANCE_CORRECTION_APPROVED,
//   ATTENDANCE_CORRECTION_REJECTED,
// ];

// export const LEAVE_EVENTS = [
//   LEAVE_APPLIED,
//   LEAVE_APPROVED,
//   LEAVE_REJECTED,
// ];

// export const ALL_EVENTS = [
//   ...ATTENDANCE_EVENTS,
//   ...LEAVE_EVENTS,
//   SYSTEM_ANNOUNCEMENT,
// ];

// export default {
//   ATTENDANCE_CORRECTION_SUBMITTED,
//   ATTENDANCE_CORRECTION_APPROVED,
//   ATTENDANCE_CORRECTION_REJECTED,
//   LEAVE_APPLIED,
//   LEAVE_APPROVED,
//   LEAVE_REJECTED,
//   SYSTEM_ANNOUNCEMENT,
//   ATTENDANCE_EVENTS,
//   LEAVE_EVENTS,
//   ALL_EVENTS,
// };