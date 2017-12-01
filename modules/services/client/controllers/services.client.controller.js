(function () {
  'use strict';

  angular
    .module('services')
    .controller('ServicesController', ServicesController);

  ServicesController.$inject = ['$scope', 'serviceResolve', 'Authentication','$cookies','Upload','UserLocation','$http'];

  function ServicesController($scope, service, Authentication,$cookies,Upload,UserLocation,$http) {
    var vm = this;


    vm.service = service;
    vm.location=$cookies.get('location');
    
    vm.authentication = Authentication;
    
    vm.serviceRequirment = serviceRequirment;

  function serviceRequirment(isValid) {
        $scope.submitted=true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.serviceRequirmentForm');

        return false;
      }
      
      
      console.log(vm.credentials);

  $http.post('/api/user-work-description', vm.credentials).
           then(function mySuccess(response) {
        
    }, function myError(response) {
        
    });
      
      
    }
  }
}());
