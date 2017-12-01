(function (app) {
  'use strict';

  app.registerModule('kpis', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('kpis.admin', ['core.admin']);
  app.registerModule('kpis.admin.routes', ['core.admin.routes']);
  app.registerModule('kpis.services');
  app.registerModule('kpis.routes', ['ui.router', 'core.routes', 'kpis.services']);
}(ApplicationConfiguration));
