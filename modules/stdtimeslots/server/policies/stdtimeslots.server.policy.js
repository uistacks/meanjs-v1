'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Stdtimeslots Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/stdtimeslots',
      permissions: '*'
    }, {
      resources: '/api/stdtimeslots/:stdtimeslotId',
      permissions: '*'
    }]
  },
  {
    roles: ['mastercontroller'],
    allows: [{
      resources: '/api/stdtimeslots',
      permissions: '*'
    }, {
      resources: '/api/stdtimeslots/:stdtimeslotId',
      permissions: '*'
    }]
  },
  {
    roles: ['stdtimeslotmanager'],
    allows: [{
      resources: '/api/stdtimeslots',
      permissions: '*'
    }, {
      resources: '/api/stdtimeslots/:stdtimeslotId',
      permissions: '*'
    }]
  },
  {
    roles: ['subadmin'],
    allows: [{
      resources: '/api/stdtimeslots',
      permissions: '*'
    }, {
      resources: '/api/stdtimeslots/:stdtimeslotId',
      permissions: '*'
    }]
  },
  {
    roles: ['controller'],
    allows: [{
      resources: '/api/stdtimeslots',
      permissions: '*'
    }, {
      resources: '/api/stdtimeslots/:stdtimeslotId',
      permissions: '*'
    }]
  },
        {
    roles: ['user'],
    allows: [{
      resources: '/api/stdtimeslots',
      permissions: ['get']
    }, {
      resources: '/api/stdtimeslots/:stdtimeslotId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/stdtimeslots',
      permissions: ['get']
    }, {
      resources: '/api/stdtimeslots/:stdtimeslotId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Stdtimeslots Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an stdtimeslot is being processed and the current user created it then allow any manipulation
  if (req.stdtimeslot && req.user && req.stdtimeslot.user && req.stdtimeslot.user.id === req.user.id) {
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
