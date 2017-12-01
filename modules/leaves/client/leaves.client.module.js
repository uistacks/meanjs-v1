(function (app) {
  'use strict';

  app.registerModule('leaves', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('leaves.admin', ['core.admin']);
  app.registerModule('leaves.admin.routes', ['core.admin.routes']);
  app.registerModule('leaves.services');
  app.registerModule('leaves.routes', ['ui.router', 'core.routes', 'leaves.services']);
}(ApplicationConfiguration));
