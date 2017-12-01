(function () {
  'use strict';

  angular
    .module('stdtimeslots.admin')
    .controller('StdtimeslotsAdminController', StdtimeslotsAdminController);

  StdtimeslotsAdminController.$inject = ['$scope', '$state', '$window', 'stdtimeslotResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi'];

  function StdtimeslotsAdminController($scope, $state, $window, stdtimeslot, Authentication, Notification, uiGmapGoogleMapApi) {
    var vm = this;

    vm.stdtimeslot = stdtimeslot;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    
   
    

    // Remove existing Stdtimeslot
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.stdtimeslot.$remove(function() {
          $state.go('admin.stdtimeslots.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Stdtimeslot deleted successfully!' });
        });
      }
    }

    // Save Stdtimeslot
    function save(isValid) {
        
      if (!isValid) {
          
        $scope.$broadcast('show-errors-check-validity', 'vm.form.stdtimeslotForm');
        return false;
      }
      
      

 

      // Create a new stdtimeslot, or update the current instance
      console.log(vm.stdtimeslot);
      vm.stdtimeslot.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.stdtimeslots.list'); // should we send the User to the list or the updated Stdtimeslot's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Stdtimeslot saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Stdtimeslot save error!' });
      }
    }
  }
}());
