(function () {
  'use strict';

  angular
    .module('skills')
    .controller('SkillsController', SkillsController);

  SkillsController.$inject = ['$scope', 'skillResolve', 'Authentication'];

  function SkillsController($scope, skill, Authentication) {
    var vm = this;

    vm.skill = skill;
    vm.authentication = Authentication;

  }
}());
