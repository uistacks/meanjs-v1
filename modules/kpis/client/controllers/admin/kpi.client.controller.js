(function () {
  'use strict';

  angular
    .module('kpis.admin')
    .controller('KpisAdminController', KpisAdminController);

  KpisAdminController.$inject = ['$scope', '$state', '$window', 'kpiResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi'];

  function KpisAdminController($scope, $state, $window, kpi, Authentication, Notification, uiGmapGoogleMapApi) {
    var vm = this;

    vm.kpi = kpi;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Kpi
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.kpi.$remove(function() {
          $state.go('admin.kpis.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Kpi deleted successfully!' });
        });
      }
    }

    // Save Kpi
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.kpiForm');
        return false;
      }
      // Create a new kpi, or update the current instance
      vm.kpi.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.kpis.list'); // should we send the User to the list or the updated Kpi's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Kpi saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Kpi save error!' });
      }
    }
  }
}());
