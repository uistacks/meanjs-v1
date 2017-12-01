(function (app) {
  'use strict';

  app.registerModule('emailtemplates', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('emailtemplates.admin', ['core.admin']);
  app.registerModule('emailtemplates.admin.routes', ['core.admin.routes']);
  app.registerModule('emailtemplates.services');
  app.registerModule('emailtemplates.routes', ['ui.router', 'core.routes', 'emailtemplates.services']);
}(ApplicationConfiguration));
