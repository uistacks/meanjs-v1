(function () {
  'use strict';

  angular
    .module('servicecharges.admin')
    .controller('ServicechargesAdminListController', ServicechargesAdminListController);

  ServicechargesAdminListController.$inject = ['ServicechargesService', '$filter'];

  function ServicechargesAdminListController(ServicechargesService, $filter) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    ServicechargesService.query(function(data) {
      vm.servicecharges = data;
      vm.buildPager();
    });


    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.servicecharges, {
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
