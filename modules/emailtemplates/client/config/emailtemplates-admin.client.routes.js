(function () {
  'use strict';

  angular
    .module('emailtemplates.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.emailtemplates', {
        abstract: true,
        url: '/emailtemplates',
        template: '<ui-view/>'
      })
      .state('admin.emailtemplates.list', {
        url: '',
        templateUrl: '/modules/emailtemplates/client/views/admin/list-emailtemplates.client.view.html',
        controller: 'EmailtemplatesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.emailtemplates.create', {
        url: '/create',
        templateUrl: '/modules/emailtemplates/client/views/admin/form-emailtemplate.client.view.html',
        controller: 'EmailtemplatesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          emailtemplateResolve: newEmailtemplate
        }
      })
      .state('admin.emailtemplates.edit', {
        url: '/:emailtemplateId/edit',
        templateUrl: '/modules/emailtemplates/client/views/admin/form-emailtemplate.client.view.html',
        controller: 'EmailtemplatesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          emailtemplateResolve: getEmailtemplate
        }
      });
  }

  getEmailtemplate.$inject = ['$stateParams', 'EmailtemplatesService'];

  function getEmailtemplate($stateParams, EmailtemplatesService) {
    return EmailtemplatesService.get({
      emailtemplateId: $stateParams.emailtemplateId
    }).$promise;
  }

  newEmailtemplate.$inject = ['EmailtemplatesService'];

  function newEmailtemplate(EmailtemplatesService) {
    return new EmailtemplatesService();
  }
}());
