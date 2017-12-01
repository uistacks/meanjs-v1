(function () {
  'use strict';

  angular
    .module('leaves.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.leaves', {
        abstract: true,
        url: '/leaves',
        template: '<ui-view/>'
      })
      .state('admin.leaves.list', {
        url: '',
        templateUrl: '/modules/leaves/client/views/admin/list-leaves.client.view.html',
        controller: 'LeavesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.leaves.create', {
        url: '/create',
        templateUrl: '/modules/leaves/client/views/admin/form-leave.client.view.html',
        controller: 'LeavesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          leaveResolve: newLeave
        }
      })
      .state('admin.leaves.edit', {
        url: '/:leaveId/edit',
        templateUrl: '/modules/leaves/client/views/admin/form-leave.client.view.html',
        controller: 'LeavesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          leaveResolve: getLeave
        }
      });
  }

  getLeave.$inject = ['$stateParams', 'LeavesService'];

  function getLeave($stateParams, LeavesService) {
    return LeavesService.get({
      leaveId: $stateParams.leaveId
    }).$promise;
  }

  newLeave.$inject = ['LeavesService'];

  function newLeave(LeavesService) {
    return new LeavesService();
  }
}());
