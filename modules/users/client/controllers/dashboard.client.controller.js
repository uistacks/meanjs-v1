(function () {
  'use strict';

  angular
    .module('users')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$http', '$location', 'UsersService', 'Authentication', 'Notification','menuService'];

  function DashboardController($scope, $http, $location, UsersService, Authentication, Notification,menuService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    vm.isAdmin = (vm.authentication.user && vm.authentication.user.roles[0] === 'admin');
    vm.updateUserProfile = updateUserProfile;

    // Update a user profile
    function updateUserProfile(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = new UsersService(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Edit profile successful!' });
        Authentication.user = response;
      }, function (response) {
        Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Edit profile failed!' });
      });
    }
  }
}());
