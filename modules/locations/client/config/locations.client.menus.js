(function () {
  'use strict';

  angular
    .module('locations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Intentionally no menus
  }
}());
