(function () {
  'use strict';

  angular
    .module('stdtimeslots.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.stdtimeslots', {
        abstract: true,
        url: '/stdtimeslots',
        template: '<ui-view/>'
      })
      .state('admin.stdtimeslots.list', {
        url: '',
        templateUrl: '/modules/stdtimeslots/client/views/admin/list-stdtimeslots.client.view.html',
        controller: 'StdtimeslotsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin','areamanager']
        }
      })
      .state('admin.stdtimeslots.create', {
        url: '/create',
        templateUrl: '/modules/stdtimeslots/client/views/admin/form-stdtimeslot.client.view.html',
        controller: 'StdtimeslotsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          stdtimeslotResolve: newStdtimeslot
        }
      })
      .state('admin.stdtimeslots.edit', {
        url: '/:stdtimeslotId/edit',
        templateUrl: '/modules/stdtimeslots/client/views/admin/form-stdtimeslot.client.view.html',
        controller: 'StdtimeslotsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin','areamanager']
        },
        resolve: {
          stdtimeslotResolve: getStdtimeslot
        }
      });
  }

  getStdtimeslot.$inject = ['$stateParams', 'AreasService'];

  function getStdtimeslot($stateParams, AreasService) {

        return AreasService.get({
      areaId: $stateParams.stdtimeslotId
    }).$promise;
  }

  newStdtimeslot.$inject = ['StdtimeslotsService'];

  function newStdtimeslot(StdtimeslotsService) {
    return new StdtimeslotsService();
  }
}());
