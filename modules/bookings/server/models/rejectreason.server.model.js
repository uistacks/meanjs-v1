'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * RejectReason Schema
 */
var RejectReasonSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  reason: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  estimation_id: {
    type: Schema.ObjectId,
    ref: 'Estimation'
  }

});

mongoose.model('RejectReason', RejectReasonSchema);
