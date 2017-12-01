(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve', 'PasswordValidator', 'Notification', 'AreasService', 'AdminListService', 'SkillsService', 'DepartmentsService', 'LocationsService'];

  function UserController($scope, $state, $window, Authentication, user, PasswordValidator, Notification, AreasService, AdminListService, SkillsService, DepartmentsService, LocationsService) {
    var vm = this;

console.log(user);
    vm.authentication = Authentication;
    vm.user = user;
    
    vm.remove = remove;
    vm.update = update;
    vm.isContextUserSelf = isContextUserSelf;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    $scope.currentSection = 'personal';
    vm.daysInMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    vm.userRoles = [{ _id: "mastercontroller", name: "Master Controller" }, { _id: "areamanager", name: "Area Manager" }, { _id: "subadmin", name: "Admin" }, { _id: "controller", name: "Controller" }, { _id: "technician", name: "Technician" }];
    $scope.isSameLocalAddress = false;

    if (!vm.user._id) {
      vm.userTechnicalExperience = [];
      vm.userEducation = [];
      vm.userTrainings = [];
      vm.userSkills = [];
      vm.educationInfo = { educationTitle: '', educationDescription: '', educationDate: '' };
      vm.trainingInfo = { trainingTitle: '', trainingDescription: '', trainingDate: '' };
      vm.techExperienceInfo = { experienceTitle: '', techExperienceDescription: '', techExperienceDate: '' };
    } else {
      vm.userTechnicalExperience = vm.user.userTechnicalExperience;
      vm.userEducation = vm.user.userEducation;
      vm.userTrainings = vm.user.userTrainings;
      vm.userSkills = vm.user.userSkills;
      vm.educationInfo = vm.user.educationInfo;
      vm.trainingInfo = vm.user.trainingInfo;
      vm.techExperienceInfo = vm.user.techExperienceInfo;
      vm.user.role = vm.user.roles[0];
    }

    AreasService.query(function(data) {
      vm.areas = data;
    });

    AdminListService.query({ userType: 'employee' }, function (data) {
      vm.supervisors = data;
    });

    SkillsService.query(function(data) {
      vm.skills = data;
    });
    DepartmentsService.query(function(data) {
      vm.departments = data;
    });
    LocationsService.query(function(data) {
      vm.locations = data;
    });

    function remove(user) {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          vm.users.splice(vm.users.indexOf(user), 1);
          Notification.success('User deleted successfully!');
        } else {
          vm.user.$remove(function () {
            $state.go("admin.users", { userType: 'employees' });
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User deleted successfully!' });
          });
        }
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = vm.user;

      user.$update(function () {
        $state.go("admin.users", { userType: 'employees' });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User saved successfully!' });
      }, function (errorResponse) {
        Notification.error({ message: errorResponse.data.message, title: '<i class="glyphicon glyphicon-remove"></i> User update error!' });
      });
    }

    vm.createNewMasterController = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }
      vm.user.roles = 'mastercontroller';
      vm.user.$save(successCallback, errorCallback);

      function successCallback(res) {
        $state.go("admin.users({ userType: 'master-controllers'})"); // should we send the User to the list or the updated Area's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Master Controller added successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Master Controller save error!' });
      }

    };

    vm.createNewAreaManager = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }
      vm.user.roles = 'areamanager';
      vm.user.$save(successCallback, errorCallback);

      function successCallback(res) {
        $state.go('admin.users({ userType: "area-managers"})'); // should we send the User to the list or the updated Area's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Master Controller added successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Master Controller save error!' });
      }

    };

    vm.createNewEmployee = function (isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }
      vm.user.userTechnicalExperience = vm.userTechnicalExperience;
      vm.user.userEducation = vm.userEducation;
      vm.user.userTrainings = vm.userTrainings;
      vm.user.userSkills = vm.userSkills;

      vm.user.$save(successCallback, errorCallback);

      function successCallback(res) {
        $state.go("admin.users", { userType: 'employees' });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Master Controller added successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Employee save error!' });
      }

    };

    function isContextUserSelf() {
      return vm.user.username === vm.authentication.user.username;
    }

    $scope.saveEducation = function(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.educationForm');
        return false;
      } else {

        var objUserEducation = vm.educationInfo;
        vm.userEducation.push(objUserEducation);

        vm.educationInfo = {};
        $window.jQuery("#mdlEducation").modal("hide");
      }
    };

    $scope.saveTraining = function(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.trainingForm');
        return false;
      } else {

        var objUserTraining = vm.trainingInfo;
        vm.userTrainings.push(objUserTraining);

        vm.trainingInfo = {};
        $window.jQuery("#mdlTrainings").modal("hide");
      }
    };

    $scope.saveTechExperince = function(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.techExperienceForm');
        return false;
      } else {
        var objUserTechExp = vm.techExperienceInfo;
        vm.userTechnicalExperience.push(objUserTechExp);

        vm.techExperienceInfo = {};
        $window.jQuery("#mdlTechExperience").modal("hide");
      }
    };

    $scope.removeTrainingRecord = function(index) {
      vm.userTrainings.splice(index, 1);
    };

    $scope.removeEducationRecord = function(index) {
      vm.userEducation.splice(index, 1);
    };

    $scope.removeTechnicalExperienceRecord = function(index) {
      vm.userTechnicalExperience.splice(index, 1);
    };

    $scope.sameLocalAddress = function() {

      if ($scope.isSameLocalAddress) {
        vm.user.localAddress = vm.user.permanentAddress;
        vm.user.localAddressCity = vm.user.permanentAddressCity;
        vm.user.localAddressState = vm.user.permanentAddressState;
        vm.user.localAddressZip = vm.user.permanentAddressZip;
        vm.user.localAddressCountry = vm.user.permanentAddressCountry;
      }
    };

  }
}());
