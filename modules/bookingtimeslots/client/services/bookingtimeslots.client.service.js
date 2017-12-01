(function () {
  'use strict';

  angular
    .module('bookingtimeslots.services')
    .factory('BookingtimeslotsService', BookingtimeslotsService);

  BookingtimeslotsService.$inject = ['$resource', '$log'];

  function BookingtimeslotsService($resource, $log) {
    var Bookingtimeslot = $resource('/api/bookingtimeslots/:bookingtimeslotId', {
      bookingtimeslotId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getAreaSlot:
    {
            method: 'POST',
            url: '/api/book-service/area'
    }
    });

    angular.extend(Bookingtimeslot.prototype, {
      createOrUpdate: function () {
        var bookingtimeslot = this;
        return createOrUpdate(bookingtimeslot);
      }
    });

    return Bookingtimeslot;

    function createOrUpdate(bookingtimeslot) {
      if (bookingtimeslot._id) {
        return bookingtimeslot.$update(onSuccess, onError);
      } else {
        return bookingtimeslot.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(bookingtimeslot) {
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
