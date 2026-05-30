/*
==================================================
Change ID: M06-019
Date: 2026-05-26
Status: Updated
Purpose: Register module routes
Risk: Medium
Rollback: Remove routes field
==================================================
*/

import employeeSelfServiceRoutes
from "./routes";

import employeeSelfServiceNavigation
from "./navigation";

const employeeSelfServiceModule = {

id:"M06",

name:"Employee Self Service",

enabled:true,

routes:employeeSelfServiceRoutes,

navigation:employeeSelfServiceNavigation,

widgets:[],

permissions:[]

};

export default employeeSelfServiceModule;




// This one for specfic identification module name not generic one.

// const employeeSelfServiceModule = {

//     id:"M06",
    
//     name:"Employee Self Service",
    
//     enabled:true,
    
//     routes:employeeSelfServiceRoutes,
    
//     navigation:true,
    
//     widgets:true,
    
//     permissions:true
    
//     };