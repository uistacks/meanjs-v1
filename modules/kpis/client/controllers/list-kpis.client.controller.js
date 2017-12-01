(function () {
  'use strict';

  angular
    .module('kpis')
    .controller('KpisListController', KpisListController);

  KpisListController.$inject = ['KpisService'];

  function KpisListController(KpisService) {
    var vm = this;

    vm.kpis = KpisService.query();
  }
}());
