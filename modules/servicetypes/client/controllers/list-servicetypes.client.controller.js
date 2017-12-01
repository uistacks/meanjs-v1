(function () {
  'use strict';

  angular
    .module('servicetypes')
    .controller('ServicetypesListController', ServicetypesListController);

  ServicetypesListController.$inject = ['ServicetypesService'];

  function ServicetypesListController(ServicetypesService) {
    var vm = this;

    vm.servicetypes = ServicetypesService.query();
  }
}());
