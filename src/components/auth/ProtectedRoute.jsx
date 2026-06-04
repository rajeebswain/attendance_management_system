
import { Navigate }
from "react-router-dom";

const ProtectedRoute = ({

children,

allowedRoles = [],

userRole

}) => {

/*
If no roles specified,
allow access
*/

if (

allowedRoles.length > 0

&&

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