/*
==================================================
Module: M12 Notifications
Submodule: Notification Filter
Feature: Notification Category Filter
Change ID: M12-011
Status: Active
Purpose: Filter notifications by category
Architecture: Presentational Component
Risk: Low
Rollback: Remove component
==================================================
*/

function NotificationFilter({

  selectedCategory,

  onCategoryChange

}) {

  const categories = [

    "all",

    "attendance",

    "leave"

  ];

  return (

    <div>

      {

        categories.map(

          (category) => (

            <button
              key={category}
              onClick={() =>
                onCategoryChange(category)
              }
              style={{
                marginRight: "8px"
              }}
            >
              {category}
            </button>

          )

        )

      }

    </div>

  );

}

export default NotificationFilter;