(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('contentpages.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Intentionally removed menus
  }
}());
