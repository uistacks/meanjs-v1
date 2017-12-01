(function () {
  'use strict';

  angular
    .module('globalsettings.admin')
    .controller('GlobalsettingsAdminController', GlobalsettingsAdminController);

  GlobalsettingsAdminController.$inject = ['$scope', '$state', '$window', 'globalsettingResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi'];

  function GlobalsettingsAdminController($scope, $state, $window, globalsetting, Authentication, Notification, uiGmapGoogleMapApi) {
    var vm = this;

    vm.globalsetting = globalsetting;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Globalsetting
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.globalsetting.$remove(function() {
          $state.go('admin.globalsettings.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Globalsetting deleted successfully!' });
        });
      }
    }

    // Save Globalsetting
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.globalsettingForm');
        return false;
      }
      // Create a new globalsetting, or update the current instance
      vm.globalsetting.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.globalsettings.list'); // should we send the User to the list or the updated Globalsetting's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Globalsetting saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Globalsetting save error!' });
      }
    }
  }
}());
