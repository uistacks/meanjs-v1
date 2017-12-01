(function () {
  'use strict';

  angular
    .module('stdtimeslots')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Intentionally no menus
  }
}());
