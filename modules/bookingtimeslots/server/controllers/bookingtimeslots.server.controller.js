'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Bookingtimeslot = mongoose.model('Bookingtimeslot'),
  async = require('async'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an bookingtimeslot
 */
exports.create = function (req, res) {

  async.waterfall([function(callback) {
    Bookingtimeslot.find({ area: req.body.area }).exec(function(err, foundBookingSlot) {

      if (err) {
        callback(err);
      }

      var bookingtimeslot;

      if (foundBookingSlot.length > 0) {
        bookingtimeslot = foundBookingSlot[0];
        bookingtimeslot.minDuration = req.body.minDuration;
        bookingtimeslot.minDurationType = req.body.minDurationType;
      } else {
        bookingtimeslot = new Bookingtimeslot(req.body);
      }
      callback(null, bookingtimeslot);
    });
  },
    function(bookingTimeSlot, callback) {

      bookingTimeSlot.user = req.user;
      bookingTimeSlot.updatedBy = req.user;
      bookingTimeSlot.save(function (err) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(bookingTimeSlot);
        }
      });
    }
  ]);
};


exports.getAreaTimeSlots= function (req,res)
{
    Bookingtimeslot.findOne({area: req.body.area}).exec(function (err, data) {
        if (err) {
            return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    });  
}
/**
 * Show the current bookingtimeslot
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bookingtimeslot = req.bookingtimeslot ? req.bookingtimeslot.toJSON() : {};

  // Add a custom field to the Bookingtimeslot, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Bookingtimeslot model.
  bookingtimeslot.isCurrentUserOwner = !!(req.user && bookingtimeslot.user && bookingtimeslot.user._id.toString() === req.user._id.toString());

  res.json(bookingtimeslot);
};

/**
 * Update an bookingtimeslot
 */
exports.update = function (req, res) {
  var bookingtimeslot = req.bookingtimeslot;

  bookingtimeslot.area = req.body.area;
  bookingtimeslot.minDurationType = req.body.minDurationType;
  bookingtimeslot.minDuration = req.body.minDuration;
  bookingtimeslot.updatedBy = req.user;
  bookingtimeslot.updated = Date.now();

  bookingtimeslot.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bookingtimeslot);
    }
  });
};

/**
 * Delete an bookingtimeslot
 */
exports.delete = function (req, res) {
  var bookingtimeslot = req.bookingtimeslot;

  bookingtimeslot.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bookingtimeslot);
    }
  });
};

/**
 * List of Bookingtimeslots
 */
exports.list = function (req, res) {
  Bookingtimeslot.find().sort('-created').populate('updatedBy', 'displayName').populate('area', 'title').exec(function (err, bookingtimeslots) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bookingtimeslots);
    }
  });
};

/**
 * Bookingtimeslot middleware
 */
exports.bookingtimeslotByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Bookingtimeslot is invalid'
    });
  }

  Bookingtimeslot.findById(id).populate('user', 'displayName').exec(function (err, bookingtimeslot) {
    if (err) {
      return next(err);
    } else if (!bookingtimeslot) {
      return res.status(404).send({
        message: 'No bookingtimeslot with that identifier has been found'
      });
    }
    req.bookingtimeslot = bookingtimeslot;
    next();
  });
};
