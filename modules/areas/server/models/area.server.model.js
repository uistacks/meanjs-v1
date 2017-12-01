'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Area Schema
 */
var AreaSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  from_time: {
    type: Date,
    default: new Date(1970, 0, 1, 9, 30, 0),
    trim: true,
    required: 'From time cannot be blank'
  },
  to_time: {
    type: Date,
    default: new Date(1970, 0, 1, 19, 30, 0),
    trim: true,
    required: 'To time cannot be blank'
  },
  content: {
    'type': {
      type: String,
      required: true,
      enum: ['Point', 'LineString', 'Polygon'],
      default: 'Point'
    },
    coordinates: [
      [[
        { type: [Number] }
      ]]
    ]
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Area', AreaSchema);
