'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Leave = mongoose.model('Leave'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an leave
 */
exports.create = function (req, res) {
  var leave = new Leave(req.body);
  leave.user = req.user;

  leave.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(leave);
    }
  });
};

/**
 * Show the current leave
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var leave = req.leave ? req.leave.toJSON() : {};

  // Add a custom field to the Leave, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Leave model.
  leave.isCurrentUserOwner = !!(req.user && leave.user && leave.user._id.toString() === req.user._id.toString());

  res.json(leave);
};

/**
 * Update an leave
 */
exports.update = function (req, res) {
  var leave = req.leave;

  leave.title = req.body.title;
  leave.content = req.body.content;

  leave.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(leave);
    }
  });
};

/**
 * Delete an leave
 */
exports.delete = function (req, res) {
  var leave = req.leave;

  leave.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(leave);
    }
  });
};

/**
 * List of Leaves
 */
exports.list = function (req, res) {
  Leave.find().sort('-created').populate('user', 'displayName').exec(function (err, leaves) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(leaves);
    }
  });
};

/**
 * Leave middleware
 */
exports.leaveByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Leave is invalid'
    });
  }

  Leave.findById(id).populate('user', 'displayName').exec(function (err, leave) {
    if (err) {
      return next(err);
    } else if (!leave) {
      return res.status(404).send({
        message: 'No leave with that identifier has been found'
      });
    }
    req.leave = leave;
    next();
  });
};
