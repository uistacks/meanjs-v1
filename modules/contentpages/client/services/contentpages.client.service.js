(function () {
  'use strict';

  angular
    .module('contentpages.services')
    .factory('ContentpagesService', ContentpagesService);

  ContentpagesService.$inject = ['$resource', '$log'];

  function ContentpagesService($resource, $log) {
    var Contentpage = $resource('/api/contentpages/:contentpageId', {
      contentpageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Contentpage.prototype, {
      createOrUpdate: function () {
        var contentpage = this;
        return createOrUpdate(contentpage);
      }
    });

    return Contentpage;

    function createOrUpdate(contentpage) {
      if (contentpage._id) {
        return contentpage.$update(onSuccess, onError);
      } else {
        return contentpage.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(contentpage) {
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
