'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Servicesubtype = mongoose.model('Servicesubtype'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an servicesubtype
 */
exports.create = function (req, res) {
  var servicesubtype = new Servicesubtype(req.body);
  servicesubtype.user = req.user;

  servicesubtype.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicesubtype);
    }
  });
};

/**
 * Show the current servicesubtype
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var servicesubtype = req.servicesubtype ? req.servicesubtype.toJSON() : {};

  // Add a custom field to the Servicesubtype, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Servicesubtype model.
  servicesubtype.isCurrentUserOwner = !!(req.user && servicesubtype.user && servicesubtype.user._id.toString() === req.user._id.toString());

  res.json(servicesubtype);
};

/**
 * Update an servicesubtype
 */
exports.update = function (req, res) {
  var servicesubtype = req.servicesubtype;

  servicesubtype.title = req.body.title;
  servicesubtype.content = req.body.content;
  servicesubtype.area = req.body.area;
  servicesubtype.servicetype = req.body.servicetype;
  servicesubtype.servicesubtype = req.body.servicesubtype;

  servicesubtype.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicesubtype);
    }
  });
};

/**
 * Delete an servicesubtype
 */
exports.delete = function (req, res) {
  var servicesubtype = req.servicesubtype;

  servicesubtype.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicesubtype);
    }
  });
};

/**
 * List of Servicesubtypes
 */
exports.list = function (req, res) {
  Servicesubtype.find().sort('-created').populate('user', 'displayName').exec(function (err, servicesubtypes) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(servicesubtypes);
    }
  });
};

/**
 * Servicesubtype middleware
 */
exports.servicesubtypeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Servicesubtype is invalid'
    });
  }

  Servicesubtype.findById(id).populate('user', 'displayName').exec(function (err, servicesubtype) {
    if (err) {
      return next(err);
    } else if (!servicesubtype) {
      return res.status(404).send({
        message: 'No servicesubtype with that identifier has been found'
      });
    }
    req.servicesubtype = servicesubtype;
    next();
  });
};
