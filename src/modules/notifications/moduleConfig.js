/**
 * M12 Notifications - Module Configuration
 * --------------------------------------------------
 * Module      : M12 Notifications
 * File        : moduleConfig.js
 * Purpose     : Registers the Notifications module with the HRMS plugin system.
 *               Follows the same registration pattern as M07 Leave Management.
 * Created     : 2026-06-05
 * Author      : HRMS Platform Team
 * --------------------------------------------------
 */
 
import notificationRoutes     from './routes';
import notificationNavigation from './navigation';
import notificationPermissions from './permissions';
 
const notificationModuleConfig = {
  id          : 'M12',
  name        : 'Notifications',
  version     : '1.0.0',
  enabled     : true,
  description : 'In-app notification center for HRMS events (leave, attendance, system).',
  routes      : notificationRoutes,
  navigation  : notificationNavigation,
  permissions : notificationPermissions,
};
 
export default notificationModuleConfig;
 