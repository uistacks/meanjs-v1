(function () {
  'use strict';

  angular
    .module('skills.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.skills', {
        abstract: true,
        url: '/skills',
        template: '<ui-view/>'
      })
      .state('admin.skills.list', {
        url: '',
        templateUrl: '/modules/skills/client/views/admin/list-skills.client.view.html',
        controller: 'SkillsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.skills.create', {
        url: '/create',
        templateUrl: '/modules/skills/client/views/admin/form-skill.client.view.html',
        controller: 'SkillsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          skillResolve: newSkill
        }
      })
      .state('admin.skills.edit', {
        url: '/:skillId/edit',
        templateUrl: '/modules/skills/client/views/admin/form-skill.client.view.html',
        controller: 'SkillsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          skillResolve: getSkill
        }
      });
  }

  getSkill.$inject = ['$stateParams', 'SkillsService'];

  function getSkill($stateParams, SkillsService) {
    return SkillsService.get({
      skillId: $stateParams.skillId
    }).$promise;
  }

  newSkill.$inject = ['SkillsService'];

  function newSkill(SkillsService) {
    return new SkillsService();
  }
}());
