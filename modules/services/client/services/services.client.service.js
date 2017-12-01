(function () {
  'use strict';

  angular
    .module('services.services')
    .factory('ServicesService', ServicesService).factory('SubserviceTypeServicesService',SubserviceTypeServicesService);

  ServicesService.$inject = ['$resource', '$log'];
  SubserviceTypeServicesService.$inject = ['$http'];


function SubserviceTypeServicesService ($http) {
    return {getSubserviceTypeServices:  function (serviceType){
    return $http.get("/api/subservices/services/serviceType", {params:{serviceType: serviceType}})
    .then(function (response) { /* */ })
    }
}
}
  function ServicesService($resource, $log){
    var Service = $resource('/api/services/:serviceId', {
      serviceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Service.prototype, {
      createOrUpdate: function () {
        var service = this;
        console.log(service);
        return createOrUpdate(service);
      }
    });

    return Service;

    function createOrUpdate(service) {
      if (service._id) {
        return service.$update(onSuccess, onError);
      } else {
        return service.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(service) {
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
