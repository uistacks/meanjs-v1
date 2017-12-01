(function () {
  'use strict';

  angular
    .module('servicesubtypes.admin')
    .controller('ServicesubtypesAdminListController', ServicesubtypesAdminListController);

  ServicesubtypesAdminListController.$inject = ['ServicesubtypesService', '$filter'];

  function ServicesubtypesAdminListController(ServicesubtypesService, $filter) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    ServicesubtypesService.query(function(data) {
      vm.servicesubtypes = data;
      vm.buildPager();
    });


    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.servicesubtypes, {
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
