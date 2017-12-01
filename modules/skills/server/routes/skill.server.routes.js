'use strict';

/**
 * Module dependencies
 */
var skillsPolicy = require('../policies/skills.server.policy'),
  skills = require('../controllers/skills.server.controller');

module.exports = function (app) {
  // Skills collection routes
  app.route('/api/skills').all(skillsPolicy.isAllowed)
    .get(skills.list)
    .post(skills.create);

  // Single skill routes
  app.route('/api/skills/:skillId').all(skillsPolicy.isAllowed)
    .get(skills.read)
    .put(skills.update)
    .delete(skills.delete);

  // Finish by binding the skill middleware
  app.param('skillId', skills.skillByID);
};
