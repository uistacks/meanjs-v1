'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Skill = mongoose.model('Skill'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an skill
 */
exports.create = function (req, res) {
  var skill = new Skill(req.body);
  skill.user = req.user;

  skill.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skill);
    }
  });
};

/**
 * Show the current skill
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var skill = req.skill ? req.skill.toJSON() : {};

  // Add a custom field to the Skill, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Skill model.
  skill.isCurrentUserOwner = !!(req.user && skill.user && skill.user._id.toString() === req.user._id.toString());

  res.json(skill);
};

/**
 * Update an skill
 */
exports.update = function (req, res) {
  var skill = req.skill;

  skill.title = req.body.title;
  skill.content = req.body.content;

  skill.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skill);
    }
  });
};

/**
 * Delete an skill
 */
exports.delete = function (req, res) {
  var skill = req.skill;

  skill.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skill);
    }
  });
};

/**
 * List of Skills
 */
exports.list = function (req, res) {
  Skill.find().sort('-created').populate('user', 'displayName').exec(function (err, skills) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skills);
    }
  });
};

/**
 * Skill middleware
 */
exports.skillByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Skill is invalid'
    });
  }

  Skill.findById(id).populate('user', 'displayName').exec(function (err, skill) {
    if (err) {
      return next(err);
    } else if (!skill) {
      return res.status(404).send({
        message: 'No skill with that identifier has been found'
      });
    }
    req.skill = skill;
    next();
  });
};
