/*
==================================================
ARCH-024
Date: 2026-05-26
Time: 20:45 IST
Status: ACTIVE

Purpose:
Central plugin rendering system

Risk:
LOW

Rollback:
Delete file
==================================================
*/

import {

    moduleRegistry
    
    }
    
    from "../config/moduleRegistry";
    
    
    function PluginRenderer({
    
    plugin,
    
    children
    
    }){
    
    if(
    
    !moduleRegistry[plugin]
    
    ?.enabled
    
    ){
    
    return null;
    
    }
    
    return children;
    
    }
    
    export default PluginRenderer;