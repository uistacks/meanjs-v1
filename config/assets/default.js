'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.css',
        'public/lib/ngWYSIWYG/dist/editor.min.css',
        'public/lib/angular-google-places-autocomplete/dist/autocomplete.min.css',
        'public/lib/angular-time-picker/dist/angular-time-picker.min.css'
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/lodash/dist/lodash.min.js',
        'public/lib/angular-simple-logger/dist/angular-simple-logger.min.js',
        'public/lib/angular-google-maps/dist/angular-google-maps.js',
        'public/lib/angular-sanitize/angular-sanitize.min.js',
        'public/lib/ngWYSIWYG/dist/wysiwyg.min.js',
        'public/lib/angucomplete-alt/dist/angucomplete-alt.min.js',
        'public/lib/angularjs-geolocation/dist/angularjs-geolocation.min.js',
        'public/lib/angular-google-places-autocomplete/dist/autocomplete.min.js',
        'public/lib/angular-time-picker/dist/angular-time-picker.min.js',
        'public/lib/ng-flow/dist/ng-flow-standalone.min.js',
        
        
        // endbower
        
        
        'public/media/js/jquery.js',
        'public/media/js/bootstrap.min.js',
        'public/media/js/owl.carousel.min.js',
        'public/media/js/scrollIt.min.js',
        'public/media/js/skrollr.min.js',
        'public/media/js/wow.js',
        'public/media/js/device.min.js',
        'public/media/js/custom.js',
        ,
        
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/{css,less,scss}/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    views: ['modules/*/server/views/*.html']
  }
};
