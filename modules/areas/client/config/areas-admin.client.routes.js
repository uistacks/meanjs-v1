(function () {
  'use strict';

  angular
    .module('areas.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.areas', {
        abstract: true,
        url: '/areas',
        template: '<ui-view/>'
      })
      .state('admin.areas.list', {
        url: '',
        templateUrl: '/modules/areas/client/views/admin/list-areas.client.view.html',
        controller: 'AreasAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.areas.create', {
        url: '/create',
        templateUrl: '/modules/areas/client/views/admin/form-area.client.view.html',
        controller: 'AreasAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          areaResolve: newArea
        }
      })
      .state('admin.areas.edit', {
        url: '/:areaId/edit',
        templateUrl: '/modules/areas/client/views/admin/form-area.client.view.html',
        controller: 'AreasAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          areaResolve: getArea
        }
      });
  }

  getArea.$inject = ['$stateParams', 'AreasService'];

  function getArea($stateParams, AreasService) {
    return AreasService.get({
      areaId: $stateParams.areaId
    }).$promise;
  }

  newArea.$inject = ['AreasService'];

  function newArea(AreasService) {
    return new AreasService();
  }
}());
