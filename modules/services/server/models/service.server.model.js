'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Service Schema
 */
var ServiceSchema = new Schema({
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
  servicesubtype: {
    type: Schema.ObjectId,
    ref: 'Servicesubtype'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Service', ServiceSchema);
