(function () {
  'use strict';

  angular
    .module('core.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>'
      })
      .state('admin.index', {
        url: '/',
 
        templateUrl: '/modules/core/client/views/admin-dashboard.client.view.html',
        data: {
          pageTitle: 'Welcome to Admin Panel'
        }
      })
      .state('admin.login', {
        url: '/login',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        templateUrl: '/modules/core/client/views/admin-login.client.view.html',
        data: {
          pageTitle: 'Please login to admin panel'
        }
      })
      ;
  }
}());
