/*
==================================================
Module: M12 Notifications
Submodule: Notification Center
Feature: Notification Center Page
Change ID: M12-012
Status: Active
Purpose: Compose notification center UI
Architecture: Container Component
Risk: Low
Rollback: Restore previous page
==================================================
*/

import { useState } from "react";

import NotificationFilter
from "../components/NotificationFilter";

import NotificationItem
from "../components/NotificationItem";

import NotificationEmptyState
from "../components/NotificationEmptyState";

function NotificationCenterPage() {

  const [

    selectedCategory,

    setSelectedCategory

  ] = useState("all");

  const notifications = [

    {
      id: 1,
      title: "Leave Approved",
      message: "Your leave request has been approved.",
      category: "leave",
      status: "unread",
      createdAt: "2026-06-05"
    },

    {
      id: 2,
      title: "Attendance Correction Approved",
      message: "Your attendance correction has been approved.",
      category: "attendance",
      status: "read",
      createdAt: "2026-06-04"
    }

  ];

  const filteredNotifications =

    selectedCategory === "all"

      ? notifications

      : notifications.filter(

          (notification) =>

            notification.category ===
            selectedCategory

        );

  return (

    <div>

      <h1>
        Notifications
      </h1>

      <NotificationFilter

        selectedCategory={
          selectedCategory
        }

        onCategoryChange={
          setSelectedCategory
        }

      />

      {

        filteredNotifications.length === 0

          ? (

              <NotificationEmptyState />

            )

          : (

              filteredNotifications.map(

                (notification) => (

                  <NotificationItem

                    key={
                      notification.id
                    }

                    title={
                      notification.title
                    }

                    message={
                      notification.message
                    }

                    category={
                      notification.category
                    }

                    status={
                      notification.status
                    }

                    createdAt={
                      notification.createdAt
                    }

                  />

                )

              )

            )

      }

    </div>

  );

}

export default NotificationCenterPage;