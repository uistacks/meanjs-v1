(function () {
  'use strict';

  angular
    .module('areas')
    .controller('AreasListController', AreasListController);

  AreasListController.$inject = ['AreasService'];

  function AreasListController(AreasService) {
    var vm = this;

    vm.areas = AreasService.query();
  }
}());
