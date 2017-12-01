(function () {
  'use strict';

  angular
    .module('articles')
    .controller('StdtimeslotsController', StdtimeslotsController);

  StdtimeslotsController.$inject = ['$scope', 'stdtimeslotResolve', 'Authentication'];

  function StdtimeslotsController($scope, stdtimeslot, Authentication) {
    var vm = this;

    vm.stdtimeslot = stdtimeslot;
    vm.authentication = Authentication;

  }
}());
