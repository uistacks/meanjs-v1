(function () {
  'use strict';

  angular
    .module('contentpages')
    .controller('ContentpagesController', ContentpagesController);

  ContentpagesController.$inject = ['$scope', 'contentpageResolve', 'Authentication'];

  function ContentpagesController($scope, contentpage, Authentication) {
    var vm = this;

    vm.contentpage = contentpage;
    vm.authentication = Authentication;

  }
}());
