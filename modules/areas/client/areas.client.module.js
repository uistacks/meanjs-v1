(function (app) {
  'use strict';

  app.registerModule('areas', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('areas.admin', ['core.admin']);
  app.registerModule('areas.admin.routes', ['core.admin.routes']);
  app.registerModule('areas.services');
  app.registerModule('areas.routes', ['ui.router', 'core.routes', 'areas.services']);
}(ApplicationConfiguration));
