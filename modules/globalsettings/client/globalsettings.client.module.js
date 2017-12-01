(function (app) {
  'use strict';

  app.registerModule('globalsettings', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('globalsettings.admin', ['core.admin']);
  app.registerModule('globalsettings.admin.routes', ['core.admin.routes']);
  app.registerModule('globalsettings.services');
  app.registerModule('globalsettings.routes', ['ui.router', 'core.routes', 'globalsettings.services']);
}(ApplicationConfiguration));
