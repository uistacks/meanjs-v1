(function () {
  'use strict';

  angular
    .module('globalsettings')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Intentionally no menus
  }
}());
