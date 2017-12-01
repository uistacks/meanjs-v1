(function () {
  'use strict';

  angular
    .module('leaves')
    .controller('LeavesController', LeavesController);

  LeavesController.$inject = ['$scope', 'leaveResolve', 'Authentication'];

  function LeavesController($scope, leave, Authentication) {
    var vm = this;

    vm.leave = leave;
    vm.authentication = Authentication;

  }
}());
