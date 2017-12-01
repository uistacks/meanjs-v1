'use strict';

/**
 * Module dependencies
 */
var bannerimagesPolicy = require('../policies/bannerimages.server.policy'),
  bannerimages = require('../controllers/bannerimages.server.controller');

module.exports = function (app) {
  // Bannerimages collection routes
//  app.route('/api/bannerimages').all(bannerimagesPolicy.isAllowed)
  app.route('/api/bannerimages')
    .get(bannerimages.list)
    .post(bannerimages.create);

  // Single bannerimage routes
  app.route('/api/bannerimages/:bannerimageId').all(bannerimagesPolicy.isAllowed)
    .get(bannerimages.read)
    .put(bannerimages.update)
    .delete(bannerimages.delete);

  // Finish by binding the bannerimage middleware
  app.param('bannerimageId', bannerimages.bannerimageByID);
};
