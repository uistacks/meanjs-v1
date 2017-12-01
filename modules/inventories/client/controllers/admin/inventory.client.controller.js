(function () {
    'use strict';

    angular
            .module('inventories.admin')
            .controller('InventoriesAdminController', InventoriesAdminController);

    InventoriesAdminController.$inject = ['$scope', '$state', '$window', 'inventoryResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi', 'ServicetypesService', 'AreasService','UsersService'];

    function InventoriesAdminController($scope, $state, $window, inventory, Authentication, Notification, uiGmapGoogleMapApi, ServicetypesService, AreasService,UsersService) {
        var vm = this;

        vm.inventory = inventory;
        vm.authentication = Authentication;
        vm.form = {};
        vm.areas = [];
        vm.serviceTypes = [];
        vm.areaServiceTypes = [];
        vm.remove = remove;
        vm.save = save;
        vm.userDetail={}



        

        //getting data of areas
        AreasService.query(function (data) {
            vm.areas = data;
        });

        //getting data of area wise service types
        ServicetypesService.query(function (data) {
            vm.serviceTypes = data;
            if (vm.inventory._id) {
                $scope.setAreaServiceTypes(false);
            }
        });
        
        
        //getting data of user
        UsersService.get({userId: vm.authentication.user._id}, function (data) {
            vm.userDetail = data;
        });
        


        $scope.setAreaServiceTypes = function (setUndefined) {
            vm.areaServiceTypes = [];
            
            if (setUndefined)
                vm.inventory.servicetype = undefined;
            angular.forEach(vm.serviceTypes, function (ele, indx) {
                if (ele.area === vm.inventory.area) {
                    vm.areaServiceTypes.push(ele);
                }
            });
        }
        
        // Remove existing Inventory
        function remove() {
            if ($window.confirm('Are you sure you want to delete?')) {
                vm.inventory.$remove(function () {
                    $state.go('admin.inventories.list');
                    Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> Inventory item deleted successfully!'});
                });
            }
        }

        // Save Inventory
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.inventoryForm');
                return false;
            }
            
            
            vm.inventory.createOrUpdate()
                    .then(successCallback)
                    .catch(errorCallback);

            function successCallback(res) {
                $state.go('admin.inventories.list'); // should we send the User to the list or the updated Inventory's view?
                Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> Inventory item saved successfully!'});
            }

            function errorCallback(res) {
                Notification.error({message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Inventory item save error!'});
            }
        }
    }
}());
