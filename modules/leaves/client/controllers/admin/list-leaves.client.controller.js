(function () {
  'use strict';

  angular
    .module('leaves.admin')
    .controller('LeavesAdminListController', LeavesAdminListController);

  LeavesAdminListController.$inject = ['LeavesService', '$filter'];

  function LeavesAdminListController(LeavesService, $filter) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    LeavesService.query(function(data) {
      vm.leaves = data;
      vm.buildPager();
    });


    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.leaves, {
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
