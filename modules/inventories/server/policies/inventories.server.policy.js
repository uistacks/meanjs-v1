'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke inventories Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/inventories',
      permissions: '*'
    }, {
      resources: '/api/inventories/:inventoryId',
      permissions: '*'
    }]
  },
  {
    roles: ['mastercontroller'],
    allows: [{
      resources: '/api/inventories',
      permissions: '*'
    }, {
      resources: '/api/inventories/:inventoryId',
      permissions: '*'
    }]
  },
  {
    roles: ['areamanager'],
    allows: [{
      resources: '/api/inventories',
      permissions: '*'
    }, {
      resources: '/api/inventories/:inventoryId',
      permissions: '*'
    }]
  },
  {
    roles: ['subadmin'],
    allows: [{
      resources: '/api/inventories',
      permissions: '*'
    }, {
      resources: '/api/inventories/:inventoryId',
      permissions: '*'
    }]
  },
  {
    roles: ['controller'],
    allows: [{
      resources: '/api/inventories',
      permissions: '*'
    }, {
      resources: '/api/inventories/:inventoryId',
      permissions: '*'
    }]
  }
        , {
    roles: ['user'],
    allows: [{
      resources: '/api/inventories',
      permissions: ['get']
    }, {
      resources: '/api/inventories/:inventoryId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/inventories',
      permissions: ['get']
    }, {
      resources: '/api/inventories/:inventoryId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Inventories Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an inventory is being processed and the current user created it then allow any manipulation
  if (req.inventory && req.user && req.inventory.user && req.inventory.user.id === req.user.id) {
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
