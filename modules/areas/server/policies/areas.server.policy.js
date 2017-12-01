'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Areas Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/areas',
      permissions: '*'
    }, {
      resources: '/api/areas/:areaId',
      permissions: '*'
    }]
  },
  {
    roles: ['mastercontroller'],
    allows: [{
      resources: '/api/areas',
      permissions: '*'
    }, {
      resources: '/api/areas/:areaId',
      permissions: '*'
    }]
  },
  {
    roles: ['areamanager'],
    allows: [{
      resources: '/api/areas',
      permissions: '*'
    }, {
      resources: '/api/areas/:areaId',
      permissions: '*'
    }, {
      resources: '/api/user/area/detail',
      permissions: '*'
    }]
  },
  {
    roles: ['subadmin'],
    allows: [{
      resources: '/api/areas',
      permissions: '*'
    }, {
      resources: '/api/areas/:areaId',
      permissions: '*'
    }]
  },
  {
    roles: ['controller'],
    allows: [{
      resources: '/api/areas',
      permissions: '*'
    }, {
      resources: '/api/areas/:areaId',
      permissions: '*'
    }]
  },
        {
    roles: ['user'],
    allows: [{
      resources: '/api/areas',
      permissions: ['get']
    }, {
      resources: '/api/areas/:areaId',
      permissions: ['get']
    }
    , {
      resources: '/api/area/get-user-service-area',
      permissions: ['*']
    }

]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/areas',
      permissions: ['get']
    }, {
      resources: '/api/areas/:areaId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Areas Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an area is being processed and the current user created it then allow any manipulation
  if (req.area && req.user && req.area.user && req.area.user.id === req.user.id) {
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
