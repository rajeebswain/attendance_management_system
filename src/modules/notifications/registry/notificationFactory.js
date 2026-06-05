/*
==================================================
Module: M12 Notifications
Submodule: Factory
Feature: Notification Factory
Change ID: M12-005
Status: Active
Purpose: Build notification templates
Architecture: Factory Pattern
Risk: Low
Rollback: Remove factory
==================================================
*/

export function buildNotification(
    eventType,
    metadata = {}
) {

    switch (eventType) {

        case "leave.submitted":

            return {

                title: "Leave Submitted",

                message:
                    `Leave request submitted for ${metadata.leaveType}`,

                notification_type:
                    "info"

            };

        case "leave.approved":

            return {

                title: "Leave Approved",

                message:
                    `Your ${metadata.leaveType} leave has been approved`,

                notification_type:
                    "success"

            };

        case "leave.rejected":

            return {

                title: "Leave Rejected",

                message:
                    `Your ${metadata.leaveType} leave has been rejected`,

                notification_type:
                    "error"

            };

        default:

            return {

                title: "Notification",

                message:
                    "New notification received",

                notification_type:
                    "info"

            };

    }

}