(function () {
  'use strict';

  angular
    .module('emailtemplates')
    .controller('EmailtemplatesController', EmailtemplatesController);

  EmailtemplatesController.$inject = ['$scope', 'emailtemplateResolve', 'Authentication'];

  function EmailtemplatesController($scope, emailtemplate, Authentication) {
    var vm = this;

    vm.emailtemplate = emailtemplate;
    vm.authentication = Authentication;

  }
}());
