(function () {
  'use strict';

  // Focus the element on page load
  // Unless the user is on a small device, because this could obscure the page with a keyboard

  angular.module('core')
    .directive('updateNgModelOnBlur', updateNgModelOnBlur);

  updateNgModelOnBlur.$inject = ['$timeout', '$window'];

  function updateNgModelOnBlur($timeout, $window) {
    var directive = {
      restrict: 'A',
      require: '?ngModel',
      link: link
    };

    return directive;

    function link(scope, element, attrs, ctrl) {
      element.on("blur", function() {
        ctrl.$setViewValue(element.val());
      });
    }
  }
}());
