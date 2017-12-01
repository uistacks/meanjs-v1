'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * EstimationInventory Schema
 */
var EstimationInventorySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: String,
    default: '',
    trim: true,
  },
  inventory_id: {
    type: Schema.ObjectId,
    ref: 'Inventory'
  },
  estimation_id: {
    type: Schema.ObjectId,
    ref: 'Estimation'
  }
});

mongoose.model('EstimationInventory', EstimationInventorySchema);
