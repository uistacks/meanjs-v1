(function () {
  'use strict';

  angular
    .module('servicetypes')
    .controller('ServicetypesController', ServicetypesController);

  ServicetypesController.$inject = ['$scope', 'servicetypeResolve', 'Authentication'];

  function ServicetypesController($scope, servicetype, Authentication) {
    var vm = this;

    vm.servicetype = servicetype;
    vm.authentication = Authentication;

  }
}());
