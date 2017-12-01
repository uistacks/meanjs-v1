'use strict';

/**
 * Module dependencies
 */
var bookingtimeslotsPolicy = require('../policies/bookingtimeslots.server.policy'),
  bookingtimeslots = require('../controllers/bookingtimeslots.server.controller');

module.exports = function (app) {
  // Bookingtimeslots collection routes
  app.route('/api/bookingtimeslots').all(bookingtimeslotsPolicy.isAllowed)
    .get(bookingtimeslots.list)
    .post(bookingtimeslots.create);

  // Single bookingtimeslot routes
  app.route('/api/bookingtimeslots/:bookingtimeslotId').all(bookingtimeslotsPolicy.isAllowed)
    .get(bookingtimeslots.read)
    .put(bookingtimeslots.update)
    .delete(bookingtimeslots.delete);
  
 app.route('/api/book-service/area/').post(bookingtimeslots.getAreaTimeSlots)

  // Finish by binding the bookingtimeslot middleware
  app.param('bookingtimeslotId', bookingtimeslots.bookingtimeslotByID);
};
