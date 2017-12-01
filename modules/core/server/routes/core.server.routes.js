'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define Admin Login
  app.route('/admin/login').get(core.renderAdminLogin);

  // Define application route
  app.route('/admin(*|[/])').get(core.renderAdminIndex);

  
    //define application dashbord routes
  app.route('/dashboard/*').get(core.renderUserDashboardIndex);
  app.route('/settings/*').get(core.renderUserDashboardIndex);
  app.route('/book/jobs/*').get(core.renderUserDashboardIndex);
  
    // Define application route
  app.route('/*').get(core.renderIndex);
};
