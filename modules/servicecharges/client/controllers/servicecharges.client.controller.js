(function () {
  'use strict';

  angular
    .module('servicecharges')
    .controller('ServicechargesController', ServicechargesController);

  ServicechargesController.$inject = ['$scope', 'servicechargeResolve', 'Authentication'];

  function ServicechargesController($scope, servicecharge, Authentication) {
    var vm = this;

    vm.servicecharge = servicecharge;
    vm.authentication = Authentication;

  }
}());
