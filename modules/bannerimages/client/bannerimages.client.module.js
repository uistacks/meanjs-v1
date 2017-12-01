(function (app) {
  'use strict';

  app.registerModule('bannerimages', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('bannerimages.admin', ['core.admin']);
  app.registerModule('bannerimages.admin.routes', ['core.admin.routes']);
  app.registerModule('bannerimages.services');
  app.registerModule('bannerimages.routes', ['ui.router', 'core.routes', 'bannerimages.services']);
}(ApplicationConfiguration));
