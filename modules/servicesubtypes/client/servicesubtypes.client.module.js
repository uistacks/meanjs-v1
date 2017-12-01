(function (app) {
  'use strict';

  app.registerModule('servicesubtypes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('servicesubtypes.admin', ['core.admin']);
  app.registerModule('servicesubtypes.admin.routes', ['core.admin.routes']);
  app.registerModule('servicesubtypes.services');
  app.registerModule('servicesubtypes.routes', ['ui.router', 'core.routes', 'servicesubtypes.services']);
}(ApplicationConfiguration));
