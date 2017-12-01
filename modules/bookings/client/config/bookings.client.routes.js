(function () {
  'use strict';

  angular
    .module('bookings.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('book', {
        abstract: true,
        url: '/book',
        template: '<ui-view/>'
      })

      .state('book.serviceDetail', {
        url: '/service/detail/:serviceId',
        templateUrl: '/modules/bookings/client/views/view-service.client.view.html',
        controller: 'BookingsController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        },
        resolve: {
          serviceResolve: getService
        }
      }).state('book.ongoingJobs', {
        url: '/jobs/ongoing',
        templateUrl: '/modules/bookings/client/views/list-tech-ongoing-bookings.client.view.html',
        controller: 'BookingsListController',
        controllerAs: 'vm',
      }).state('book.ongoingServices', {
        url: '/jobs/ongoing-services',
        templateUrl: '/modules/bookings/client/views/list-user-ongoing-bookings.client.view.html',
        controller: 'BookingsUserListController',
        controllerAs: 'vm',
      }).state('book.completedServices', {
        url: '/jobs/completed-services',
        templateUrl: '/modules/bookings/client/views/list-user-completed-bookings.client.view.html',
        controller: 'BookingsUserListController',
        controllerAs: 'vm',
      })
      .state('book.completedJobs', {
        url: '/jobs/completed',
        templateUrl: '/modules/bookings/client/views/list-tech-completed-bookings.client.view.html',
        controller: 'BookingsListController',
        controllerAs: 'vm',
      }).state('book.userOngoingJobsDetail', {
        url: '/jobs/user-ongoing-detail/:bookingId',
        templateUrl: '/modules/bookings/client/views/user-ongoing-bookings-detail.client.view.html',
        controller: 'BookingsController',
        controllerAs: 'vm',
          resolve: {
          serviceResolve: function(){
              return {};
          }
        }
      }).state('book.ongoingJobsDetail', {
        url: '/jobs/ongoing-detail/:bookingId',
        templateUrl: '/modules/bookings/client/views/ongoing-bookings-detail.client.view.html',
        controller: 'BookingsController',
        controllerAs: 'vm',
          resolve: {
          serviceResolve: function(){
              return {};
          }
        }
      }).state('book.completedJobsDetail', {
        url: '/jobs/completed-detail/:bookingId',
        templateUrl: '/modules/bookings/client/views/completed-bookings-detail.client.view.html',
        controller: 'BookingsController',
        controllerAs: 'vm',
          resolve: {
          serviceResolve: function(){
              return {};
          }
        }
      }).state('book.userCompletedJobsDetail', {
        url: '/jobs/user-completed-detail/:bookingId',
        templateUrl: '/modules/bookings/client/views/user-completed-bookings-detail.client.view.html',
        controller: 'BookingsController',
        controllerAs: 'vm',
          resolve: {
          serviceResolve: function(){
              return {};
          }
        }
      });
  }

 getService.$inject = ['$stateParams', 'ServicesService'];

  function getService($stateParams, ServicesService) {
    return ServicesService.get({
      serviceId: $stateParams.serviceId
    }).$promise;
  }

}());
