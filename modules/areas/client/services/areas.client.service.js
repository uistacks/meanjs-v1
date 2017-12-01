(function () {
    'use strict';

    angular
            .module('areas.services')
            .factory('AreasService', AreasService);

    AreasService.$inject = ['$resource', '$log'];

    function AreasService($resource, $log) {
        var Area = $resource('/api/areas/:areaId', {
            areaId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            getUserServiceArea: {
                method: 'POST',
                url: '/api/area/get-user-service-area'
            },
            getStandardWorkHours:
                    {
                        method: 'POST',
                        url: '/api/get-area-std-work-hour'
                    }
        });

        angular.extend(Area.prototype, {
            createOrUpdate: function () {
                var area = this;
                return createOrUpdate(area);
            }
        });

        return Area;



        function createOrUpdate(area) {
            if (area._id) {
                return area.$update(onSuccess, onError);
            } else {
                return area.$save(onSuccess, onError);
            }

            // Handle successful response
            function onSuccess(area) {
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
