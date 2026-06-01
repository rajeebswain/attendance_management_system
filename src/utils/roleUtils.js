export const isAdmin = (

    userRole
  
  ) => {
  
    return userRole === "admin";
  };
  
  
  
  export const isHR = (
  
    userRole
  
  ) => {
  
    return userRole === "hr";
  };
  
  
  
  export const isSupervisor = (
  
    userRole
  
  ) => {
  
    return userRole === "manager";
  };
  
  
  
  export const isEmployee = (
  
    userRole
  
  ) => {
  
    return userRole === "employee";
  };
