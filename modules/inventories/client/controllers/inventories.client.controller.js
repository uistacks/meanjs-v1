(function () {
  'use strict';

  angular
    .module('inventories')
    .controller('InventoriesController', InventoriesController);

  InventoriesController.$inject = ['$scope', 'inventoryResolve', 'Authentication'];

  function InventoriesController($scope, inventory, Authentication) {
    var vm = this;
    vm.inventory = inventory;
    vm.authentication = Authentication;
  }
}());
