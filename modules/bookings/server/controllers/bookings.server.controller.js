'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  async = require('async'),
  ObjectId = require('mongoose').Types.ObjectId,
  Booking = mongoose.model('Booking'),
  Estimation = mongoose.model('Estimation'),
  RejectReason = mongoose.model('RejectReason'),
  AdditionalHoursEstimationInventory = mongoose.model('AdditionalHoursEstimationInventory'),
  EstimationInventory = mongoose.model('EstimationInventory'),
  AdditionalHoursEstimation = mongoose.model('AdditionalHoursEstimation'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an booking
 */
exports.create = function (req, res) {
  var booking = new Booking(req.body);
  booking.user = req.user;

  booking.content = {type: 'Polygon', coordinates: req.body.content};

  booking.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(booking);
    }
  });
};

/**
 * Function to book service
 */

exports.bookService = function (req, res) {
  var user = req.user;
  var location = {
    type: 'Point',
    coordinates: [
      req.body.cords.long,
      req.body.cords.lat
    ]
  }

  var booking = new Booking(req.body);
  booking.workDescription = req.body.workDescription;
  booking.address = req.body.address;
  booking.serviceType = req.body.serviceType;
  booking.servicetype = req.body.servicetype;
  booking.bookServiceType = req.body.bookService;
  booking.location = location;
  booking.technician = req.body.tech_id;
  booking.user = user._id;
  booking.area = req.body.area;
  booking.service = req.body.service;

  booking.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(booking);
    }
  });

};


/**
 * Function to submitAcceptEstimation
 */
exports.submitAcceptEstimation = function (req, res) {
  async.waterfall([
    function (callback) {
      Estimation.findOne({_id: req.body.estimation_id}, function (err, estimation) {
        if (!estimation) {
          // do your updates here
        } else {
          estimation.status = 'accepted';
          estimation.save(function (err, estimation) {
            callback(err, estimation);
          });
        }
      });
    },
    function (estimation, callback) {
      Booking.findOne({_id: estimation.booking_id}, function (err, booking) {
        if (!booking) {
          // return next(new Error('Could not load Document'));
        }
        else {
          // do your updates here
          booking.status = 'estimationapproved';
          booking.save(function (err) {
            callback(err, 'done');
          });
        }
      });
    }
  ], function (err, result) {
    console.log('result' + result);
    res.json({result: result});
  });
};

/**
 * Function to rejectAdditionalEstimation
 */

exports.rejectAdditionalEstimation = function (req, res) {
  async.waterfall([
    function (callback) {
      AdditionalHoursEstimation.findOne({_id: req.body.additionalId }).populate('estimation').exec(function (err, additionalHoursEstimation) {
        additionalHoursEstimation.status = 'rejected';
        additionalHoursEstimation.save(function (err, additionalHoursEstimation) {
          callback(err, additionalHoursEstimation);
        });
      });
    },
    function (additionalHoursEstimation, callback) {
      Booking.findOne({_id: additionalHoursEstimation.estimation.booking_id }).exec(function (err, booking) {
        booking.additional_status = 'rejected';
        booking.save(function (err, booking) {
          callback(err, booking);
        });
      });
    }
  ], function (err, result) {
    res.json(result);
  });
};

/**
 * Function to acceptAdditionalEstimation
 */

exports.acceptAdditionalEstimation = function (req, res) {
  async.waterfall([
    function (callback) {
      AdditionalHoursEstimation.findOne({_id: req.body.additionalId }).populate('estimation').exec(function (err, additionalHoursEstimation) {
        additionalHoursEstimation.status = 'accepted';
        additionalHoursEstimation.save(function (err, additionalHoursEstimation) {
          callback(err, additionalHoursEstimation);
        });
      });
    },
    function (additionalHoursEstimation, callback) {
      Booking.findOne({_id: additionalHoursEstimation.estimation.booking_id }).exec(function (err, booking) {
        booking.additional_status = 'accepted';
        booking.save(function (err, booking) {
          callback(err, booking);
        });
      });
    }
  ], function (err, result) {
    res.json(result);
  });
};


/**
 * Function to submitRejectEstimation
 */

