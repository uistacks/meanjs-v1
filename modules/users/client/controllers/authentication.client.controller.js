(function () {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$cookies', '$scope', '$timeout', '$state', 'UsersService', '$location', '$window', 'Authentication', 'PasswordValidator', 'Notification'];

  function AuthenticationController($cookies, $scope, $timeout, $state, UsersService, $location, $window, Authentication, PasswordValidator, Notification) {
    var vm = this;
    $scope.submitted = false;
    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.signin = signin;
    vm.guestUser = guestUser;
    vm.callOauthProvider = callOauthProvider;
    vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;

    // Get an eventual error defined in the URL query string:
    if ($location.search().err) {
      Notification.error({message: $location.search().err});
    }

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      console.log('Hello');
      $location.path('/');
    }

    function signup(isValid) {
      $scope.submitted = true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignup(vm.credentials)
        .then(onUserSignupSuccess)
        .catch(onUserSignupError);
    }

    function guestUser(isValid) {
      $scope.submitted = true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.guestUser(vm.credentials)
        .then(onGuestUserSuccess)
        .catch(onGuestUserError);
    }

    function signin(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignin(vm.credentials)
        .then(onUserSigninSuccess)
        .catch(onUserSigninError);
    }

    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }

    // Authentication Callbacks

    function onUserSignupSuccess(response) {
      // If successful we assign the response to the global user model
//      vm.authentication.user = response;
      Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> Signup successful!'});
      // And redirect to the previous or home page
      $timeout(function () {

        $window.location.href = '/';
      }, 1000);
//      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onGuestUserSuccess(response) {
      // If successful we assign the response to the global user model
//      vm.authentication.user = response;
      Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> Signup successful!'});
      // And redirect to the previous or home page
      $timeout(function () {
        $window.location.href = '/';
      }, 1000);
//      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onUserSignupError(response) {
      Notification.error({
        message: response.data.message,
        title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!',
        delay: 6000
      });
    }

    function onGuestUserError(response) {
      Notification.error({
        message: response.data.message,
        title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!',
        delay: 6000
      });
    }

    function onUserSigninSuccess(response) {

      // If successful we assign the response to the global user model
      vm.authentication.user = response;
      vm.authentication.userDetails = response;

      console.log(vm.authentication.user2);
      Notification.info({message: 'Welcome ' + response.firstName});
      if (response.roles[0] === 'user') {
        // And redirect to the previous or home page
        if (typeof $cookies.get('service_login_id') != 'undefined') {
          var service_login_id = $cookies.get('service_login_id');
          $cookies.remove('service_login_id');
          $window.location.href = '/book/service/detail/' + service_login_id;
        } else {
          $window.location.href = '/';
        }
//        $state.go($state.previous.state.name || 'home', $state.previous.params);
      } else if (response.roles[0] === 'technician') {

        $window.location.href = '/dashboard/profile';
      }
      else {
        $window.location.href = '/admin/';
      }
    }

    function onUserSigninError(response) {
      Notification.error({
        message: response.data.message,
        title: '<i class="glyphicon glyphicon-remove"></i> Signin Error!',
        delay: 6000
      });
    }
  }
}());
