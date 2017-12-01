(function () {
  'use strict';

  angular
    .module('kpis')
    .controller('KpisController', KpisController);

  KpisController.$inject = ['$scope', 'kpiResolve', 'Authentication'];

  function KpisController($scope, kpi, Authentication) {
    var vm = this;

    vm.kpi = kpi;
    vm.authentication = Authentication;

  }
}());
