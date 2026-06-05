/*
==================================================
Module: M12 Notifications
Submodule: Notification Factory
Feature: Notification Object Creation
Change ID: M12-005
Status: Active
Purpose: Create notification objects from events
Architecture: Factory Pattern
Risk: Low
Rollback: Restore previous factory implementation
==================================================
*/

import {
    resolveTemplate,
    STATUS
  } from "./notificationTemplates";
  
  /**
   * TODO:
   * Replace with UUID implementation
   * when project-wide ID strategy is finalized.
   */
  function generateId() {
    return `notif_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 9)}`;
  }
  
  /**
   * Create a complete notification object.
   *
   * @param {Object} params
   * @param {string} params.eventType
   * @param {string} params.userId
   * @param {Object} params.payload
   *
   * @returns {Object}
   */
  export function createNotification({
    eventType,
    userId,
    payload = {}
  }) {
  
    if (!eventType) {
      throw new Error(
        "[M12 NotificationFactory] eventType is required."
      );
    }
  
    if (!userId) {
      throw new Error(
        "[M12 NotificationFactory] userId is required."
      );
    }
  
    const template = resolveTemplate(
      eventType,
      payload
    );
  
    return {
  
      id: generateId(),
  
      userId,
  
      title: template.title,
  
      message: template.message,
  
      category: template.category,
  
      priority: template.priority,
  
      status: STATUS.UNREAD,
  
      createdAt: new Date().toISOString(),
  
      readAt: null
  
    };
  }