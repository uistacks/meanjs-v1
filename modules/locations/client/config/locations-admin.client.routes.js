(function () {
  'use strict';

  angular
    .module('locations.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.locations', {
        abstract: true,
        url: '/locations',
        template: '<ui-view/>'
      })
      .state('admin.locations.list', {
        url: '',
        templateUrl: '/modules/locations/client/views/admin/list-locations.client.view.html',
        controller: 'LocationsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.locations.create', {
        url: '/create',
        templateUrl: '/modules/locations/client/views/admin/form-location.client.view.html',
        controller: 'LocationsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          locationResolve: newLocation
        }
      })
      .state('admin.locations.edit', {
        url: '/:locationId/edit',
        templateUrl: '/modules/locations/client/views/admin/form-location.client.view.html',
        controller: 'LocationsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          locationResolve: getLocation
        }
      });
  }

  getLocation.$inject = ['$stateParams', 'LocationsService'];

  function getLocation($stateParams, LocationsService) {
    return LocationsService.get({
      locationId: $stateParams.locationId
    }).$promise;
  }

  newLocation.$inject = ['LocationsService'];

  function newLocation(LocationsService) {
    return new LocationsService();
  }
}());
