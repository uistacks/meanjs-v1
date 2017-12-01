(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminListService', '$stateParams'];

  function UserListController($scope, $filter, AdminListService, $stateParams) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.userType = '';


    switch ($stateParams.userType) {
      case 'customers':
        vm.userType = 'user';
        break;
      case 'employees':
        vm.userType = 'employee';
        break;
      /*
      * below cases not in use as of now, but can be used later
       */
      case 'master-controllers':
        vm.userType = 'mastercontroller';
        break;
      case 'area-managers':
        vm.userType = 'areamanager';
        break;
      case 'admins':
        vm.userType = 'subadmin';
        break;
      case 'controllers':
        vm.userType = 'controller';
        break;
      case 'technicians':
        vm.userType = 'technician';
        break;
    }

    if (vm.userType) {
      AdminListService.query({ userType: vm.userType }, function (data) {
        vm.users = data;
        vm.buildPager();
      });
    }

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.users, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

  }
}());
