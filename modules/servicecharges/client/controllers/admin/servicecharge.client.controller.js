(function () {
  'use strict';

  angular
    .module('servicecharges.admin')
    .controller('ServicechargesAdminController', ServicechargesAdminController);

  ServicechargesAdminController.$inject = ['$scope', '$state', '$window', 'servicechargeResolve', 'Authentication', 'Notification', 'AreasService', 'ServicesService'];

  function ServicechargesAdminController($scope, $state, $window, servicecharge, Authentication, Notification, AreasService, ServicesService) {
    var vm = this;

    vm.servicecharge = servicecharge;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.areas = [];
    vm.services = [];

    AreasService.query(function(data) {
      vm.areas = data;
    });

    ServicesService.query(function(data) {
      vm.services = data;
    });

    // Remove existing Servicecharge
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.servicecharge.$remove(function() {
          $state.go('admin.servicecharges.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Servicecharge deleted successfully!' });
        });
      }
    }

    // Save Servicecharge
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.servicechargeForm');
        return false;
      }
      // Create a new servicecharge, or update the current instance
      vm.servicecharge.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.servicecharges.list'); // should we send the User to the list or the updated Servicecharge's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Servicecharge saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Servicecharge save error!' });
      }
    }
  }
}());
