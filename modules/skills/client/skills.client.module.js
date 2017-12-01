(function (app) {
  'use strict';

  app.registerModule('skills', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('skills.admin', ['core.admin']);
  app.registerModule('skills.admin.routes', ['core.admin.routes']);
  app.registerModule('skills.services');
  app.registerModule('skills.routes', ['ui.router', 'core.routes', 'skills.services']);
}(ApplicationConfiguration));
