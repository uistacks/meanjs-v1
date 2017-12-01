'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator'),
  generatePassword = require('generate-password'),
  owasp = require('owasp-password-strength-test');

owasp.config(config.shared.owasp);


/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email, { require_tld: false }));
};

/**
 * A Validation function for username
 * - at least 3 characters
 * - only a-z0-9_-.
 * - contain at least one alphanumeric character
 * - not in list of illegal usernames
 * - no consecutive dots: "." ok, ".." nope
 * - not begin or end with "."
 */

var validateUsername = function(username) {
  var usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
  return (
    this.provider !== 'local' ||
    (username && usernameRegex.test(username) && config.illegalUsernames.indexOf(username) < 0)
  );
};

/**
 * User Schema
 */
var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your first name']
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your last name']
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  username: {
    type: String,
    unique: 'Username already exists',
    required: 'Please fill in a username',
    validate: [validateUsername, 'Please enter a valid username: 3+ characters long, non restricted word, characters "_-.", no consecutive dots, does not begin or end with dots, letters a-z and numbers 0-9.'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: ''
  },
  salt: {
    type: String
  },
  profileImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin', 'mastercontroller', 'areamanager', 'subadmin', 'controller', 'technician']
    }],
    default: ['user'],
    required: 'Please provide at least one role'
  },
  tech_status: {
    type: [{
      type: String,
      enum: ['inactive', 'available', 'ontheway', 'estimation', 'onjob']
    }],
    default: ['available'],
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  mobileNo: {
    type: String,
    trim: true
  },
  accountStatus: {
    type: [{
      type: String,
      enum: ['active', 'inactive']
    }],
    default: ['inactive']
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  /* New Employee Fields below*/
  gender: {
    type: String
  },
  dob: {
    type: String
  },
  personalEmail: {
    type: String,
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  nationality: {
    type: String
  },
  maritalStatus: {
    type: String
  },
  drivingLicence: {
    type: String
  },
  localBankAcNo: {
    type: String
  },
  localBankName: {
    type: String
  },
  passportNo: {
    type: String
  },
  passportIssueDate: {
    type: String
  },
  passportExpiryDate: {
    type: String
  },
  passportCountry: {
    type: String
  },
  civilIDNo: {
    type: String
  },
  civilIDIssueDate: {
    type: String
  },
  civilIDExpiryDate: {
    type: String
  },
  residentCardNo: {
    type: String
  },
  iqama: {
    type: String
  },
  permanentAddress: {
    type: String
  },
  permanentAddressCity: {
    type: String
  },
  permanentAddressState: {
    type: String
  },
  permanentAddressZip: {
    type: String
  },
  permanentAddressCountry: {
    type: String
  },
  localAddress: {
    type: String
  },
  localAddressCity: {
    type: String
  },
  localAddressState: {
    type: String
  },
  localAddressZip: {
    type: String
  },
  localAddressCountry: {
    type: String
  },
  originalHireDate: {
    type: String
  },
  startingDate: {
    type: String
  },
  datePayStarts: {
    type: String
  },
  employeeNo: {
    type: String
  },
  department: {
    type: String
  },
  position: {
    type: String
  },
  area: {
    type: String
  },
  supervisor: {
    type: String
  },
  workLocation: {
    type: String
  },
  salary: {
    type: Number
  },
  billingRateMonthly: {
    type: Number
  },
  billingRateWeekly: {
    type: Number
  },
  billingRateHourly: {
    type: Number
  },
  bounces: {
    type: Number
  },
  leaveofabsense: {
    type: Number
  },
  professionalLicense: {
    type: String
  },
  userTechnicalExperience: {
    type: Array
  },
  userEducation: {
    type: Array
  },
  userTrainings: {
    type: Array
  },
  userSkills: {
    type: Array
  },
  serviceSkills: {
    type: Array
  },
  middleName: {
    type: String,
    default: '',
    trim: true
  },
   location: {
    'type': {
      type: String,
      enum: ['Point', 'LineString', 'Polygon'],
      default: 'Point'
    },
    coordinates: [
    ]
  }

});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Hook a pre validate method to test the local password
 */
UserSchema.pre('validate', function (next) {
  if (this.provider === 'local' && this.password && this.isModified('password')) {
    var result = owasp.test(this.password);
    if (result.errors.length) {
      var error = result.errors.join(' ');
      this.invalidate('password', error);
    }
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
  var _this = this;
  var possibleUsername = username.toLowerCase() + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

/**
* Generates a random passphrase that passes the owasp test
* Returns a promise that resolves with the generated passphrase, or rejects with an error if something goes wrong.
* NOTE: Passphrases are only tested against the required owasp strength tests, and not the optional tests.
*/
UserSchema.statics.generateRandomPassphrase = function () {
  return new Promise(function (resolve, reject) {
    var password = '';
    var repeatingCharacters = new RegExp('(.)\\1{2,}', 'g');

    // iterate until the we have a valid passphrase
    // NOTE: Should rarely iterate more than once, but we need this to ensure no repeating characters are present
    while (password.length < 20 || repeatingCharacters.test(password)) {
      // build the random password
      password = generatePassword.generate({
        length: Math.floor(Math.random() * (20)) + 20, // randomize length between 20 and 40 characters
        numbers: true,
        symbols: false,
        uppercase: true,
        excludeSimilarCharacters: true
      });

      // check if we need to remove any repeating characters
      password = password.replace(repeatingCharacters, '');
    }

    // Send the rejection back if the passphrase fails to pass the strength test
    if (owasp.test(password).errors.length) {
      reject(new Error('An unexpected problem occured while generating the random passphrase'));
    } else {
      // resolve with the validated passphrase
      resolve(password);
    }
  });
};

mongoose.model('User', UserSchema);
