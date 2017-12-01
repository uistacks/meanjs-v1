(function () {
  'use strict';

  angular
    .module('skills.services')
    .factory('SkillsService', SkillsService);

  SkillsService.$inject = ['$resource', '$log'];

  function SkillsService($resource, $log) {
    var Skill = $resource('/api/skills/:skillId', {
      skillId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Skill.prototype, {
      createOrUpdate: function () {
        var skill = this;
        return createOrUpdate(skill);
      }
    });

    return Skill;

    function createOrUpdate(skill) {
      if (skill._id) {
        return skill.$update(onSuccess, onError);
      } else {
        return skill.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(skill) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
