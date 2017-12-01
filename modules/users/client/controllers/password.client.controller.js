(function () {
  'use strict';

  angular
    .module('users')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = ['$timeout','$scope', '$stateParams', 'UsersService', '$location', 'Authentication', 'PasswordValidator', 'Notification'];

  function PasswordController($timeout,$scope, $stateParams, UsersService, $location, Authentication, PasswordValidator, Notification) {
    var vm = this;
    $scope.pasword_submitted=false;
    $scope.reset_submitted=false;
    vm.resetUserPassword = resetUserPassword;
    vm.askForPasswordReset = askForPasswordReset;
    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    function askForPasswordReset(isValid) {
    $scope.pasword_submitted=true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.forgotPasswordForm');

        return false;
      }

      UsersService.requestPasswordReset(vm.credentials)
        .then(onRequestPasswordResetSuccess)
        .catch(onRequestPasswordResetError);
    }

    // Change user password
    function resetUserPassword(isValid) {
    $scope.reset_submitted=true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.resetPasswordForm');

        return false;
      }

      UsersService.resetPassword($stateParams.token, vm.passwordDetails)
        .then(onResetPasswordSuccess)
        .catch(onResetPasswordError);
    }

    // Password Reset Callbacks

    function onRequestPasswordResetSuccess(response) {
      // Show user success message and clear form
      vm.credentials = null;
      Notification.success({ message: response.message, title: '<i class="glyphicon glyphicon-ok"></i> Password reset email sent successfully!' });
    }

    function onRequestPasswordResetError(response) {
      // Show user error message and clear form
      vm.credentials = null;
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to send password reset email!', delay: 4000 });
    }

    function onResetPasswordSuccess(response) {
      // If successful show success message and clear form
      vm.passwordDetails = null;

      // Attach user profile
      Authentication.user = response;
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Password reset successful!' });
      // And redirect to the index page
      $timeout(function(){
          window.location.href="/";
      },1500)
//      $location.path('/password/reset/success');
    }

    function onResetPasswordError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Password reset failed!', delay: 4000 });
    }
  }
}());
