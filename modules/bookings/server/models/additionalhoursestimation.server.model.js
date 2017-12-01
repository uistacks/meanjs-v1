'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * AdditionalHoursEstimation Schema
 */
var AdditionalHoursEstimationSchema = new Schema({
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
  status: {
    type: [{
      type: String,
      enum: ['pending', 'accepted', 'rejected']
    }],
    default: ['pending']
  },
  estimation: {
    type: Schema.ObjectId,
    ref: 'Estimation'
  },
  additionalHoursEstimationInventory: [{type: Schema.Types.ObjectId, ref: 'AdditionalHoursEstimationInventory'}]
});

mongoose.model('AdditionalHoursEstimation', AdditionalHoursEstimationSchema);
