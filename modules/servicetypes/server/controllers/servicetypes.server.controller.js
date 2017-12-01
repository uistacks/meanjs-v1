'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Servicetype = mongoose.model('Servicetype'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an servicetype
 */
exports.create = function (req, res) {
  var servicetype = new Servicetype(req.body);
  servicetype.user = req.user;

  servicetype.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicetype);
    }
  });
};

/**
 * Show the current servicetype
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var servicetype = req.servicetype ? req.servicetype.toJSON() : {};

  // Add a custom field to the Servicetype, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Servicetype model.
  servicetype.isCurrentUserOwner = !!(req.user && servicetype.user && servicetype.user._id.toString() === req.user._id.toString());

  res.json(servicetype);
};

/**
 * Update an servicetype
 */
exports.update = function (req, res) {
  var servicetype = req.servicetype;

  servicetype.title = req.body.title;
  servicetype.content = req.body.content;
  servicetype.area = req.body.area;

  servicetype.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicetype);
    }
  });
};

/**
 * Delete an servicetype
 */
exports.delete = function (req, res) {
  var servicetype = req.servicetype;

  servicetype.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicetype);
    }
  });
};

/**
 * List of Servicetypes
 */
exports.list = function (req, res) {
  Servicetype.find().sort('-created').populate('user', 'displayName').exec(function (err, servicetypes) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicetypes);
    }
  });
};

/**
 * Servicetype middleware
 */
exports.servicetypeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Servicetype is invalid'
    });
  }

  Servicetype.findById(id).populate('user', 'displayName').exec(function (err, servicetype) {
    if (err) {
      return next(err);
    } else if (!servicetype) {
      return res.status(404).send({
        message: 'No servicetype with that identifier has been found'
      });
    }
    req.servicetype = servicetype;
    next();
  });
};
