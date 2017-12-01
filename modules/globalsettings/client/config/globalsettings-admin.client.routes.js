(function () {
  'use strict';

  angular
    .module('globalsettings.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.globalsettings', {
        abstract: true,
        url: '/globalsettings',
        template: '<ui-view/>'
      })
      .state('admin.globalsettings.list', {
        url: '',
        templateUrl: '/modules/globalsettings/client/views/admin/list-globalsettings.client.view.html',
        controller: 'GlobalsettingsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.globalsettings.create', {
        url: '/create',
        templateUrl: '/modules/globalsettings/client/views/admin/form-globalsetting.client.view.html',
        controller: 'GlobalsettingsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          globalsettingResolve: newGlobalsetting
        }
      })
      .state('admin.globalsettings.edit', {
        url: '/:globalsettingId/edit',
        templateUrl: '/modules/globalsettings/client/views/admin/form-globalsetting.client.view.html',
        controller: 'GlobalsettingsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          globalsettingResolve: getGlobalsetting
        }
      });
  }

  getGlobalsetting.$inject = ['$stateParams', 'GlobalsettingsService'];

  function getGlobalsetting($stateParams, GlobalsettingsService) {
    return GlobalsettingsService.get({
      globalsettingId: $stateParams.globalsettingId
    }).$promise;
  }

  newGlobalsetting.$inject = ['GlobalsettingsService'];

  function newGlobalsetting(GlobalsettingsService) {
    return new GlobalsettingsService();
  }
}());
