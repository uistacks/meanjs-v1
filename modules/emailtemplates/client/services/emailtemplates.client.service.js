(function () {
  'use strict';

  angular
    .module('emailtemplates.services')
    .factory('EmailtemplatesService', EmailtemplatesService);

  EmailtemplatesService.$inject = ['$resource', '$log'];

  function EmailtemplatesService($resource, $log) {
    var Emailtemplate = $resource('/api/emailtemplates/:emailtemplateId', {
      emailtemplateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Emailtemplate.prototype, {
      createOrUpdate: function () {
        var emailtemplate = this;
        return createOrUpdate(emailtemplate);
      }
    });

    return Emailtemplate;

    function createOrUpdate(emailtemplate) {
      if (emailtemplate._id) {
        return emailtemplate.$update(onSuccess, onError);
      } else {
        return emailtemplate.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(emailtemplate) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
