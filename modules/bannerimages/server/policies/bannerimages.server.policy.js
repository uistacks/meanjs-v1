'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Bannerimages Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/bannerimages',
      permissions: '*'
    }, {
      resources: '/api/bannerimages/:bannerimageId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/bannerimages',
      permissions: ['get']
    }, {
      resources: '/api/bannerimages/:bannerimageId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/bannerimages',
      permissions: ['get']
    }, {
      resources: '/api/bannerimages/:bannerimageId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Bannerimages Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an bannerimage is being processed and the current user created it then allow any manipulation
  if (req.bannerimage && req.user && req.bannerimage.user && req.bannerimage.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
