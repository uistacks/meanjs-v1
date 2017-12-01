(function () {
  'use strict';

  angular
    .module('globalsettings')
    .controller('GlobalsettingsController', GlobalsettingsController);

  GlobalsettingsController.$inject = ['$scope', 'globalsettingResolve', 'Authentication'];

  function GlobalsettingsController($scope, globalsetting, Authentication) {
    var vm = this;

    vm.globalsetting = globalsetting;
    vm.authentication = Authentication;

  }
}());
