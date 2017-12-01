'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Bookings Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/bookings',
      permissions: '*'
    }, {
      resources: '/api/bookings/:bookingId',
      permissions: '*'
    }]
  },
  {
    roles: ['mastercontroller'],
    allows: [{
      resources: '/api/bookings',
      permissions: '*'
    }, {
      resources: '/api/bookings/:bookingId',
      permissions: '*'
    }]
  },
  {
    roles: ['bookingmanager'],
    allows: [{
      resources: '/api/bookings',
      permissions: '*'
    }, {
      resources: '/api/bookings/:bookingId',
      permissions: '*'
    }, {
      resources: '/api/user/booking/detail',
      permissions: '*'
    }]
  },
  {
    roles: ['subadmin'],
    allows: [{
      resources: '/api/bookings',
      permissions: '*'
    }, {
      resources: '/api/bookings/:bookingId',
      permissions: '*'
    }]
  },
  {
    roles: ['controller'],
    allows: [{
      resources: '/api/bookings',
      permissions: '*'
    }, {
      resources: '/api/bookings/:bookingId',
      permissions: '*'
    }]
  },
        {
    roles: ['user'],
    allows: [{
      resources: '/api/bookings',
      permissions: ['get']
    }, {
      resources: '/api/bookings/:bookingId',
      permissions: ['get']
    }
    , {
      resources: '/api/booking/get-user-service-booking',
      permissions: ['*']
    }

]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/bookings',
      permissions: ['get']
    }, {
      resources: '/api/bookings/:bookingId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Bookings Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an booking is being processed and the current user created it then allow any manipulation
  if (req.booking && req.user && req.booking.user && req.booking.user.id === req.user.id) {
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
