'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Kpi = mongoose.model('Kpi'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an kpi
 */
exports.create = function (req, res) {
  var kpi = new Kpi(req.body);
  kpi.user = req.user;

  kpi.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(kpi);
    }
  });
};

/**
 * Show the current kpi
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var kpi = req.kpi ? req.kpi.toJSON() : {};

  // Add a custom field to the Kpi, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Kpi model.
  kpi.isCurrentUserOwner = !!(req.user && kpi.user && kpi.user._id.toString() === req.user._id.toString());

  res.json(kpi);
};

/**
 * Update an kpi
 */
exports.update = function (req, res) {
  var kpi = req.kpi;

  kpi.title = req.body.title;
  kpi.content = req.body.content;

  kpi.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(kpi);
    }
  });
};

/**
 * Delete an kpi
 */
exports.delete = function (req, res) {
  var kpi = req.kpi;

  kpi.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(kpi);
    }
  });
};

/**
 * List of Kpis
 */
exports.list = function (req, res) {
  Kpi.find().sort('-created').populate('user', 'displayName').exec(function (err, kpis) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(kpis);
    }
  });
};

/**
 * Kpi middleware
 */
exports.kpiByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Kpi is invalid'
    });
  }

  Kpi.findById(id).populate('user', 'displayName').exec(function (err, kpi) {
    if (err) {
      return next(err);
    } else if (!kpi) {
      return res.status(404).send({
        message: 'No kpi with that identifier has been found'
      });
    }
    req.kpi = kpi;
    next();
  });
};
