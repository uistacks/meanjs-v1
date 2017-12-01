'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;

  // For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.middleName = req.body.middleName;
  user.lastName = req.body.lastName;
  user.mobileNo = req.body.mobileNo;
  user.email = req.body.email;
  user.accountStatus = req.body.accountStatus;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = [req.body.role];

  user.gender = req.body.gender;
  user.dob = req.body.dob;
  user.personalEmail = req.body.personalEmail;
  user.nationality = req.body.nationality;
  user.maritalStatus = req.body.maritalStatus;
  user.drivingLicence = req.body.drivingLicence;
  user.localBankAcNo = req.body.localBankAcNo;
  user.localBankName = req.body.localBankName;
  user.passportNo = req.body.passportNo;
  user.passportIssueDate = req.body.passportIssueDate;
  user.passportExpiryDate = req.body.passportExpiryDate;
  user.passportCountry = req.body.passportCountry;
  user.civilIDNo = req.body.civilIDNo;
  user.civilIDIssueDate = req.body.civilIDIssueDate;
  user.civilIDExpiryDate = req.body.civilIDExpiryDate;
  user.residentCardNo = req.body.residentCardNo;
  user.iqama = req.body.iqama;
  user.permanentAddress = req.body.permanentAddress;
  user.permanentAddressCity = req.body.permanentAddressCity;
  user.permanentAddressState = req.body.permanentAddressState;
  user.permanentAddressZip = req.body.permanentAddressZip;
  user.permanentAddressCountry = req.body.permanentAddressCountry;
  user.localAddress = req.body.localAddress;
  user.localAddressCity = req.body.localAddressCity;
  user.localAddressState = req.body.localAddressState;
  user.localAddressZip = req.body.localAddressZip;
  user.localAddressCountry = req.body.localAddressCountry;
  user.originalHireDate = req.body.originalHireDate;
  user.startingDate = req.body.startingDate;
  user.datePayStarts = req.body.datePayStarts;
  user.employeeNo = req.body.employeeNo;
  user.department = req.body.department;
  user.position = req.body.position;
  user.area = req.body.area;
  user.supervisor = req.body.supervisor;
  user.workLocation = req.body.workLocation;
  user.salary = req.body.salary;
  user.billingRateMonthly = req.body.billingRateMonthly;
  user.billingRateWeekly = req.body.billingRateWeekly;
  user.billingRateHourly = req.body.billingRateHourly;
  user.bounces = req.body.bounces;
  user.leaveofabsense = req.body.leaveofabsense;
  user.professionalLicense = req.body.professionalLicense;
  user.userTechnicalExperience = req.body.userTechnicalExperience;
  user.userEducation = req.body.userEducation;
  user.userTrainings = req.body.userTrainings;
  user.userSkills = req.body.userSkills;
  user.middleName = req.body.middleName;

  // validate username
  user.username = req.body.username;

  if (!(req.body.password === '' || req.body.password === undefined)) {
    user.password = req.body.password;
  }

  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  res.json(req.users);
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password -providerData').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};

exports.usersByType = function (req, res, next, id) {

  var condition_find = {};

  if (id !== 'employee') {
    condition_find = { roles: id };
  } else {
    condition_find = { roles: { $nin: ['user', 'admin'] } };
  }
  User.find(condition_find, '-salt -password -providerData').exec(function (err, users) {
    if (err) {
      return next(err);
    }

    req.users = users;
    next();
  });
};

// create new admin user
exports.createAdminUser = function (req, res) {
  // Init user and add missing fields
  var user = new User(req.body);
  user.provider = 'local';
  user.displayName = user.firstName + ' ' + user.lastName;
  user.accountStatus = req.body.accountStatus[0];
  user.roles = [req.body.role];

  // Then save the user
  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      res.json(user);
    }
  });
};
