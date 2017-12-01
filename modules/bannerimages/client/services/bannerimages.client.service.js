(function () {
  'use strict';

  angular
    .module('bannerimages.services')
    .factory('BannerimagesService', BannerimagesService);

  BannerimagesService.$inject = ['$resource', '$log'];

  function BannerimagesService($resource, $log) {
    var Bannerimage = $resource('/api/bannerimages/:bannerimageId', {
      bannerimageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Bannerimage.prototype, {
      createOrUpdate: function () {
        var bannerimage = this;
        return createOrUpdate(bannerimage);
      }
    });

    return Bannerimage;

    function createOrUpdate(bannerimage) {
      if (bannerimage._id) {
        return bannerimage.$update(onSuccess, onError);
      } else {
        return bannerimage.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(bannerimage) {
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
