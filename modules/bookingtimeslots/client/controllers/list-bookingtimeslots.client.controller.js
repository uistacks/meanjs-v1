(function () {
  'use strict';

  angular
    .module('bookingtimeslots')
    .controller('BookingtimeslotsListController', BookingtimeslotsListController);

  BookingtimeslotsListController.$inject = ['BookingtimeslotsService'];

  function BookingtimeslotsListController(BookingtimeslotsService) {
    var vm = this;

    vm.bookingtimeslots = BookingtimeslotsService.query();
  }
}());
