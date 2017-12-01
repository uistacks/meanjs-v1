(function () {
  'use strict';

  angular
    .module('inventories.admin')
    .controller('InventoriesAdminListController', InventoriesAdminListController);

  InventoriesAdminListController.$inject = ['InventoriesService', '$filter','Authentication','UsersService'];

  function InventoriesAdminListController(InventoriesService, $filter,Authentication,UsersService) {
    var vm = this;
    vm.authentication = Authentication;

    console.log(vm.authentication.user);


    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    InventoriesService.query(function(data) {
      vm.inventories = data;

      vm.buildPager();
    });

      UsersService.get({ userId: vm.authentication.user._id}, function (data) {
      vm.userDetail=data;
    });



    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.inventories, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);

    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

  }
}());
