'use strict';

/**
 * Module dependencies
 */
var servicesubtypesPolicy = require('../policies/servicesubtypes.server.policy'),
  servicesubtypes = require('../controllers/servicesubtypes.server.controller');

module.exports = function (app) {
  // Servicesubtypes collection routes
  app.route('/api/servicesubtypes')
//  app.route('/api/servicesubtypes').all(servicesubtypesPolicy.isAllowed)
    .get(servicesubtypes.list)
    .post(servicesubtypes.create);

  // Single servicesubtype routes
//  app.route('/api/servicesubtypes/:servicesubtypeId').all(servicesubtypesPolicy.isAllowed)
  app.route('/api/servicesubtypes/:servicesubtypeId')
    .get(servicesubtypes.read)
    .put(servicesubtypes.update)
    .delete(servicesubtypes.delete);

  // Finish by binding the servicesubtype middleware
  app.param('servicesubtypeId', servicesubtypes.servicesubtypeByID);
};
