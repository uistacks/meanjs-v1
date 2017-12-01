(function () {
  'use strict';

  angular
    .module('bookingtimeslots')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Intentionally no menus
  }
}());
