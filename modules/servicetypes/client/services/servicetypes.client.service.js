(function () {
  'use strict';

  angular
    .module('servicetypes.services')
    .factory('ServicetypesService', ServicetypesService);

  ServicetypesService.$inject = ['$resource', '$log'];

  function ServicetypesService($resource, $log) {
    var Servicetype = $resource('/api/servicetypes/:servicetypeId', {
      servicetypeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Servicetype.prototype, {
      createOrUpdate: function () {
        var servicetype = this;
        return createOrUpdate(servicetype);
      }
    });

    return Servicetype;

    function createOrUpdate(servicetype) {
      if (servicetype._id) {
        return servicetype.$update(onSuccess, onError);
      } else {
        return servicetype.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(servicetype) {
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
