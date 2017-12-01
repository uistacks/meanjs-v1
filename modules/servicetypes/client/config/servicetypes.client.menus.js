(function () {
  'use strict';

  angular
    .module('servicetypes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Intentionally no menus
  }
}());
