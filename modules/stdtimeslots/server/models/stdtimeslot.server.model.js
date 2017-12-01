'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Stdtimeslot Schema
 */
var StdtimeslotSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  from_time: {
    type: String,
    default: '',
    trim: true,
    required: 'From time cannot be blank'
  },
  to_time: {
    type: String,
    default: '',
    trim: true,
    required: 'to time cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  area: {
    type: Schema.ObjectId,
    ref: 'Area'
  }
});

mongoose.model('Stdtimeslot', StdtimeslotSchema);
