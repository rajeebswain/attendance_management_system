/*
==================================================
Module: M12 Notifications
Submodule: Repository
Feature: Notification Persistence Contract
Change ID: M12-006
Status: Active
Purpose: Storage abstraction for notifications
Architecture: Repository Pattern
Risk: Low
Rollback: Restore previous repository implementation
==================================================
*/

const notConfiguredError = () => {
    throw new Error(
      "[M12 Notifications] Notification adapter not configured."
    );
  };
  
  /**
   * Default adapter.
   *
   * Must be replaced with an approved
   * persistence adapter (Supabase/API/etc.)
   * before notification functionality is enabled.
   */
  const notImplementedAdapter = {
  
    async getNotifications() {
      notConfiguredError();
    },
  
    async createNotification() {
      notConfiguredError();
    },
  
    async markRead() {
      notConfiguredError();
    },
  
    async markAllRead() {
      notConfiguredError();
    },
  
    async getUnreadCount() {
      notConfiguredError();
    }
  
  };
  
  let activeAdapter = notImplementedAdapter;
  
  /**
   * Inject storage adapter.
   *
   * Example:
   * setAdapter(supabaseNotificationAdapter);
   */
  export function setAdapter(adapter) {
  
    if (!adapter) {
      throw new Error(
        "[M12 Notifications] Adapter is required."
      );
    }
  
    activeAdapter = adapter;
  }
  
  /**
   * Fetch notifications.
   */
  export async function getNotifications(
    userId,
    filters = {}
  ) {
    return activeAdapter.getNotifications(
      userId,
      filters
    );
  }
  
  /**
   * Create notification.
   */
  export async function createNotification(
    notification
  ) {
    return activeAdapter.createNotification(
      notification
    );
  }
  
  /**
   * Mark notification as read.
   */
  export async function markRead(
    notificationId,
    userId
  ) {
    return activeAdapter.markRead(
      notificationId,
      userId
    );
  }
  
  /**
   * Mark all notifications as read.
   */
  export async function markAllRead(
    userId
  ) {
    return activeAdapter.markAllRead(
      userId
    );
  }
  
  /**
   * Get unread notification count.
   */
  export async function getUnreadCount(
    userId
  ) {
    return activeAdapter.getUnreadCount(
      userId
    );
  }