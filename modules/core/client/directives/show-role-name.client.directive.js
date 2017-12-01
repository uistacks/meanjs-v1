(function () {
  'use strict';

  angular.module('core')
    .directive('showRoleName', showRoleName);

  showRoleName.$inject = ['$rootScope', '$interpolate'];

  function showRoleName($rootScope, $interpolate) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      var newRoleName = '<p></p>';
      switch (attrs.showRoleName) {
        case 'areamanager':
          newRoleName = 'Area Manager';
          break;
        case 'mastercontroller':
          newRoleName = 'Master Controller';
          break;
        case 'subadmin':
          newRoleName = 'Admin';
          break;
        case 'controller':
          newRoleName = 'Controller';
          break;
        case 'technician':
          newRoleName = 'Technician';
          break;
      }

      element.html(newRoleName);
    }
  }
}());
