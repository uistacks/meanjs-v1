(function (app) {
  'use strict';

  app.registerModule('inventories', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('inventories.admin', ['core.admin']);
  app.registerModule('inventories.admin.routes', ['core.admin.routes']);
  app.registerModule('inventories.services');
  app.registerModule('inventories.routes', ['ui.router', 'core.routes', 'inventories.services']);
}(ApplicationConfiguration));
