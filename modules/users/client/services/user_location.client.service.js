(function () {
    'use strict';

    // Authentication service for user variables

    angular
            .module('users.services')
            .factory('UserLocation', UserLocation);

    UserLocation.$inject = ['$window', '$cookies', 'AreasService', '$http'];

    function UserLocation($window, $cookies, $http) {
        return {
            setUserLocation: function (cords, location)
            {

                $cookies.put('location', location, {path: '/'});
                $cookies.putObject('cords', cords, {path: '/'});
            },
            getUserLocation: function (cords, location)
            {
//          
//            $cookies.put('location', location);
//            $cookies.putObject('cords', cords);
            }
        }


    }
}());
