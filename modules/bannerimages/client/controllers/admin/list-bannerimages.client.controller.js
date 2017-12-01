(function () {
  'use strict';

  angular
    .module('bannerimages.admin')
    .controller('BannerimagesAdminListController', BannerimagesAdminListController);

  BannerimagesAdminListController.$inject = ['BannerimagesService', '$filter'];

  function BannerimagesAdminListController(BannerimagesService, $filter) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    BannerimagesService.query(function(data) {
      vm.bannerimages = data;
      vm.buildPager();
    });


    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.bannerimages, {
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
