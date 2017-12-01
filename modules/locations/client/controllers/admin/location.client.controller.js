(function () {
  'use strict';

  angular
    .module('locations.admin')
    .controller('LocationsAdminController', LocationsAdminController);

  LocationsAdminController.$inject = ['$scope', '$state', '$window', 'locationResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi'];

  function LocationsAdminController($scope, $state, $window, location, Authentication, Notification, uiGmapGoogleMapApi) {
    var vm = this;

    vm.location = location;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Location
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.location.$remove(function() {
          $state.go('admin.locations.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Location deleted successfully!' });
        });
      }
    }

    // Save Location
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.locationForm');
        return false;
      }
      // Create a new location, or update the current instance
      vm.location.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.locations.list'); // should we send the User to the list or the updated Location's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Location saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Location save error!' });
      }
    }
  }
}());
