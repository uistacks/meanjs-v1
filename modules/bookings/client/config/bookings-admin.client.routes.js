(function () {
  'use strict';

  angular
    .module('bookings.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.bookings', {
        abstract: true,
        url: '/bookings',
        template: '<ui-view/>'
      })
      .state('admin.bookings.list', {
        url: '',
        templateUrl: '/modules/bookings/client/views/admin/list-bookings.client.view.html',
        controller: 'BookingsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.bookings.create', {
        url: '/create',
        templateUrl: '/modules/bookings/client/views/admin/form-booking.client.view.html',
        controller: 'BookingsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bookingResolve: newBooking
        }
      })
      .state('admin.bookings.edit', {
        url: '/:bookingId/edit',
        templateUrl: '/modules/bookings/client/views/admin/form-booking.client.view.html',
        controller: 'BookingsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bookingResolve: getBooking
        }
      });
  }

  getBooking.$inject = ['$stateParams', 'BookingsService'];

  function getBooking($stateParams, BookingsService) {
    return BookingsService.get({
      bookingId: $stateParams.bookingId
    }).$promise;
  }

  newBooking.$inject = ['BookingsService'];

  function newBooking(BookingsService) {
    return new BookingsService();
  }
}());
