(function () {
  'use strict';

  angular
    .module('servicecharges.services')
    .factory('ServicechargesService', ServicechargesService);

  ServicechargesService.$inject = ['$resource', '$log'];

  function ServicechargesService($resource, $log) {
    var Servicecharge = $resource('/api/servicecharges/:servicechargeId', {
      servicechargeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Servicecharge.prototype, {
      createOrUpdate: function () {
        var servicecharge = this;
        return createOrUpdate(servicecharge);
      }
    });

    return Servicecharge;

    function createOrUpdate(servicecharge) {
      if (servicecharge._id) {
        return servicecharge.$update(onSuccess, onError);
      } else {
        return servicecharge.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(servicecharge) {
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
