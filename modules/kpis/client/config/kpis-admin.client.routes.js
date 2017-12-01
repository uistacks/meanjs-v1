(function () {
  'use strict';

  angular
    .module('kpis.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.kpis', {
        abstract: true,
        url: '/kpis',
        template: '<ui-view/>'
      })
      .state('admin.kpis.list', {
        url: '',
        templateUrl: '/modules/kpis/client/views/admin/list-kpis.client.view.html',
        controller: 'KpisAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.kpis.create', {
        url: '/create',
        templateUrl: '/modules/kpis/client/views/admin/form-kpi.client.view.html',
        controller: 'KpisAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          kpiResolve: newKpi
        }
      })
      .state('admin.kpis.edit', {
        url: '/:kpiId/edit',
        templateUrl: '/modules/kpis/client/views/admin/form-kpi.client.view.html',
        controller: 'KpisAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          kpiResolve: getKpi
        }
      });
  }

  getKpi.$inject = ['$stateParams', 'KpisService'];

  function getKpi($stateParams, KpisService) {
    return KpisService.get({
      kpiId: $stateParams.kpiId
    }).$promise;
  }

  newKpi.$inject = ['KpisService'];

  function newKpi(KpisService) {
    return new KpisService();
  }
}());
