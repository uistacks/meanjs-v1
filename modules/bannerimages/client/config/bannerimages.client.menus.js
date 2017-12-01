(function () {
  'use strict';

  angular
    .module('bannerimages')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Intentionally no menus
  }
}());
