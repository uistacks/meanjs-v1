(function () {
  'use strict';

  angular
    .module('inventories.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.inventories', {
        abstract: true,
        url: '/inventories',
        template: '<ui-view/>'
      })
      .state('admin.inventories.list', {
        url: '',
        templateUrl: '/modules/inventories/client/views/admin/list-inventories.client.view.html',
        controller: 'InventoriesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin','areamanager','mastercontroller','subadmin','controller']
        }
      })
      .state('admin.inventories.create', {
        url: '/create',
        templateUrl: '/modules/inventories/client/views/admin/form-inventory.client.view.html',
        controller: 'InventoriesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin','areamanager','mastercontroller','subadmin','controller']
        },
        resolve: {
          inventoryResolve: newInventory
        }
      })
      .state('admin.inventories.edit', {
        url: '/:inventoryId/edit',
        templateUrl: '/modules/inventories/client/views/admin/form-inventory.client.view.html',
        controller: 'InventoriesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin','areamanager','mastercontroller','subadmin','controller']
        },
        resolve: {
          inventoryResolve: getInventory
        }
      });
  }

  getInventory.$inject = ['$stateParams', 'InventoriesService'];

  function getInventory($stateParams, InventoriesService) {
    return InventoriesService.get({
      inventoryId: $stateParams.inventoryId
    }).$promise;
  }

  newInventory.$inject = ['InventoriesService'];

  function newInventory(InventoriesService) {
    return new InventoriesService();
  }
}());
