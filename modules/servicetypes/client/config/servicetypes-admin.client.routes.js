(function () {
  'use strict';

  angular
    .module('servicetypes.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.servicetypes', {
        abstract: true,
        url: '/servicetypes',
        template: '<ui-view/>'
      })
      .state('admin.servicetypes.list', {
        url: '',
        templateUrl: '/modules/servicetypes/client/views/admin/list-servicetypes.client.view.html',
        controller: 'ServicetypesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.servicetypes.create', {
        url: '/create',
        templateUrl: '/modules/servicetypes/client/views/admin/form-servicetype.client.view.html',
        controller: 'ServicetypesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          servicetypeResolve: newServicetype
        }
      })
      .state('admin.servicetypes.edit', {
        url: '/:servicetypeId/edit',
        templateUrl: '/modules/servicetypes/client/views/admin/form-servicetype.client.view.html',
        controller: 'ServicetypesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          servicetypeResolve: getServicetype
        }
      });
  }

  getServicetype.$inject = ['$stateParams', 'ServicetypesService'];

  function getServicetype($stateParams, ServicetypesService) {
    return ServicetypesService.get({
      servicetypeId: $stateParams.servicetypeId
    }).$promise;
  }

  newServicetype.$inject = ['ServicetypesService'];

  function newServicetype(ServicetypesService) {
    return new ServicetypesService();
  }
}());
