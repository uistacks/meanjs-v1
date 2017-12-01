(function () {
  'use strict';

  angular
    .module('bannerimages')
    .controller('BannerimagesController', BannerimagesController);

  BannerimagesController.$inject = ['$scope', 'bannerimageResolve', 'Authentication'];

  function BannerimagesController($scope, bannerimage, Authentication) {
    var vm = this;

    vm.bannerimage = bannerimage;
    vm.authentication = Authentication;

  }
}());
