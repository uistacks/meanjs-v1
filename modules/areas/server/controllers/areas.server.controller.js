'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Area = mongoose.model('Area'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an area
 */
exports.create = function (req, res) {
  var area = new Area(req.body);
  area.user = req.user;
  
  console.log(req.body.content);
  
  area.content = { type: 'Polygon', coordinates: req.body.content };

  area.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(area);
    }
  });
};

/**
 * Show the current area
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var area = req.area ? req.area.toJSON() : {};

  // Add a custom field to the Area, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Area model.
  area.isCurrentUserOwner = !!(req.user && area.user && area.user._id.toString() === req.user._id.toString());

  res.json(area);
};

/**
 * Update an area
 */
exports.update = function (req, res) {
  var area = req.area;

  area.title = req.body.title;
  area.user = req.user;
  
  
  if (typeof req.body.stdtime === "undefined"){
  area.content = { type: 'Polygon', coordinates: req.body.content};
  }else{
  area.from_time = req.body.from_time;
  area.to_time = req.body.to_time;    
      
  }
  area.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(area);
    }
  });
};



exports.getUserArea = function (req, res) {
  

   var area_id = req.area_id;

 var data= Area.find({_id:area_id});
  
//  console.log(data);

};


exports.getUserServiceArea = function (req, res) {
   Area.findOne({
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
}).exec(function (err, area) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
        
      res.json(area);
    }
  });



};

/**
 * Delete an area
 */
exports.delete = function (req, res) {
  var area = req.area;

  area.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(area);
    }
  });
};

/**
 * List of Areas
 */
exports.list = function (req, res) {
  Area.find().sort('-created').populate('user', 'displayName').exec(function (err, areas) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(areas);
    }
  });
};

/**
 * Area middleware
 */
exports.areaByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Area is invalid'
    });
  }

  Area.findById(id).populate('user', 'displayName').exec(function (err, area) {
    if (err) {
      return next(err);
    } else if (!area) {
      return res.status(404).send({
        message: 'No area with that identifier has been found'
      });
    }
    req.area = area;
    next();
  });
};


exports.getStandardWorkHours= function (req,res)
{
    
    Area.findById(req.body.area).exec(function (err, data) {
        if (err) {
            return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    });  
}