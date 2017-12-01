(function () {
  'use strict';

  angular
    .module('globalsettings.services')
    .factory('GlobalsettingsService', GlobalsettingsService);

  GlobalsettingsService.$inject = ['$resource', '$log'];

  function GlobalsettingsService($resource, $log) {
    var Globalsetting = $resource('/api/globalsettings/:globalsettingId', {
      globalsettingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Globalsetting.prototype, {
      createOrUpdate: function () {
        var globalsetting = this;
        return createOrUpdate(globalsetting);
      }
    });

    return Globalsetting;

    function createOrUpdate(globalsetting) {
      if (globalsetting._id) {
        return globalsetting.$update(onSuccess, onError);
      } else {
        return globalsetting.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(globalsetting) {
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
