(function () {
  'use strict';

  angular
    .module('leaves.services')
    .factory('LeavesService', LeavesService);

  LeavesService.$inject = ['$resource', '$log'];

  function LeavesService($resource, $log) {
    var Leave = $resource('/api/leaves/:leaveId', {
      leaveId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Leave.prototype, {
      createOrUpdate: function () {
        var leave = this;
        return createOrUpdate(leave);
      }
    });

    return Leave;

    function createOrUpdate(leave) {
      if (leave._id) {
        return leave.$update(onSuccess, onError);
      } else {
        return leave.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(leave) {
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
