'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Emailtemplate Schema
 */
var EmailtemplateSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Subject cannot be blank'
  },
  slug: {
    type: String,
    default: '',
    trim: true,
    unique: true,
    required: 'Unique Key cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Content cannot be blank'
  },
  smsText: {
    type: String,
    default: '',
    trim: true,
    required: 'SMS content cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Emailtemplate', EmailtemplateSchema);

EmailtemplateSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Unique Key is already taken! Please try another'));
  } else {
    next(error);
  }
});
