(function () {
  'use strict';

  angular
    .module('servicesubtypes.admin')
    .controller('ServicesubtypesAdminController', ServicesubtypesAdminController);

  ServicesubtypesAdminController.$inject = ['$scope', '$state', '$window', 'servicesubtypeResolve', 'Authentication', 'Notification', 'AreasService', 'ServicetypesService'];

  function ServicesubtypesAdminController($scope, $state, $window, servicesubtype, Authentication, Notification, AreasService, ServicetypesService) {
    var vm = this;

    vm.servicesubtype = servicesubtype;
    vm.authentication = Authentication;
    vm.form = {};
    vm.areas = [];
    vm.serviceTypes = [];
    vm.areaServiceTypes = [];
    vm.remove = remove;
    vm.save = save;

    AreasService.query(function(data) {
      vm.areas = data;
    });

    ServicetypesService.query(function(data) {
      vm.serviceTypes = data;
      if (vm.servicesubtype._id) {
        $scope.setAreaServiceTypes(false);
      }
    });

    $scope.setAreaServiceTypes = function (setUndefined) {
      vm.areaServiceTypes = [];

      if (setUndefined)
        vm.servicesubtype.servicetype = undefined;

      angular.forEach(vm.serviceTypes, function(ele, indx) {
        if (ele.area === vm.servicesubtype.area) {
          vm.areaServiceTypes.push(ele);
        }
      });
    }

    // Remove existing Servicesubtype
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.servicesubtype.$remove(function() {
          $state.go('admin.servicesubtypes.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Servicesubtype deleted successfully!' });
        });
      }
    }

    // Save Servicesubtype
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.servicesubtypeForm');
        return false;
      }
      // Create a new servicesubtype, or update the current instance
      vm.servicesubtype.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.servicesubtypes.list'); // should we send the User to the list or the updated Servicesubtype's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Servicesubtype saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Servicesubtype save error!' });
      }
    }
  }
}());
