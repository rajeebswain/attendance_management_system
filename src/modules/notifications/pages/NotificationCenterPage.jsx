// /*
// ==================================================
// Module: M12 Notifications
// Submodule: Notification Center
// Feature: Notification Center Page
// Change ID: M12-008
// Status: Active
// Purpose: Notification Center container page
// Architecture: Page Container
// Risk: Low
// Rollback: Remove page
// ==================================================
// */

// function NotificationCenterPage() {

//   return (
//     <div>

//       <h1>
//         Notifications
//       </h1>

//       {/* Future Components */}

//       {/* NotificationFilter */}

//       {/* NotificationList */}

//       {/* NotificationEmptyState */}

//       {/* NotificationBell Integration */}

//     </div>
//   );

// }

// export default NotificationCenterPage;

// function NotificationCenterPage() {

//     return (
//       <div>
//         <h1>Notifications</h1>
//       </div>
//     );
  
//   }
  
//   export default NotificationCenterPage;

  import NotificationItem
from "../components/NotificationItem";

function NotificationCenterPage() {

  return (

    <div>

      <h1>
        Notifications
      </h1>

      <NotificationItem

        title="Leave Approved"

        message="Your leave request has been approved."

        category="leave"

        status="unread"

        createdAt="2026-06-05"

      />

    </div>

  );

}

export default NotificationCenterPage;