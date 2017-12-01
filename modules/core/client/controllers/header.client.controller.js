(function () {
    'use strict';

    angular
            .module('core')
            .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

    function HeaderController($scope, $state, Authentication, menuService) {
        var vm = this;
        vm.accountMenu = menuService.getMenu('account').items[0];
        vm.authentication = Authentication;
        vm.isCollapsed = true;
        vm.menu = menuService.getMenu('topbar');
        vm.isAdmin = (vm.authentication.user && vm.authentication.user.roles[0] === 'admin');
        
     
        $scope.$on('$stateChangeSuccess', stateChangeSuccess);

        function stateChangeSuccess() {
            // Collapsing the menu after navigation
            vm.isCollapsed = false;
        }
        
        
        
    }
}());
