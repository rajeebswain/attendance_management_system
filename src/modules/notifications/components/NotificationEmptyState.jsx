/*
==================================================
Module: M12 Notifications
Submodule: Notification Empty State
Feature: Empty Notification View
Change ID: M12-010
Status: Active
Purpose: Display empty notification state
Architecture: Presentational Component
Risk: Low
Rollback: Remove component
==================================================
*/

function NotificationEmptyState() {

  return (

    <div>

      <h3>
        No Notifications Found
      </h3>

      <p>
        You currently have no notifications.
      </p>

    </div>

  );

}

export default NotificationEmptyState;