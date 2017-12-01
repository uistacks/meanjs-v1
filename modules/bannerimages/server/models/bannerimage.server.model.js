'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Bannerimage Schema
 */
var BannerimageSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  caption: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  imgFile: {
    type: String,
    default: '',
    trim: true,
    required: 'Image can not be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Bannerimage', BannerimageSchema);
