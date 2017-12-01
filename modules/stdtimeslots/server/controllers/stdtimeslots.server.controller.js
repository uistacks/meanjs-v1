'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Stdtimeslot = mongoose.model('Stdtimeslot'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an stdtimeslot
 */
exports.create = function (req, res) {
  var stdtimeslot = new Stdtimeslot(req.body);
  stdtimeslot.user = req.user;
  stdtimeslot.area = req.area;
  stdtimeslot.from_time = req.from;
  stdtimeslot.to_time = req.to;
  

  stdtimeslot.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(stdtimeslot);
    }
  });
};

/**
 * Show the current stdtimeslot
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var stdtimeslot = req.stdtimeslot ? req.stdtimeslot.toJSON() : {};

  // Add a custom field to the Stdtimeslot, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Stdtimeslot model.
  stdtimeslot.isCurrentUserOwner = !!(req.user && stdtimeslot.user && stdtimeslot.user._id.toString() === req.user._id.toString());

  res.json(stdtimeslot);
};

/**
 * Update an stdtimeslot
 */
exports.update = function (req, res) {
  var stdtimeslot = req.stdtimeslot;

  stdtimeslot.title = req.body.title;
  stdtimeslot.from_time = req.body.from;
  stdtimeslot.to_time = req.body.to;

  stdtimeslot.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(stdtimeslot);
    }
  });
};

/**
 * Delete an stdtimeslot
 */
exports.delete = function (req, res) {
  var stdtimeslot = req.stdtimeslot;

  stdtimeslot.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(stdtimeslot);
    }
  });
};

/**
 * List of Stdtimeslots
 */
exports.list = function (req, res) {
  Stdtimeslot.find().sort('-created').populate('user', 'displayName').exec(function (err, stdtimeslots) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(stdtimeslots);
    }
  });
};

/**
 * Stdtimeslot middleware
 */
exports.stdtimeslotByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Stdtimeslot is invalid'
    });
  }

  Stdtimeslot.findById(id).populate('user', 'displayName').exec(function (err, stdtimeslot) {
    if (err) {
      return next(err);
    } else if (!stdtimeslot) {
      return res.status(404).send({
        message: 'No stdtimeslot with that identifier has been found'
      });
    }
    req.stdtimeslot = stdtimeslot;
    next();
  });
};
