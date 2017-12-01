'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Servicecharge = mongoose.model('Servicecharge'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an servicecharge
 */
exports.create = function (req, res) {
  var servicecharge = new Servicecharge(req.body);
  servicecharge.user = req.user;
  servicecharge.updatedBy = req.user;

  servicecharge.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicecharge);
    }
  });
};

/**
 * Show the current servicecharge
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var servicecharge = req.servicecharge ? req.servicecharge.toJSON() : {};

  // Add a custom field to the Servicecharge, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Servicecharge model.
  servicecharge.isCurrentUserOwner = !!(req.user && servicecharge.user && servicecharge.user._id.toString() === req.user._id.toString());

  res.json(servicecharge);
};

/**
 * Update an servicecharge
 */
exports.update = function (req, res) {
  var servicecharge = req.servicecharge;

  servicecharge.area = req.body.area;
  servicecharge.service = req.body.service;
  servicecharge.monthlyCharges = req.body.monthlyCharges;
  servicecharge.weeklyCharges = req.body.weeklyCharges;
  servicecharge.hourlyCharges = req.body.hourlyCharges;
  servicecharge.updatedBy = req.user;
  servicecharge.updated = Date.now();

  servicecharge.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicecharge);
    }
  });
};

/**
 * Delete an servicecharge
 */
exports.delete = function (req, res) {
  var servicecharge = req.servicecharge;

  servicecharge.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicecharge);
    }
  });
};

/**
 * List of Servicecharges
 */
exports.list = function (req, res) {
  Servicecharge.find().sort('-created').populate('user', 'displayName').populate('area', 'title').populate('service', 'title').populate('updatedBy', 'displayName').exec(function (err, servicecharges) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicecharges);
    }
  });
};

/**
 * Servicecharge middleware
 */
exports.servicechargeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Servicecharge is invalid'
    });
  }

  Servicecharge.findById(id).populate('user', 'displayName').exec(function (err, servicecharge) {
    if (err) {
      return next(err);
    } else if (!servicecharge) {
      return res.status(404).send({
        message: 'No servicecharge with that identifier has been found'
      });
    }
    req.servicecharge = servicecharge;
    next();
  });
};
