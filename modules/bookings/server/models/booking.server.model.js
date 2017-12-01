'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Booking Schema
 */
var BookingSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  workDescription: {
    type: String,
    default: '',
    trim: true,
  },
  address: {
    type: String,
    default: '',
    trim: true,
  },
  serviceType: {
    type: Number,
    default: '',
    trim: true,
  },
  bookServiceType: {
    type: Number,
    default: '',
    trim: true,
  },

  location: {
    'type': {
      type: String,
      required: true,
      enum: ['Point', 'LineString', 'Polygon'],
      default: 'Point'
    },
    coordinates: []
  },
  status: {
    type: [{
      type: String,
      enum: ['notassigned', 'assigned', 'rejected',
        'accepted', 'available', 'ontheway',
        'estimation', 'estimationpending',
        'estimationapproved', 'estimationrejected',
        'onjob', 'techcompleted',
        'incomplete', 'custcompleted',
        'invoice', 'custpaid', 'techpaid', 'paidrejected', 'completed', 'cancel']
    }],
    default: ['assigned'],
  },
  additional_status: {
    type: [{
      type: String,
      enum: ['none', 'pending', 'accepted', 'rejected']
    }],
    default: ['none'],
  },
  technician: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  area: {
    type: Schema.ObjectId,
    ref: 'Area'
  },
  service: {
    type: Schema.ObjectId,
    ref: 'Service'
  },
  servicetype: {
    type: Schema.ObjectId,
    ref: 'Servicetype'
  }
});

mongoose.model('Booking', BookingSchema);
