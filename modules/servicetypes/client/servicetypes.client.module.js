(function (app) {
  'use strict';

  app.registerModule('servicetypes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('servicetypes.admin', ['core.admin']);
  app.registerModule('servicetypes.admin.routes', ['core.admin.routes']);
  app.registerModule('servicetypes.services');
  app.registerModule('servicetypes.routes', ['ui.router', 'core.routes', 'servicetypes.services']);
}(ApplicationConfiguration));
