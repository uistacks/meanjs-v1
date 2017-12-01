'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Inventory Schema
 */
var InventorySchema = new Schema({
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
  quantity: {
    type: String,
    default: '',
    trim: true
  },
  price: {
    type: String,
    default: '',
    trim: true
  },
   area: {
    type: Schema.ObjectId,
    ref: 'Area'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
    servicetype: {
    type: Schema.ObjectId,
    ref: 'Servicetype'
  }
  
});

mongoose.model('Inventory', InventorySchema);
