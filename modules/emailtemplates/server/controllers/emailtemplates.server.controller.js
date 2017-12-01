'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Emailtemplate = mongoose.model('Emailtemplate'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an emailtemplate
 */
exports.create = function (req, res) {
  var emailtemplate = new Emailtemplate(req.body);
  emailtemplate.user = req.user;

  emailtemplate.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emailtemplate);
    }
  });
};

/**
 * Show the current emailtemplate
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var emailtemplate = req.emailtemplate ? req.emailtemplate.toJSON() : {};

  // Add a custom field to the Emailtemplate, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Emailtemplate model.
  emailtemplate.isCurrentUserOwner = !!(req.user && emailtemplate.user && emailtemplate.user._id.toString() === req.user._id.toString());

  res.json(emailtemplate);
};

/**
 * Update an emailtemplate
 */
exports.update = function (req, res) {
  var emailtemplate = req.emailtemplate;

  emailtemplate.title = req.body.title;
  emailtemplate.content = req.body.content;
  emailtemplate.smsText = req.body.smsText;
  emailtemplate.slug = req.body.slug;

  emailtemplate.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emailtemplate);
    }
  });
};

/**
 * Delete an emailtemplate
 */
exports.delete = function (req, res) {
  var emailtemplate = req.emailtemplate;

  emailtemplate.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emailtemplate);
    }
  });
};

/**
 * List of Emailtemplates
 */
exports.list = function (req, res) {
  Emailtemplate.find().sort('-created').populate('user', 'displayName').exec(function (err, emailtemplates) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emailtemplates);
    }
  });
};

/**
 * Emailtemplate middleware
 */
exports.emailtemplateByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Email Template is invalid'
    });
  }

  Emailtemplate.findById(id).populate('user', 'displayName').exec(function (err, emailtemplate) {
    if (err) {
      return next(err);
    } else if (!emailtemplate) {
      return res.status(404).send({
        message: 'No email template with that identifier has been found'
      });
    }
    req.emailtemplate = emailtemplate;
    next();
  });
};
