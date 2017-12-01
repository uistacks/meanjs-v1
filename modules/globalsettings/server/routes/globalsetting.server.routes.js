'use strict';

/**
 * Module dependencies
 */
var globalsettingsPolicy = require('../policies/globalsettings.server.policy'),
  globalsettings = require('../controllers/globalsettings.server.controller');

module.exports = function (app) {
  // Globalsettings collection routes
  app.route('/api/globalsettings').all(globalsettingsPolicy.isAllowed)
    .get(globalsettings.list)
    .post(globalsettings.create);

  // Single globalsetting routes
  app.route('/api/globalsettings/:globalsettingId').all(globalsettingsPolicy.isAllowed)
    .get(globalsettings.read)
    .put(globalsettings.update)
    .delete(globalsettings.delete);

  // Finish by binding the globalsetting middleware
  app.param('globalsettingId', globalsettings.globalsettingByID);
};
