(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$scope', '$http', '$location', 'UsersService', 'Authentication', 'Notification', 'ServicesService'];

  function EditProfileController($scope, $http, $location, UsersService, Authentication, Notification, ServicesService) {
    var vm = this;

    vm.user = Authentication.user;
    var user = new UsersService(vm.user);


    ServicesService.query(function (data) {
      vm.services = data;
    });


    $scope.userSkills = {
      selected: {}
    };

    if (user.serviceSkills.length > 0) {
      console.log(user.serviceSkills);
      for (var i in user.serviceSkills) {
        $scope.userSkills.selected[user.serviceSkills[i]] = 'Y';
      }
    }


    vm.updateUserProfile = updateUserProfile;

    // Update a user profile
    function updateUserProfile(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = new UsersService(vm.user);

      //getting users selected skills

      var arrSkills = [];
      if(vm.user.roles[0]=='technician') {
        for (var i in $scope.userSkills.selected) {
          if ($scope.userSkills.selected[i] == 'Y') {
            arrSkills.push(i);

          }
        }

        user.skills = arrSkills;
      }

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> Edit profile successful!'});
        Authentication.user = response;
      }, function (response) {
        Notification.error({
          message: response.data.message,
          title: '<i class="glyphicon glyphicon-remove"></i> Edit profile failed!'
        });
      });
    }
  }
}());
