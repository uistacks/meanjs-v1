'use strict';

/**
 * Module dependencies
 */
var contentpagesPolicy = require('../policies/contentpages.server.policy'),
  contentpages = require('../controllers/contentpages.server.controller');

module.exports = function (app) {
  // Contentpages collection routes
  app.route('/api/contentpages').all(contentpagesPolicy.isAllowed)
    .get(contentpages.list)
    .post(contentpages.create);

  // Single contentpage routes
  app.route('/api/contentpages/:contentpageId').all(contentpagesPolicy.isAllowed)
    .get(contentpages.read)
    .put(contentpages.update)
    .delete(contentpages.delete);

  // Finish by binding the contentpage middleware
  app.param('contentpageId', contentpages.contentpageByID);
};
