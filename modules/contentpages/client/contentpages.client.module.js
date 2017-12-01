(function (app) {
  'use strict';

  app.registerModule('contentpages', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('contentpages.admin', ['core.admin']);
  app.registerModule('contentpages.admin.routes', ['core.admin.routes']);
  app.registerModule('contentpages.services');
  app.registerModule('contentpages.routes', ['ui.router', 'core.routes', 'contentpages.services']);
}(ApplicationConfiguration));
