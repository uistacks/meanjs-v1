(function () {
  'use strict';

  angular
    .module('contentpages')
    .controller('ContentpagesListController', ContentpagesListController);

  ContentpagesListController.$inject = ['ContentpagesService'];

  function ContentpagesListController(ContentpagesService) {
    var vm = this;

    vm.contentpages = ContentpagesService.query();
  }
}());
