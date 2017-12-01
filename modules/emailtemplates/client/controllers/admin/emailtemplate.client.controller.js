(function () {
  'use strict';

  angular
    .module('emailtemplates.admin')
    .controller('EmailtemplatesAdminController', EmailtemplatesAdminController);

  EmailtemplatesAdminController.$inject = ['$scope', '$state', '$window', 'emailtemplateResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi'];

  function EmailtemplatesAdminController($scope, $state, $window, emailtemplate, Authentication, Notification, uiGmapGoogleMapApi) {
    var vm = this;

    vm.emailtemplate = emailtemplate;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Emailtemplate
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.emailtemplate.$remove(function() {
          $state.go('admin.emailtemplates.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Emailtemplate deleted successfully!' });
        });
      }
    }

    // Save Emailtemplate
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.emailtemplateForm');
        return false;
      }
      // Create a new emailtemplate, or update the current instance
      vm.emailtemplate.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.emailtemplates.list'); // should we send the User to the list or the updated Emailtemplate's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Emailtemplate saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Emailtemplate save error!' });
      }
    }
  }
}());
