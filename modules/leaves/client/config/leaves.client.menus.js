(function () {
  'use strict';

  angular
    .module('leaves')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Intentionally no menus
  }
}());
