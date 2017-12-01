(function () {
  'use strict';

  angular
    .module('bookingtimeslots')
    .controller('BookingtimeslotsController', BookingtimeslotsController);

  BookingtimeslotsController.$inject = ['$scope', 'bookingtimeslotResolve', 'Authentication'];

  function BookingtimeslotsController($scope, bookingtimeslot, Authentication) {
    var vm = this;

    vm.bookingtimeslot = bookingtimeslot;
    vm.authentication = Authentication;

  }
}());
