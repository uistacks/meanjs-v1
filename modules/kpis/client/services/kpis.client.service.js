(function () {
  'use strict';

  angular
    .module('kpis.services')
    .factory('KpisService', KpisService);

  KpisService.$inject = ['$resource', '$log'];

  function KpisService($resource, $log) {
    var Kpi = $resource('/api/kpis/:kpiId', {
      kpiId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Kpi.prototype, {
      createOrUpdate: function () {
        var kpi = this;
        return createOrUpdate(kpi);
      }
    });

    return Kpi;

    function createOrUpdate(kpi) {
      if (kpi._id) {
        return kpi.$update(onSuccess, onError);
      } else {
        return kpi.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(kpi) {
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
