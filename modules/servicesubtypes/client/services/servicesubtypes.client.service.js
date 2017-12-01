(function () {
  'use strict';

  angular
    .module('servicesubtypes.services')
    .factory('ServicesubtypesService', ServicesubtypesService);

  ServicesubtypesService.$inject = ['$resource', '$log'];

  function ServicesubtypesService($resource, $log) {
    var Servicesubtype = $resource('/api/servicesubtypes/:servicesubtypeId', {
      servicesubtypeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Servicesubtype.prototype, {
      createOrUpdate: function () {
        var servicesubtype = this;
        return createOrUpdate(servicesubtype);
      }
    });

    return Servicesubtype;

    function createOrUpdate(servicesubtype) {
      if (servicesubtype._id) {
        return servicesubtype.$update(onSuccess, onError);
      } else {
        return servicesubtype.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(servicesubtype) {
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
