(function () {
  'use strict';

  angular
    .module('services.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('service', {
        abstract: true,
        url: '/service',
        template: '<ui-view/>'
      })
     
//      .state('service.detail', {
//        url: '/detail/:serviceId',
//        templateUrl: '/modules/services/client/views/view-service.client.view.html',
//        controller: 'ServicesController',
//        controllerAs: 'vm',
//        data: {
//          roles: ['user']
//        },
//        resolve: {
//          serviceResolve: getService
//        }
//      });
  }

 getService.$inject = ['$stateParams', 'ServicesService'];

  function getService($stateParams, ServicesService) {
    return ServicesService.get({
      serviceId: $stateParams.serviceId
    }).$promise;
  }
}());
