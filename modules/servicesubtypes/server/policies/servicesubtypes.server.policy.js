'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Servicesubtypes Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/servicesubtypes',
      permissions: '*'
    }, {
      resources: '/api/servicesubtypes/:servicesubtypeId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/servicesubtypes',
      permissions: ['get']
    }, {
      resources: '/api/servicesubtypes/:servicesubtypeId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/servicesubtypes',
      permissions: ['get']
    }, {
      resources: '/api/servicesubtypes/:servicesubtypeId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Servicesubtypes Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an servicesubtype is being processed and the current user created it then allow any manipulation
  if (req.servicesubtype && req.user && req.servicesubtype.user && req.servicesubtype.user.id === req.user.id) {
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
