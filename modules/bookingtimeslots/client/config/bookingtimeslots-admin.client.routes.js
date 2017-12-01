(function () {
  'use strict';

  angular
    .module('bookingtimeslots.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.bookingtimeslots', {
        abstract: true,
        url: '/bookingtimeslots',
        template: '<ui-view/>'
      })
      .state('admin.bookingtimeslots.list', {
        url: '',
        templateUrl: '/modules/bookingtimeslots/client/views/admin/list-bookingtimeslots.client.view.html',
        controller: 'BookingtimeslotsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.bookingtimeslots.create', {
        url: '/create',
        templateUrl: '/modules/bookingtimeslots/client/views/admin/form-bookingtimeslot.client.view.html',
        controller: 'BookingtimeslotsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bookingtimeslotResolve: newBookingtimeslot
        }
      })
      .state('admin.bookingtimeslots.edit', {
        url: '/:bookingtimeslotId/edit',
        templateUrl: '/modules/bookingtimeslots/client/views/admin/form-bookingtimeslot.client.view.html',
        controller: 'BookingtimeslotsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bookingtimeslotResolve: getBookingtimeslot
        }
      });
  }

  getBookingtimeslot.$inject = ['$stateParams', 'BookingtimeslotsService'];

  function getBookingtimeslot($stateParams, BookingtimeslotsService) {
    return BookingtimeslotsService.get({
      bookingtimeslotId: $stateParams.bookingtimeslotId
    }).$promise;
  }

  newBookingtimeslot.$inject = ['BookingtimeslotsService'];

  function newBookingtimeslot(BookingtimeslotsService) {
    return new BookingtimeslotsService();
  }
}());
