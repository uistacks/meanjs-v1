(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('skills.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Intentionally removed menus
  }
}());
