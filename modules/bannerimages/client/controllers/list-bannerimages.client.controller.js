(function () {
  'use strict';

  angular
    .module('bannerimages')
    .controller('BannerimagesListController', BannerimagesListController);

  BannerimagesListController.$inject = ['BannerimagesService'];

  function BannerimagesListController(BannerimagesService) {
    var vm = this;

    vm.bannerimages = BannerimagesService.query();
  }
}());
