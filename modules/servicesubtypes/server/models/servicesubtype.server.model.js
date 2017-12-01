'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Servicesubtype Schema
 */
var ServicesubtypeSchema = new Schema({
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
  content: {
    type: String,
    default: '',
    trim: true
  },
  area: {
    type: Schema.ObjectId,
    ref: 'Area'
  },
  servicetype: {
    type: Schema.ObjectId,
    ref: 'Servicetype'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Servicesubtype', ServicesubtypeSchema);
