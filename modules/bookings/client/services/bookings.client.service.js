(function () {
  'use strict';

  angular
    .module('bookings.services')
    .factory('BookingsService', BookingsService);

  BookingsService.$inject = ['$resource', '$log', '$http'];

  function BookingsService($resource, $log, $http) {
    var Booking = $resource('/api/bookings/:bookingId', {
      bookingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getUserServiceBooking: {
        method: 'POST',
        url: '/api/booking/get-user-service-booking'
      },
      findNearestTech: {
        method: 'POST',
        url: '/api/users/find-nearest-tech', isArray: true
      },
      updateTechLocation: {
        method: 'POST',
        url: '/api/users/update-tech-location'
      },
      bookService: {
        method: 'POST',
        url: '/api/booking/book-service'
      },
      getTechOngoingJobs: {
        method: 'POST',
        url: '/api/booking/get-tech-ongoing-job', isArray: true
      },
      getUserOngoingJobs: {
        method: 'POST',
        url: '/api/booking/get-user-ongoing-job', isArray: true
      },
      getTechCompletedJobs: {
        method: 'POST',
        url: '/api/booking/get-tech-completed-job', isArray: true
      },
      getUserCompletedJobs: {
        method: 'POST',
        url: '/api/booking/get-user-completed-job', isArray: true
      },
      getJobDetail: {
        method: 'POST',
        url: '/api/booking/get-job-detail'
      },
      changeBookingStatus: {
        method: 'POST',
        url: '/api/booking/change-status'
      },
      sendEstimation: {
        method: 'POST',
        url: '/api/booking/send-estimation'
      },
      getEstimation: {
        method: 'POST',
        url: '/api/booking/get-estimation'
      },
      submitRejectEstimation: {
        method: 'POST',
        url: '/api/booking/submit-reject-estimation'
      },
      acceptEstimation: {
        method: 'POST',
        url: '/api/booking/submit-accept-estimation'
      },
      submitAdditionalHours: {
        method: 'POST',
        url: '/api/booking/submit-additional-hours'
      },
      rejectAdditionalEstimation: {
        method: 'POST',
        url: '/api/booking/reject-additional-hours'
      },
      acceptAdditionalEstimation: {
        method: 'POST',
        url: '/api/booking/accept-additional-hours'
      }
    });

    angular.extend(Booking.prototype, {
      createOrUpdate: function () {
        var booking = this;
        return createOrUpdate(booking);
      }
    });

    return Booking;


    function createOrUpdate(booking) {
      if (booking._id) {
        return booking.$update(onSuccess, onError);
      } else {
        return booking.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(booking) {
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
