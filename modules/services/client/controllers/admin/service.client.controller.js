(function () {
  'use strict';

  angular
    .module('services.admin')
    .controller('ServicesAdminController', ServicesAdminController);

  ServicesAdminController.$inject = ['$scope', '$state', '$window', 'serviceResolve', 'Authentication', 'Notification', 'AreasService', 'ServicetypesService', 'ServicesubtypesService'];

  function ServicesAdminController($scope, $state, $window, service, Authentication, Notification, AreasService, ServicetypesService, ServicesubtypesService) {
      
    var vm = this;
    
    vm.service = service;
    vm.authentication = Authentication;
    vm.form = {};
    vm.areas = [];
    
    vm.serviceTypes = [];
    vm.serviceSubTypes = [];
    vm.areaServiceTypes = [];
    vm.areaServiceSubTypes = [];
    vm.remove = remove;
    vm.save = save;



    AreasService.query(function(data) {
      vm.areas = data;
    });

    ServicetypesService.query(function(data) {
      vm.serviceTypes = data;
      
      if (vm.service._id) {
        $scope.setAreaServiceTypes(false);
      }
    });

    ServicesubtypesService.query(function(data) {
      
      vm.serviceSubTypes = data;
      if (vm.service._id) {
        $scope.setServiceSubTypes(false);
      }
    });

    $scope.setAreaServiceTypes = function (setUndefined) {
      vm.areaServiceTypes = [];

      if (setUndefined) {
        vm.service.servicetype = undefined;
        $scope.setServiceSubTypes(true);
      }

      angular.forEach(vm.serviceTypes, function(ele, indx) {
        if (ele.area === vm.service.area) {
          vm.areaServiceTypes.push(ele);
        }
      });

    };

    $scope.setServiceSubTypes = function (setUndefined) {
      vm.areaServiceSubTypes = [];

      if (setUndefined)
        vm.service.servicesubtype = undefined;

      angular.forEach(vm.serviceSubTypes, function(ele, indx) {
        if (ele.servicetype === vm.service.servicetype) {
          vm.areaServiceSubTypes.push(ele);
        }
      });
    };

    // Remove existing Service
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.service.$remove(function() {
          $state.go('admin.services.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Service deleted successfully!' });
        });
      }
    }

    // Save Service
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.serviceForm');
        return false;
      }
      // Create a new service, or update the current instance
      
      vm.service.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.services.list'); // should we send the User to the list or the updated Service's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Service saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Service save error!' });
      }
    }

  }
}());
