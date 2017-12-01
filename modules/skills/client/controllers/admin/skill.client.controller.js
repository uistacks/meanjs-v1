(function () {
  'use strict';

  angular
    .module('skills.admin')
    .controller('SkillsAdminController', SkillsAdminController);

  SkillsAdminController.$inject = ['$scope', '$state', '$window', 'skillResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi'];

  function SkillsAdminController($scope, $state, $window, skill, Authentication, Notification, uiGmapGoogleMapApi) {
    var vm = this;

    vm.skill = skill;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Skill
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.skill.$remove(function() {
          $state.go('admin.skills.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Skill deleted successfully!' });
        });
      }
    }

    // Save Skill
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.skillForm');
        return false;
      }
      // Create a new skill, or update the current instance
      vm.skill.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.skills.list'); // should we send the User to the list or the updated Skill's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Skill saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Skill save error!' });
      }
    }
  }
}());
