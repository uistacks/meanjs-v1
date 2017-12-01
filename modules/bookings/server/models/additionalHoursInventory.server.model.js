'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * AdditionalEstimationInventory Schema
 */
var AdditionalHoursEstimationInventorySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: String,
    default: '',
    trim: true
  },
  inventory_id: {
    type: Schema.ObjectId,
    ref: 'Inventory'
  },
  additionalHoursEstimation: {
    type: Schema.ObjectId,
    ref: 'AdditionalHoursEstimation'
  }
});

mongoose.model('AdditionalHoursEstimationInventory', AdditionalHoursEstimationInventorySchema);
