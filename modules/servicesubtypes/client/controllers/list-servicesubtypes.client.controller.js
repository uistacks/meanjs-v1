(function () {
  'use strict';

  angular
    .module('servicesubtypes')
    .controller('ServicesubtypesListController', ServicesubtypesListController);

  ServicesubtypesListController.$inject = ['ServicesubtypesService'];

  function ServicesubtypesListController(ServicesubtypesService) {
    var vm = this;

    vm.servicesubtypes = ServicesubtypesService.query();
  }
}());
