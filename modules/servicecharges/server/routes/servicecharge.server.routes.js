'use strict';

/**
 * Module dependencies
 */
var servicechargesPolicy = require('../policies/servicecharges.server.policy'),
  servicecharges = require('../controllers/servicecharges.server.controller');

module.exports = function (app) {
  // Servicecharges collection routes
  app.route('/api/servicecharges').all(servicechargesPolicy.isAllowed)
    .get(servicecharges.list)
    .post(servicecharges.create);

  // Single servicecharge routes
  app.route('/api/servicecharges/:servicechargeId').all(servicechargesPolicy.isAllowed)
    .get(servicecharges.read)
    .put(servicecharges.update)
    .delete(servicecharges.delete);

  // Finish by binding the servicecharge middleware
  app.param('servicechargeId', servicecharges.servicechargeByID);
};
