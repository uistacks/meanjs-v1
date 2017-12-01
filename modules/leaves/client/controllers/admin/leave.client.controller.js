(function () {
  'use strict';

  angular
    .module('leaves.admin')
    .controller('LeavesAdminController', LeavesAdminController);

  LeavesAdminController.$inject = ['$scope', '$state', '$window', 'leaveResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi'];

  function LeavesAdminController($scope, $state, $window, leave, Authentication, Notification, uiGmapGoogleMapApi) {
    var vm = this;

    vm.leave = leave;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Leave
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.leave.$remove(function() {
          $state.go('admin.leaves.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Leave deleted successfully!' });
        });
      }
    }

    // Save Leave
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.leaveForm');
        return false;
      }
      // Create a new leave, or update the current instance
      vm.leave.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.leaves.list'); // should we send the User to the list or the updated Leave's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Leave saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Leave save error!' });
      }
    }
  }
}());
