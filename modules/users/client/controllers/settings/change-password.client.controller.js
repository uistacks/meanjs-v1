(function () {
    'use strict';

    angular
            .module('users')
            .controller('ChangePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['$location','$scope', '$http', 'Authentication', 'UsersService', 'PasswordValidator', 'Notification'];

    function ChangePasswordController($location,$scope, $http, Authentication, UsersService, PasswordValidator, Notification) {
        var vm = this;
        $scope.changeUserPasswordSubmitted = false;
        vm.user = Authentication.user;
        vm.changeUserPassword = changeUserPassword;
        vm.getPopoverMsg = PasswordValidator.getPopoverMsg;

        // Change user password
        function changeUserPassword(isValid) {
            $scope.changeUserPasswordSubmitted = true;
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.passwordForm');

                return false;
            }

            UsersService.changePassword(vm.passwordDetails)
                    .then(onChangePasswordSuccess)
                    .catch(onChangePasswordError);
        }

        function onChangePasswordSuccess(response) {
            // If successful show success message and clear form
            $scope.changeUserPasswordSubmitted = false;
            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> Password Changed Successfully'});
//            vm.passwordDetails = null;
//            $scope.changeUserPasswordSubmitted = false;
                $location.path('/dashboard/profile')
        }

        function onChangePasswordError(response) {
            Notification.error({message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Password change failed!'});
        }
    }
}());
