(function () {
  'use strict';

  angular
    .module('stdtimeslots.services')
    .factory('StdtimeslotsService', StdtimeslotsService);

  StdtimeslotsService.$inject = ['$resource', '$log'];

  function StdtimeslotsService($resource, $log) {
    var Stdtimeslot = $resource('/api/stdtimeslots/:stdtimeslotId', {
      stdtimeslotId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Stdtimeslot.prototype, {
      createOrUpdate: function () {
        var stdtimeslot = this;
        return createOrUpdate(stdtimeslot);
      }
    });

    return Stdtimeslot;

    function createOrUpdate(stdtimeslot) {
      if (stdtimeslot._id) {
        return stdtimeslot.$update(onSuccess, onError);
      } else {
        return stdtimeslot.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(stdtimeslot) {
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
