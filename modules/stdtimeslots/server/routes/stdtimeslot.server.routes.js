'use strict';

/**
 * Module dependencies
 */
var stdtimeslotsPolicy = require('../policies/stdtimeslots.server.policy'),
  stdtimeslots = require('../controllers/stdtimeslots.server.controller');

module.exports = function (app) {
  // Stdtimeslots collection routes
  app.route('/api/stdtimeslots').all(stdtimeslotsPolicy.isAllowed)
    .get(stdtimeslots.list)
    .post(stdtimeslots.create);

  // Single stdtimeslot routes
  app.route('/api/stdtimeslots/:stdtimeslotId').all(stdtimeslotsPolicy.isAllowed)
    .get(stdtimeslots.read)
    .put(stdtimeslots.update)
    .delete(stdtimeslots.delete);



  // Finish by binding the stdtimeslot middleware
  app.param('stdtimeslotId', stdtimeslots.stdtimeslotByID);
};
