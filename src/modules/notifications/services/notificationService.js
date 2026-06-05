/*
==================================================
Module: M12 Notifications
Submodule: Service
Feature: Notification Orchestration
Change ID: M12-007
Status: Active
Purpose: Public API for notification operations
Architecture: Service Layer
Risk: Low
Rollback: Restore previous service implementation
==================================================
*/

import {
    createNotification as buildNotification
  } from "./notificationFactory";
  
  import * as repository
  from "./notificationRepository";
  
  /**
   * Dispatch notification event.
   *
   * External modules must use this method
   * instead of calling repository/factory directly.
   */
  async function dispatch({
    eventType,
    userId,
    payload = {}
  }) {
  
    if (!eventType) {
      throw new Error(
        "[M12 NotificationService] eventType is required."
      );
    }
  
    if (!userId) {
      throw new Error(
        "[M12 NotificationService] userId is required."
      );
    }
  
    const notification =
      buildNotification({
        eventType,
        userId,
        payload
      });
  
    return repository.createNotification(
      notification
    );
  }
  
  /**
   * Fetch notifications for a user.
   */
  async function getNotifications(
    userId,
    filters = {}
  ) {
  
    if (!userId) {
      throw new Error(
        "[M12 NotificationService] userId is required."
      );
    }
  
    return repository.getNotifications(
      userId,
      filters
    );
  }
  
  /**
   * Mark a single notification as read.
   */
  async function markRead(
    notificationId,
    userId
  ) {
  
    if (!notificationId) {
      throw new Error(
        "[M12 NotificationService] notificationId is required."
      );
    }
  
    if (!userId) {
      throw new Error(
        "[M12 NotificationService] userId is required."
      );
    }
  
    return repository.markRead(
      notificationId,
      userId
    );
  }
  
  /**
   * Mark all notifications as read.
   */
  async function markAllRead(
    userId
  ) {
  
    if (!userId) {
      throw new Error(
        "[M12 NotificationService] userId is required."
      );
    }
  
    return repository.markAllRead(
      userId
    );
  }
  
  /**
   * Get unread notification count.
   */
  async function getUnreadCount(
    userId
  ) {
  
    if (!userId) {
      throw new Error(
        "[M12 NotificationService] userId is required."
      );
    }
  
    return repository.getUnreadCount(
      userId
    );
  }
  
  const notificationService = {
  
    dispatch,
  
    getNotifications,
  
    markRead,
  
    markAllRead,
  
    getUnreadCount
  
  };
  
  export default notificationService;