(function () {
  'use strict';

  angular
    .module('inventories.services')
    .factory('InventoriesService', InventoriesService);

  InventoriesService.$inject = ['$resource', '$log'];

  function InventoriesService($resource, $log) {
    var Inventory = $resource('/api/inventories/:inventoryId', {
      inventoryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getTechInventories: {
        method: 'POST',
        url: '/api/inventory/get-tech-inventories',
        isArray:true,
      }
    });

    angular.extend(Inventory.prototype, {
      createOrUpdate: function () {
        var inventory = this;

        return createOrUpdate(inventory);
      }
    });

    return Inventory;

    function createOrUpdate(inventory) {
      if (inventory._id) {
        return inventory.$update(onSuccess, onError);
      } else {
        return inventory.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(inventory) {
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
