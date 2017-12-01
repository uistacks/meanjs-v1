(function () {
  'use strict';

  angular
    .module('servicesubtypes')
    .controller('ServicesubtypesController', ServicesubtypesController);

  ServicesubtypesController.$inject = ['$scope', 'servicesubtypeResolve', 'Authentication'];

  function ServicesubtypesController($scope, servicesubtype, Authentication) {
    var vm = this;

    vm.servicesubtype = servicesubtype;
    vm.authentication = Authentication;

  }
}());
