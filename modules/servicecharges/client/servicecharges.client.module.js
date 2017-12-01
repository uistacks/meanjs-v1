(function (app) {
  'use strict';

  app.registerModule('servicecharges', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('servicecharges.admin', ['core.admin']);
  app.registerModule('servicecharges.admin.routes', ['core.admin.routes']);
  app.registerModule('servicecharges.services');
  app.registerModule('servicecharges.routes', ['ui.router', 'core.routes', 'servicecharges.services']);
}(ApplicationConfiguration));
