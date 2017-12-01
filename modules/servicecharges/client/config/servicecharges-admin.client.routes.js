(function () {
  'use strict';

  angular
    .module('servicecharges.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.servicecharges', {
        abstract: true,
        url: '/servicecharges',
        template: '<ui-view/>'
      })
      .state('admin.servicecharges.list', {
        url: '',
        templateUrl: '/modules/servicecharges/client/views/admin/list-servicecharges.client.view.html',
        controller: 'ServicechargesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.servicecharges.create', {
        url: '/create',
        templateUrl: '/modules/servicecharges/client/views/admin/form-servicecharge.client.view.html',
        controller: 'ServicechargesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          servicechargeResolve: newServicecharge
        }
      })
      .state('admin.servicecharges.edit', {
        url: '/:servicechargeId/edit',
        templateUrl: '/modules/servicecharges/client/views/admin/form-servicecharge.client.view.html',
        controller: 'ServicechargesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          servicechargeResolve: getServicecharge
        }
      });
  }

  getServicecharge.$inject = ['$stateParams', 'ServicechargesService'];

  function getServicecharge($stateParams, ServicechargesService) {
    return ServicechargesService.get({
      servicechargeId: $stateParams.servicechargeId
    }).$promise;
  }

  newServicecharge.$inject = ['ServicechargesService'];

  function newServicecharge(ServicechargesService) {
    return new ServicechargesService();
  }
}());
