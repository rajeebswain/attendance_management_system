
import { Navigate }

from "react-router-dom";

const ProtectedRoute = ({

  children,

  allowedRoles = [],

  userRole

}) => {

  if (

    !allowedRoles.includes(

      userRole

    )

  ) {

    return (

      <Navigate

        to="/attendance"

      />

    );

  }

  return children;
};

export default ProtectedRoute;