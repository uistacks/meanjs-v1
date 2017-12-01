(function () {
  'use strict';

  angular
    .module('contentpages.admin')
    .controller('ContentpagesAdminController', ContentpagesAdminController);

  ContentpagesAdminController.$inject = ['$scope', '$state', '$window', 'contentpageResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi'];

  function ContentpagesAdminController($scope, $state, $window, contentpage, Authentication, Notification, uiGmapGoogleMapApi) {
    var vm = this;

    vm.contentpage = contentpage;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Contentpage
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.contentpage.$remove(function() {
          $state.go('admin.contentpages.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Contentpage deleted successfully!' });
        });
      }
    }

    // Save Contentpage
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.contentpageForm');
        return false;
      }
      // Create a new contentpage, or update the current instance
      vm.contentpage.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.contentpages.list'); // should we send the User to the list or the updated Contentpage's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Contentpage saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Contentpage save error!' });
      }
    }
  }
}());
