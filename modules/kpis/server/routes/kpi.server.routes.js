'use strict';

/**
 * Module dependencies
 */
var kpisPolicy = require('../policies/kpis.server.policy'),
  kpis = require('../controllers/kpis.server.controller');

module.exports = function (app) {
  // Kpis collection routes
  app.route('/api/kpis').all(kpisPolicy.isAllowed)
    .get(kpis.list)
    .post(kpis.create);

  // Single kpi routes
  app.route('/api/kpis/:kpiId').all(kpisPolicy.isAllowed)
    .get(kpis.read)
    .put(kpis.update)
    .delete(kpis.delete);

  // Finish by binding the kpi middleware
  app.param('kpiId', kpis.kpiByID);
};
