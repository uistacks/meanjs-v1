(function () {
  'use strict';

  angular
    .module('locations')
    .controller('LocationsController', LocationsController);

  LocationsController.$inject = ['$scope', 'locationResolve', 'Authentication'];

  function LocationsController($scope, location, Authentication) {
    var vm = this;

    vm.location = location;
    vm.authentication = Authentication;

  }
}());
