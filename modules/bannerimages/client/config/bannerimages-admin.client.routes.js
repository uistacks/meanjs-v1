(function () {
  'use strict';

  angular
    .module('bannerimages.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.bannerimages', {
        abstract: true,
        url: '/bannerimages',
        template: '<ui-view/>'
      })
      .state('admin.bannerimages.list', {
        url: '',
        templateUrl: '/modules/bannerimages/client/views/admin/list-bannerimages.client.view.html',
        controller: 'BannerimagesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.bannerimages.create', {
        url: '/create',
        templateUrl: '/modules/bannerimages/client/views/admin/form-bannerimage.client.view.html',
        controller: 'BannerimagesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bannerimageResolve: newBannerimage
        }
      })
      .state('admin.bannerimages.edit', {
        url: '/:bannerimageId/edit',
        templateUrl: '/modules/bannerimages/client/views/admin/form-bannerimage.client.view.html',
        controller: 'BannerimagesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bannerimageResolve: getBannerimage
        }
      });
  }

  getBannerimage.$inject = ['$stateParams', 'BannerimagesService'];

  function getBannerimage($stateParams, BannerimagesService) {
    return BannerimagesService.get({
      bannerimageId: $stateParams.bannerimageId
    }).$promise;
  }

  newBannerimage.$inject = ['BannerimagesService'];

  function newBannerimage(BannerimagesService) {
    return new BannerimagesService();
  }
}());
