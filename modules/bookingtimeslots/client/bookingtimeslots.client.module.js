(function (app) {
  'use strict';

  app.registerModule('bookingtimeslots', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('bookingtimeslots.admin', ['core.admin']);
  app.registerModule('bookingtimeslots.admin.routes', ['core.admin.routes']);
  app.registerModule('bookingtimeslots.services');
  app.registerModule('bookingtimeslots.routes', ['ui.router', 'core.routes', 'bookingtimeslots.services']);
}(ApplicationConfiguration));
