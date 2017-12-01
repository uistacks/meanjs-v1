(function () {
  'use strict';

  angular
    .module('stdtimeslots')
    .controller('StdtimeslotsListController', StdtimeslotsListController);

  StdtimeslotsListController.$inject = ['StdtimeslotsService'];

  function StdtimeslotsListController(StdtimeslotsService) {
    var vm = this;

    vm.stdtimeslots = StdtimeslotsService.query();
  }
}());
