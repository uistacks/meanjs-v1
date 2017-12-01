(function () {
  'use strict';

  angular
    .module('globalsettings')
    .controller('GlobalsettingsListController', GlobalsettingsListController);

  GlobalsettingsListController.$inject = ['GlobalsettingsService'];

  function GlobalsettingsListController(GlobalsettingsService) {
    var vm = this;

    vm.globalsettings = GlobalsettingsService.query();
  }
}());
