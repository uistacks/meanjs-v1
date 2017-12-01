'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);
  app.route('/api/users/update-tech-location').post(users.updateTechLocation);
  app.route('/api/users/find-nearest-tech').post(users.findNearestTech);


  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
