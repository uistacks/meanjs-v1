'use strict';

/**
 * Module dependencies
 */
var emailtemplatesPolicy = require('../policies/emailtemplates.server.policy'),
  emailtemplates = require('../controllers/emailtemplates.server.controller');

module.exports = function (app) {
  // Emailtemplates collection routes
  app.route('/api/emailtemplates').all(emailtemplatesPolicy.isAllowed)
    .get(emailtemplates.list)
    .post(emailtemplates.create);

  // Single emailtemplate routes
  app.route('/api/emailtemplates/:emailtemplateId').all(emailtemplatesPolicy.isAllowed)
    .get(emailtemplates.read)
    .put(emailtemplates.update)
    .delete(emailtemplates.delete);

  // Finish by binding the emailtemplate middleware
  app.param('emailtemplateId', emailtemplates.emailtemplateByID);
};