exports.submitRejectEstimation = function (req, res) {
  async.waterfall([
    function (callback) {
      var rejectreason = new RejectReason();
      rejectreason.reason = req.body.reasonType;
      rejectreason.description = req.body.description;
      rejectreason.estimation_id = req.body.estimation_id;
      rejectreason.save(function (err, rejectreason) {
        callback(err, rejectreason);
      });
    },
    function (rejectreason, callback) {
      Estimation.findOne({_id: rejectreason.estimation_id}, function (err, estimation) {
        if (!estimation) {
          // do your updates here
        }
        else {
          estimation.status = 'rejected';
          estimation.save(function (err, estimation) {
            callback(err, estimation);
          });
        }
      });

    },
    function (estimation, callback) {
      User.findOne({_id: estimation.technician}, function (err, user) {
        if (!user) {
          // return next(new Error('Could not load Document'));
        } else {
          user.tech_status = 'available';
          user.save(function (err, user) {
            callback(err, user, estimation);
          });
        }
      });
    },
    function (user, estimation, callback) {
      Booking.findOne({_id: estimation.booking_id}, function (err, booking) {
        if (!booking) {
          // return next(new Error('Could not load Document'));
        }
        else {
          // do your updates here
          booking.status = 'estimationrejected';
          booking.save(function (err) {
            callback(err, 'done');
          });
        }
      });
    }
  ], function (err, result) {
    console.log('result' + result);
    res.json({result: result});
  });
};

/**
 * Function to send estimation
 */

exports.sendEstimation = function (req, res, next) {
  var user = req.user;


  Booking.findOne({_id: req.body.booking_id}, function (err, booking) {
    if (!booking)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      booking.status = 'estimationpending';

      booking.save(function (err) {
        if (err)
          res.json(err);

      });
    }
  });

  var estimation = new Estimation(req.body);
  estimation.requiredHours = req.body.requiredHours;
  estimation.requiredMinutes = req.body.requiredMinutes;
  estimation.cost = req.body.requiredCost;
  estimation.technician = req.body.technician;
  estimation.booking_id = req.body.booking_id;

  estimation.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {

      req.body.inventoryData.forEach(function (item, index) {
        var estimationInventory = new EstimationInventory();
        estimationInventory.quantity = item.qty;
        estimationInventory.inventory_id = item._id;
        estimationInventory.estimation_id = estimation._id;

        estimationInventory.save(function (err) {
          if (err) {
            return res.status(422).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            estimation.estimationinventory.push(estimationInventory._id);
          }
        });
      });

      setTimeout(function () {
        estimation.save(function (error) {
          console.log("saved");
          res.json(estimation);
        });
      }, 1500);
    }
  });

};

/**
 * Function to send additional hours estimation
 */

exports.submitAdditionalHours = function (req, res, next) {

  async.waterfall([
    function (callback) {
      Booking.findOne({_id: req.body.booking_id}, function (err, booking) {

        booking.additional_status = 'pending';
        booking.save(function (err, booking) {
          callback(err, booking);
        });

      });

    },
    function (booking, callback) {

      var additionalHoursEstimation = new AdditionalHoursEstimation(req.body);
      additionalHoursEstimation.requiredHours = req.body.requiredHours;
      additionalHoursEstimation.estimation = req.body.estimation_id;
      additionalHoursEstimation.save(function (err, additionalHoursEstimation) {
        callback(err, additionalHoursEstimation);
      });
    },
    function (additionalHoursEstimation, callback) {
      req.body.inventoryData.forEach(function (item, index) {
        var additionalEstimationInventory = new AdditionalHoursEstimationInventory();
        additionalEstimationInventory.quantity = item.qty;
        additionalEstimationInventory.inventory_id = item._id;
        additionalEstimationInventory.additionalHoursEstimation = additionalHoursEstimation._id;
        additionalEstimationInventory.save(function (err) {
          if (err) {
            return res.status(422).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            additionalHoursEstimation.additionalHoursEstimationInventory.push(additionalEstimationInventory._id);
          }
        });
      });

      setTimeout(function () {
        callback(null, additionalHoursEstimation);
      }, 1000);
    },
    function (additionalHoursEstimation, callback) {
      additionalHoursEstimation.save(function (error, additionalHoursEstimation) {
        callback(error, additionalHoursEstimation);
      });
    }
  ], function (err, result) {
    console.log(result);
    res.json({result: result});
  });


};

/**
 * Show the current booking
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var booking = req.booking ? req.booking.toJSON() : {};

  // Add a custom field to the Booking, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Booking model.
  booking.isCurrentUserOwner = !!(req.user && booking.user && booking.user._id.toString() === req.user._id.toString());

  res.json(booking);
};

/**
 * change Booking status
 */
