(function () {
  'use strict';

  angular
    .module('bookingtimeslots.admin')
    .controller('BookingtimeslotsAdminController', BookingtimeslotsAdminController);

  BookingtimeslotsAdminController.$inject = ['$scope', '$state', '$window', 'bookingtimeslotResolve', 'Authentication', 'Notification', 'AreasService'];

  function BookingtimeslotsAdminController($scope, $state, $window, bookingtimeslot, Authentication, Notification, AreasService) {
    var vm = this;

    vm.bookingtimeslot = bookingtimeslot;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.areas = [];

    AreasService.query(function(data) {
      vm.areas = data;
    });

    // Remove existing Bookingtimeslot
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.bookingtimeslot.$remove(function() {
          $state.go('admin.bookingtimeslots.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Booking time slot deleted successfully!' });
        });
      }
    }

    // Save Bookingtimeslot
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookingtimeslotForm');
        return false;
      }
      // Create a new bookingtimeslot, or update the current instance
      vm.bookingtimeslot.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.bookingtimeslots.list'); // should we send the User to the list or the updated Bookingtimeslot's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Booking time slot saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Booking time slot save error!' });
      }
    }
  }
}());
