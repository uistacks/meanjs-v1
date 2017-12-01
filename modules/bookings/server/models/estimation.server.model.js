'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Estimation Schema
 */
var EstimationSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  requiredHours: {
    type: String,
    default: '',
    trim: true,
  },
  requiredMinutes: {
    type: String,
    default: '',
    trim: true
  },
  cost: {
    type: Number,
    default: '',
    trim: true
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'accepted', 'rejected']
    }],
    default: ['pending']
  },
  technician: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  booking_id: {
    type: Schema.ObjectId,
    ref: 'Booking'
  },
  estimationinventory: [{type: Schema.Types.ObjectId, ref: 'EstimationInventory'}]
});

mongoose.model('Estimation', EstimationSchema);
