'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Bookingtimeslot Schema
 */
var BookingtimeslotSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  area: {
    type: Schema.ObjectId,
    ref: 'Area',
    required: 'Area cannot be blank'
  },
  minDuration: {
    type: Number,
    default: 0
  },
  minDurationType: {
    type: String,
    default: 'h'
  },
  updated: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Bookingtimeslot', BookingtimeslotSchema);
