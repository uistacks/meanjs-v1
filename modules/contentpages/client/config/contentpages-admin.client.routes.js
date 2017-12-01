(function () {
  'use strict';

  angular
    .module('contentpages.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.contentpages', {
        abstract: true,
        url: '/contentpages',
        template: '<ui-view/>'
      })
      .state('admin.contentpages.list', {
        url: '',
        templateUrl: '/modules/contentpages/client/views/admin/list-contentpages.client.view.html',
        controller: 'ContentpagesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.contentpages.create', {
        url: '/create',
        templateUrl: '/modules/contentpages/client/views/admin/form-contentpage.client.view.html',
        controller: 'ContentpagesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          contentpageResolve: newContentpage
        }
      })
      .state('admin.contentpages.edit', {
        url: '/:contentpageId/edit',
        templateUrl: '/modules/contentpages/client/views/admin/form-contentpage.client.view.html',
        controller: 'ContentpagesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          contentpageResolve: getContentpage
        }
      });
  }

  getContentpage.$inject = ['$stateParams', 'ContentpagesService'];

  function getContentpage($stateParams, ContentpagesService) {
    return ContentpagesService.get({
      contentpageId: $stateParams.contentpageId
    }).$promise;
  }

  newContentpage.$inject = ['ContentpagesService'];

  function newContentpage(ContentpagesService) {
    return new ContentpagesService();
  }
}());
