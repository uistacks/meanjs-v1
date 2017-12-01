(function () {
  'use strict';

  angular
    .module('bookingtimeslots.admin')
    .controller('BookingtimeslotsAdminListController', BookingtimeslotsAdminListController);

  BookingtimeslotsAdminListController.$inject = ['BookingtimeslotsService', '$filter'];

  function BookingtimeslotsAdminListController(BookingtimeslotsService, $filter) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    BookingtimeslotsService.query(function(data) {
      vm.bookingtimeslots = data;
      vm.buildPager();
    });


    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.bookingtimeslots, {
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
