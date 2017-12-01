'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Globalsetting = mongoose.model('Globalsetting'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an globalsetting
 */
exports.create = function (req, res) {
  var globalsetting = new Globalsetting(req.body);
  globalsetting.user = req.user;

  globalsetting.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(globalsetting);
    }
  });
};

/**
 * Show the current globalsetting
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var globalsetting = req.globalsetting ? req.globalsetting.toJSON() : {};

  // Add a custom field to the Globalsetting, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Globalsetting model.
  globalsetting.isCurrentUserOwner = !!(req.user && globalsetting.user && globalsetting.user._id.toString() === req.user._id.toString());

  res.json(globalsetting);
};

/**
 * Update an globalsetting
 */
exports.update = function (req, res) {
  var globalsetting = req.globalsetting;

  globalsetting.title = req.body.title;
  globalsetting.content = req.body.content;

  globalsetting.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(globalsetting);
    }
  });
};

/**
 * Delete an globalsetting
 */
exports.delete = function (req, res) {
  var globalsetting = req.globalsetting;

  globalsetting.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(globalsetting);
    }
  });
};

/**
 * List of Globalsettings
 */
exports.list = function (req, res) {
  Globalsetting.find().sort('-created').populate('user', 'displayName').exec(function (err, globalsettings) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(globalsettings);
    }
  });
};

/**
 * Globalsetting middleware
 */
exports.globalsettingByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Globalsetting is invalid'
    });
  }

  Globalsetting.findById(id).populate('user', 'displayName').exec(function (err, globalsetting) {
    if (err) {
      return next(err);
    } else if (!globalsetting) {
      return res.status(404).send({
        message: 'No globalsetting with that identifier has been found'
      });
    }
    req.globalsetting = globalsetting;
    next();
  });
};
