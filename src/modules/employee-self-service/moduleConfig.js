/*
==================================================
Change ID: M06-002
Date: 2026-05-26
Status: Updated
Purpose: Add module capabilities
Risk: Low
Rollback: Revert config
==================================================
*/

const employeeSelfServiceModule = {

    id:"M06",
    
    name:"Employee Self Service",
    
    enabled:true,
    
    routes:true,
    
    navigation:true,
    
    widgets:true,
    
    permissions:true
    
    };
    
    export default employeeSelfServiceModule;