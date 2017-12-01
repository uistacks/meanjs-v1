'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Servicecharge Schema
 */
var ServicechargeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  area: {
    type: Schema.ObjectId,
    ref: 'Area',
    required: 'Area cannot be blank'
  },
  service: {
    type: Schema.ObjectId,
    ref: 'Service',
    required: 'Service cannot be blank'
  },
  monthlyCharges: {
    type: Number,
    default: 0
  },
  weeklyCharges: {
    type: Number,
    default: 0
  },
  hourlyCharges: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Servicecharge', ServicechargeSchema);
