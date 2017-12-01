'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Contentpage = mongoose.model('Contentpage'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an contentpage
 */
exports.create = function (req, res) {
  var contentpage = new Contentpage(req.body);
  contentpage.user = req.user;

  contentpage.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contentpage);
    }
  });
};

/**
 * Show the current contentpage
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var contentpage = req.contentpage ? req.contentpage.toJSON() : {};

  // Add a custom field to the Contentpage, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Contentpage model.
  contentpage.isCurrentUserOwner = !!(req.user && contentpage.user && contentpage.user._id.toString() === req.user._id.toString());

  res.json(contentpage);
};

/**
 * Update an contentpage
 */
exports.update = function (req, res) {
  var contentpage = req.contentpage;

  contentpage.title = req.body.title;
  contentpage.content = req.body.content;
  contentpage.slug = req.body.slug;

  contentpage.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contentpage);
    }
  });
};

/**
 * Delete an contentpage
 */
exports.delete = function (req, res) {
  var contentpage = req.contentpage;

  contentpage.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contentpage);
    }
  });
};

/**
 * List of Contentpages
 */
exports.list = function (req, res) {
  Contentpage.find().sort('-created').populate('user', 'displayName').exec(function (err, contentpages) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contentpages);
    }
  });
};

/**
 * Contentpage middleware
 */
exports.contentpageByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Email Template is invalid'
    });
  }

  Contentpage.findById(id).populate('user', 'displayName').exec(function (err, contentpage) {
    if (err) {
      return next(err);
    } else if (!contentpage) {
      return res.status(404).send({
        message: 'No email template with that identifier has been found'
      });
    }
    req.contentpage = contentpage;
    next();
  });
};
