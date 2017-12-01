(function () {
  'use strict';

  angular
    .module('servicesubtypes.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.servicesubtypes', {
        abstract: true,
        url: '/servicesubtypes',
        template: '<ui-view/>'
      })
      .state('admin.servicesubtypes.list', {
        url: '',
        templateUrl: '/modules/servicesubtypes/client/views/admin/list-servicesubtypes.client.view.html',
        controller: 'ServicesubtypesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.servicesubtypes.create', {
        url: '/create',
        templateUrl: '/modules/servicesubtypes/client/views/admin/form-servicesubtype.client.view.html',
        controller: 'ServicesubtypesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          servicesubtypeResolve: newServicesubtype
        }
      })
      .state('admin.servicesubtypes.edit', {
        url: '/:servicesubtypeId/edit',
        templateUrl: '/modules/servicesubtypes/client/views/admin/form-servicesubtype.client.view.html',
        controller: 'ServicesubtypesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          servicesubtypeResolve: getServicesubtype
        }
      });
  }

  getServicesubtype.$inject = ['$stateParams', 'ServicesubtypesService'];

  function getServicesubtype($stateParams, ServicesubtypesService) {
    return ServicesubtypesService.get({
      servicesubtypeId: $stateParams.servicesubtypeId
    }).$promise;
  }

  newServicesubtype.$inject = ['ServicesubtypesService'];

  function newServicesubtype(ServicesubtypesService) {
    return new ServicesubtypesService();
  }
}());
