'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  _ = require('lodash'),
  Bannerimage = mongoose.model('Bannerimage'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an bannerimage
 */
exports.create = function (req, res) {

  var multerConfig = config.uploads.banner.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;

  // Validate If Image is required
  var isFileUploadRequired = true;

  if (isFileUploadRequired) {
    var upload = multer(multerConfig).single('imgFile');
    uploadImage()
      .then(function() {
        var uploadedFile = config.uploads.banner.image.dest + req.file.filename;

        if (req.body.bannerImgId !== '') {
          Bannerimage.findById(req.body.bannerImgId).exec(function(err, bannerImage) {

            if (err) {
              return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
              });
            }

            // Delete Existing File
            fs.unlink(bannerImage.imgFile, function (unlinkError) {
              if (unlinkError) {
                return res.status(422).send({
                  message: errorHandler.getErrorMessage({
                    message: 'Error occurred while deleting old profile picture'
                  })
                });
              }
            });

            bannerImage.caption = req.body.caption;
            bannerImage.description = req.body.description;
            bannerImage.imgFile = uploadedFile;

            bannerImage.save(function (errSave) {
              if (errSave) {
                return res.status(422).send({
                  message: errorHandler.getErrorMessage(errSave)
                });
              } else {
                res.json(bannerImage);
              }
            });

          });
        } else {

          var bannerimage = new Bannerimage({
            caption: req.body.caption,
            description: req.body.description,
            imgFile: uploadedFile,
            user: req.user
          });

          bannerimage.save(function (err) {
            if (err) {
              return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              res.json(bannerimage);
            }
          });
        }
      })
      .catch(function (err) {
        res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      });
  } else {
    Bannerimage.findById(req.body.bannerImgId).exec(function(err, bannerImage) {

      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      bannerImage.caption = req.body.caption;
      bannerImage.description = req.body.description;

      bannerImage.save(function (errSave) {
        if (errSave) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(errSave)
          });
        } else {
          res.json(bannerImage);
        }
      });

    });
  }


  function uploadImage () {
    return new Promise(function (resolve, reject) {
      upload(req, res, function (uploadError) {
        if (uploadError) {
          reject(errorHandler.getErrorMessage(uploadError));
        } else {
          resolve();
        }
      });
    });
  }
};

/**
 * Show the current bannerimage
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bannerimage = req.bannerimage ? req.bannerimage.toJSON() : {};

  // Add a custom field to the Bannerimage, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Bannerimage model.
  bannerimage.isCurrentUserOwner = !!(req.user && bannerimage.user && bannerimage.user._id.toString() === req.user._id.toString());

  res.json(bannerimage);
};

/**
 * Update an bannerimage
 */
exports.update = function (req, res) {
  var bannerimage = req.bannerimage;

  bannerimage.caption = req.body.caption;
  bannerimage.description = req.body.description;

  bannerimage.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bannerimage);
    }
  });
};

/**
 * Delete an bannerimage
 */
exports.delete = function (req, res) {
  var bannerimage = req.bannerimage;

  bannerimage.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bannerimage);
    }
  });
};

/**
 * List of Bannerimages
 */
exports.list = function (req, res) {
  Bannerimage.find().sort('-created').populate('user', 'displayName').exec(function (err, bannerimages) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bannerimages);
    }
  });
};

/**
 * Bannerimage middleware
 */
exports.bannerimageByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Bannerimage is invalid'
    });
  }

  Bannerimage.findById(id).populate('user', 'displayName').exec(function (err, bannerimage) {
    if (err) {
      return next(err);
    } else if (!bannerimage) {
      return res.status(404).send({
        message: 'No bannerimage with that identifier has been found'
      });
    }
    req.bannerimage = bannerimage;
    next();
  });
};
