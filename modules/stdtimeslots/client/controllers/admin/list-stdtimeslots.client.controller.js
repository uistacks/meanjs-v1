(function () {
    'use strict';

    angular
            .module('stdtimeslots.admin')
            .controller('StdtimeslotsAdminListController', StdtimeslotsAdminListController);

    StdtimeslotsAdminListController.$inject = ['AreasService', '$filter', 'Authentication', 'AdminService'];

    function StdtimeslotsAdminListController(AreasService, $filter, Authentication, AdminService) {
        var vm = this;

        vm.authentication = Authentication;


        vm.buildPager = buildPager;
        vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
        vm.pageChanged = pageChanged;


        if (vm.authentication.user.roles[0] == 'areamanager')
        {
            AdminService.get({userId: vm.authentication.user._id}, function (data) {
                vm.stdtimeslots = [AreasService.get({areaId: data.area})];
                vm.buildPager();
            });
        }
        else {
            AreasService.query(function (data) {
                vm.stdtimeslots = data;
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
            vm.filteredItems = $filter('filter')(vm.stdtimeslots, {
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
