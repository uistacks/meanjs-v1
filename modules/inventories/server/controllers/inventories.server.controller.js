'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Inventory = mongoose.model('Inventory'),
  Inventory = mongoose.model('Estimation'),
  Inventory = mongoose.model('Inventory'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an inventory
 */
exports.create = function (req, res) {
  var inventory = new Inventory(req.body);
  inventory.user = req.user;

  inventory.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inventory);
    }
  });
};



/**
 * Show the current inventory
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var inventory = req.inventory ? req.inventory.toJSON() : {};

  // Add a custom field to the inventory, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the inventory model.
  inventory.isCurrentUserOwner = !!(req.user && inventory.user && inventory.user._id.toString() === req.user._id.toString());

  res.json(inventory);
};

/**
 * Update an inventory
 */
exports.update = function (req, res) {
  var inventory = req.inventory;


    inventory.title = req.body.title;
    inventory.content = req.body.content;
    inventory.price = req.body.price;
    inventory.quantity = req.body.quantity;
    inventory.area = req.body.area;
    inventory.servicetype = req.body.servicetype;
  inventory.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inventory);
    }
  });
};

/**
 * Delete an inventory
 */
exports.delete = function (req, res) {
  var inventory = req.inventory;

  inventory.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inventory);
    }
  });
};

/**
 * List of getTechInventories
 */
exports.getTechInventories = function (req, res) {



  Inventory.find(req.body).sort('-created').populate('user').populate('area','title').populate('servicetype').exec(function (err, inventories) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {

      res.json(inventories);
    }
  });
};

/**
 * List of inventories
 */
exports.list = function (req, res) {


  Inventory.find().sort('-created').populate('user').populate('area','title').populate('servicetype').exec(function (err, inventories) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {

      res.json(inventories);
    }
  });
};

/**
 * Inventory middleware
 */
exports.inventoryByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'inventory is invalid'
    });
  }

  Inventory.findById(id).populate('user', 'displayName').exec(function (err, inventory) {
    if (err) {
      return next(err);
    } else if (!inventory) {
      return res.status(404).send({
        message: 'No inventory with that identifier has been found'
      });
    }
    req.inventory = inventory;
    next();
  });
};

exports.inventoryByArea = function (req, res, next, areaId) {

  if (!mongoose.Types.ObjectId.isValid(areaId)) {
    return res.status(400).send({
      message: 'area is invalid'
    });
  }

  Inventory.find({area:areaId}).populate('user', 'displayName').populate('servicetype','title').exec(function (err, inventory) {
    if (err) {
      return next(err);
    } else if (!inventory) {
      return res.status(404).send({
        message: 'No inventory with that area has been found'
      });
    }
    req.inventory = inventory;
    next();
  });
};
