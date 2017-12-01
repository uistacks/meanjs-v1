(function () {
  'use strict';

  angular
    .module('articles')
    .controller('AreasController', AreasController);

  AreasController.$inject = ['$scope', 'areaResolve', 'Authentication'];

  function AreasController($scope, area, Authentication) {
    var vm = this;

    vm.area = area;
    vm.authentication = Authentication;
  }
}());