exports.changeBookingStatus = function (req, res) {
// update booking document data
  var resBooking, resUser;
  Booking.findOne({_id: req.body.job_id}, function (err, booking) {
    if (!booking)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      booking.status = req.body.status;

      booking.save(function (err) {
        if (err)
          res.json(err)
        else {
          resBooking = booking;
          //update user status
          var status = ['available', 'ontheway', 'estimation', 'onjob'];

          if (status.indexOf(req.body.status) != -1) {
            User.findOne({_id: req.user._id}, function (err, user) {
              if (!user)
                return next(new Error('Could not load Document'));
              else {
                // do your updates here
                user.status = req.body.status;
                user.save(function (err) {
                  if (err) {
                    res.json(err)
                  }
                  else {
                    res.json({booking: resBooking, user: user});
                  }


                });
              }
            });
          } else {
            res.json({booking: resBooking});
          }
        }
      });
    }
  });


};
/**
 * Update an booking
 */
exports.update = function (req, res) {
  var booking = req.booking;

  booking.title = req.body.title;
  booking.user = req.user;


  if (typeof req.body.stdtime === "undefined") {
    booking.content = {type: 'Polygon', coordinates: req.body.content};
  } else {
    booking.from_time = req.body.from_time;
    booking.to_time = req.body.to_time;
  }
  booking.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(booking);
    }
  });
};


exports.getUserBooking = function (req, res) {


  var booking_id = req.booking_id;

  var data = Booking.find({_id: booking_id});

//  console.log(data);

};


exports.getEstimation = function (req, res) {

  var booking_id = req.body.booking_id;
  async.waterfall([
    function (callback) {
      Estimation.findOne({booking_id: booking_id}).populate({
        path: 'estimationinventory',
        populate: {path: 'inventory_id'}
      }).exec(function (err, estimation) {
        callback(err, estimation);
      });
    }, function (estimation, callback) {
      var id = mongoose.Types.ObjectId(estimation._id);
      AdditionalHoursEstimation.find({estimation: id}).populate({
        path: 'additionalHoursEstimationInventory',
        populate: {path: 'inventory_id'}
      })
        .exec(function (err, res) {
          callback(err, estimation, res);
        });
    }
  ], function (err, estimation, additional) {
    console.log(additional);
    console.log(estimation);

    res.json({estimation: estimation, additional: additional});
  });
};


exports.getUserServiceBooking = function (req, res) {
  Booking.findOne({
    "content": {
      "$geoIntersects": {
        "$geometry": {
          "type": "Point",
          "coordinates": [
            req.body.lat,
            req.body.long
          ]
        }
      }
    }
  }).exec(function (err, booking) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {

      res.json(booking);
    }
  });


};

exports.getJobDetail = function (req, res) {


  Booking.findOne({_id: req.body.bookingId}).populate('user', 'displayName').populate('technician').populate('service', 'title').exec(function (err, booking) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(booking);
    }
  });


};

/**
 * Delete an booking
 */
exports.delete = function (req, res) {
  var booking = req.booking;

  booking.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(booking);
    }
  });
};

/**
 * List getTechOngoingJobs
 */
exports.getTechOngoingJobs = function (req, res) {
  Booking.find({
    status: {$ne: 'completed'},
    technician: req.user._id
  }).sort('-created').populate('user', 'displayName').populate('service', 'title').exec(function (err, bookings) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bookings);
    }
  });
};


/**
 * List getUserOngoingJobs
 */
exports.getUserOngoingJobs = function (req, res) {
  Booking.find({
    status: {$ne: 'completed'},
    user: req.user._id
  }).sort('-created').populate('technician', 'displayName').populate('service', 'title').exec(function (err, bookings) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bookings);
    }
  });
};

exports.getTechCompletedJobs = function (req, res) {
  Booking.find({
    status: 'completed',
    technician: req.user._id
  }).sort('-created').populate('user', 'displayName').populate('service', 'title').exec(function (err, bookings) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bookings);
    }
  });
};

exports.getUserCompletedJobs = function (req, res) {


  Booking.find({
    status: 'completed',
    user: req.user._id
  }).sort('-created').populate('technician', 'displayName').populate('service', 'title').exec(function (err, bookings) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bookings);
    }
  });
};
/**
 * List of Bookings
 */
exports.list = function (req, res) {
  Booking.find().sort('-created').populate('user', 'displayName').exec(function (err, bookings) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bookings);
    }
  });
};

/**
 * Booking middleware
 */
exports.bookingByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Booking is invalid'
    });
  }

  Booking.findById(id).populate('user', 'displayName').exec(function (err, booking) {
    if (err) {
      return next(err);
    } else if (!booking) {
      return res.status(404).send({
        message: 'No booking with that identifier has been found'
      });
    }
    req.booking = booking;
    next();
  });
};
