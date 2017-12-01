(function (app) {
  'use strict';

  app.registerModule('stdtimeslots', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('stdtimeslots.admin', ['core.admin']);
  app.registerModule('stdtimeslots.admin.routes', ['core.admin.routes']);
  app.registerModule('stdtimeslots.services');
  app.registerModule('stdtimeslots.routes', ['ui.router', 'core.routes', 'stdtimeslots.services']);
}(ApplicationConfiguration));
