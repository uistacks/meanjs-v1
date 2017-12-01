(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/list-users/:userType',
        templateUrl: '/modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Users List'
        }
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: '/modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: '/modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit User {{ userResolve.displayName }}'
        }
      })
      .state('admin.master-controller-create', {
        url: '/users/master-controllers/create',
        templateUrl: '/modules/users/client/views/admin/create-master-controller-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: newUser
        },
        data: {
          pageTitle: 'Create new Master Controller User'
        }
      })
      .state('admin.area-manager-create', {
        url: '/users/area-managers/create',
        templateUrl: '/modules/users/client/views/admin/create-area-manager-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: newUser
        },
        data: {
          pageTitle: 'Create new Master Controller User'
        }
      })
      .state('admin.employee-create', {
        url: '/employees/create',
        templateUrl: '/modules/users/client/views/admin/create-employee.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: newUser
        },
        data: {
          pageTitle: 'Create new Employee'
        }
      })
      .state('admin.employee-edit', {
        url: '/employees/:userId/edit',
        templateUrl: '/modules/users/client/views/admin/edit-employee.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit Employee {{ userResolve.displayName }}'
        }
      })
       
      ;

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }

    newUser.$inject = ['$stateParams', 'AdminService'];

    function newUser($stateParams, AdminService) {
      return new AdminService();
    }
  }
}());
