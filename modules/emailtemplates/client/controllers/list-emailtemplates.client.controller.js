(function () {
  'use strict';

  angular
    .module('emailtemplates')
    .controller('EmailtemplatesListController', EmailtemplatesListController);

  EmailtemplatesListController.$inject = ['EmailtemplatesService'];

  function EmailtemplatesListController(EmailtemplatesService) {
    var vm = this;

    vm.emailtemplates = EmailtemplatesService.query();
  }
}());
