(function () {
  'use strict';

  angular
    .module('servicecharges')
    .controller('ServicechargesListController', ServicechargesListController);

  ServicechargesListController.$inject = ['ServicechargesService'];

  function ServicechargesListController(ServicechargesService) {
    var vm = this;

    vm.servicecharges = ServicechargesService.query();
  }
}());
