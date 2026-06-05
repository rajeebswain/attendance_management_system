/*
==================================================
Module: M12 Notifications
Submodule: Notification Item
Feature: Notification Display
Change ID: M12-009
Status: Active
Purpose: Render a single notification
Architecture: Presentational Component
Risk: Low
Rollback: Remove component
==================================================
*/

function NotificationItem({

  title,

  message,

  category,

  status,

  createdAt

}) {

  return (

    <div>

      <h3>
        {title}
      </h3>

      <p>
        {message}
      </p>

      <div>

        <span>
          Category: {category}
        </span>

        {" | "}

        <span>
          Status: {status}
        </span>

        {" | "}

        <span>
          {createdAt}
        </span>

      </div>

    </div>

  );

}

export default NotificationItem;