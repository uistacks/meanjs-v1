'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config'));

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      serviceSkills: req.user.serviceSkills,
      area: req.user.area,
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData,
      mobileNo: req.user.mobileNo,
      tech_status: req.user.tech_status
    };
  }

  res.render('modules/core/server/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });
};

/**
 * Render the user dashboard page
 */
exports.renderUserDashboardIndex = function (req, res) {
  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData,
      mobileNo: req.user.mobileNo,
      serviceSkills: req.user.serviceSkills,
      area: req.user.area,
      tech_status: req.user.tech_status
    };
  }

  res.render('modules/core/server/views/user-dashboard-index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });
};

/**
 * Render the main application page
 */
exports.renderAdminIndex = function (req, res) {
  var safeUserObject = null;
  
  if (req.user) {
    if (req.user.roles[0] !== 'user') {
      safeUserObject = {
        _id: req.user._id,
        displayName: validator.escape(req.user.displayName),
        provider: validator.escape(req.user.provider),
        username: validator.escape(req.user.username),
        created: req.user.created.toString(),
        roles: req.user.roles,
        area: req.user.area,
        profileImageURL: req.user.profileImageURL,
        email: validator.escape(req.user.email),
        lastName: validator.escape(req.user.lastName),
        firstName: validator.escape(req.user.firstName),
        additionalProvidersData: req.user.additionalProvidersData,
        tech_status: req.user.tech_status
      };
      res.render('modules/core/server/views/admin-index', {
        user: JSON.stringify(safeUserObject),
        sharedConfig: JSON.stringify(config.shared)
      });
    } else {
      res.redirect('/forbidden');
    }
  } else {
    res.redirect('/admin/login');
  }
};

/**
 * Render Admin Login
 */
exports.renderAdminLogin = function(req, res) {

  if (req.user) {
    if (req.user.roles[0] !== 'user') {
      res.redirect('/admin/');
    } else {
      res.redirect('/forbidden');
    }
  }
  res.render('modules/core/server/views/admin-login', {
    sharedConfig: JSON.stringify(config.shared)
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
