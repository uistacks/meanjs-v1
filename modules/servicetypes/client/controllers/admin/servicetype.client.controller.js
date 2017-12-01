(function () {
  'use strict';

  angular
    .module('servicetypes.admin')
    .controller('ServicetypesAdminController', ServicetypesAdminController);

  ServicetypesAdminController.$inject = ['$scope', '$state', '$window', 'servicetypeResolve', 'Authentication', 'Notification', 'AreasService'];

  function ServicetypesAdminController($scope, $state, $window, servicetype, Authentication, Notification, AreasService) {
    var vm = this;

    vm.servicetype = servicetype;
    vm.authentication = Authentication;
    vm.form = {};
    vm.areas = {};
    vm.remove = remove;
    vm.save = save;

    AreasService.query(function(data) {
      vm.areas = data;
    });

    // Remove existing Servicetype
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.servicetype.$remove(function() {
          $state.go('admin.servicetypes.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Servicetype deleted successfully!' });
        });
      }
    }

    // Save Servicetype
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.servicetypeForm');
        return false;
      }
      // Create a new servicetype, or update the current instance
      vm.servicetype.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.servicetypes.list'); // should we send the User to the list or the updated Servicetype's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Servicetype saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Servicetype save error!' });
      }
    }
  }
}());
