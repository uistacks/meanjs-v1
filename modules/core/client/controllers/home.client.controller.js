(function () {
  'use strict';
  angular
    .module('core')
    .controller('HomeController', HomeController);
HomeController.$inject = ['BannerimagesService'];
  function HomeController(BannerimagesService) {
    var vm = this;
    vm.bannerimages = BannerimagesService.query();
  }
}());
